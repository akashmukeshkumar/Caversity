// ==========================================
// 🚀 CAVERSITY FRONTEND INTERVIEW ENGINE
// ==========================================

import { getApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 1. 🔥 MULTIPLE API KEYS (FALLBACK SYSTEM) 🔥
const GROQ_API_KEYS = [
    "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",
    "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",
    "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",
    "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",
    "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"
];
let currentKeyIndex = 0;

// 2. STATE VARIABLES
let candidateData = { name: "", firm: "", cvText: "" };
let interviewMemory = [];
let isInterviewActive = false;
let timerInterval;
let secondsElapsed = 0;
let speechPauseTimer;
let absoluteSilenceTimer;
let isMicOpen = false;
let finalAnswer = ""; // 🔥 Stores text safely even if you pause
let silenceStrikes = 0; // 🔥 To auto-cut the call

// 🔥 FIREBASE SETUP FOR ROOM LOCK 🔥
const app = getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const roomDocRef = doc(db, "app_state", "interview_room");

// 3. SPEECH ENGINES (Built-in Browser APIs)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition ? new SpeechRecognition() : null;
const synth = window.speechSynthesis;

// Setup STT
if (recognition) {
    recognition.continuous = false; // We auto-restart it safely in onend
    recognition.interimResults = true; // Captures while you pause
    recognition.lang = 'en-PK';
}

// ==========================================
// 🔒 ROOM LOCK (BUSY STATE) LOGIC
// ==========================================
let serverState = { is_busy: false, current_student: null };

onAuthStateChanged(auth, (user) => {
    if (user) {
        onSnapshot(roomDocRef, (docSnap) => {
            if (docSnap.exists()) {
                serverState = docSnap.data();
                updateLobbyStatus();
            }
        }, (error) => {
            console.warn("Room listener error (Check Firebase Rules):", error);
        });
    }
});

function updateLobbyStatus() {
    const btn = document.getElementById('start-interview-btn');
    const statusMsg = document.getElementById('lobby-status');
    const currentName = document.getElementById('candidate-name').value.trim();
    
    if (serverState.is_busy && serverState.current_student !== currentName) {
        btn.disabled = true;
        statusMsg.style.color = "#ef4444";
        statusMsg.innerText = `⚠️ Partner is currently interviewing ${serverState.current_student}. Please wait.`;
    } else {
        btn.disabled = false;
        if (statusMsg.innerText.includes("Partner is currently interviewing")) {
            statusMsg.innerText = "✅ Partner is free. You can join now.";
            statusMsg.style.color = "#10b981";
        }
    }
}

// ==========================================
// 🏢 LOBBY LOGIC (CV & FIRM)
// ==========================================

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

document.getElementById('start-interview-btn').addEventListener('click', async () => {
    const name = document.getElementById('candidate-name').value.trim();
    updateLobbyStatus(); // re-check
    const firm = document.getElementById('target-firm').value;
    const cvFile = document.getElementById('cv-upload').files[0];
    const statusMsg = document.getElementById('lobby-status');

    if (!name) return statusMsg.innerText = "⚠️ Please enter your name.";
    if (!cvFile) return statusMsg.innerText = "⚠️ Please upload your CV (PDF).";

    // 🔥 PRO-LEVEL FIX 1: Unlock Browser Speech Engine synchronously on click 🔥
    // (Prevents Safari, iPhone, and strict Chrome from blocking AI voice later)
    const unlockUtterance = new SpeechSynthesisUtterance('');
    speechSynthesis.speak(unlockUtterance);
    speechSynthesis.cancel();

    // 🔥 PRO-LEVEL FIX 2: Block "Ghost Rooms" by enforcing strict hardware checks 🔥
    try {
        const testStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        testStream.getTracks().forEach(track => track.stop()); // Free hardware immediately
    } catch (hardwareErr) {
        return statusMsg.innerText = "❌ Camera/Microphone blocked! You must allow permissions to take the interview.";
    }

    // 🔥 CHECK LOCK BEFORE JOINING 🔥
    try {
        const snap = await getDoc(roomDocRef);
        if (snap.exists() && snap.data().is_busy) {
            const lastActive = snap.data().last_active?.toMillis() || 0;
            // Auto-unlock if frozen for more than 5 minutes
            if (Date.now() - lastActive < 5 * 60 * 1000) {
                return statusMsg.innerText = `⚠️ Room is busy with ${snap.data().current_student}. Please wait.`;
            }
        }
    } catch (err) {
        console.warn("Could not check room state, proceeding anyway.", err);
    }

    statusMsg.style.color = "#3b82f6";
    statusMsg.innerText = "⏳ Extracting CV Data...";
    
    try {
        const cvText = await extractTextFromPDF(cvFile);
        if(cvText.length < 50) throw new Error("CV seems empty or unreadable.");
        
        // Acquire Room Lock
        await setDoc(roomDocRef, {
            is_busy: true,
            current_student: name,
            last_active: serverTimestamp()
        });

        candidateData = { name, firm, cvText };
        statusMsg.innerText = "✅ CV Extracted. Entering Room...";
        
        setTimeout(startInterviewRoom, 1000);
    } catch (e) {
        statusMsg.style.color = "#ef4444";
        statusMsg.innerText = "❌ Error reading CV: " + e.message;
    }
});

async function extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({data: arrayBuffer}).promise;
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        fullText += content.items.map(item => item.str).join(" ") + " ";
    }
    return fullText;
}

// ==========================================
// 🎥 INTERVIEW ROOM LOGIC
// ==========================================

function startInterviewRoom() {
    document.getElementById('lobby-screen').classList.remove('active-screen');
    document.getElementById('interview-screen').classList.add('active-screen');
    document.getElementById('partner-name').innerText = `Partner (${candidateData.firm.toUpperCase()})`;
    isInterviewActive = true;

    // Clear previous transcript
    const tsContent = document.getElementById('ts-content');
    if (tsContent) tsContent.innerHTML = '';

    // Start Webcam
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(stream => { document.getElementById('user-webcam').srcObject = stream; })
        .catch(err => { console.warn("Camera fallback failed:", err); });

    // Start Timer
    timerInterval = setInterval(() => {
        secondsElapsed++;
        
        // Limit display to max 5:00
        let displaySeconds = secondsElapsed > 300 ? 300 : secondsElapsed;
        let m = Math.floor(displaySeconds / 60).toString().padStart(2, '0');
        let s = (displaySeconds % 60).toString().padStart(2, '0');
        document.getElementById('call-timer').innerText = `${m}:${s}`;
        
        // 🔥 AUTO-END AT 5 MINUTES 🔥
        if (secondsElapsed >= 300 && !synth.speaking && isInterviewActive) {
            endInterview(); // Cut call immediately if partner is silent
        }
    }, 1000);

    setSystemPrompt();
    triggerPartnerGreeting();
}

// 🔥 ABSOLUTE SILENCE HANDLER 🔥
async function handleAbsoluteSilence() {
    if (!isMicOpen) return;
    
    silenceStrikes++;
    isMicOpen = false;
    if(recognition) recognition.stop();
    updateMicUI(false);
    
    const helper = document.getElementById('mic-helper');
    if(helper) helper.classList.remove('show');
    
    if (silenceStrikes >= 2) {
        document.getElementById('subtitle-box').innerText = "Ending interview due to no response...";
        speakResponse("You are not responding. We will wrap up the interview here.");
        setTimeout(endInterview, 4000);
    } else {
        document.getElementById('subtitle-box').innerText = "Partner is waiting...";
        interviewMemory.push({ "role": "system", "content": "[Candidate was silent for 20 seconds. Ask them if they are still there.]" });
        const reply = await askGroqWithFallback();
        setTimeout(() => speakResponse(reply), 1000);
    }
}

// 🔥 WINDOW CLOSE PROTECTION (Releases lock if user closes tab) 🔥
window.addEventListener('beforeunload', () => {
    if (isInterviewActive) {
        setDoc(roomDocRef, {
            is_busy: false, current_student: null, last_active: serverTimestamp()
        }).catch(e => console.warn("Background lock release failed", e));
    }
});

async function endInterview() {
    isInterviewActive = false;
    clearInterval(timerInterval);
    clearTimeout(absoluteSilenceTimer);
    clearTimeout(speechPauseTimer);
    synth.cancel(); // Stop speaking
    const stream = document.getElementById('user-webcam').srcObject;
    if(stream) stream.getTracks().forEach(track => track.stop());
    
    // Release Lock
    setDoc(roomDocRef, {
        is_busy: false,
        current_student: null,
        last_active: serverTimestamp()
    }).catch(e => console.warn("Failed to release lock", e));

    // Switch to Dashboard
    document.getElementById('interview-screen').classList.remove('active-screen');
    document.getElementById('evaluation-screen').classList.add('active-screen');
    
    // Set Report Header Data
    document.getElementById('report-candidate-name').innerText = candidateData.name;
    document.getElementById('report-firm-name').innerText = candidateData.firm.toUpperCase();
    document.getElementById('report-date').innerText = new Date().toLocaleDateString('en-GB');
    
    await generateEvaluationReport();
}

window.endInterview = endInterview; // Export for HTML onclick

// ==========================================
// 📊 EVALUATION REPORT ENGINE
// ==========================================
async function generateEvaluationReport() {
    const evalPrompt = `
    Based on the interview transcript above, evaluate the candidate strictly.
    
    CRITICAL PENALTY RULE: 
    Analyze the candidate's actual spoken responses. If the candidate remained completely silent, gave 0 or 1 meaningful response, or abandoned the interview early without answering the questions properly, you MUST give a technical_score between 5 and 15, a confidence_score between 5 and 15, the overall_verdict MUST be "REJECTED", and the feedback MUST clearly state "Candidate abandoned the interview or failed to participate."

    Return ONLY a raw valid JSON object with no markdown formatting or backticks. Use this exact structure:
    {
        "technical_score": 85,
        "confidence_score": 70,
        "overall_verdict": "SHORTLISTED",
        "feedback": "Feedback paragraph here."
    }
    `;
    
    interviewMemory.push({ "role": "user", "content": evalPrompt });
    
    try {
        const reply = await askGroqWithFallback();
        // 🔥 BULLETPROOF JSON PARSER 🔥
        const cleanedReply = reply.replace(/```json/g, '').replace(/```/g, '').trim();
        const jsonMatch = cleanedReply.match(/\{[\s\S]*\}/);
        const report = JSON.parse(jsonMatch ? jsonMatch[0] : cleanedReply);
        
        const tClass = (report.technical_score || 50) >= 70 ? 'score-value' : 'score-value low';
        const cClass = (report.confidence_score || 50) >= 70 ? 'score-value' : 'score-value low';
        const vClass = (report.overall_verdict || 'REJECTED').includes('REJECTED') ? 'verdict-badge verdict-rejected' : 'verdict-badge verdict-hired';

        document.getElementById('eval-content').innerHTML = `
            <div class="eval-grid">
                <div class="score-box"><h3>Technical Knowledge</h3><div class="${tClass}">${report.technical_score}%</div></div>
                <div class="score-box"><h3>Confidence & Tone</h3><div class="${cClass}">${report.confidence_score}%</div></div>
                <div class="verdict-box">
                    <h3>Final Partner Decision</h3>
                    <div class="${vClass}">${report.overall_verdict || 'REVIEW NEEDED'}</div>
                </div>
                <div class="feedback-box">
                    <strong>Partner's Detailed Feedback:</strong><br><br>
                    ${report.feedback || 'Could not generate detailed feedback.'}
                </div>
            </div>
        `;
    } catch (e) {
        document.getElementById('eval-content').innerHTML = `<p style="color:red; text-align:center;">Failed to generate report. Please try again. Error: ${e.message}</p>`;
    }
}

// ==========================================
// 🧠 AI BRAIN & API FALLBACK
// ==========================================

function setSystemPrompt() {
    let firmPersonality = "";
    const firmTarget = candidateData.firm.toLowerCase();
    
    if (firmTarget.includes("pwc") || firmTarget.includes("ey") || firmTarget.includes("kpmg")) {
        firmPersonality = "FIRM PROFILE (Big 4): Be extremely strict and highly technical. Focus heavily on complex IFRS scenarios, Taxation, high-pressure situations, and ethical dilemmas. Do NOT make generic statements about budgets or finances; ruthlessly test their technical knowledge in IFRS, Tax, Corporate Law, and Audit methodology.";
    } else if (firmTarget.includes("unilever") || firmTarget.includes("p&g")) {
        firmPersonality = "FIRM PROFILE (Industry): Focus heavily on internal controls, business risk, process optimization, financial reporting, and practical accounting rather than just strict statutory audit rules.";
    } else {
        firmPersonality = "FIRM PROFILE (Top 10): Be strict but practical. Focus on identifying CV gaps, testing loyalty, and asking tricky general knowledge or mid-level CA topics like Accounting Standards (IFRS), Tax, and Audit.";
    }

    let prompt = `
    You are a highly experienced and strict Senior Partner conducting a 5-minute final interview for a Chartered Accountancy (CA) Trainee position at ${candidateData.firm}.
    ${firmPersonality}
    
    Candidate Name: ${candidateData.name}
    Candidate's Resume Text (Extract): ${candidateData.cvText.substring(0, 800)}...
    
    STRICT RULES (OBEY THESE OR FAIL):
    1. You MUST act exactly like a human interviewer. 
    2. Ask ONLY ONE short question at a time (Max 2 sentences). NEVER ramble, NEVER give financial advice, and NEVER talk to yourself.
    3. WAIT for the candidate to answer. DO NOT generate the candidate's response.
    4. Stay focused on their CV. Note: "CAF Qualified" means they passed all 8 core CA subjects. Ask mostly about Accounting Standards (IFRS), Audit, and Tax, but occasionally surprise them with a question from Cost Accounting, Business Law, or Economics. Also ask why they want to join ${candidateData.firm}.
    5. If they give a good answer, cross-question them sharply. If bad, act disappointed.
    6. Speak plainly. NO markdown, NO bold text, NO bullet points, NO long paragraphs.
    `;
    
    interviewMemory.push({ "role": "system", "content": prompt });
}

// Expose for voice load
speechSynthesis.onvoiceschanged = () => { window.availableVoices = speechSynthesis.getVoices(); };

async function askGroqWithFallback() {
    const subtitle = document.getElementById('subtitle-box');
    subtitle.innerText = "Partner is thinking...";
    
    while (currentKeyIndex < GROQ_API_KEYS.length) {
        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${GROQ_API_KEYS[currentKeyIndex]}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: interviewMemory,
                    temperature: 0.6,
                    max_tokens: 150
                })
            });

            if (!response.ok) {
                if (response.status === 429) { 
                    console.warn(`Key ${currentKeyIndex} Limit Hit. Switching key...`);
                    currentKeyIndex++; 
                    continue; 
                }
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;

        } catch (error) {
            console.warn(`Error with key ${currentKeyIndex}:`, error);
            currentKeyIndex++; 
        }
    }
    return "Sorry, I am facing a technical issue. Let's wrap this up.";
}

// ==========================================
// 📜 TRANSCRIPT SIDEBAR LOGIC
// ==========================================
document.getElementById('transcript-toggle-btn')?.addEventListener('click', () => {
    document.getElementById('transcript-sidebar').classList.add('open');
});
document.getElementById('close-transcript-btn')?.addEventListener('click', () => {
    document.getElementById('transcript-sidebar').classList.remove('open');
});

function appendToTranscript(role, text) {
    const tsContent = document.getElementById('ts-content');
    if(!tsContent) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `ts-msg ${role === 'user' ? 'user-msg' : 'ai-msg'}`;
    msgDiv.innerText = text;
    tsContent.appendChild(msgDiv);
    tsContent.scrollTop = tsContent.scrollHeight; // Auto scroll to bottom
}

// ==========================================
// �️ SPEECH LOGIC (Browser Built-in)
// ==========================================

async function triggerPartnerGreeting() {
    const reply = await askGroqWithFallback();
    setTimeout(() => speakResponse(reply), 1000);
}

function speakResponse(text) {
    document.getElementById('subtitle-box').innerText = text;
    document.querySelector('.ai-video').classList.add('ai-speaking');
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find Professional Voice
    const voices = speechSynthesis.getVoices();
    let bestVoice = voices.find(v => 
        v.name.includes('Google UK English Male') || 
        v.name.includes('Microsoft Mark') || 
        v.name.includes('Microsoft Guy') || 
        (v.lang.startsWith('en') && v.name.includes('Male'))
    );
    if (bestVoice) utterance.voice = bestVoice;
    
    // 🔥 DYNAMIC TONE & PITCH SHIFT 🔥
    if (text.includes('!') || text.includes('?')) {
        utterance.pitch = 0.45; // Deeper, more intimidating for cross-questions/anger
        utterance.rate = 0.95; // Slightly faster but slow enough to be natural
    } else {
        utterance.pitch = 0.6; // Normal strict
        utterance.rate = 0.85; // Slower, relaxed pace
    }
    
    utterance.onend = () => {
        document.querySelector('.ai-video').classList.remove('ai-speaking');
        interviewMemory.push({ "role": "assistant", "content": text });
        appendToTranscript('assistant', text); // Add AI message to Sidebar
        if (isInterviewActive) {
            // 🔥 PRO-LEVEL FIX 3: Auto-detect AI failure and safely exit instead of looping 🔥
            if (secondsElapsed >= 300 || text.includes("technical issue")) {
                endInterview(); // Cut the call after AI finishes its last sentence
            } else {
                startAutoListening(); // 🔥 AI finished, turn Mic ON
            }
        }
    };
    
    synth.speak(utterance);
}

// 🔥 AUTOMATIC HANDS-FREE MIC LOGIC 🔥
function startAutoListening() {
    if (!isInterviewActive || synth.speaking) return;

    isMicOpen = true;
    finalAnswer = ""; // Reset answer text
    document.getElementById('subtitle-box').innerText = "Listening... (Click 'Send' when done)";

    const helper = document.getElementById('mic-helper');
    if(helper) {
        helper.innerText = "Click Mic to Send";
        helper.classList.add('show');
        setTimeout(() => helper.classList.remove('show'), 5000); // Hide after 5 seconds
    }

    updateMicUI(true);

    try {
        if(recognition) recognition.start();
    } catch (e) { /* Ignore if already started */ }

    clearTimeout(absoluteSilenceTimer);
    clearTimeout(speechPauseTimer);
    absoluteSilenceTimer = setTimeout(handleAbsoluteSilence, 20000); // Wait 20 seconds for activity
}

// 🔥 CLICK MIC TO SEND LOGIC 🔥
document.getElementById('auto-mic-indicator')?.addEventListener('click', () => {
    if (isMicOpen) {
        const currentSub = document.getElementById('subtitle-box').innerText;
        if (finalAnswer.trim().length > 1 || currentSub.length > 5) {
            if (currentSub !== "Listening... (Speak naturally)" && !currentSub.includes("Please say")) {
                finalAnswer = currentSub;
            }
            sendUserResponse();
        } else {
            document.getElementById('subtitle-box').innerText = "Please say something before sending.";
        }
    }
});

async function sendUserResponse() {
    if (!isMicOpen) return;

    isMicOpen = false;
    clearTimeout(absoluteSilenceTimer);
    clearTimeout(speechPauseTimer);
    try { recognition.stop(); } catch(e){}
    updateMicUI(false);
    
    const helper = document.getElementById('mic-helper');
    if(helper) helper.classList.remove('show');

    silenceStrikes = 0; // Reset strikes since user responded

    document.getElementById('subtitle-box').innerText = "Processing your response...";
    interviewMemory.push({ "role": "user", "content": finalAnswer });
    appendToTranscript('user', finalAnswer);

    const reply = await askGroqWithFallback();
    // Delay AI response by 1 second to make it natural
    setTimeout(() => {
        speakResponse(reply);
    }, 1000);
}

function updateMicUI(isListening) {
    const micInd = document.getElementById('auto-mic-indicator');
    if (isListening) {
        micInd.classList.add('active');
        micInd.innerHTML = '<i class="fas fa-microphone"></i>';
    } else {
        micInd.classList.remove('active');
        micInd.innerHTML = '<i class="fas fa-microphone-slash"></i>';
    }
}

if(recognition) {
    recognition.onend = () => {
        // Auto-restart if browser drops it before timer or user speaks
        if (isMicOpen && isInterviewActive) {
            try { recognition.start(); } catch(e){}
        }
    };

    recognition.onresult = async (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalAnswer += event.results[i][0].transcript + ' ';
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
        
        let currentText = finalAnswer + interimTranscript;
        document.getElementById('subtitle-box').innerText = currentText;
        
        if (currentText.trim().length > 0) {
            clearTimeout(absoluteSilenceTimer);
            clearTimeout(speechPauseTimer);
            
            speechPauseTimer = setTimeout(() => {
                if (currentText.trim().length > 2) {
                    finalAnswer = currentText; // Ensure we get everything
                    sendUserResponse();
                } else {
                    absoluteSilenceTimer = setTimeout(handleAbsoluteSilence, 20000);
                }
            }, 4000); // 4-second pause to auto-send
        }
    };
} else {
    alert("Your browser does not support Speech Recognition. Please use Chrome.");
}
