let auditData = [];
let activeCase = null;
let zIndexCounter = 100;

// ==========================================
// 🔒 SECURE DATA FETCH (QuestionBank)
// ==========================================
async function initOSData() {
    try {
        const response = await fetch('/api/get-data?file=questionbank');
        if (!response.ok) throw new Error("API request failed");
        
        const result = await response.json();
        
        // Data ko decode karke normal JSON banayein
        auditData = JSON.parse(atob(result.payload));
        console.log("Secure Audit Cases Loaded:", auditData.length);
        
        loadRandomCase();
    } catch (error) {
        console.error("Data Load Error:", error);
        const bClient = document.getElementById('briefing-client');
        if(bClient) bClient.innerText = "SYSTEM ERROR: Unable to securely fetch live cases.";
    }
}

function loadRandomCase() {
    if(!auditData || auditData.length === 0) return;
    
    // Load a random scenario
    const randomIndex = Math.floor(Math.random() * auditData.length);
    activeCase = auditData[randomIndex];
    
    document.getElementById('briefing-client').innerText = activeCase.client || "Confidential Client";
    document.getElementById('briefing-content').innerText = activeCase.scenario || activeCase.q || "Review the pending files in Oracle ERP.";
    
    // Populate Email and ERP if fields exist in your JSON structure
    document.getElementById('erp-body').innerHTML = `<h3><i class="fas fa-file-invoice-dollar"></i> General Ledger Excerpt</h3><p>${activeCase.erp_data || 'No suspicious transactions flagged at first glance. Proceed with substantive procedures.'}</p>`;
    document.getElementById('email-view').innerHTML = `<h3>FW: Urgent Audit Query</h3><hr><p>${activeCase.email_data || 'Please review the attached working papers and perform fraud risk assessments.'}</p>`;
}

// ==========================================
// 🚀 SYSTEM OPERATIONS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Start boot sequence
    setTimeout(() => {
        document.getElementById('boot-screen').classList.add('hidden');
        document.getElementById('lock-screen').classList.remove('hidden');
        setInterval(updateClock, 1000);
        updateClock();
        initOSData(); // Fetch Secured Data in Background
        setupWindowDragging();
        setupFiles();
    }, 3200);
});

function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    document.getElementById('lock-time').innerText = timeStr;
    document.getElementById('taskbar-clock').innerText = timeStr;
}

function unlockOS() {
    document.getElementById('lock-screen').classList.add('hidden');
    document.getElementById('desktop-screen').classList.remove('hidden');
    
    // Play Ambience Audio
    const bgAudio = document.getElementById('office-audio');
    if(bgAudio) bgAudio.play().catch(e => console.log("Audio play prevented by browser policy", e));
    
    openApp('briefing');
}

// ==========================================
// 📁 APP & WINDOW CONTROLS
// ==========================================
function openApp(appId) {
    const win = document.getElementById('window-' + appId);
    if(win) {
        win.classList.remove('hidden');
        bringToFront(win);
    }
}

function closeApp(appId) {
    document.getElementById('window-' + appId).classList.add('hidden');
}

function toggleMinimize(appId) {
    const win = document.getElementById('window-' + appId);
    win.classList.add('hidden'); // Minimized to taskbar concept
}

function bringToFront(win) {
    zIndexCounter++;
    win.style.zIndex = zIndexCounter;
}

function setupWindowDragging() {
    document.querySelectorAll('.os-window').forEach(win => {
        const titleBar = win.querySelector('.win-title-bar');
        if(!titleBar) return;
        
        let isDragging = false, startX, startY, initX, initY;
        titleBar.addEventListener('mousedown', (e) => {
            if(e.target.closest('.window-controls')) return;
            bringToFront(win);
            isDragging = true;
            startX = e.clientX; startY = e.clientY;
            initX = win.offsetLeft; initY = win.offsetTop;
        });
        document.addEventListener('mousemove', (e) => {
            if(!isDragging) return;
            win.style.left = `${initX + (e.clientX - startX)}px`;
            win.style.top = `${initY + (e.clientY - startY)}px`;
        });
        document.addEventListener('mouseup', () => { isDragging = false; });
    });
}

// ==========================================
// 💼 AUDIT LOGIC & PDF VIEWER
// ==========================================
function setupFiles() {
    const pcGrid = document.getElementById('pc-file-grid');
    if(pcGrid) {
        pcGrid.innerHTML = `
            <div class="d-icon" onclick="openPdf()" style="color:#333;">
                <i class="fas fa-file-pdf" style="font-size:32px; color:#e74c3c;"></i>
                <span style="font-size:12px; margin-top:5px;">Audit_ISAs.pdf</span>
            </div>
        `;
    }
}

function switchTab(tabId, event) {
    document.querySelectorAll('.audit-section').forEach(s => s.classList.add('hidden'));
    document.querySelectorAll('.audit-tab').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.remove('hidden');
    event.currentTarget.classList.add('active');
}

// Window Objects (Expose for inline HTML calls)
window.unlockOS = unlockOS; window.openApp = openApp; window.closeApp = closeApp;
window.toggleMinimize = toggleMinimize; window.switchTab = switchTab;
window.acceptMission = () => { closeApp('briefing'); openApp('audit'); };
window.finalSubmit = () => { alert("Working papers successfully submitted for Manager's review!"); };
window.shutdown = () => { window.location.href = "audit.html"; };
window.openPdf = () => { document.getElementById('doc-viewer').classList.remove('hidden'); document.getElementById('doc-title').innerText = "ISA Standards Handbook"; document.getElementById('doc-content').innerHTML = `<iframe src="subjects/caf8_audit/features/assets/audit_isas.pdf" width="100%" height="100%" style="border:none; min-height:85vh;"></iframe>`; };
window.closeDocument = () => { document.getElementById('doc-viewer').classList.add('hidden'); document.getElementById('doc-content').innerHTML = ''; };