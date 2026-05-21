// ==========================================
// 🧠 THE BRAIN: SMART ALIAS EXTRACTION SYSTEM
// ==========================================
const FIRM_MAPPINGS = [
    // --- The Big 4 & Top Tier ---
    { id: "A.F. Ferguson (PwC)", aliases: ["ferguson", "aff", "pwc", "a.f. ferguson", "price waterhouse"] },
    { id: "KPMG Taseer Hadi", aliases: ["kpmg", "taseer hadi"] },
    { id: "EY Ford Rhodes", aliases: ["ey", "ernst & young", "ford rhodes", "ernst and young", "eyfr", "ey fords rhodes"] },
    { id: "Yousuf Adil (Deloitte)", aliases: ["deloitte", "yousuf adil", "yusuf adil", "yousaf adil", "ya", "yousif adil"] },
    { id: "BDO Ebrahim", aliases: ["bdo", "ebrahim", "ibrahim"] },
    { id: "Grant Thornton", aliases: ["grant thornton", "gt", "gth"] },
    { id: "Forvis Mazars", aliases: ["forvis", "mazars"] },

    // --- Updated & Merged Firms from Your List ---
    { id: "Crowe Hussain Chaudhury", aliases: ["crowe", "hussain chaudhury"] },
    { id: "Siemens Energy", aliases: ["siemens", "siemens energy", "seimens"] },
    { id: "Linktax", aliases: ["linktax", "link tax", "linktax chartered", "linktax chartered management accountants", "linktax management"] },
    { id: "RSM Awais Hyder", aliases: ["rsm", "awais hyder", "avais haider"] },
    { id: "Baker Tilly", aliases: ["baker tilly", "mehmood idrees", "bakertilly", "bt", "mehmood idrees qamar"] },
    { id: "HLB Ijaz Tabussum", aliases: ["hlb", "ijaz tabussum", "ijaz tabassum"] },
    { id: "MGI Ilyas Saeed & Co", aliases: ["ilyas saeed", "isc", "mgi ilyas saeed"] },
    { id: "Riaz Ahmad & Co", aliases: ["riaz ahmad", "rac"] },
    { id: "BKR Ansari", aliases: ["bkr", "ansari"] },
    { id: "UHY Hassan Naeem", aliases: ["uhy", "hassan naeem"] },
    { id: "Muniff Ziauddin", aliases: ["muniff", "mz", "ziauddin"] },
    { id: "Tariq Abdul Ghani Maqbool", aliases: ["tagm", "tariq abdul ghani"] },
    { id: "Faruq Ali & Co", aliases: ["faruq ali", "farooq ali"] },
    { id: "Parker Russell", aliases: ["parker russell", "parker russell ajs"] },
    { id: "Zahid Jamil & Co", aliases: ["zahid jamil", "zahid jamil and co"] },
    { id: "Rahman Sarfaraz Rahim Iqbal Rafiq", aliases: ["rahman sarfaraz", "rahman sarfraz", "rsrir", "rsririr"] },
    { id: "PKF F.R.A.N.T.S.", aliases: ["pkf", "frants", "pkf-frants", "pkf frants"] },
    { id: "Reanda Haroon Zakaria", aliases: ["reanda", "reanda haroon", "haroon zakaria"] },
    { id: "ShineWing Hameed Chaudhary", aliases: ["shinewing", "hameed chaudhary"] },
    { id: "Kreston Hyder Bhimji", aliases: ["kreston", "hyder bhimji"] },
    { id: "NJMI Nasir Javeed Maqsood Imran", aliases: ["njmi", "nasir javeed maqsood imran", "nasir javed"] },
    { id: "Naveed Zafar Ashfaq Jaffery", aliases: ["naveed zafar", "ashfaq jaffery", "nzaj"] },
    { id: "Nauman Javed Hasnain Rashid (NJHR)", aliases: ["nauman javed", "hasnain rashid", "njhr"] },
    { id: "Riaz Ahmad Saqib Gohar (RASG)", aliases: ["riaz ahmad saqib gohar", "rasg", "saqib gohar"] },
    { id: "Clarkson Hyde Saud Ansari", aliases: ["clarkson hyde", "saud ansari", "chsa"] },
    { id: "Junaidy Shoaib Asad (JSA)", aliases: ["junaidy shoaib asad", "Junaidi Shoaib Asad", "jsa"] },
    { id: "Salman & Raheel (SRCA)", aliases: ["salman & raheel", "salman and raheel", "srca"] },

    // --- Remaining New Additions ---
    { id: "A.H.W & Co", aliases: ["a.h.w", "ahw"] },
    { id: "Abdul Khaliq & Co", aliases: ["abdul khaliq"] },
    { id: "Abdullah Shahid & Co", aliases: ["abdullah shahid"] },
    { id: "AD Akhawala & Co", aliases: ["ad akhawala", "akhawala"] },
    { id: "Afzaal Awais Farooq & Co", aliases: ["afzaal awais farooq", "afzaal awais", "aaf"] },
    { id: "Akram & Co", aliases: ["akram"] },
    { id: "Alam Aulakh & Co", aliases: ["alam aulakh"] },
    { id: "Ali Akhtar Adnan & Co", aliases: ["ali akhtar adnan"] },
    { id: "Amin Mudassar & Co", aliases: ["amin mudassar"] },
    { id: "Anas Rehman & Co", aliases: ["anas rehman"] },
    { id: "Arslan & Co", aliases: ["arslan"] },
    { id: "Awan & Co", aliases: ["awan"] },
    { id: "Bilal Arsalan & Co", aliases: ["bilal arsalan"] },
    { id: "Dawood Saif & Co", aliases: ["dawood saif"] },
    { id: "H.A.M.D & Co", aliases: ["h.a.m.d", "hamd"] },
    { id: "H.O.A", aliases: ["h.o.a", "hoa"] },
    { id: "Hina Shahrukh & Co", aliases: ["hina shahrukh"] },
    { id: "Iqbal Yasir & Co", aliases: ["iqbal yasir"] },
    { id: "Irfan Bashir & Co", aliases: ["irfan bashir"] },
    { id: "Jalis Ahmad & Co", aliases: ["jalis ahmad"] },
    { id: "JASB Associates", aliases: ["jasb"] },
    { id: "Javaid Jalal Amjad & Co", aliases: ["javaid jalal amjad"] },
    { id: "M. Almas & Co", aliases: ["m. almas", "almas"] },
    { id: "M.R.M.E & Co", aliases: ["m.r.m.e", "mrme"] },
    { id: "Malik & Co", aliases: ["malik & co", "malik and co"] },
    { id: "Malik Haroon & Co (MHSS)", aliases: ["malik haroon", "mhss"] },
    { id: "Malik Mirza & Co", aliases: ["malik mirza"] },
    { id: "Masood Pervaiz & Co", aliases: ["masood pervaiz"] },
    { id: "Murad Ali & Co", aliases: ["murad ali"] },
    { id: "Nasir Jameel & Co", aliases: ["nasir jameel"] },
    { id: "Peter & Co", aliases: ["peter"] },
    { id: "Qamar Waheed", aliases: ["qamar waheed"] },
    { id: "Riaz & Co", aliases: ["riaz & co", "riaz and co"] },
    { id: "Rizwan & Co", aliases: ["rizwan"] },
    { id: "RK Group", aliases: ["rk group"] },
    { id: "S.M Sohail & Co", aliases: ["s.m sohail", "sm sohail"] },
    { id: "Saad Uz Zaman & Co", aliases: ["saad uz zaman"] },
    { id: "Sana Javaid & Co", aliases: ["sana javaid"] },
    { id: "Sarmad Ali & Co", aliases: ["sarmad ali"] },
    { id: "Sattar & Co", aliases: ["sattar"] },
    { id: "Shekha Mufti & Co", aliases: ["shekha mufti"] },
    { id: "Tayyab & Co", aliases: ["tayyab"] },
    { id: "Tehseen Rehman & Co", aliases: ["tehseen rehman"] },
    { id: "Ubaid-Ur-Rehman & Co", aliases: ["ubaid-ur-rehman", "ubaid ur rehman"] },
    { id: "UHF & Co", aliases: ["uhf"] },
    { id: "Umair Ali & Co", aliases: ["umair ali"] },
    { id: "Viqar A Khan & Co", aliases: ["viqar a khan", "viqar khan"] },
    { id: "Yousaf Hassan Associates", aliases: ["yousaf hassan"] },
    { id: "Yousaf Saeed & Co", aliases: ["yousaf saeed"] },
    { id: "Z.M.T & Co", aliases: ["z.m.t", "zmt"] },
    { id: "Zain Suhail & Co", aliases: ["zain suhail"] },
    { id: "Zulfiqar Ahmad & Co", aliases: ["zulfiqar ahmad"] },

    // --- Pre-existing & Restored Independent Firms ---
    { id: "YB Holdings", aliases: ["YB holdings", "yb holding", "yb"] }, // 🔥 RESTORED
    { id: "Hameed Zahid & Co", aliases: ["hameed zahid", "hz & co"] },
    { id: "Amir Alam Khan & Co", aliases: ["amir alam khan", "amir alam"] },
    { id: "Fazal Mahmood & Co", aliases: ["fazal mahmood", "fazal mehmood"] },
    { id: "Russell Bedford", aliases: ["russell bedford"] },
    { id: "Axiom World", aliases: ["axiom world", "axiom"] },
    { id: "EUSOL (Odoo Partner)", aliases: ["eusol", "odoo", "odoo gold partner", "eusol (odoo gold partner)"] }
];

const CITY_MAPPINGS = [
    { id: "Karachi", aliases: ["karachi", "khi"] },
    { id: "Lahore", aliases: ["lahore", "lhr"] },
    { id: "Islamabad", aliases: ["islamabad", "isb"] },
    { id: "Rawalpindi", aliases: ["rawalpindi", "pindi", "rwp"] },
    { id: "Faisalabad", aliases: ["faisalabad", "Faisalabad", "Faislabad", "fsd"] },
    { id: "Multan", aliases: ["multan", "mux"] },
    { id: "Peshawar", aliases: ["peshawar", "peshwr", "pew"] },
    { id: "Gujranwala", aliases: ["gujranwala", "grw"] },
    { id: "Sialkot", aliases: ["sialkot", "skt"] },
    { id: "Quetta", aliases: ["quetta", "qta"] }
];

function extractMetadata(text) {
    let lowerText = text.toLowerCase();
    let firm = "Unspecified Firm";
    let city = "Unspecified City";

    let earliestCityIndex = Infinity;
    for (let c of CITY_MAPPINGS) {
        for (let alias of c.aliases) {
            let match = lowerText.match(new RegExp(`\\b${alias}\\b`, 'i'));
            if (match && match.index < earliestCityIndex) {
                earliestCityIndex = match.index;
                city = c.id;
            }
        }
    }

    let earliestFirmIndex = Infinity;
    for (let f of FIRM_MAPPINGS) {
        for (let alias of f.aliases) {
            let match = lowerText.match(new RegExp(`\\b${alias}\\b`, 'i'));
            if (match && match.index < earliestFirmIndex) {
                earliestFirmIndex = match.index;
                firm = f.id;
            }
        }
    }

    if (firm === "Unspecified Firm" && typeof firebaseFirms !== 'undefined' && firebaseFirms.length > 0) {
        let sortedFirms = [...firebaseFirms].sort((a,b) => b.name.length - a.name.length);
        for (let f of sortedFirms) {
            let cleanName = f.name.toLowerCase().replace(/ \(\w+\)$/, '').replace(/ & co\.?/gi, '').replace(/chartered accountants?/gi, '').replace(/associates/gi, '').trim();
            if (cleanName.length > 4 && lowerText.includes(cleanName)) {
                firm = f.name;
                break;
            }
        }
    }

    if (firm === "Unspecified Firm") {
        const stopWords = ['to', 'at', 'in', 'for', 'from', 'with', 'by', 'the', 'a', 'an', 'is', 'was', 'of', 'any', 'top', 'good', 'best', 'my', 'our', 'their', 'firm', 'give', 'giving', 'has', 'have', 'had', 'got'];
        
        let coMatch = text.match(/([a-zA-Z\s]+?)\s*(?:&|and)\s*co\b/i);
        if (coMatch) {
            let words = coMatch[1].trim().split(/\s+/);
            let firmWords = words.slice(-3);
            while(firmWords.length > 0 && stopWords.includes(firmWords[0].toLowerCase())) firmWords.shift();
            if (firmWords.length > 0) firm = firmWords.join(" ").replace(/\b\w/g, l => l.toUpperCase()) + " & Co.";
        }
        
        if (firm === "Unspecified Firm") {
            let caMatch = text.match(/([a-zA-Z\s]+?)\s*(?:chartered\s*accountants?|ca\s*firm)/i);
            if (caMatch && !caMatch[0].toLowerCase().includes("any ")) {
                let words = caMatch[1].trim().split(/\s+/);
                let firmWords = words.slice(-3);
                while(firmWords.length > 0 && stopWords.includes(firmWords[0].toLowerCase())) firmWords.shift();
                if (firmWords.length > 0 && firmWords.join(" ").length > 2) firm = firmWords.join(" ").replace(/\b\w/g, l => l.toUpperCase());
            }
        }
    }
    return { firm, city };
}
// ==========================================
// 📡 FIREBASE & STATE MANAGEMENT
// ==========================================
// FIX: Removed invalid markdown link syntax
const FIREBASE_URL = 'https://caversity-48b29-default-rtdb.firebaseio.com';
let allData = [];
let currentLiveType = 'hot'; 

async function loadFirebaseData() {
    try {
        let resInd = await fetch(`${FIREBASE_URL}/inductions.json`);
        let dataInd = await resInd.json();

        let resFb = await fetch(`${FIREBASE_URL}/feedbacks.json`);
        let dataFb = await resFb.json();
        
        let rawList = [];
        if (dataInd) rawList = rawList.concat(Object.values(dataInd));
        if (dataFb) rawList = rawList.concat(Object.values(dataFb));

        let processedData = [];
        let seenMessages = new Set();
        
        for (let i of rawList) {
            if (!i || !i.message) continue;

            i.message = i.message.replace(/saboor|saboir|CA Professionals Pakistan|Sawaira|Nouman/gi, '');
            
            let msgTrimmed = i.message.trim();
            if (seenMessages.has(msgTrimmed)) continue;
            seenMessages.add(msgTrimmed);

            let meta = extractMetadata(i.message);
            let msgLow = msgTrimmed.toLowerCase();
            let type = 'Induction';

          // Uses Regex \b to ensure "call" and "calling" are separate words, not part of words like "physically"
if (msgLow.includes("channel") || msgLow.includes("feedback share") || msgLow.includes("cv accepted") || msgLow.includes("received interview") || msgLow.includes("please share") || msgLow.includes("interview guidance") || msgLow.includes("updates and feedback) || msgLow.includes("conducted tomorrow") || msgLow.includes("test mail") || msgLow.includes("ca firms") || msgLow.includes("visited") || /\bcalling\b/.test(msgLow) || msgLow.includes("another toop") || msgLow.includes("umeed") || msgLow.includes("cv drop") || msgLow.includes("this post") || msgLow.includes("interview call") || msgLow.includes("update about")) {
    continue; 
}
            
            let isStrictInduction = msgLow.includes("induction alert");
           let isFeedback = msgLow.includes("gave interview") || msgLow.includes("asked questions") || msgLow.includes("interview experience") || msgLow.includes("mcqs") || msgLow.includes("penalist") || msgLow.includes("interview feedback") || msgLow.includes("gave test") || msgLow.includes("1st interview") || msgLow.includes("technical questions") || msgLow.includes("any questions");
            let isHiring = msgLow.includes("hiring") || msgLow.includes("induction") || msgLow.includes("trainee") || msgLow.includes("opportunity") || msgLow.includes("apply") || msgLow.includes("vacancies") || msgLow.includes("looking for");
            
            let isCallNotify = (msgLow.includes("received") || msgLow.includes("recieved") || msgLow.includes("got")) && (msgLow.includes("call") || msgLow.includes("email") || msgLow.includes("mail") || msgLow.includes("message"));
            let isTestNotify = msgLow.includes("test") || msgLow.includes("system") || msgLow.includes("shortlist") || msgLow.includes("schedule") || msgLow.includes("scheduled");
            let isInterviewMailNotify = msgLow.includes("interview") && (msgLow.includes("mail") || msgLow.includes("email") || msgLow.includes("message"));
            let isShort = i.message.length < 300; 
            
            if (isStrictInduction) {
                type = 'Induction';
            } else if (isShort && (isCallNotify || isTestNotify || isInterviewMailNotify) && !isFeedback && !isHiring) {
                type = 'Call Alert';
            } else if (isFeedback || msgLow.includes("interview") || msgLow.includes("feedback")) {
                type = 'Feedback';
            } else if (isHiring) {
                type = 'Induction';
            }

            if (type !== 'Call Alert') {
                processedData.push({...i, type: type, ...meta});
            }
        }

        allData = processedData.sort((a, b) => {
            return getValidDate(b).getTime() - getValidDate(a).getTime();
        });
        
        applyFilters(); 
        populateInterviewList();
            
    } catch (error) {
        console.error("Firebase Load Error:", error);
        document.getElementById('feed-container').innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i> Error loading intelligence data.</div>';
    }
}

// ==========================================
// 🎛️ UI & FILTER LOGIC
// ==========================================
function getValidDate(item) {
    if (item.time) { 
        let dateStr = item.time.split(",")[0].trim();
        let parts = dateStr.split(/[\/\-]/);
        let dateObj;
        
        if (parts.length === 3) {
            if (parts[2].length === 4) {
                dateObj = new Date(`${parts[2]}/${parts[1]}/${parts[0]}`);
            } else if (parts[0].length === 4) {
                dateObj = new Date(`${parts[0]}/${parts[1]}/${parts[2]}`);
            } else {
                dateObj = new Date(dateStr.replace(/-/g, '/'));
            }
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
// 🏢 FIRM DIRECTORY & AUTO-SAVE FIREBASE SYSTEM
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
    } catch(e) { console.warn("API firms fetch failed. Check your Vercel functions.", e); }

    try {
        let res = await fetch(`${FIREBASE_URL}/firms_directory.json`);
        let data = await res.json();
        if (data) {
            let dbFirms = Object.values(data);
            dbFirms.forEach(dbFirm => {
                let exists = firebaseFirms.some(f => f.name.toLowerCase() === dbFirm.name.toLowerCase() && f.city === dbFirm.city);
                if(!exists) firebaseFirms.push(dbFirm);
            });
        }
        searchDirectory();
    } catch(e) { console.error("Firebase Directory Load Error:", e); }
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
            fetch(`${FIREBASE_URL}/firms_directory.json`, { method: 'POST', body: JSON.stringify(newFirm) }).catch(e => console.error(e));

            // FIX: Repaired the broken iframe markdown
            container.innerHTML = `
                <div style="background: rgba(16, 185, 129, 0.1); border: 1px dashed #10b981; padding: 15px; border-radius: 12px; margin-bottom: 20px; color: #cbd5e1; text-align: center; font-size: 14px;">
                    <i class="fas fa-database" style="color: #10b981; margin-right: 5px;"></i> Firm not found in local DB. <strong>Auto-Detected via Live Radar & Saved to Database permanently!</strong> 👇
                </div>
                <div class="dir-card">
                    <div class="dir-info">
                        <h3>${newFirm.name}</h3>
                        <div class="dir-detail"><i class="fas fa-map-marker-alt"></i> <span><strong>Location:</strong> ${fullCityStr} (${newFirm.address})</span></div>
                        <div class="dir-detail"><i class="fas fa-info-circle"></i> <span>Phone/Email not verified in local database yet.</span></div>
                        <button id="btn-${firmId}" class="btn-research"onclick="doDeepResearch('${newFirm.name}', '${newFirm.city}', '${firmId}', '${newFirm.address.replace(/'/g, "\\'")}')"><i class="fas fa-microchip"></i> Deep Research (Partners & HR)</button>
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

        // FIX: Repaired the broken iframe markdown
        container.innerHTML += `
            <div class="dir-card">
                <div class="dir-info">
                    <h3>${firm.name}</h3>
                    <div class="dir-detail"><i class="fas fa-map-marker-alt"></i> <span><strong>${firm.city}:</strong> ${firm.address}</span></div>
                    ${phoneHtml}
                    ${emailHtml}
                    <button id="btn-${firmId}" class="btn-research"onclick="doDeepResearch('${firm.name}', '${firm.city}', '${firmId}', '${firm.address.replace(/'/g, "\\'")}')"><i class="fas fa-microchip"></i> Deep Research (Partners & HR)</button>
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
        let fbRes = await fetch(`${FIREBASE_URL}/firm_personnel/${domId}.json`);
        let fbData = await fbRes.json();
        
        // 🔥 FIX: Ab agar data empty bhi hua toh Firebase read karega aur wahi se dikhayega!
        if (fbData !== null) { 
            let dataToRender = fbData.empty ? [] : fbData;
            renderPersonnel(dataToRender, container, firmName); 
            return; 
        }
        
        const prompt = "You are an elite corporate researcher. Find 1 to 3 actual Key Personnel (Partners, Directors, or HR) for the CA Firm '" + firmName + "' located at '" + address + "', '" + city + "', Pakistan. CRITICAL RULES: 1. You MUST ONLY use real, verifiable names and emails associated with this specific office. 2. DO NOT invent names. DO NOT generate fake generic HR departments. 3. If you cannot find REAL public data for this specific firm, you MUST return an empty array []. 4. Return ONLY a valid JSON array. Format: " + '[{"name": "Real Name", "position": "Title", "contact": "email@domain.com"}]';
        
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: { "Authorization": "Bearer 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", "Content-Type": "application/json" },
            body: JSON.stringify({ model: "llama-3.3-70b-versatile", messages: [{ role: "system", content: prompt }], temperature: 0.1 })
        });
        
        let groqData = await groqRes.json();
        let content = groqData.choices[0].message.content.trim();
        let jsonMatch = content.match(/\[\s*\{[\s\S]*\}\s*\]/) || content.match(/\[\s*\]/);
        let personnelData = [];
        
        if (jsonMatch) {
            personnelData = JSON.parse(jsonMatch[0]);
        } else {
            personnelData = JSON.parse(content.replace(/```json/gi, '').replace(/```/g, '').trim());
        }
        
        // 🔥 FIX: Empty array ki jagah {empty: true} object save karain taky Firebase node delete na kary!
        let saveData = personnelData.length === 0 ? { empty: true } : personnelData;
        await fetch(`${FIREBASE_URL}/firm_personnel/${domId}.json`, { method: 'PUT', body: JSON.stringify(saveData) });
        
        renderPersonnel(personnelData, container, firmName);
    } catch (e) {
        console.error("Deep Research Error:", e);
        container.innerHTML = '<div style="color:#ef4444; font-size:13px; font-weight:600;"><i class="fas fa-exclamation-triangle"></i> No data found or request failed.</div>';
        if(btn) btn.style.display = 'inline-flex';
    }
}

function renderPersonnel(data, container, firmName) {
    if(!data || data.length === 0) { container.innerHTML = '<div style="font-size:13px; color:#64748b; font-weight:600;">No public personnel data found.</div>'; return; }
    let html = '';
    data.forEach(p => {
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
// 🎙️ LIVE MOCK INTERVIEW FIRM LIST & REDIRECT
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
// 📈 AI TREND PREDICTION & CACHING LOGIC
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
    const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    try {
        let cacheRes = await fetch(`${FIREBASE_URL}/firm_trends/${firmId}.json`);
        let cachedData = await cacheRes.json();

        if (cachedData && cachedData.timestamp && (now - cachedData.timestamp) < TWO_WEEKS_MS) {
            dateLabel.innerHTML = `<i class="fas fa-check-circle"></i> AI Insight Ready`;
            contentBox.innerHTML = cachedData.htmlReport;
            return;
        }

        let firmFeedbacks = allData.filter(item => item.firm === firmName && item.type === 'Feedback');
        firmFeedbacks.sort((a, b) => getValidDate(b).getTime() - getValidDate(a).getTime());
        
        let targetFeedbacks = firmFeedbacks.slice(0, 7);
        if (targetFeedbacks.length === 0) {
            contentBox.innerHTML = '<div class="empty-state">Not enough recent interview data to generate a reliable AI prediction.</div>';
            return;
        }

        let combinedText = targetFeedbacks.map(f => `- ${f.message}`).join('\n\n');

        const prompt = "You are an elite Career Consultant specializing in CA articleship interviews. Analyze the following recent interview feedbacks for the firm '" + firmName + "'. Strictly extract and predict: 1. The most frequent technical topics asked. 2. Common exact interview questions. 3. Overall interview structure/style. CRITICAL RULES: - Prioritize technical topics and common questions heavily over HR details. - Respond ONLY with clean HTML elements (use h4, ul, li, p tags). Do NOT use any markdown backticks or markdown code block syntax. Start directly with the raw HTML text. - Keep the tone highly professional, objective, and insightful. - Do not mention the word 'feedback', act as if you are providing an 'Interview Blueprint' or 'Prediction'. Feedbacks to analyze:\n" + combinedText;

        // FIX: Removed invalid markdown link syntax
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: { 
                "Authorization": "Bearer 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", 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ 
                model: "llama-3.3-70b-versatile", 
                messages: [{ role: "system", content: prompt }], 
                temperature: 0.3 
            })
        });

        let groqData = await groqRes.json();
        let reportHtml = groqData.choices[0].message.content.replace(/```html/gi, '').replace(/```/g, '').trim();

        await fetch(`${FIREBASE_URL}/firm_trends/${firmId}.json`, { 
            method: 'PUT', 
            body: JSON.stringify({
                timestamp: now,
                htmlReport: reportHtml
            }) 
        });

        dateLabel.innerHTML = `<i class="fas fa-magic"></i> Fresh AI Prediction`;
        contentBox.innerHTML = reportHtml;

    } catch (error) {
        console.error("Trend Generation Error:", error);
        contentBox.innerHTML = '<div style="color:#ef4444; font-size:14px; font-weight:600; text-align:center;"><i class="fas fa-exclamation-triangle"></i> Failed to generate report. Please try again.</div>';
    }
};

// ==========================================
// 📄 PDF GENERATION LOGIC (A4 FORMAT - FIXED BLANK PAGE BUG)
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

    // FIXED CONFIGURATION FOR FIXED MODALS
    const opt = {
        margin:       0.4, // Clean padding for A4
        filename:     fileName,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
            scale: 2, 
            useCORS: true, 
            scrollY: 0,   // 🔥 CRITICAL FIX: Forces html2canvas to ignore page scroll
            scrollX: 0,   // 🔥 CRITICAL FIX: Prevents horizontal shift
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
