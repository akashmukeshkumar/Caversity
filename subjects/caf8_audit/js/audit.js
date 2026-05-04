import { auditData as shuffledAuditData } from '../assets/concept.js';

// =========================================
// 💡 CONCEPT RECALL SYSTEM
// =========================================
const RECALL_INTERVAL = 30 * 60 * 1000; // 30 Mins
let currentRecall = {};

function initRecallSystem() {
    if (!shuffledAuditData || shuffledAuditData.length === 0) {
        const titleEl = document.getElementById('recall-title');
        if(titleEl) titleEl.innerText = "Data Error";
        return;
    }
    updateRecallContent();
    setInterval(updateRecallTimer, 1000);
}

function updateRecallContent() {
    const now = Date.now();
    const blockIndex = Math.floor(now / RECALL_INTERVAL);
    const uniqueIndex = (blockIndex * 7919) % shuffledAuditData.length;
    
    currentRecall = shuffledAuditData[uniqueIndex];

    const titleEl = document.getElementById('recall-title');
    const shortEl = document.getElementById('recall-short');
    const detailBox = document.getElementById('recall-detail-box');
    const btn = document.getElementById('recall-btn');

    if(titleEl) titleEl.style.opacity = 0; 
    if(shortEl) shortEl.style.opacity = 0;
    
    setTimeout(() => {
        if(titleEl) titleEl.innerText = currentRecall.title;
        if(shortEl) shortEl.innerText = currentRecall.concept;
        if(detailBox) detailBox.innerHTML = currentRecall.detail;
        
        if(titleEl) titleEl.style.opacity = 1; 
        if(shortEl) shortEl.style.opacity = 1;
        
        if(detailBox) detailBox.style.display = 'none';
        if(btn) btn.innerHTML = `View Detail <i class="fas fa-chevron-down"></i>`;
        
        if(btn) {
            if (!currentRecall.detail || currentRecall.detail.trim() === "") {
                btn.style.display = 'none';
            } else {
                btn.style.display = 'inline-flex';
            }
        }
    }, 300);
}

function updateRecallTimer() {
    const now = Date.now();
    const nextTarget = Math.ceil(now / RECALL_INTERVAL) * RECALL_INTERVAL;
    const diff = nextTarget - now;

    if (diff <= 1000) updateRecallContent(); 

    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    const display = document.getElementById('concept-timer-display');
    if(display) display.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
}

function toggleRecallDetail() {
    const box = document.getElementById('recall-detail-box');
    const btn = document.getElementById('recall-btn');
    if(box && btn) {
        if (box.style.display === 'block') {
            box.style.display = 'none';
            btn.innerHTML = `View Detail <i class="fas fa-chevron-down"></i>`;
        } else {
            box.style.display = 'block';
            btn.innerHTML = `Hide Detail <i class="fas fa-chevron-up"></i>`;
        }
    }
}

// =========================================
// 🕵️ PROCEDURE SPRINT SYSTEM
// =========================================
const JSON_URL = 'subjects/caf8_audit/assets/procedure.json'; 
let productionDb = []; 
const SUB_INTERVAL = 30 * 60 * 1000; // 30 Mins

async function initSubstantive() {
    try {
        const response = await fetch(JSON_URL);
        if (!response.ok) throw new Error("Network response was not ok");
        productionDb = await response.json();
        updateSubContent();
        setInterval(updateSubTimer, 1000);
    } catch (error) {
        console.error("Error loading JSON:", error);
        const el = document.getElementById('sub-scenario-text');
        if(el) el.innerText = "Data load nahi ho raha. Check substantive.json file.";
    }
}

function updateSubContent() {
    if(!productionDb || productionDb.length === 0) return;
    const now = Date.now();
    const blockIndex = Math.floor(now / SUB_INTERVAL);
    const uniqueIndex = (blockIndex * 8191) % productionDb.length;
    const data = productionDb[uniqueIndex];

    const badgeEl = document.getElementById('sub-industry-badge');
    const scenarioEl = document.getElementById('sub-scenario-text');
    const procList = document.getElementById('sub-procedures-list');
    const examinerEl = document.getElementById('sub-examiner-text');
    const detailBox = document.getElementById('sub-detail-box');
    const btn = document.getElementById('sub-btn');

    if(badgeEl) badgeEl.innerText = data.industry;
    if(scenarioEl) scenarioEl.innerText = data.scenario;
    if(examinerEl) examinerEl.innerText = data.examiner_comment;
    
    if(procList) {
        procList.innerHTML = '';
        data.procedures.forEach(proc => { procList.innerHTML += `<li>${proc}</li>`; });
    }
    if(detailBox) detailBox.style.display = 'none';
    if(btn) btn.innerHTML = `Check Answer <i class="fas fa-chevron-down"></i>`;
}

function updateSubTimer() {
    const now = Date.now();
    const nextTarget = Math.ceil(now / SUB_INTERVAL) * SUB_INTERVAL;
    const diff = nextTarget - now;

    if (diff <= 1000) updateSubContent();

    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    const display = document.getElementById('sub-timer-display');
    if(display) display.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
}

function toggleSubDetail() {
    const box = document.getElementById('sub-detail-box');
    const btn = document.getElementById('sub-btn');
    if(box && btn) {
        if (box.style.display === 'block') {
            box.style.display = 'none';
            btn.innerHTML = `Check Answer <i class="fas fa-chevron-down"></i>`;
        } else {
            box.style.display = 'block';
            btn.innerHTML = `Hide Answer <i class="fas fa-chevron-up"></i>`;
        }
    }
}

// =========================================
// 🎬 CINEMA / TEASER
// =========================================
function enterCinema() {
    const token = localStorage.getItem("session_token");
    if (token) window.location.href = "audit-cinema.html";
    else alert("🔒 Access Denied!\nPlease Login first to enter the Audit Archive.");
}

function tryEnterCinema() {
    const token = localStorage.getItem("session_token");
    if (token) window.location.href = "audit-cinema.html";
    else {
        alert("🔒 Access Denied!\nPlease Login first to enter the Audit Archive.");
        window.location.replace("login.html");
    }
}

function applyMobileFix() {
    if (window.innerWidth <= 768) {
        const wrapper = document.querySelector('.acu-wrapper');
        const content = document.querySelector('.acu-content');
        const visual = document.querySelector('.acu-visual');
        const heading = document.querySelector('.acu-heading');
        const startBtn = document.querySelector('.btn-acu-start');

        if (wrapper) { wrapper.style.display = 'flex'; wrapper.style.flexDirection = 'column'; wrapper.style.background = '#ffffff'; wrapper.style.borderRadius = '15px'; wrapper.style.padding = '10px'; wrapper.style.backdropFilter = 'none'; }
        if (content) { content.style.padding = '30px 20px'; content.style.textAlign = 'center'; }
        if (visual) { visual.style.display = 'none'; }
        if (heading) { heading.style.fontSize = '1.8rem'; heading.style.lineHeight = '1.2'; }
        if (startBtn) { startBtn.style.width = '100%'; startBtn.style.justifyContent = 'center'; }
    }
}

// =========================================
// 📜 EXAM SIMULATOR
// =========================================
const GPT_LINK = "https://chatgpt.com/g/g-693edbc115288191b7d6c2d11bd622b8-audit-by-akash-kumar-q-a-only";
const READING_TIME_SEC = 15 * 60; 
const WRITING_TIME_SEC = 3 * 60 * 60; 
let timer, timeLeft, currentPaper;

function showGuide() { alert("📝 SUBMISSION STEPS:\n\n1. Complete your paper.\n2. Click 'Finish Exam'.\n3. Answers will be COPIED.\n4. ChatGPT will open.\n5. Paste (Ctrl+V) and Enter."); }

function startExam(id) {
    if(!confirm("⚠️ Rules:\n1. 15 Mins Reading (Locked)\n2. 3 Hours Writing\n3. Submit -> Auto Copy -> Open GPT")) return;
    
    currentPaper = id;
    document.getElementById('exam-dashboard').classList.add('hidden');
    document.getElementById('exam-hall').classList.remove('hidden');
    
    const pdfFrame = document.getElementById('paper-view');
    let explicitPdf = typeof pastPapers !== 'undefined' && pastPapers[id] && pastPapers[id].pdf ? pastPapers[id].pdf : null;
    
    // 🔥 Relevant PDF linking logic
    let generatedPath = explicitPdf ? explicitPdf : `subjects/caf8_audit/assets/pastpapers/${id}.pdf`;
    let finalPdfPath = encodeURI(generatedPath); // Allows spaces safely (e.g. "Autumn 2025")
    
    if(finalPdfPath) {
        pdfFrame.innerHTML = `<iframe src="${finalPdfPath}" width="100%" height="100%" style="border:none;"></iframe>`;
    } else {
        pdfFrame.innerHTML = `<div style="text-align:center; padding:50px; color:white;"><h3>PDF Not Found</h3><p>Ensure '${id}.pdf' is in 'subjects/caf8_audit/assets/pastpapers' folder.</p></div>`;
    }

    const ansDiv = document.getElementById('answer-view');
    ansDiv.innerHTML = '';
    if(typeof pastPapers !== 'undefined' && pastPapers[id]) {
        pastPapers[id].questions.forEach((q, i) => {
            ansDiv.innerHTML += `<div style="margin-top:20px; border-bottom:2px solid #e2e8f0; padding-bottom:5px; margin-bottom:10px;"><h3 style="color:#1e3a8a; margin:0;">HW ${q.id}: ${q.header}</h3></div>`;
            if(q.parts && q.parts.length > 0) {
                q.parts.forEach((part, partIndex) => {
                    ansDiv.innerHTML += `<div class="answer-box"><label style="font-weight:600; font-size:14px; color:#475569;">${part.label}</label><textarea id="ans-${i}-${partIndex}" class="locked" placeholder="Reading Time..." disabled></textarea></div>`;
                });
            } else {
                ansDiv.innerHTML += `<div class="answer-box"><label style="font-weight:600; font-size:14px; color:#475569;">Answer</label><textarea id="ans-${i}-0" class="locked" placeholder="Reading Time..." disabled></textarea></div>`;
            }
        });
    }

    timeLeft = READING_TIME_SEC;
    updateTimerDisplay();
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if(timeLeft <= 0) startWriting();
    }, 1000);
}

function startWriting() {
    clearInterval(timer);
    alert("🔔 WRITING TIME STARTED!");
    const badge = document.getElementById('phase-badge');
    if(badge) { badge.innerText = "WRITING TIME"; badge.style.background = "#22c55e"; }
    
    document.querySelectorAll('textarea').forEach(t => {
        t.disabled = false;
        t.classList.remove('locked');
        t.placeholder = "Type your answer here...";
    });

    timeLeft = WRITING_TIME_SEC;
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if(timeLeft <= 0) submitPaper();
    }, 1000);
}

function updateTimerDisplay() {
    let h = Math.floor(timeLeft / 3600);
    let m = Math.floor((timeLeft % 3600) / 60);
    let s = timeLeft % 60;
    const disp = document.getElementById('exam-timer');
    if(disp) disp.innerText = `${h}:${m<10?'0'+m:m}:${s<10?'0'+s:s}`;
}

function submitPaper() {
    clearInterval(timer);
    const today = new Date();
    const date = String(today.getDate()).padStart(2, '0');
    const dayIndex = today.getDay();
    const letters = ["A", "B", "C", "D", "E", "F", "G"];
    const secretLetter = letters[dayIndex];
    const dailyCode = "AUDIT" + date + secretLetter;

    let attemptName = pastPapers[currentPaper].title;
    let finalText = `🔑 ACCESS CODE: ${dailyCode}\n\n`;
    finalText += `Please grade this attempt based on your knowledge base.\n`;
    finalText += `📂 PAPER: ${attemptName}\n====================================\n\n`;

    pastPapers[currentPaper].questions.forEach((q, i) => {
        finalText += `📝 HW ${q.id} - ${q.header}\n`;
        if(q.parts && q.parts.length > 0) {
            q.parts.forEach((part, partIndex) => {
                let el = document.getElementById(`ans-${i}-${partIndex}`);
                let val = el ? el.value.trim() : "";
                finalText += `   ▶ ${part.label}:\n   ${val || "(Not Attempted)"}\n\n`;
            });
        } else {
            let el = document.getElementById(`ans-${i}-0`);
            let val = el ? el.value.trim() : "";
            finalText += `   ▶ Answer:\n   ${val || "(Not Attempted)"}\n\n`;
        }
        finalText += `------------------------------------\n`;
    });

    navigator.clipboard.writeText(finalText).then(() => {
        if(confirm("✅ ANSWERS & CODE COPIED!\n\n1. ChatGPT is opening...\n2. Paste (Ctrl+V) -> The Code is at the top.\n3. Press Enter to check.")) {
            window.open(GPT_LINK, '_blank');
            location.reload();
        }
    }).catch(() => alert("⚠️ Copy Failed! Copy manually."));
}

function updateAccessCode() {
    const today = new Date();
    const date = String(today.getDate()).padStart(2, '0');
    const dayIndex = today.getDay(); 
    const letters = ["A", "B", "C", "D", "E", "F", "G"];
    const secretLetter = letters[dayIndex];
    const finalCode = "AUDIT" + date + secretLetter;
    const codeElement = document.getElementById("dynamic-code");
    if(codeElement) codeElement.innerText = finalCode;
}
function copyCode() {
    const codeElement = document.getElementById("dynamic-code");
    if(!codeElement) return;
    navigator.clipboard.writeText(codeElement.innerText).then(() => {
        const msg = document.getElementById("copy-msg");
        if(msg) {
            msg.style.opacity = "1";
            setTimeout(() => { msg.style.opacity = "0"; }, 2000);
        }
    });
}

// =========================================
// 🧠 AUTO AUDIT DOSE
// =========================================
const AUDIT_DOSE_INTERVAL = 30 * 60 * 1000; 

function initAutoAudit() {
    if (typeof auditData === 'undefined' || !auditData.length) {
        console.error("Audit Data not loaded for MCQs");
        return;
    }
    updateScenario(); 
    setInterval(updateTimer, 1000); 
}

function updateScenario() {
    if(typeof auditData === 'undefined' || !auditData.length) return;
    const now = Date.now();
    const blockIndex = Math.floor(now / AUDIT_DOSE_INTERVAL);
    const qIndex = (blockIndex * 7351) % auditData.length;
    const q = auditData[qIndex];

    const qElement = document.getElementById('audit-question');
    if(!qElement) return;
    
    const currentId = qElement.getAttribute('data-q-id');
    if(currentId == qIndex) return;

    let cleanText = q.q.replace(/^Scenario:\s*/i, '').replace(/^Scenario\s+/i, '').replace(/Question:\s*/i, '');
    qElement.setAttribute('data-q-id', qIndex);
    qElement.innerHTML = cleanText; 

    const optContainer = document.getElementById('audit-options');
    if(optContainer) {
        optContainer.innerHTML = '';
        const expl = document.getElementById('audit-explanation');
        if(expl) expl.classList.add('hidden');

        q.options.forEach((opt, idx) => {
            const btn = document.createElement('div');
            btn.className = 'audit-opt-btn';
            btn.innerHTML = `<span style="color:#2563eb; font-weight:bold; margin-right:10px;">${String.fromCharCode(65+idx)}.</span> ${opt}`;
            
            btn.onclick = () => {
                const all = document.querySelectorAll('.audit-opt-btn');
                all.forEach(b => b.style.pointerEvents = 'none'); 
                
                if(idx === q.ans) {
                    btn.classList.add('correct');
                    btn.innerHTML += ` <i class="fas fa-check" style="float:right; color:#15803d;"></i>`;
                } else {
                    btn.classList.add('wrong');
                    btn.innerHTML += ` <i class="fas fa-times" style="float:right; color:#b91c1c;"></i>`;
                    if(all[q.ans]) {
                        all[q.ans].classList.add('correct');
                        all[q.ans].innerHTML += ` <i class="fas fa-check" style="float:right; color:#15803d;"></i>`;
                    }
                }
                const expText = document.getElementById('exp-text');
                if(expText) expText.innerText = q.exp;
                if(expl) expl.classList.remove('hidden');
            };
            optContainer.appendChild(btn);
        });
    }
}

function updateTimer() {
    const now = Date.now();
    const nextTarget = Math.ceil(now / AUDIT_DOSE_INTERVAL) * AUDIT_DOSE_INTERVAL;
    const diff = nextTarget - now;
    if (diff <= 1000) updateScenario(); 
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    const el = document.getElementById('next-update-timer');
    if (el) el.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
}

// =========================================
// 🤖 AI CALL INTERFACE
// =========================================
const API_URL = "https://jzeo123-sir-ai-backend.hf.space";
let studentName = ""; let isCallActive = false; let isRecording = false;
let mediaRecorder; let audioChunks = []; let callTimerInterval, seconds = 0;
let currentCallId = ""; let inactivityTimer; const TIMEOUT_MS = 60000; 
let currentAudio = null;

function openNamePopup() { checkServerStatus(); const m = document.getElementById('call-name-modal'); if(m) m.style.display = 'flex'; }
function saveNameAndStart() {
    const nameVal = document.getElementById('call-name-input').value.trim();
    if(!nameVal) return alert("Please enter your name!");
    studentName = nameVal;
    document.getElementById('call-name-modal').style.display = 'none';
    openCallInterface();
}
async function checkServerStatus() {
    try {
        const res = await fetch(`${API_URL}/`);
        const data = await res.json();
        updateInternalStatus(data.is_busy && data.current_student !== studentName, data.current_student);
    } catch(e) {}
}
function updateInternalStatus(isBusy, talkingTo) {
    const bar = document.getElementById('server-bar'); const dot = document.getElementById('status-dot'); const msg = document.getElementById('server-msg');
    if(!bar || !dot || !msg) return;
    if(isBusy) { dot.className = "dot red"; msg.innerText = `Busy with ${talkingTo}`; bar.style.border = "1px solid #ef4444"; } 
    else { dot.className = "dot green"; msg.innerText = "Online & Available"; bar.style.border = "1px solid #22c55e"; }
}

function openCallInterface() {
    const overlay = document.getElementById('call-overlay');
    if(overlay) overlay.classList.add('active');
    isCallActive = true; currentCallId = "call_" + Date.now();
    
    const status = document.getElementById('call-status');
    const ring = document.getElementById('avatar-ring');
    if(status) status.innerText = `Connecting...`;
    if(ring) ring.classList.add('ringing-pulse');
    
    setTimeout(() => {
        speakDirect(`Hello ${studentName}! I am Caversity AI. How can I help you today?`);
        if(status) status.innerText = "Connected";
        if(ring) ring.classList.remove('ringing-pulse');
        startCallTimer(); resetInactivityTimer();
    }, 2000);
}

async function toggleMic() {
    if (!isCallActive) return;
    resetInactivityTimer();

    const status = document.getElementById('call-status');
    const micBtn = document.getElementById('mic-btn');
    const micIcon = document.getElementById('mic-icon');

    if (!isRecording) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
            mediaRecorder.onstop = sendAudio;
            mediaRecorder.start();
            isRecording = true;
            if(status) status.innerText = "Listening...";
            if(micBtn) micBtn.classList.add('recording');
            if(micIcon) micIcon.className = "fas fa-stop";
        } catch (err) { alert("Mic Access Denied"); }
    } else {
        if (mediaRecorder) mediaRecorder.stop(); 
        isRecording = false;
        if(status) status.innerText = "Thinking...";
        if(micBtn) { micBtn.classList.remove('recording'); micBtn.classList.add('processing'); }
        if(micIcon) micIcon.className = "fas fa-circle-notch";
    }
}

async function sendAudio() {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    const formData = new FormData();
    formData.append("file", audioBlob, "voice.webm");
    formData.append("call_id", currentCallId);
    formData.append("student_name", studentName); 

    const status = document.getElementById('call-status');
    const micBtn = document.getElementById('mic-btn');
    const micIcon = document.getElementById('mic-icon');
    const ring = document.getElementById('avatar-ring');

    try {
        const res = await fetch(`${API_URL}/talk`, { method: "POST", body: formData });
        if (!res.ok) { const errData = await res.json(); throw new Error(errData.error || "Server Busy"); }
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) { const jsonData = await res.json(); throw new Error(jsonData.error || "Unknown Error"); }

        const audioBlobResponse = await res.blob();
        currentAudio = new Audio(URL.createObjectURL(audioBlobResponse));
        
        if(status) status.innerText = "Speaking...";
        if(micBtn) micBtn.classList.remove('processing');
        if(micIcon) micIcon.className = "fas fa-microphone";
        if(ring) ring.classList.add('ringing-pulse');
        
        if (!isCallActive) return; 
        await currentAudio.play();
        currentAudio.onended = () => {
            if(status) status.innerText = "Connected";
            if(ring) ring.classList.remove('ringing-pulse');
            resetInactivityTimer();
        };
    } catch (e) {
        if(status) status.innerText = "Retry: " + e.message;
        if(micBtn) micBtn.classList.remove('processing');
        if(micIcon) micIcon.className = "fas fa-microphone";
    }
}

async function speakDirect(text) {
    try {
        const fd = new FormData();
        fd.append("text", text);
        const res = await fetch(`${API_URL}/speak`, { method: "POST", body: fd });
        if(res.ok) {
            const blob = await res.blob();
            currentAudio = new Audio(URL.createObjectURL(blob));
            if (isCallActive) currentAudio.play();
        }
    } catch(e){}
}

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    if(!isCallActive || isRecording) return;
    inactivityTimer = setTimeout(() => {
        speakDirect(`Okay ${studentName}, I think you are busy. Leaving now.`);
        setTimeout(closeInterface, 4000);
    }, TIMEOUT_MS);
}

function startCallTimer() {
    clearInterval(callTimerInterval);
    seconds = 0;
    callTimerInterval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        const timerEl = document.getElementById('call-timer');
        if(timerEl) timerEl.innerText = `${mins}:${secs}`;
    }, 1000);
}

function closeInterface() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    const overlay = document.getElementById('call-overlay');
    if(overlay) overlay.classList.remove('active');
    
    isCallActive = false;
    clearInterval(callTimerInterval);
    clearTimeout(inactivityTimer);
    
    const fd = new FormData();
    fd.append("call_id", currentCallId);
    fetch(`${API_URL}/reset_memory`, { method: "POST", body: fd }).catch(()=>{});
    
    const status = document.getElementById('call-status');
    if(status) status.innerText = "Disconnected";
}

// =========================================
// 🌟 DOMContentLoaded / INITIALIZATIONS
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Parda Hatana
    const mask = document.getElementById("hero-reveal-mask");
    if(mask) {
        setTimeout(() => {
            mask.style.opacity = "0";
            mask.style.transform = "scale(1.5)";
            setTimeout(() => mask.remove(), 2000); 
        }, 300);
    }

    // 2. Smooth Scrolling Engine (Lenis)
    if(typeof Lenis !== 'undefined') {
        const lenis = new Lenis({ duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);

        // Setup scrolling for nav links
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault(); 
                let currentLockedSection = this.getAttribute('href');
                if(typeof updateHero === 'function') updateHero(tabData[currentLockedSection]);
                navLinks.forEach(a => a.style.color = "#333");
                this.style.color = "#2563eb"; 
                lenis.scrollTo('#hero-landing', { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
            });
        });

        const heroBtn = document.getElementById('hero-action-btn');
        if(heroBtn) {
            heroBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const targetSection = this.getAttribute('data-target');
                if(targetSection) {
                    const targetElement = document.querySelector(targetSection);
                    if(targetElement) lenis.scrollTo(targetElement, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                    else alert("Section ID not found in HTML!");
                }
            });
        }
    }

    // 3. GSAP SCROLL-TRIGGERED REVEALS 
    if(typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        const sections = gsap.utils.toArray('section, .card, .sim-glass-card, .podcast-glass-card, .acu-wrapper, .feedback-container');
        sections.forEach(sec => {
            gsap.from(sec, { scrollTrigger: { trigger: sec, start: "top 85%", toggleActions: "play none none reverse" }, y: 60, opacity: 0, duration: 1.2, ease: "power3.out" });
        });

        const heroTitle = document.querySelector('.hero-title');
        if(heroTitle) {
            gsap.from(heroTitle, { y: 40, opacity: 0, duration: 1.5, ease: "power4.out", delay: 0.3 });
            gsap.from('.hero-subtitle', { y: 20, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.6 });
            gsap.from('.hero-btn', { scale: 0.9, opacity: 0, duration: 1, ease: "back.out(1.7)", delay: 0.9 });
        }
    }

    // 4. Dynamic Visual Tab Content System
    const homeHTML = `<div id="sir-3d-card" style="animation: floatObj 6s infinite alternate ease-in-out;"><div class="sir-main-img" style="display: flex; justify-content: center; align-items: center; background: linear-gradient(135deg, #020617, #1e3a8a);"><i class="fas fa-brain" style="font-size: 110px; color: #38bdf8; filter: drop-shadow(0 0 25px rgba(56, 189, 248, 0.6));"></i></div><div class="premium-float-card float-left" id="float-1" style="animation: floatObj 4s infinite alternate;"><div class="float-header"><div class="float-avatar">A</div><div><div class="float-name">Ali Hassan</div><div class="stars">★★★★★</div></div></div><p class="float-text">"Caversity AI is mind-blowing! Past papers checking is so accurate."</p></div><div class="premium-float-card float-right" id="float-2" style="animation: floatObj 5s infinite alternate-reverse;"><div class="float-header"><div class="float-avatar" style="background: linear-gradient(135deg, #ec4899, #f43f5e);">S</div><div><div class="float-name">Sara Khan</div><div class="stars">★★★★★</div></div></div><p class="float-text">"The cinematic universe made ethics so easy to understand!"</p></div><div class="premium-float-card float-top" id="float-3"><span class="pulse-dot"></span> CA First Attempt</div></div>`;
    function getGlassCard(icon, color, tag1, tag2) { return `<div class="glass-visual-box" style="--glow-color: ${color};"><div class="glass-icon-wrapper"><i class="fas ${icon}"></i></div><div class="glass-tag g-tag-1">⚡ ${tag1}</div><div class="glass-tag g-tag-2">🚀 ${tag2}</div></div>`; }
    
    const tabData = {
       "#hero-landing": { badge: "Welcome to the Ultimate Audit Experience", title: "Empowering Future Auditors.<br><span class='highlight-blue'>Let’s Build Your Success.</span>", sub: "Master CAF 8 Audit with Caversity. AI-powered checking, interactive concepts, and 24/7 support.", btnText: "", btnLink: "", img: "", overlay: "radial-gradient(circle at 50% 50%, #1a367a 0%, #0c1527 70%, #040914 100%)", rightHtml: homeHTML },
        "#gpts-section": { badge: "AI Checking System", title: "Custom <span class='highlight-blue'>Audit GPTs</span>", sub: "Check assignments instantly! Just paste your answers and get expert evaluation from our fine-tuned AI with 100% accuracy.", btnText: "Explore Custom GPTs", btnLink: "#gpts-section", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1920", overlay: "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(76,29,149,0.8))", rightHtml: getGlassCard("fa-robot", "#a855f7", "Instant Feedback", "Zero Wait Time") },
        "#concept-recall-section": { badge: "Spaced Repetition", title: "Concept <span class='highlight-blue'>Recall</span>", sub: "Level up your memory. A brand new, highly important core audit concept drops here every 30 minutes.", btnText: "Learn Concepts", btnLink: "#concept-recall-section", img: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?q=80&w=1920", overlay: "linear-gradient(135deg, rgba(6,78,59,0.9), rgba(15,23,42,0.8))", rightHtml: getGlassCard("fa-lightbulb", "#10b981", "Core Principles", "Deep Explanations") },
        "#audit-dose-section": { badge: "Gamified Testing", title: "30-Min <span class='highlight-blue'>Brain Dose</span>", sub: "Take the ultimate challenge! Automatically rotating MCQ scenarios designed to test your real-world audit logic.", btnText: "Solve MCQs Now", btnLink: "#audit-dose-section", img: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=1920", overlay: "linear-gradient(135deg, rgba(30,58,138,0.9), rgba(15,23,42,0.8))", rightHtml: getGlassCard("fa-brain", "#3b82f6", "Live Scenarios", "Expert Insights") },
        "#procedure-sprint-section": { badge: "Firm-Level Experience", title: "Procedure <br><span class='highlight-blue'>Sprint ⚡</span>", sub: "Think like an ICAP Examiner. Analyze real-world audit scenarios, identify risks, and formulate substantive procedures without spoon-feeding.", btnText: "Start the Sprint", btnLink: "#procedure-sprint-section", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1920", overlay: "linear-gradient(135deg, rgba(67,20,7,0.9), rgba(124,45,18,0.8))", rightHtml: getGlassCard("fa-bolt", "#ea580c", "110+ Scenarios", "Examiner Mindset") },
        "#acu-teaser-section": { badge: "Visual Learning", title: "Audit <span class='highlight-blue'>Cinematic Universe</span>", sub: "Ditch the boring books. Watch and experience Ethics, Risk, and Fraud just like you're binging a Netflix series.", btnText: "Enter the Cinema", btnLink: "#acu-teaser-section", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1920", overlay: "linear-gradient(135deg, rgba(30,58,138,0.9), rgba(49,46,129,0.8))", rightHtml: getGlassCard("fa-film", "#3b82f6", "Season 1 Live", "HD Visuals") },
        "#podcast-section": { badge: "Audio Masterclass", title: "Audit <span class='highlight-blue'>Unplugged</span>", sub: "Plug in and master Audit on the go. Actionable cheat codes, drafting secrets, and real-world fraud breakdowns.", btnText: "Start Listening", btnLink: "#podcast-section", img: "https://images.unsplash.com/photo-1588591795084-1770cb3be374?q=80&w=1920", overlay: "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(0,198,255,0.3))", rightHtml: getGlassCard("fa-podcast", "#00c6ff", "15 Min Episodes", "Real Tricks") },
        "#skeptics-sanctum-section": { badge: "Classified Past Paper Intelligence", title: "Skeptic’s <br><span class='highlight-blue'>Sanctum</span>", sub: "Access the ultimate archive of examiner patterns. No stories, just raw intelligence—scan past papers, decrypt hidden traps, and master the logic of every ICAP attempt.", btnText: "Access Intelligence Hub", btnLink: "#skeptics-sanctum-section", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920", overlay: "linear-gradient(135deg, rgba(2,6,23,0.95) 0%, rgba(15,23,42,0.8) 100%)", rightHtml: getGlassCard("fa-user-secret", "#c5a059", "Data Decryption", "Pattern Analysis") },
        "#audit-sim-section": { badge: "Virtual Reality Audit", title: "Audit OS: <br><span class='highlight-blue'>The Simulator</span>", sub: "Step into the shoes of an auditor. Login to a virtual firm PC, intercept emails, analyze fake Oracle ERP ledgers, and catch real-time frauds.", btnText: "Launch Audit OS", btnLink: "#audit-sim-section", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920", overlay: "linear-gradient(135deg, rgba(6,78,59,0.9), rgba(15,23,42,0.8))", rightHtml: getGlassCard("fa-desktop", "#10b981", "Fake ERP", "Live Frauds") },
        "#mindmap-section": { badge: "Strategic Visualization", title: "The Audit <br><span class='highlight-blue'>Mindmap Explorer</span>", sub: "Don't get lost in paragraphs. Visualize all chapters of audit logic, risks, and substantive procedures through high-density interactive trees.", btnText: "Open Mindmaps", btnLink: "#mindmap-section", img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1920", overlay: "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,58,138,0.7))", rightHtml: getGlassCard("fa-project-diagram", "#00e5ff", "20 Chapters", "Logic Trees") },
      "#live-lounge-section": { badge: "🔥 NEW & LIVE", title: "Public Audit <br><span class='highlight-blue'>Lounge</span>", sub: "Real-time discussions with hundreds of CA peers. Type 'Caversity AI' to summon our highly advanced tutor for instant guidance.", btnText: "Join the Discussion", btnLink: "#live-lounge-section", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920", overlay: "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(16,185,129,0.6))", rightHtml: getGlassCard("fa-comments", "#10b981", "Live Chat", "Caversity AI Active") },
      "#smart-book-section": { badge: "Interactive Reading", title: "The Audit <br><span class='highlight-blue'>Smart Book</span>", sub: "Step into a realistic 3D reading environment. Flip through pages naturally and decode complex audit standards into Asaan Urdu instantly.", btnText: "Open Smart Book", btnLink: "#smart-book-section", img: "https://images.unsplash.com/photo-1544716278-e513176f20b5?q=80&w=1920", overlay: "linear-gradient(135deg, rgba(37, 99, 235, 0.9), rgba(15, 23, 42, 0.8))", rightHtml: getGlassCard("fa-book-open-reader", "#3b82f6", "3D Pages", "Urdu Decoder") },
        "#exam-simulator-section": { badge: "ICAP Environment", title: "Past Paper <span class='highlight-blue'>Simulator</span>", sub: "Feel the pressure. 15 minutes of locked reading time, 3 hours of writing, and instant AI grading at the end.", btnText: "Start Simulator", btnLink: "#exam-simulator-section", img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1920", overlay: "linear-gradient(135deg, rgba(55,65,81,0.9), rgba(0,0,0,0.8))", rightHtml: getGlassCard("fa-file-signature", "#f59e0b", "Timer Active", "Auto Check") }
    };

    window.updateHero = function(data) {
        if(!data) return;
        const heroBtn = document.getElementById('hero-action-btn');
        const visualArea = document.getElementById('dynamic-visual-area');
        const heroBgImage = document.getElementById('hero-bg-image');
        const heroOverlay = document.querySelector('.hero-bg-overlay');

        document.getElementById('hero-badge-text').innerHTML = data.badge;
        document.getElementById('main-hero-title').innerHTML = data.title;
        document.getElementById('main-hero-sub').innerHTML = data.sub;
        
        if (data.btnText && heroBtn) {
            heroBtn.style.display = 'inline-flex';
            heroBtn.innerHTML = data.btnText + ' <i class="fas fa-arrow-right" style="margin-left: 8px;"></i>';
            heroBtn.setAttribute('data-target', data.btnLink);
        } else if(heroBtn) { heroBtn.style.display = 'none'; }
        
        if (heroBgImage) heroBgImage.src = data.img;
        if (heroOverlay) heroOverlay.style.background = data.overlay;
        if(visualArea) {
            visualArea.innerHTML = data.rightHtml;
            if(visualArea.firstElementChild) {
                visualArea.firstElementChild.style.animation = 'none'; 
                visualArea.firstElementChild.offsetHeight; 
                visualArea.firstElementChild.style.animation = 'popInVisual 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
            }
        }
    };
    
    updateHero(tabData["#hero-landing"]);

    // Watermark Magic
    window.addEventListener('scroll', function() {
        const wm = document.getElementById('caversity-watermark');
        if(wm) { wm.style.opacity = (window.scrollY > window.innerHeight * 0.4) ? '0.08' : '0'; }
    });
    
    // 3D Parallax
    const visualArea = document.getElementById('dynamic-visual-area');
    if(visualArea) {
        visualArea.addEventListener("mousemove", (e) => {
            const card = visualArea.firstElementChild;
            if(card) {
                const x = (window.innerWidth / 2 - e.pageX) / 30;
                const y = (window.innerHeight / 2 - e.pageY) / 30;
                card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
            }
        });
        visualArea.addEventListener("mouseleave", () => {
            const card = visualArea.firstElementChild;
            if(card) card.style.transform = `rotateY(0deg) rotateX(0deg)`;
        });
    }
});

// =========================================
// 🌍 EXPOSE EVERYTHING TO WINDOW FOR INLINE HTML
// =========================================
window.toggleRecallDetail = toggleRecallDetail;
window.toggleSubDetail = toggleSubDetail;
window.tryEnterCinema = tryEnterCinema;
window.enterCinema = enterCinema;
window.applyMobileFix = applyMobileFix;
window.copyCode = copyCode;
window.updateAccessCode = updateAccessCode;
window.showGuide = showGuide;
window.startExam = startExam;
window.startWriting = startWriting;
window.submitPaper = submitPaper;
window.openNamePopup = openNamePopup;
window.saveNameAndStart = saveNameAndStart;
window.openCallInterface = openCallInterface;
window.toggleMic = toggleMic;
window.sendAudio = sendAudio;
window.speakDirect = speakDirect;
window.closeInterface = closeInterface;
window.openCall = openNamePopup; 

// =========================================
// 🚀 ON LOAD INITIALIZATIONS
// =========================================
window.addEventListener('load', () => {
    applyMobileFix();
    updateAccessCode();
    initRecallSystem();
    initSubstantive();
    initAutoAudit();
    setInterval(checkServerStatus, 10000);

    // Setup Right Click Block on specific section
    const zone = document.getElementById('concept-recall-section');
    if (zone) {
        zone.addEventListener('contextmenu', e => e.preventDefault());
        zone.addEventListener('copy', e => e.preventDefault());
        zone.addEventListener('selectstart', e => e.preventDefault());
    }

    // Setup Exam Simulator Grid
    const grid = document.getElementById('papers-grid');
    if(typeof pastPapers === 'undefined') {
        if(grid) grid.innerHTML = '<p style="color:red; text-align:center;">Error: examformat.js not loaded. Check file path.</p>';
    } else {
        if(grid) {
            grid.innerHTML = '';
            for(let id in pastPapers) {
                let p = pastPapers[id];
                grid.innerHTML += `
                <div class="paper-card" onclick="startExam('${id}')">
                    <span style="background:#dbeafe; color:#1e40af; padding:4px 10px; border-radius:20px; font-size:12px; font-weight:bold;">Attempt</span>
                    <h3 style="margin:10px 0; color:#1e293b; font-size:18px;">${p.title}</h3>
                    <div style="font-size: 13px; color: #64748b;">
                        <i class="fas fa-file-alt"></i> ${p.questions.length} Questions • ${p.totalMarks} Marks
                    </div>
                </div>`;
            }
        }
    }

});

window.addEventListener('resize', applyMobileFix);
