let CASE_DATA = null;
let ALL_SCENARIOS = [];

const APP_NAMES = { 'briefing': 'Briefing', 'pc': 'This PC', 'outlook': 'Outlook', 'erp': 'Oracle ERP', 'audit': 'Audit File' };

// 🎧 SMART AUDIO SETUP (Path Updated)
let firmAudio = new Audio('subjects/caf8_audit/features/assets/office-ambience.mp3');
firmAudio.loop = true;
firmAudio.volume = 0.2;

// 🎯 MASTER RADAR
function checkDesktopState() {
    setTimeout(() => {
        let shouldMute = false;
        const windows = document.querySelectorAll('.os-window');
        windows.forEach(win => {
            if (!win.classList.contains('hidden')) {
                shouldMute = true;
            }
        });

        const docViewer = document.getElementById('doc-viewer');
        if (docViewer && !docViewer.classList.contains('hidden')) {
            shouldMute = true;
        }

        if (shouldMute) {
            firmAudio.pause();
        } else {
            if(document.getElementById('lock-screen') && document.getElementById('lock-screen').classList.contains('hidden')) {
                firmAudio.play().catch(e => console.log("User interaction needed"));
            }
        }
    }, 100); 
}

function closeDocument() {
    document.getElementById('doc-viewer').classList.add('hidden');
    checkDesktopState();
}

window.onload = () => { 
    updateClock(); 
    setTimeout(() => { 
        document.getElementById('boot-screen').classList.add('hidden'); 
        document.getElementById('lock-screen').classList.remove('hidden'); 
    }, 2000); 
};

// ==========================================
// 🔒 SECURE DATA FETCH
// ==========================================
async function unlockOS() {
    if(!document.getElementById('username-input').value) return alert("Enter Auditor ID");
    try {
        // Secure JSON payload
        const res = await fetch('/api/get-data?file=questionbank');
        const result = await res.json();
        ALL_SCENARIOS = JSON.parse(atob(result.payload));
        
        const now = new Date();
        const dateBlockString = `${now.getFullYear()}${now.getMonth()}${now.getDate()}${now.getHours() >= 12 ? 1 : 0}`;
        const localBlockNumber = parseInt(dateBlockString);
        
        const caseIndex = localBlockNumber % ALL_SCENARIOS.length;
        CASE_DATA = ALL_SCENARIOS[caseIndex];
        
        document.getElementById('lock-screen').classList.add('hidden');
        document.getElementById('desktop-screen').classList.remove('hidden');
        
        loadApps(); 
        openApp('briefing'); 
        firmAudio.play().catch(e => console.log(e));
    } catch(e) { console.error(e); alert("SYSTEM ERROR: Unable to securely fetch live cases."); }
}

function loadApps() {
    let story = CASE_DATA.briefing || CASE_DATA.background_story;
    document.getElementById('briefing-client').innerText = "Client: " + CASE_DATA.client_name;
    document.getElementById('briefing-content').innerText = story;
    document.getElementById('news-text').innerHTML = `<i class="fas fa-exclamation-triangle" style="color: #facc15; margin-right: 8px;"></i> ${CASE_DATA.news_headline}`;
    document.getElementById('erp-body').innerHTML = CASE_DATA.evidence_files["1_GL_Detailed.html"] || "No Data";

    const emailKey = Object.keys(CASE_DATA.evidence_files).find(key => key.includes('Email') || key.includes('Memo'));
    document.getElementById('email-view').innerHTML = CASE_DATA.evidence_files[emailKey] || "No Emails";

    const grid = document.getElementById('pc-file-grid'); 
    grid.innerHTML = "";
    
    for(let filename in CASE_DATA.evidence_files) {
        if(filename.includes("GL") || filename === emailKey) continue;
        const el = document.createElement('div'); el.className = "d-icon";
        el.innerHTML = `<i class="fas fa-file-pdf" style="color:#e74c3c;"></i><span style="color:black; font-size:10px;">${filename}</span>`;
        el.onclick = () => {
            document.getElementById('doc-viewer').classList.remove('hidden');
            document.getElementById('doc-title').innerText = filename;
            document.getElementById('doc-content').style.padding = "50px";
            document.getElementById('doc-content').innerHTML = CASE_DATA.evidence_files[filename];
            checkDesktopState();
        };
        grid.appendChild(el);
    }
    
    const isa = document.createElement('div'); isa.className = "d-icon";
    isa.innerHTML = `<i class="fas fa-book" style="color:#d35400;"></i><span style="color:black; font-size:10px;">ISAs.pdf</span>`;
    isa.onclick = () => {
        document.getElementById('doc-viewer').classList.remove('hidden');
        document.getElementById('doc-title').innerText = "AUDIT ISAs Reference Book";
        document.getElementById('doc-content').style.padding = "0"; 
        // PDF Path Updated
        document.getElementById('doc-content').innerHTML = `<iframe src="subjects/caf8_audit/features/assets/AUDIT ISAs.pdf" width="100%" height="1100px" style="border:none;"></iframe>`;
        checkDesktopState();
    };
    grid.appendChild(isa);
}

function switchTab(t, e) {
    document.getElementById('tab-planning').classList.add('hidden'); document.getElementById('tab-execution').classList.add('hidden'); document.getElementById('tab-reporting').classList.add('hidden');
    document.querySelectorAll('.audit-tab').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-'+t).classList.remove('hidden'); e.currentTarget.classList.add('active');
}

function finalSubmit() {
    if(!confirm("Submit Analysis?")) return;
    const answerKeys = Object.keys(CASE_DATA.answers);
    answerKeys.forEach(key => {
        let inputElement = document.getElementById(key);
        if(inputElement && (!inputElement.nextElementSibling || !inputElement.nextElementSibling.classList.contains('feedback-box'))) {
            let feedback = document.createElement('div');
            feedback.className = 'feedback-box';
            feedback.innerHTML = `<strong>Partner's Expected Answer:</strong>${CASE_DATA.answers[key]}`;
            inputElement.parentNode.insertBefore(feedback, inputElement.nextSibling);
        }
    });
    alert("Evaluation Completed.");
}

function openApp(appId) { 
    let win = document.getElementById('window-'+appId);
    win.classList.remove('hidden'); 
    bringToFront(win);
    updateTaskbar(appId, true);
    checkDesktopState(); 
}

function closeApp(appId) { 
    document.getElementById('window-'+appId).classList.add('hidden'); 
    updateTaskbar(appId, false);
    checkDesktopState(); 
}

function toggleMinimize(appId) {
    const win = document.getElementById('window-'+appId);
    win.classList.toggle('hidden');
    if(!win.classList.contains('hidden')) bringToFront(win);
    checkDesktopState();
}

function bringToFront(winElement) {
    document.querySelectorAll('.os-window').forEach(w => w.style.zIndex = 100);
    winElement.style.zIndex = 101;
}

function updateTaskbar(appId, isOpen) {
    const tb = document.getElementById('taskbar-apps');
    let tab = document.getElementById('tab-app-'+appId);
    if(isOpen && !tab) {
        tab = document.createElement('div');
        tab.id = 'tab-app-'+appId;
        tab.className = 'task-tab active';
        tab.innerHTML = `<i class="fas fa-window-maximize"></i> ${APP_NAMES[appId]}`;
        tab.onclick = () => toggleMinimize(appId);
        tb.appendChild(tab);
    } else if (!isOpen && tab) {
        tb.removeChild(tab);
    }
}

function acceptMission() { 
    document.getElementById('accept-btn').innerText = "ACCEPTED ✅"; 
    setTimeout(() => toggleMinimize('briefing'), 800); 
}

function shutdown() { 
    if(confirm("Return to Main Website?")) window.location.href = 'audit.html'; 
}

function updateClock() { 
    setInterval(() => { 
        const now = new Date(); 
        const timeStr = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        if(document.getElementById('lock-time')) document.getElementById('lock-time').innerText = timeStr; 
        if(document.getElementById('taskbar-clock')) document.getElementById('taskbar-clock').innerText = timeStr; 
        
        const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
        if(document.getElementById('lock-date')) document.getElementById('lock-date').innerText = now.toLocaleDateString('en-US', dateOptions);

        const nextCycle = new Date(now);
        now.getHours() < 12 ? nextCycle.setHours(12, 0, 0, 0) : nextCycle.setHours(24, 0, 0, 0);
        const diff = nextCycle - now;
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        if(document.getElementById('case-timer')) document.getElementById('case-timer').innerText = `New Case in: ${h}h ${m}m ${s}s`;
    }, 1000); 
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.os-window').forEach(win => {
        const titleBar = win.querySelector('.win-title-bar');
        if (titleBar) dragElement(win, titleBar);
    });
});

function dragElement(elmnt, header) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    header.onmousedown = (e) => {
        e.preventDefault();
        pos3 = e.clientX; pos4 = e.clientY;
        document.onmouseup = () => { document.onmouseup = null; document.onmousemove = null; };
        document.onmousemove = (e) => {
            e.preventDefault();
            pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY;
            pos3 = e.clientX; pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        };
        bringToFront(elmnt);
    };
}

// Window Objects
window.unlockOS = unlockOS; window.openApp = openApp; window.closeApp = closeApp;
window.toggleMinimize = toggleMinimize; window.switchTab = switchTab;
window.acceptMission = acceptMission; window.finalSubmit = finalSubmit;
window.shutdown = shutdown; window.closeDocument = closeDocument;
