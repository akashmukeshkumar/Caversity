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
let silenceTimer; // 🔥 FOR SILENCE DETECTION
let isListeningMode = false; // 🔥 Auto-Listen State

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
    recognition.continuous = false;
    recognition.interimResults = false;
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

// 🔥 SILENCE HANDLER 🔥
function resetSilenceTimer() {
    clearTimeout(silenceTimer);
    if (!isInterviewActive) return;
    silenceTimer = setTimeout(async () => {
        isListeningMode = false;
        if(recognition) recognition.stop();
        updateMicUI(false);
        document.getElementById('subtitle-box').innerText = "Partner is waiting for your response...";
        const promptStr = "The candidate has been completely silent for 15 seconds. Sound impatient and pressure them to answer quickly. Use strict tone. Keep it to 1 short sentence.";
        interviewMemory.push({ "role": "system", "content": "[The candidate is silent and taking too long to respond.]" });
        interviewMemory.push({ "role": "system", "content": promptStr });
        const reply = await askGroqWithFallback();
        speakResponse(reply);
    }, 15000); // 15 seconds limit
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
    clearTimeout(silenceTimer);
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
    Return ONLY a valid JSON object with no markdown formatting or extra text. Use this exact structure:
    {
        "technical_score": 85,
        "confidence_score": 70,
        "overall_verdict": "SHORTLISTED", // Strictly use either "SHORTLISTED", "HIRED", or "REJECTED"
        "feedback": "Write a 3-4 line detailed feedback paragraph mentioning their specific mistakes or strong points."
    }
    `;
    
    interviewMemory.push({ "role": "user", "content": evalPrompt });
    
    try {
        const reply = await askGroqWithFallback();
        const jsonMatch = reply.match(/\{[\s\S]*\}/);
        const report = JSON.parse(jsonMatch ? jsonMatch[0] : reply);
        
        const tClass = report.technical_score >= 70 ? 'score-value' : (report.technical_score >= 50 ? 'score-value mid' : 'score-value low');
        const cClass = report.confidence_score >= 70 ? 'score-value' : (report.confidence_score >= 50 ? 'score-value mid' : 'score-value low');
        const vClass = report.overall_verdict === 'REJECTED' ? 'verdict-badge verdict-rejected' : 'verdict-badge verdict-hired';

        document.getElementById('eval-content').innerHTML = `
            <div class="eval-grid">
                <div class="score-box"><h3>Technical Knowledge</h3><div class="${tClass}">${report.technical_score}%</div></div>
                <div class="score-box"><h3>Confidence & Tone</h3><div class="${cClass}">${report.confidence_score}%</div></div>
                <div class="verdict-box">
                    <h3>Final Partner Decision</h3>
                    <div class="${vClass}">${report.overall_verdict}</div>
                </div>
                <div class="feedback-box">
                    <strong>Partner's Detailed Feedback:</strong><br><br>
                    ${report.feedback}
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
    let prompt = `
    You are a highly experienced and strict Senior Partner conducting a 5-minute final interview for ${candidateData.firm}.
    Candidate Name: ${candidateData.name}
    Candidate's Resume Text (Extract): ${candidateData.cvText.substring(0, 1000)}...
    
    PSYCHOLOGICAL PROFILE & RULES:
    1. Be 100% natural, professional, intimidating, and unpredictable. Use short, sharp English sentences (1-2 lines max). Keep it strictly in formal English.
    2. Start with a brief intro. Then immediately attack a gap, weakness, or random hobby in their CV.
    3. Use exclamation marks (!) when annoyed or strict. Use question marks (?) for aggressive cross-questioning.
    4. Ask SPECIFICALLY about the firm: "Why do you want to join ${candidateData.firm}?" Challenge their loyalty.
    5. Ask a highly technical audit/IFRS scenario. If they answer right, change the scenario to confuse them.
    6. Do NOT sound like an AI. You are a stressed Partner testing if this candidate can survive corporate pressure.
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
    speakResponse(reply);
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
    try {
        isListeningMode = true;
        if(recognition) recognition.start();
        resetSilenceTimer(); // Start 15s countdown
        updateMicUI(true);
        document.getElementById('subtitle-box').innerText = "Listening...";
    } catch (e) { /* Ignore if already started */ }
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
        if (isListeningMode && isInterviewActive) {
            try { recognition.start(); } catch(e){}
        }
    };

    recognition.onresult = async (event) => {
        isListeningMode = false;
        clearTimeout(silenceTimer); // Stop countdown
        updateMicUI(false);
        
        const transcript = event.results[0][0].transcript;
        
        // Mumbling / Noise filter (Agar bacha darr ke theek na bole)
        if (transcript.trim().length < 2) {
            document.getElementById('subtitle-box').innerText = "Couldn't hear properly. Try again.";
            setTimeout(startAutoListening, 1000); // Try again
            return;
        }
        
        document.getElementById('subtitle-box').innerText = "Processing your response...";
        interviewMemory.push({ "role": "user", "content": transcript });
        appendToTranscript('user', transcript); // Add User message to Sidebar
        
        const reply = await askGroqWithFallback();
        speakResponse(reply);
    };
} else {
    alert("Your browser does not support Speech Recognition. Please use Chrome.");
}
