// ==========================================
// 🚀 SECURE FRONTEND: features/js/firm-hub.js
// ==========================================

let allData = [];
let currentLiveType = 'hot'; 

// Helper function to manage dates in frontend filters
function getValidDate(item) {
    if (item.time) { 
        let dateStr = item.time.split(",")[0].trim();
        let parts = dateStr.split(/[\/\-]/);
        let dateObj;
        if (parts.length === 3) {
            if (parts[2].length === 4) dateObj = new Date(`${parts[2]}/${parts[1]}/${parts[0]}`);
            else if (parts[0].length === 4) dateObj = new Date(`${parts[0]}/${parts[1]}/${parts[2]}`);
            else dateObj = new Date(dateStr.replace(/-/g, '/'));
        } else {
            dateObj = new Date(dateStr.replace(/-/g, '/'));
        }
        if (!isNaN(dateObj.getTime())) return dateObj;
    }
    let ts = parseInt(item.timestamp);
    if (!isNaN(ts) && ts > 0) { 
        if (ts < 10000000000) ts *= 1000;
        return new Date(ts); 
    }
    return new Date();
}

async function loadFirebaseData() {
    try {
        let res = await fetch('/api/firm-hub?action=loadFeed');
        if (!res.ok) throw new Error("Failed to load intelligence data");
        allData = await res.json();
        
        applyFilters(); 
        populateInterviewList();
            
    } catch (error) {
        console.error("Data Load Error:", error);
        document.getElementById('feed-container').innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i> Error loading intelligence data.</div>';
    }
}

// ==========================================
// 🎛️ UI & FILTER LOGIC
// ==========================================

function switchMainTab(tabId, el) {
    document.querySelectorAll('.section-content').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.m-tab').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId + '-section').classList.add('active');
    el.classList.add('active');
}

function setLiveFilter(type, el) {
    currentLiveType = type;
    document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
    el.classList.add('active');

    const filtersBox = document.getElementById('smart-filters');
    if(type === 'hot') {
        filtersBox.classList.remove('show');
    } else {
        filtersBox.classList.add('show');
        updateDropdownsForCurrentTab();
    }
    
    document.getElementById('sel-firm').value = 'All';
    document.getElementById('sel-city').value = 'All';
    document.getElementById('sel-time').value = 'all';
    applyFilters();
}

function updateDropdownsForCurrentTab() {
    let targetType = currentLiveType;
    let relevantData = allData.filter(i => i.type === targetType || currentLiveType === 'hot');

    let firmsSet = new Set();
    let citiesSet = new Set();
    
    relevantData.forEach(item => {
        if(item.firm !== "Unspecified Firm") firmsSet.add(item.firm);
        if(item.city !== "Unspecified City") citiesSet.add(item.city);
    });

    const selFirm = document.getElementById('sel-firm');
    selFirm.innerHTML = '<option value="All">All Firms</option>';
    Array.from(firmsSet).sort().forEach(f => { selFirm.innerHTML += `<option value="${f}">${f}</option>`; });

    const selCity = document.getElementById('sel-city');
    selCity.innerHTML = '<option value="All">All Cities</option>';
    Array.from(citiesSet).sort().forEach(c => { selCity.innerHTML += `<option value="${c}">${c}</option>`; });
}

function applyFilters() {
    const now = Date.now();
    let filtered = [];

    if(currentLiveType === 'hot') {
        const FORTY_EIGHT_HRS = 48 * 60 * 60 * 1000;
        filtered = allData.filter(item => (now - getValidDate(item).getTime()) <= FORTY_EIGHT_HRS);
    } else {
        const selFirm = document.getElementById('sel-firm').value;
        const selCity = document.getElementById('sel-city').value;
        const selTime = document.getElementById('sel-time').value;

        filtered = allData.filter(item => {
            if(item.type !== currentLiveType) return false;
            if(selFirm !== 'All' && item.firm !== selFirm) return false;
            if(selCity !== 'All' && item.city !== selCity) return false;
            if(selTime !== 'all') {
                const daysInMs = parseInt(selTime) * 24 * 60 * 60 * 1000;
                if((now - item.timestamp) > daysInMs) return false;
            }
            return true;
        });
    }
    renderData(filtered);
}

function renderData(dataToRender) {
    const container = document.getElementById('feed-container');
    container.innerHTML = '';

    if(dataToRender.length === 0) {
        if(currentLiveType === 'hot') {
            container.innerHTML = `<div class="empty-state"><i class="fas fa-fire-extinguisher" style="font-size: 30px; margin-bottom: 10px; opacity: 0.5;"></i><br>Abhi koi live update nahi hai, jese hi hogi aapko show ho jayegi.</div>`;
        } else {
            container.innerHTML = `<div class="empty-state"><i class="fas fa-folder-open" style="font-size: 30px; margin-bottom: 10px; opacity: 0.5;"></i><br>No records found for the selected filters.</div>`;
        }
        return;
    }

    dataToRender.forEach(item => {
        let dateObj = getValidDate(item);
        let formattedDate = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        
        let cardStyle = item.type === 'Induction' ? 'type-ind' : (item.type === 'Call Alert' ? 'type-call' : 'type-fb');
        if(currentLiveType === 'hot') cardStyle = 'type-hot';

        let typeBadgeClass = item.type === 'Induction' ? 'b-ind' : (item.type === 'Call Alert' ? 'b-call' : 'b-fb');
        let typeIcon = item.type === 'Induction' ? '🚨' : (item.type === 'Call Alert' ? '📞' : '🗣️');

        let cleanMessage = item.message.replace(/\*([^*]+)\*/g, '<strong>$1</strong>').replace(/\*/g, '');

        let firmHtml = item.firm !== "Unspecified Firm" ? `<span class="badge-firm"><i class="far fa-building"></i> ${item.firm}</span>` : '';
        let cityHtml = item.city !== "Unspecified City" ? `<span class="badge-city"><i class="fas fa-map-marker-alt"></i> ${item.city}</span>` : '';

        container.innerHTML += `
            <div class="feed-card ${cardStyle}">
                <div class="card-meta-bar">
                    <div class="smart-badges">
                        <span class="badge-type ${typeBadgeClass}">${typeIcon} ${item.type}</span>
                        ${firmHtml}
                        ${cityHtml}
                    </div>
                    <span class="feed-date"><i class="far fa-calendar-alt"></i> ${formattedDate}</span>
                </div>
                <div class="feed-text">${cleanMessage}</div>
            </div>
        `;
    });
}

// ==========================================
// 🏢 FIRM DIRECTORY SYSTEM (API DRIVEN)
// ==========================================
function sanitizeId(str) { return str.toLowerCase().replace(/[^a-z0-9]/g, '_'); }

let firebaseFirms = [];
let currentSearchResults = [];
let currentDisplayIndex = 0;
const LOAD_LIMIT = 10;

async function loadDirectoryData() {
    try {
        let localRes = await fetch('/api/get-data?file=firms');
        let result = await localRes.json();
        let localFirms = JSON.parse(atob(result.payload));
        if (localFirms && localFirms.length > 0) firebaseFirms = localFirms;
    } catch(e) { console.warn("Local firms fetch failed.", e); }

    try {
        let res = await fetch('/api/firm-hub?action=loadDirectory');
        let dbFirms = await res.json();
        if (dbFirms && dbFirms.length > 0) {
            dbFirms.forEach(dbFirm => {
                let exists = firebaseFirms.some(f => f.name.toLowerCase() === dbFirm.name.toLowerCase() && f.city === dbFirm.city);
                if(!exists) firebaseFirms.push(dbFirm);
            });
        }
        searchDirectory();
    } catch(e) { console.error("Directory Load Error:", e); }
}

function searchDirectory() {
    const city = document.getElementById('dir-city').value;
    const rawQuery = document.getElementById('dir-search').value;
    const query = rawQuery.toLowerCase().trim();
    const container = document.getElementById('directory-container');
    container.innerHTML = '';

    currentSearchResults = firebaseFirms.filter(firm => {
        return (city === 'All' || firm.city === city) && (firm.name.toLowerCase().includes(query) || firm.address.toLowerCase().includes(query));
    });
    currentDisplayIndex = 0;

    if(currentSearchResults.length === 0) {
        if(query.length > 2) {
            let searchCity = city === 'All' ? 'Pakistan' : city;
            let fullCityStr = searchCity === 'Pakistan' ? 'Pakistan' : searchCity + ', Pakistan';
            let mapQuery = encodeURIComponent(`${rawQuery} Chartered Accountants, ${fullCityStr}`);
            let newFirm = { name: rawQuery.toUpperCase(), city: searchCity, address: "Auto-Detected via Live GPS Radar", phone: "N/A", email: "" };
            let firmId = sanitizeId(newFirm.name + newFirm.city);
            
            firebaseFirms.push(newFirm);
            
            // Auto-save to API
            fetch('/api/firm-hub', { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'saveFirm', newFirm: newFirm }) 
            }).catch(e => console.error(e));

            container.innerHTML = `
                <div style="background: rgba(16, 185, 129, 0.1); border: 1px dashed #10b981; padding: 15px; border-radius: 12px; margin-bottom: 20px; color: #cbd5e1; text-align: center; font-size: 14px;">
                    <i class="fas fa-database" style="color: #10b981; margin-right: 5px;"></i> Firm not found in local DB. <strong>Auto-Detected via Live Radar & Saved to Database permanently!</strong> 👇
                </div>
                <div class="dir-card">
                    <div class="dir-info">
                        <h3>${newFirm.name}</h3>
                        <div class="dir-detail"><i class="fas fa-map-marker-alt"></i> <span><strong>Location:</strong> ${fullCityStr} (${newFirm.address})</span></div>
                        <div class="dir-detail"><i class="fas fa-info-circle"></i> <span>Phone/Email not verified in local database yet.</span></div>
                        <button id="btn-${firmId}" class="btn-research" onclick="doDeepResearch('${newFirm.name}', '${newFirm.city}', '${firmId}', '${newFirm.address.replace(/'/g, "\\'")}')"><i class="fas fa-microchip"></i> Deep Research (Partners & HR)</button>
                        <div id="res-${firmId}" class="personnel-list"></div>
                    </div>
                    <div class="dir-map"><iframe src="https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed"></iframe></div>
                </div>`;
        } else {
            container.innerHTML = '<div style="color:#94a3b8; text-align:center; padding: 40px;"><i class="fas fa-search-location" style="font-size: 30px; margin-bottom: 15px; opacity: 0.5;"></i><br>Select a city or search any firm name to find its details.</div>';
        }
        return;
    }
    loadMoreDirectory();
}

function loadMoreDirectory() {
    const container = document.getElementById('directory-container');
    const existingBtn = document.getElementById('load-more-btn-container');
    if (existingBtn) existingBtn.remove();

    const nextBatch = currentSearchResults.slice(currentDisplayIndex, currentDisplayIndex + LOAD_LIMIT);

    nextBatch.forEach(firm => {
        let mapQuery = encodeURIComponent(`${firm.name}, ${firm.address}, ${firm.city}, Pakistan`);
        let firmId = sanitizeId(firm.name + firm.city);
        let phoneHtml = (firm.phone && firm.phone !== 'N/A') ? `<div class="dir-detail"><i class="fas fa-phone-alt"></i> <span>${firm.phone}</span></div>` : '';
        
        let emailHtml = '';
        if (firm.email && firm.email !== 'N/A') {
            let primaryEmail = firm.email.split(',')[0].trim();
            emailHtml = `<div class="dir-detail"><i class="fas fa-envelope"></i> <span><a href="mailto:${primaryEmail}" style="color:#2563eb; text-decoration:none;">${firm.email}</a></span></div>`;
        }

        container.innerHTML += `
            <div class="dir-card">
                <div class="dir-info">
                    <h3>${firm.name}</h3>
                    <div class="dir-detail"><i class="fas fa-map-marker-alt"></i> <span><strong>${firm.city}:</strong> ${firm.address}</span></div>
                    ${phoneHtml}
                    ${emailHtml}
                    <button id="btn-${firmId}" class="btn-research" onclick="doDeepResearch('${firm.name}', '${firm.city}', '${firmId}', '${firm.address.replace(/'/g, "\\'")}')"><i class="fas fa-microchip"></i> Deep Research (Partners & HR)</button>
                    <div id="res-${firmId}" class="personnel-list"></div>
                </div>
                <div class="dir-map"><iframe loading="lazy" src="https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed"></iframe></div>
            </div>`;
    });

    currentDisplayIndex += LOAD_LIMIT;

    if (currentDisplayIndex < currentSearchResults.length) {
        container.innerHTML += `
            <div id="load-more-btn-container" style="text-align: center; margin-top: 20px; padding-bottom: 20px;">
                <button onclick="loadMoreDirectory()" style="background: #1e293b; color: white; padding: 12px 30px; border: none; border-radius: 50px; font-family: 'Poppins', sans-serif; font-weight: 600; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                    Load More Firms <i class="fas fa-chevron-down" style="margin-left: 5px;"></i>
                </button>
            </div>`;
    } else {
        container.innerHTML += `<div style="text-align:center; padding: 30px; color: #64748b; font-size: 14px; font-weight: 600;"><i class="fas fa-check-circle"></i> Showing all ${currentSearchResults.length} firms.</div>`;
    }
}

async function doDeepResearch(firmName, city, domId, address = "") {
    const btn = document.getElementById('btn-' + domId);
    const container = document.getElementById('res-' + domId);
    if(btn) btn.style.display = 'none';
    container.innerHTML = '<div style="color:#8b5cf6; font-size:13px; font-weight:600; padding:10px;"><i class="fas fa-spinner fa-spin"></i> AI is scanning the web for verified personnel...</div>';
    
    try {
        let res = await fetch('/api/firm-hub', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'deepResearch', firmName, city, domId, address })
        });
        
        let personnelData = await res.json();
        renderPersonnel(personnelData, container, firmName);
    } catch (e) {
        console.error("Deep Research Error:", e);
        container.innerHTML = '<div style="color:#ef4444; font-size:13px; font-weight:600;"><i class="fas fa-exclamation-triangle"></i> No data found or request failed.</div>';
        if(btn) btn.style.display = 'inline-flex';
    }
}

function renderPersonnel(data, container, firmName) {
    if(!data || data.length === 0 || data.empty) { container.innerHTML = '<div style="font-size:13px; color:#64748b; font-weight:600;">No public personnel data found.</div>'; return; }
    let html = '';
    data.forEach(p => {
        if(p.empty) return;
        let contactHtml = '';
        let cleanContact = p.contact ? p.contact.toLowerCase().trim() : '';
        
        if(cleanContact.includes('@') && !cleanContact.includes('http')) {
            contactHtml = `<span style="color:#475569;"><i class="fas fa-envelope"></i> ${p.contact}</span> <a href="javascript:void(0)" onclick="openEmailComposer('${p.contact}', '${firmName.replace(/'/g, "\\'")}', '${p.name.replace(/'/g, "\\'")}')" class="quick-apply-btn"><i class="fas fa-paper-plane"></i> Quick Apply</a>`;
        } else if (cleanContact !== 'n/a' && cleanContact !== '') {
            contactHtml = `<span style="color:#475569;"><i class="fas fa-info-circle"></i> ${p.contact}</span>`;
        } else {
            contactHtml = `<span style="color:#94a3b8; font-size:12px;">Email not available</span>`;
        }
        html += `<div class="personnel-item"><strong>${p.name}</strong><span>${p.position}</span><div class="contact" style="margin-top:8px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">${contactHtml}</div></div>`;
    });
    container.innerHTML = html;
}

// ==========================================
// ⏳ CA JOURNEY TRACKER & EASTER EGG
// ==========================================
let motivationTimeout;
let motivationTriggered = false;
let countdownTimer;

function calculateJourney() {
    const start = document.getElementById('caStartDate').value;
    if(!start) return;
    let m = (new Date().getFullYear() - new Date(start).getFullYear()) * 12 + new Date().getMonth() - new Date(start).getMonth();
    if(m < 0) m = 0;
    
    let attempts = Math.floor(m/6); 
    
    document.getElementById('stat-years').innerText = (m/12).toFixed(1);
    document.getElementById('stat-months').innerText = m;
    document.getElementById('stat-attempts').innerText = attempts;
    document.getElementById('tracker-results').style.display = 'flex';

    const popup = document.getElementById('motivate-popup');
    const inner = document.getElementById('motivate-inner');
    const audio = document.getElementById('motivate-audio');

    clearTimeout(motivationTimeout);

    if (attempts >= 6) {
        if (!motivationTriggered) {
            motivationTimeout = setTimeout(() => {
                popup.classList.add('show');
                motivationTriggered = true; 
            }, 1500); 
        }
    } else {
        popup.classList.remove('show');
        motivationTriggered = false; 
        inner.classList.remove('flipped');
        clearInterval(countdownTimer);
        document.getElementById('motivate-timer').innerText = '5';
        audio.pause();
        audio.currentTime = 0; 
    }
}

function startMotivation() {
    const inner = document.getElementById('motivate-inner');
    if (inner.classList.contains('flipped')) return; 
    
    inner.classList.add('flipped'); 
    let timeLeft = 5;
    const timerEl = document.getElementById('motivate-timer');
    timerEl.innerText = timeLeft; 
    
    countdownTimer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            timerEl.innerHTML = '<i class="fas fa-headphones" style="animation: pulseAudio 1.5s infinite;"></i>';
            playMotivateAudio(); 
        }
    }, 1000);
}

function playMotivateAudio() {
    const audio = document.getElementById('motivate-audio');
    audio.play().catch(e => console.error("Audio blocked by browser:", e));
    
    audio.onended = () => {
        document.getElementById('motivate-popup').classList.remove('show');
        document.getElementById('motivate-inner').classList.remove('flipped'); 
        document.getElementById('motivate-timer').innerText = '5';
        motivationTriggered = false; 
    };
}

// ==========================================
// 📧 SMART EMAIL COMPOSER LOGIC
// ==========================================
function openEmailComposer(email, firmName, personName = "") {
    document.getElementById('em-target').value = email;
    document.getElementById('em-firm').value = firmName;
    document.getElementById('em-person').value = personName;
    document.getElementById('em-name').value = '';
    updateEmailDraft();
    document.getElementById('email-composer').classList.add('active');
}

function closeEmailComposer() { document.getElementById('email-composer').classList.remove('active'); }

function updateEmailDraft() {
    let name = document.getElementById('em-name').value.trim() || "[Your Name]";
    let status = document.getElementById('em-status').value;
    let firm = document.getElementById('em-firm').value;
    let person = document.getElementById('em-person').value;
    
    let greeting = (person && person.toLowerCase() !== 'hr department') ? `Dear ${person},` : `Dear Hiring Team at ${firm},`;
    
    let draft = `${greeting}\n\nI am writing to express my interest in joining your esteemed firm as an Audit Trainee. I am a highly motivated ${status} with a strong foundation in accounting, auditing, and corporate laws.\n\nI have attached my updated resume for your consideration. I am eager to bring my dedication and skills to ${firm} and would welcome the opportunity for an interview.\n\nLooking forward to hearing from you.\n\nBest regards,\n${name}\n\n--\n(Sent via Caversity Platform)`;
    document.getElementById('em-body').value = draft;
}

function copyEmailDraft() {
    let body = document.getElementById('em-body').value;
    navigator.clipboard.writeText(body).then(() => { alert("Draft copied to clipboard! You can paste it manually in your Email App."); });
}

function triggerMailApp() {
    let email = document.getElementById('em-target').value;
    let name = document.getElementById('em-name').value.trim() || "Candidate";
    let subject = encodeURIComponent(`Application for Audit Trainee - ${name}`);
    let body = encodeURIComponent(document.getElementById('em-body').value);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    closeEmailComposer();
}

// ==========================================
// 🚀 INIT: BOOT UP THE INTELLIGENCE HUB
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    loadFirebaseData();
    loadDirectoryData();
});

// ==========================================
// 🎙️ LIVE MOCK INTERVIEW FIRM LIST
// ==========================================
window.startMockInterview = function(firmName) {
    localStorage.setItem('targetFirm', firmName);
    window.location.href = 'portal.html';
};

window.populateInterviewList = function() {
    const listContainer = document.getElementById('interview-firm-list');
    if (!listContainer) return;
    listContainer.innerHTML = '';

    let interviewFirms = new Set();
    
    allData.forEach(item => {
        if (item.type === 'Feedback' && item.firm !== "Unspecified Firm") {
            interviewFirms.add(item.firm);
        }
    });

    const activeFirmsArray = Array.from(interviewFirms).sort();

    if (activeFirmsArray.length === 0) {
        listContainer.innerHTML = '<div style="color:#94a3b8; text-align:center; padding: 30px;"><i class="fas fa-microphone-slash" style="font-size: 30px; margin-bottom: 15px; opacity: 0.5;"></i><br>No recent interview data available right now.</div>';
        return;
    }

    activeFirmsArray.forEach(firm => {
        listContainer.innerHTML += `
            <div class="interview-firm-card">
                <div class="firm-info-wrapper">
                    <h3>${firm}</h3>
                    <div class="ai-badge"><i class="fas fa-robot"></i> AI Partner Trained</div>
                </div>
                <div class="firm-actions-group">
                    <button class="btn-trend-report" onclick="generateTrendReport('${firm.replace(/'/g, "\\'")}')">
                        <i class="fas fa-chart-line"></i> Predict Trends
                    </button>
                    <button class="btn-start-interview" onclick="startMockInterview('${firm.replace(/'/g, "\\'")}')">
                        <i class="fas fa-play"></i> Start Interview
                    </button>
                </div>
            </div>
        `;
    });
};

// ==========================================
// 📈 AI TREND PREDICTION (API DRIVEN)
// ==========================================
window.closeTrendReport = function() {
    document.getElementById('trend-report-modal').classList.remove('active');
};

window.generateTrendReport = async function(firmName) {
    const modal = document.getElementById('trend-report-modal');
    const contentBox = document.getElementById('trend-report-content');
    const dateLabel = document.getElementById('trend-date');
    
    document.getElementById('trend-firm-name').innerHTML = `<i class="far fa-building"></i> ${firmName}`;
    dateLabel.innerHTML = `<i class="far fa-clock"></i> Checking DB...`;
    contentBox.innerHTML = '<div class="loading-state"><i class="fas fa-spinner fa-spin" style="font-size: 24px; margin-bottom: 10px; color: #3b82f6;"></i><br>Analyzing recent feedbacks & predicting trends...</div>';
    
    modal.classList.add('active');

    let firmId = sanitizeId(firmName);
    
    let firmFeedbacks = allData.filter(item => item.firm === firmName && item.type === 'Feedback');
    firmFeedbacks.sort((a, b) => getValidDate(b).getTime() - getValidDate(a).getTime());
    let targetFeedbacks = firmFeedbacks.slice(0, 7);

    try {
        let res = await fetch('/api/firm-hub', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'generateTrend', firmName, firmId, targetFeedbacks })
        });
        
        let data = await res.json();
        
        if (data.error) {
            contentBox.innerHTML = `<div class="empty-state">${data.error}</div>`;
            return;
        }

        dateLabel.innerHTML = data.cached ? `<i class="fas fa-check-circle"></i> AI Insight Ready` : `<i class="fas fa-magic"></i> Fresh AI Prediction`;
        contentBox.innerHTML = data.htmlReport;

    } catch (error) {
        console.error("Trend Generation Error:", error);
        contentBox.innerHTML = '<div style="color:#ef4444; font-size:14px; font-weight:600; text-align:center;"><i class="fas fa-exclamation-triangle"></i> Failed to generate report. Please try again.</div>';
    }
};

// ==========================================
// 📄 PDF GENERATION LOGIC (A4 FORMAT)
// ==========================================
window.downloadTrendPDF = function() {
    const btn = document.querySelector('.btn-download-pdf');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    btn.disabled = true;

    const element = document.getElementById('pdf-export-area');
    element.classList.add('pdf-mode');

    let rawFirmName = document.getElementById('trend-firm-name').innerText.trim();
    let safeName = rawFirmName.replace(/[^a-zA-Z0-9]/g, '_');
    let fileName = `Caversity_Insight_${safeName}.pdf`;

    const opt = {
        margin:       0.4, 
        filename:     fileName,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
            scale: 2, 
            useCORS: true, 
            scrollY: 0,   
            scrollX: 0,   
            logging: false
        },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        element.classList.remove('pdf-mode');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }).catch(err => {
        console.error("PDF Generation Error:", err);
        element.classList.remove('pdf-mode');
        btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed';
        setTimeout(() => { btn.innerHTML = originalText; btn.disabled = false; }, 3000);
    });
};
