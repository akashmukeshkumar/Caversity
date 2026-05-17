        // ==========================================
        // 🧠 THE BRAIN: SMART ALIAS EXTRACTION SYSTEM
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
            { id: "Baker Tilly", aliases: ["baker tilly", "mehmood idrees"] },
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
            { id: "Baker Tilly", aliases: ["baker tilly", "Bakertilly", "BT"] },
            { id: "Reanda Haroon Zakaria", aliases: ["reanda", "reanda haroon", "haroon zakaria"] }
        ];

        const CITY_MAPPINGS = [
            { id: "Karachi", aliases: ["karachi", "khi"] },
            { id: "Lahore", aliases: ["lahore", "lhr"] },
            { id: "Islamabad", aliases: ["islamabad", "isb"] },
            { id: "Rawalpindi", aliases: ["rawalpindi", "pindi", "rwp"] },
            { id: "Faisalabad", aliases: ["faisalabad", "Faisalabad", "Faislabad", "fsd"] },
            { id: "Multan", aliases: ["multan", "mux"] },
            { id: "Peshawar", aliases: ["peshawar", "pew"] },
            { id: "Gujranwala", aliases: ["gujranwala", "grw"] },
            { id: "Sialkot", aliases: ["sialkot", "skt"] },
            { id: "Quetta", aliases: ["quetta", "qta"] }
        ];

        function extractMetadata(text) {
            let lowerText = text.toLowerCase();
            let firm = "Unspecified Firm";
            let city = "Unspecified City";

            for (let c of CITY_MAPPINGS) {
                if (c.aliases.some(alias => new RegExp(`\\b${alias}\\b`, 'i').test(lowerText))) {
                    city = c.id;
                    break;
                }
            }

            for (let f of FIRM_MAPPINGS) {
                if (f.aliases.some(alias => new RegExp(`\\b${alias}\\b`, 'i').test(lowerText))) {
                    firm = f.id;
                    break;
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
                    
                    let msgTrimmed = i.message.trim();
                    if (seenMessages.has(msgTrimmed)) continue;
                    seenMessages.add(msgTrimmed);

                    let meta = extractMetadata(i.message);
                    let msgLow = msgTrimmed.toLowerCase();
                    let type = 'Induction';
                    
                    // Smart Categorization Logic
                    let isFeedback = msgLow.includes("gave interview") || msgLow.includes("asked questions") || msgLow.includes("interview experience") || msgLow.includes("penalist") || msgLow.includes("interview feedback");
                    let isHiring = msgLow.includes("hiring") || msgLow.includes("induction") || msgLow.includes("trainee") || msgLow.includes("opportunity") || msgLow.includes("apply") || msgLow.includes("vacancies") || msgLow.includes("looking for");
                    
                    let isCallNotify = (msgLow.includes("received") || msgLow.includes("recieved") || msgLow.includes("got")) && (msgLow.includes("call") || msgLow.includes("email") || msgLow.includes("mail") || msgLow.includes("message"));
                    let isTestNotify = msgLow.includes("test") || msgLow.includes("system") || msgLow.includes("shortlist") || msgLow.includes("schedule") || msgLow.includes("scheduled");
                    let isInterviewMailNotify = msgLow.includes("interview") && (msgLow.includes("mail") || msgLow.includes("email") || msgLow.includes("message"));
                    let isShort = i.message.length < 300; 
                    
                    if (isShort && (isCallNotify || isTestNotify || isInterviewMailNotify) && !isFeedback && !isHiring) {
                        type = 'Call Alert';
                    } else if (isFeedback || msgLow.includes("interview") || msgLow.includes("feedback")) {
                        type = 'Feedback';
                    } else if (isHiring) {
                        type = 'Induction';
                    }

                    // Only keep non-Call Alerts (Hides Shortlist/Call messages completely)
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
                // 1. Primary: Extract exactly the date part before comma "15/05/2026, 1:16:00 am" -> "15/05/2026"
                let dateStr = item.time.split(",")[0].trim();
                let parts = dateStr.split(/[\/\-]/); // Split by slash or dash
                let dateObj;
                
                // Safari/iOS strict date parsing fix (Converts DD/MM/YYYY to YYYY/MM/DD safely)
                if (parts.length === 3) {
                    if (parts[2].length === 4) {
                        // Format is DD/MM/YYYY
                        dateObj = new Date(`${parts[2]}/${parts[1]}/${parts[0]}`);
                    } else if (parts[0].length === 4) {
                        // Format is YYYY/MM/DD
                        dateObj = new Date(`${parts[0]}/${parts[1]}/${parts[2]}`);
                    } else {
                        dateObj = new Date(dateStr.replace(/-/g, '/'));
                    }
                } else {
                    dateObj = new Date(dateStr.replace(/-/g, '/'));
                }

                if (!isNaN(dateObj.getTime())) return dateObj;
            }
            
            // 2. Fallback: If 'time' string is missing or invalid, use Timestamp
            let ts = parseInt(item.timestamp);
            if (!isNaN(ts) && ts > 0) { 
                if (ts < 10000000000) ts *= 1000; // Handle seconds vs milliseconds automatically
                return new Date(ts); 
            }

            // Absolute fallback to current time
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

                    container.innerHTML = `
                        <div style="background: rgba(16, 185, 129, 0.1); border: 1px dashed #10b981; padding: 15px; border-radius: 12px; margin-bottom: 20px; color: #cbd5e1; text-align: center; font-size: 14px;">
                            <i class="fas fa-database" style="color: #10b981; margin-right: 5px;"></i> Firm not found in local DB. <strong>Auto-Detected via Live Radar & Saved to Database permanently!</strong> 👇
                        </div>
                        <div class="dir-card">
                            <div class="dir-info">
                                <h3>${newFirm.name}</h3>
                                <div class="dir-detail"><i class="fas fa-map-marker-alt"></i> <span><strong>Location:</strong> ${fullCityStr} (${newFirm.address})</span></div>
                                <div class="dir-detail"><i class="fas fa-info-circle"></i> <span>Phone/Email not verified in local database yet.</span></div>
                                <button id="btn-${firmId}" class="btn-research" onclick="doDeepResearch('${newFirm.name}', '${newFirm.city}', '${firmId}')"><i class="fas fa-microchip"></i> Deep Research (Partners & HR)</button>
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
                            <button id="btn-${firmId}" class="btn-research" onclick="doDeepResearch('${firm.name}', '${firm.city}', '${firmId}')"><i class="fas fa-microchip"></i> Deep Research (Partners & HR)</button>
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

        async function doDeepResearch(firmName, city, domId) {
            const btn = document.getElementById('btn-' + domId);
            const container = document.getElementById('res-' + domId);
            if(btn) btn.style.display = 'none';
            container.innerHTML = '<div style="color:#8b5cf6; font-size:13px; font-weight:600; padding:10px;"><i class="fas fa-spinner fa-spin"></i> AI is extracting key personnel data...</div>';
            
            try {
                let fbRes = await fetch(`${FIREBASE_URL}/firm_personnel/${domId}.json`);
                let fbData = await fbRes.json();
                
                if (fbData && fbData.length > 0) { renderPersonnel(fbData, container, firmName); return; }
                
                const prompt = `You are a highly accurate corporate researcher. Find up to 3 actual, verifiable Key Personnel (can be all Partners, Directors, or HR) and their official emails for the CA Firm '${firmName}' located in '${city}', Pakistan. Return ONLY a valid JSON array. Format: [{"name": "Real Name", "position": "Title", "contact": "email@address.com"}]. CRITICAL RULES: 1) DO NOT hallucinate or invent names (e.g., 'Muhammad Ali'). If you cannot find real, verifiable people for this specific firm, return an empty array []. 2) If exact email is unknown but the person is real, return "N/A" in contact. NO markdown, ONLY valid JSON.`;
                
                const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                    method: "POST",
                    headers: { "Authorization": "Bearer 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", "Content-Type": "application/json" },
                    body: JSON.stringify({ model: "llama-3.3-70b-versatile", messages: [{ role: "system", content: prompt }], temperature: 0.2 })
                });
                
                let groqData = await groqRes.json();
                let rawJson = groqData.choices[0].message.content.replace(/```json/gi, '').replace(/```/g, '').trim();
                let personnelData = JSON.parse(rawJson);
                
                await fetch(`${FIREBASE_URL}/firm_personnel/${domId}.json`, { method: 'PUT', body: JSON.stringify(personnelData) });
                renderPersonnel(personnelData, container, firmName);
            } catch (e) {
                console.error("Deep Research Error:", e);
                container.innerHTML = '<div style="color:#ef4444; font-size:13px; font-weight:600;"><i class="fas fa-exclamation-triangle"></i> Research failed. Please refresh and try again.</div>';
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
                    <div style="background: rgba(255,255,255,0.8); border: 1px solid #e2e8f0; border-radius: 12px; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                        <div>
                            <h3 style="margin: 0 0 5px 0; color: #1e293b; font-size: 16px;">${firm}</h3>
                            <span style="font-size: 12px; color: #64748b; background: #f1f5f9; padding: 4px 8px; border-radius: 4px;"><i class="fas fa-robot" style="color: #3b82f6;"></i> AI Powered</span>
                        </div>
                        <button onclick="startMockInterview('${firm.replace(/'/g, "\\'")}')" style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: 0.2s;">
                            Start Interview
                        </button>
                    </div>
                `;
            });
        };
