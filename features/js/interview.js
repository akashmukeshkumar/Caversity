// ==========================================
// 🚀 CAVERSITY FRONTEND INTERVIEW ENGINE
// ==========================================

import { getApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ==========================================
// 🧠 THE BRAIN: SMART ALIAS EXTRACTION SYSTEM (Imported from Firm Hub)
// ==========================================
const FIRM_MAPPINGS = [
    { id: "A.F. Ferguson (PwC)", aliases: ["ferguson", "aff", "pwc", "a.f. ferguson", "price waterhouse"] },
    { id: "KPMG Taseer Hadi", aliases: ["kpmg", "taseer hadi"] },
    { id: "EY Ford Rhodes", aliases: ["ey", "ernst & young", "ford rhodes", "ernst and young", "eyfr"] },
    { id: "Yousuf Adil (Deloitte)", aliases: ["deloitte", "yousuf adil", "yousaf adil"] },
    { id: "BDO Ebrahim", aliases: ["bdo", "ebrahim"] },
    { id: "Grant Thornton", aliases: ["grant thornton", "gt", "gth"] },
    { id: "Crowe Hussain Chaudhury", aliases: ["crowe", "hussain chaudhury"] },
    { id: "RSM Awais Hyder", aliases: ["rsm", "awais hyder"] },
    { id: "Baker Tilly", aliases: ["baker tilly", "mehmood idrees", "Bakertilly", "BT"] },
    { id: "HLB Ijaz Tabussum", aliases: ["hlb", "ijaz tabussum", "ijaz tabassum"] },
    { id: "Ilyas Saeed & Co", aliases: ["ilyas saeed", "isc"] },
    { id: "Riaz Ahmad & Co", aliases: ["riaz ahmad", "rac"] },
    { id: "BKR Ansari", aliases: ["bkr", "ansari"] },
    { id: "UHY Hassan Naeem", aliases: ["uhy", "hassan naeem"] },
    { id: "Muniff Ziauddin", aliases: ["muniff", "mz", "ziauddin"] },
    { id: "Hameed Zahid & Co", aliases: ["hameed zahid", "hz & co"] },
    { id: "Amir Alam Khan & Co", aliases: ["amir alam khan", "amir alam"] },
    { id: "Tariq Abdul Ghani Maqbool", aliases: ["tagm", "tariq abdul ghani"] },
    { id: "Fazal Mahmood & Co", aliases: ["fazal mahmood", "fazal mehmood"] },
    { id: "Faruq Ali & Co", aliases: ["faruq ali", "farooq ali"] },
    { id: "Parker Russell", aliases: ["parker russell"] },
    { id: "Zahid Jamil & Co", aliases: ["zahid jamil"] },
    { id: "Rahman Sarfaraz Rahim Iqbal Rafiq", aliases: ["rahman sarfaraz", "rahman sarfraz", "rsrir", "rsririr"] },
    { id: "Russell Bedford", aliases: ["russell bedford"] },
    { id: "Axiom World", aliases: ["axiom world", "axiom"] },
    { id: "EUSOL (Odoo Partner)", aliases: ["eusol", "odoo", "odoo gold partner", "eusol (odoo gold partner)"] },
    { id: "PKF F.R.A.N.T.S.", aliases: ["pkf", "frants", "pkf-frants", "pkf frants"] },
    { id: "Reanda Haroon Zakaria", aliases: ["reanda", "reanda haroon", "haroon zakaria"] }
];

// Helper function to get clean firm name
function getCleanFirmName(text, existingFirm) {
    let lowerText = text.toLowerCase();
    let firm = existingFirm || "Unspecified Firm";
    
    for (let f of FIRM_MAPPINGS) {
        if (f.aliases.some(alias => new RegExp(`\\b${alias}\\b`, 'i').test(lowerText))) {
            firm = f.id;
            break;
        }
    }
    return firm;
}

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
let globalSessionCount = 0; // 🔥 Track sessions globally to prevent bypass
let hasTriggeredWrapUp = false; // 🔥 Auto wrap-up flag
let currentPartnerAudio = null; // 🔥 For Audio Stream Control
let globalUserId = null; // 🔥 Safely track User ID
let globalSubVal = null; // 🔥 Store raw subscription value securely

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
        globalUserId = user.uid; // Store it securely before any timeouts
        onSnapshot(roomDocRef, (docSnap) => {
            if (docSnap.exists()) {
                serverState = docSnap.data();
                updateLobbyStatus();
            }
        }, (error) => {
            console.warn("Room listener error (Check Firebase Rules):", error);
        });

        // 🔥 REAL-TIME SESSION COUNTER LISTENER 🔥
        const userRef = doc(db, "users", user.uid);
        onSnapshot(userRef, (userSnap) => {
            if (userSnap.exists()) {
                let subs = userSnap.data().subscriptions || {};
                let subVal = subs['mock_interview'];
                globalSubVal = subVal; // Cache it globally for instant deduction
                let sCount = 3; // 🔥 FIX: Match security.js default to prevent Desync Illusion
                if (typeof subVal === 'string' && subVal.includes(',')) {
                    sCount = parseInt(subVal.split(',')[1], 10);
                } else if (!isNaN(subVal) && subVal !== false && subVal !== "") {
                    sCount = Number(subVal);
                }
                
                const badge = document.getElementById('sessions-badge');
                const countEl = document.getElementById('sessions-count');
                if (badge && countEl) {
                    badge.style.display = 'flex';
                    countEl.innerText = sCount;
                    // Warn if low sessions
                countEl.style.color = sCount <= 0 ? '#ef4444' : (sCount <= 2 ? '#f59e0b' : '#38bdf8');
            }

            globalSessionCount = sCount; // Update global state
            
            // 🔥 REAL-TIME BUTTON LOCK IF SESSIONS REACH 0 🔥
            const btn = document.getElementById('start-interview-btn');
            const statusMsg = document.getElementById('lobby-status');
            if (sCount <= 0) {
                if (btn) {
                    btn.disabled = true;
                    btn.innerText = "Sessions Exhausted";
                    btn.style.background = "#ef4444";
                }
                if (statusMsg && !isInterviewActive) {
                    statusMsg.style.color = "#ef4444";
                    statusMsg.innerText = "⚠️ You have 0 sessions left. Please renew your access from the dashboard.";
                }
            } else {
                if (btn && btn.innerText === "Sessions Exhausted") {
                    btn.disabled = false;
                    btn.innerText = "Join Interview Room";
                    btn.style.background = "";
                }
                }
            }
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

// 🔥 PRE-FLIGHT API CHECK (SMART JUGAR) 🔥
async function checkPartnerAvailability() {
    try {
        const response = await fetch("/api/interview", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "ping" })
        });
        if (response.ok) return true;
    } catch(e) {}
    return false; // All keys hit limit
}

document.getElementById('start-interview-btn').addEventListener('click', async () => {
    const name = document.getElementById('candidate-name').value.trim();
    updateLobbyStatus(); // re-check
    const firm = document.getElementById('target-firm').value;
    const cvFile = document.getElementById('cv-upload').files[0];
    const statusMsg = document.getElementById('lobby-status');

    if (globalSessionCount <= 0) {
        statusMsg.style.color = "#ef4444";
        return statusMsg.innerText = "⚠️ You have 0 sessions left. Please renew your access from the dashboard.";
    }

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
            const lastActive = snap.data().last_active ? snap.data().last_active.toMillis() : 0;
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
        
        // 🔥 FETCHING LIVE FIRM INTELLIGENCE (SUPER PROMPT DATA) 🔥
        statusMsg.innerText = "⏳ Fetching Firm's Live Interview History...";
        let firmHistoryText = "No specific recent feedback available. Proceed with general firm technicals.";
        try {
            const fbRes = await fetch('https://caversity-48b29-default-rtdb.firebaseio.com/feedbacks.json');
            const fbData = await fbRes.json();
            if (fbData) {
                const now = Date.now();
                const SIXTY_DAYS = 60 * 24 * 60 * 60 * 1000;
                let recentQuestions = [];
                
               Object.values(fbData).forEach(item => {
                    if (!item || !item.message) return;
                    let msgLow = item.message.toLowerCase();
                    
                    // 🛑 STRICT FILTERS (Same as Firm Hub)
                    if (msgLow.includes("channel") || msgLow.includes("feedback share") || msgLow.includes("cv accepted") || msgLow.includes("induction alert")) {
                        return; // Skip these messages entirely
                    }
                    
                    // Strict Firm-Hub Filtering
                    let isFeedback = msgLow.includes("gave interview") || msgLow.includes("asked questions") || msgLow.includes("interview experience") || msgLow.includes("penalist") || msgLow.includes("interview feedback") || msgLow.includes("gave test");
                    
                    if (isFeedback) {
                        let cleanFirm = getCleanFirmName(item.message, item.firm);
                        
                        // Check if this feedback belongs to the Target Firm selected by user
                        if (cleanFirm === firm && item.timestamp && (now - item.timestamp <= SIXTY_DAYS)) {
                            recentQuestions.push(item.message.replace(/\*/g, '').trim());
                        }
                    }
                });
                
                if (recentQuestions.length > 0) {
                    firmHistoryText = recentQuestions.join("\n---\n");
                }
            }
        } catch(e) { console.warn("Live DB Fetch error:", e); }

        // 🔥 SMART JUGAR: Pre-flight Limit Check before entering room 🔥
        statusMsg.innerText = "⏳ Checking Partner's Schedule...";
        const isPartnerFree = await checkPartnerAvailability();
        if (!isPartnerFree) {
            statusMsg.style.color = "#f59e0b"; // Warning Orange
            return statusMsg.innerText = "⚠️ The Partner is currently occupied with another interview. Please try joining again after 30 to 60 minutes.";
        }

        // Acquire Room Lock
        await setDoc(roomDocRef, {
            is_busy: true,
            current_student: name,
            student_id: globalUserId, // 🔥 SECURITY: Link lock to user ID
            last_active: serverTimestamp()
        });

        candidateData = { name, firm, cvText, firmHistory: firmHistoryText };
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
// 🖨️ SMART PDF GENERATOR (No Browser Headers)
// ==========================================
window.downloadReportPDF = function() {
    const element = document.querySelector('.official-paper');
    const btn = document.querySelector('.eval-actions button');
    const oldHtml = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    btn.disabled = true;

    // Force exact dimensions for perfect PDF capture
    const originalWidth = element.style.width;
    const originalMaxWidth = element.style.maxWidth;
    element.style.width = '794px';
    element.style.maxWidth = '794px';

    const opt = {
        margin:       0,
        filename:     `${candidateData.name ? candidateData.name.replace(/\s+/g, '_') : 'Candidate'}_Assessment_Report.pdf`,
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        btn.innerHTML = oldHtml;
        btn.disabled = false;
        element.style.width = originalWidth;
        element.style.maxWidth = originalMaxWidth;
    }).catch(err => {
        console.error("PDF generation failed:", err);
        btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
        setTimeout(() => { btn.innerHTML = oldHtml; btn.disabled = false; }, 3000);
        element.style.width = originalWidth;
        element.style.maxWidth = originalMaxWidth;
    });
};

// ==========================================
// 🎥 INTERVIEW ROOM LOGIC
// ==========================================

function startInterviewRoom() {
    document.getElementById('lobby-screen').classList.remove('active-screen');
    document.getElementById('interview-screen').classList.add('active-screen');
    document.getElementById('partner-name').innerText = `Partner (${candidateData.firm.toUpperCase()})`;
    isInterviewActive = true;
    hasTriggeredWrapUp = false;

    // 🔥 DEDUCT ONE SESSION FROM FIREBASE 🔥
    if (globalUserId && globalSubVal) {
        let dStr = globalSubVal;
        let sCount = 3;
        
        if (typeof globalSubVal === 'string' && globalSubVal.includes(',')) {
            let parts = globalSubVal.split(',');
            dStr = parts[0];
            sCount = parseInt(parts[1], 10) || 3;
        } else if (typeof globalSubVal === 'string' && isNaN(globalSubVal)) {
            dStr = globalSubVal;
            sCount = 3;
        } else if (!isNaN(globalSubVal) && globalSubVal !== false && globalSubVal !== "") {
            sCount = Number(globalSubVal);
            dStr = "2099-12-31";
        }
        
        if (sCount > 0) {
            const newSubVal = `${dStr},${sCount - 1}`;
            const userRef = doc(db, "users", globalUserId);
            updateDoc(userRef, { "subscriptions.mock_interview": newSubVal })
                .then(() => console.log("✅ Session successfully deducted from Firebase!"))
                .catch(e => console.error("❌ Failed to deduct session:", e));
        }
    }

    // 🔥 Show Instructions Toast 🔥
    const toast = document.getElementById('interview-toast');
    if(toast) {
        toast.classList.add('show');
        setTimeout(() => { toast.classList.remove('show'); }, 15000); // Auto hide after 15 seconds
    }

    // 🔥 HIDE TIMER FRONTEND 🔥
    const timerEl = document.getElementById('call-timer');
    if (timerEl) {
        timerEl.style.display = 'none';
        if (timerEl.parentElement) timerEl.parentElement.style.display = 'none'; 
    }

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
        
        // 🔥 8 MINUTE SMART WRAP-UP TRIGGER 🔥
        if (secondsElapsed === 480 && !hasTriggeredWrapUp) {
            hasTriggeredWrapUp = true;
            interviewMemory.push({
                "role": "system",
                "content": "CRITICAL TIME ALERT: 8 minutes have passed. Start wrapping up the interview naturally. You can ask one final short question or ask if they have any questions for you. Do not drag it. When you are ready to end the call (within the next 1 minute), give your final remarks and you MUST EXACTLY SAY 'That concludes our interview. Goodbye.'"
            });
        }
        
        // 🔥 AUTO-END AT 10 MINUTES 🔥
        if (secondsElapsed >= 600 && !synth.speaking && isInterviewActive) {
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
            is_busy: false, current_student: null, student_id: null, last_active: serverTimestamp()
        }).catch(e => console.warn("Background lock release failed", e));
    }
});

async function endInterview() {
    isInterviewActive = false;
    clearInterval(timerInterval);
    clearTimeout(absoluteSilenceTimer);
    clearTimeout(speechPauseTimer);
    synth.cancel(); // Stop speaking
    if (currentPartnerAudio) {
        currentPartnerAudio.pause();
        currentPartnerAudio.currentTime = 0;
        currentPartnerAudio = null;
    }
    const stream = document.getElementById('user-webcam').srcObject;
    if(stream) {
        stream.getTracks().forEach(track => { track.stop(); track.enabled = false; });
        document.getElementById('user-webcam').srcObject = null;
    }
    
    // Release Lock
    setDoc(roomDocRef, {
        is_busy: false,
        current_student: null,
        student_id: null,
        last_active: serverTimestamp()
    }).catch(e => console.warn("Failed to release lock", e));

    // Switch to Dashboard
    document.getElementById('interview-screen').classList.remove('active-screen');
    document.getElementById('evaluation-screen').classList.add('active-screen');
    
    // Set Report Header Data
    document.getElementById('report-candidate-name').innerText = candidateData.name;
    document.getElementById('report-firm-name').innerText = candidateData.firm.toUpperCase();
    document.getElementById('report-date').innerText = new Date().toLocaleDateString('en-GB');
    
    // 🔥 Screen change hotay hi smoothly TOP par scroll karega 🔥
    window.scrollTo({ top: 0, behavior: 'smooth' });

    await generateEvaluationReport();
}

window.endInterview = endInterview; // Export for HTML onclick

// ==========================================
// 📊 EVALUATION REPORT ENGINE
// ==========================================
async function generateEvaluationReport() {
    
    try {
        const reply = await askGroqWithFallback('evaluate');
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
    // System prompt and personality are securely injected by the Vercel Backend now.
    // This keeps the frontend memory clean.
}

// Expose for voice load
speechSynthesis.onvoiceschanged = () => { window.availableVoices = speechSynthesis.getVoices(); };

async function askGroqWithFallback(action = 'chat') {
    const subtitle = document.getElementById('subtitle-box');
    if (subtitle && action === 'chat') subtitle.innerText = "Partner is reviewing...";
    
    try {
        const response = await fetch("/api/interview", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action: action,
                candidateData: candidateData,
                messages: interviewMemory
            })
        });

        const data = await response.json();
        if(data.error) throw new Error(data.error);
        return data.reply;
    } catch (error) {
        console.error("API Call Failed:", error);
        return "I just received an urgent message regarding a critical client issue. We will have to wrap this interview up immediately.";
    }
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
    // Add a natural delay (pretending to read CV) before speaking
    document.getElementById('subtitle-box').innerText = "Partner is reviewing your profile...";
    setTimeout(async () => {
        const reply = await askGroqWithFallback();
        setTimeout(() => speakResponse(reply), 1000);
    }, 3500); // Wait 3.5 seconds before the first interaction
}

function speakWithBrowserVoice(text, onAudioEnd) {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    
    // 🔥 Strict Professional English Voice 🔥
    let bestVoice = voices.find(v => v.name.includes('Google UK English Male') || v.name.includes('Microsoft Mark') || v.name.includes('Microsoft Guy') || (v.lang.startsWith('en') && v.name.includes('Male')));
    if (bestVoice) utterance.voice = bestVoice;
    
    const lowerText = text.toLowerCase();
    if (lowerText.includes('unprofessional') || lowerText.includes('ending this interview') || lowerText.includes('disrespect')) {
        utterance.pitch = 0.25; utterance.rate = 0.9;
    } else if (text.includes('!') || text.includes('?')) {
        utterance.pitch = 0.45; utterance.rate = 0.95;
    } else {
        utterance.pitch = 0.6; utterance.rate = 0.85;
    }
    
    utterance.onend = onAudioEnd;
    synth.speak(utterance);
}

async function speakResponse(text) {
    let cleanText = text;
    let isTerminated = false;
    const termRegex = /\[INTERVIEW TERMINATED\]/ig;
    if (termRegex.test(cleanText)) {
        isTerminated = true;
        cleanText = cleanText.replace(termRegex, "").trim();
    }

    document.getElementById('subtitle-box').innerText = cleanText;
    document.querySelector('.ai-video').classList.add('ai-speaking');
    
    const lowerText = cleanText.toLowerCase();
    const isTimeUpOrEnding = isTerminated || secondsElapsed >= 600 || lowerText.includes("technical issue") || lowerText.includes("ending this interview") || lowerText.includes("wrap this up") || lowerText.includes("concludes our interview") || (hasTriggeredWrapUp && lowerText.includes("goodbye"));

    const onAudioEnd = () => {
        document.querySelector('.ai-video').classList.remove('ai-speaking');
        interviewMemory.push({ "role": "assistant", "content": text });
        appendToTranscript('assistant', cleanText); // Add clean text to Sidebar
        if (isInterviewActive) {
            // 🔥 AUTO-CUT CALL LOGIC 🔥
            if (isTimeUpOrEnding) {
                setTimeout(endInterview, 1000); // Cut the call if angry or time's up
            } else {
                startAutoListening(); // 🔥 AI finished, turn Mic ON
            }
        }
    };
    
    // 🔥 COMPLETELY REMOVED EXTERNAL HUGGING FACE LINKS 🔥
    // ALWAYS USE FAST NATIVE BROWSER VOICES
    speakWithBrowserVoice(cleanText, onAudioEnd);
}
// 🔥 AUTOMATIC HANDS-FREE MIC LOGIC 🔥
function startAutoListening() {
    if (!isInterviewActive || synth.speaking) return;

    isMicOpen = true;
    finalAnswer = ""; // Reset answer text
    document.getElementById('subtitle-box').innerText = "Listening... (Click 'Send' when done)";

    const helper = document.getElementById('mic-helper');
    if(helper) {
        helper.style.display = 'none'; // 🔥 Hide "Click Mic to Send" completely
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

// ==========================================
// 🔥 AUTO-LOAD FIRMS & SELECT TARGET FIRM (DIRECT FIREBASE)
// ==========================================
document.addEventListener("DOMContentLoaded", async () => {
    const dropdown = document.getElementById('target-firm');
    if (!dropdown) return;

    dropdown.innerHTML = '<option value="">Fetching live firms from database...</option>';

    try {
        const fbRes = await fetch('https://caversity-48b29-default-rtdb.firebaseio.com/feedbacks.json');
        const fbData = await fbRes.json();
        
        let interviewFirms = new Set();
      if (fbData) {
            Object.values(fbData).forEach(item => {
                if (!item || !item.message) return;
                
                let msgLow = item.message.toLowerCase();
                
                // 🛑 STRICT FILTERS (Same as Firm Hub)
                if (msgLow.includes("channel") || msgLow.includes("feedback share") || msgLow.includes("cv accepted") || msgLow.includes("induction alert")) {
                    return; // Skip these messages entirely
                }
                
                // 🔥 THE EXACT FIRM-HUB LOGIC (Only Feedback Allowed) 🔥
                let isFeedback = msgLow.includes("gave interview") || msgLow.includes("asked questions") || msgLow.includes("interview experience") || msgLow.includes("penalist") || msgLow.includes("interview feedback") || msgLow.includes("gave test");
                
                if (isFeedback) {
                    let cleanFirm = getCleanFirmName(item.message, item.firm);
                    if (cleanFirm !== "Unspecified Firm") {
                        interviewFirms.add(cleanFirm);
                    }
                }
            });
        }

        let activeFirmsArray = Array.from(interviewFirms).sort();

        dropdown.innerHTML = '';
        if (activeFirmsArray.length === 0) {
            dropdown.innerHTML = '<option value="">No recent interview data available</option>';
        } else {
            activeFirmsArray.forEach(firm => {
                let opt = document.createElement('option');
                opt.value = firm;
                opt.innerHTML = firm;
                dropdown.appendChild(opt);
            });
        }

        // Auto-Select Firm if coming from Portal
        let pendingFirm = localStorage.getItem('targetFirm');
        if (pendingFirm) {
            let found = Array.from(dropdown.options).some((opt, i) => {
                if (opt.value.toLowerCase().includes(pendingFirm.toLowerCase()) || pendingFirm.toLowerCase().includes(opt.value.toLowerCase())) { 
                    dropdown.selectedIndex = i; return true; 
                }
                return false;
            });
            if (!found) { 
                let opt = document.createElement('option'); opt.value = pendingFirm; opt.innerHTML = pendingFirm; opt.selected = true; dropdown.appendChild(opt); 
            }
            localStorage.removeItem('targetFirm');
        }
    } catch(e) {
        console.warn("Firebase firm load error:", e);
        dropdown.innerHTML = '<option value="">Error loading firms. Please type manually.</option>';
    }
});
