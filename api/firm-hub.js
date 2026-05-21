// ==========================================
// 🔒 SECURE BACKEND: api/firm-hub.js
// Vercel Serverless Function
// ==========================================

const FIREBASE_URL = 'https://caversity-48b29-default-rtdb.firebaseio.com';
const GROQ_RESEARCH_KEY = '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';
const GROQ_TREND_KEY = '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';

const FIRM_MAPPINGS = [
    { id: "A.F. Ferguson (PwC)", aliases: ["ferguson", "aff", "pwc", "a.f. ferguson", "price waterhouse"] },
    { id: "KPMG Taseer Hadi", aliases: ["kpmg", "taseer hadi"] },
    { id: "EY Ford Rhodes", aliases: ["ey", "ernst & young", "ford rhodes", "ernst and young", "eyfr", "ey fords rhodes"] },
    { id: "Yousuf Adil (Deloitte)", aliases: ["deloitte", "yousuf adil", "yusuf adil", "yousaf adil", "ya", "yousif adil"] },
    { id: "BDO Ebrahim", aliases: ["bdo", "ebrahim", "ibrahim"] },
    { id: "Grant Thornton", aliases: ["grant thornton", "gt", "gth"] },
    { id: "Forvis Mazars", aliases: ["forvis", "mazars"] },
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
    { id: "YB Holdings", aliases: ["YB holdings", "yb holding", "yb"] },
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

function extractMetadata(text, firebaseFirms = []) {
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

    if (firm === "Unspecified Firm" && firebaseFirms.length > 0) {
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

export default async function handler(req, res) {
    const action = req.query.action || req.body?.action;

    try {
        if (action === 'loadFeed') {
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

                if (msgLow.includes("channel") || msgLow.includes("feedback share") || msgLow.includes("cv accepted") || msgLow.includes("received interview") || msgLow.includes("please share") || msgLow.includes("interview guidance") || msgLow.includes("conducted tomorrow") || msgLow.includes("test mail") || msgLow.includes("ca firms") || msgLow.includes("visited") || /\bcalling\b/.test(msgLow) || /\btoop\b/.test(msgLow) || msgLow.includes("update about") || msgLow.includes("umeed") || msgLow.includes("cv drop") || msgLow.includes("this post") || msgLow.includes("interview call") || msgLow.includes("updates and feedback")) {
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

            processedData.sort((a, b) => getValidDate(b).getTime() - getValidDate(a).getTime());
            return res.status(200).json(processedData);
        }

        if (action === 'loadDirectory') {
            let resDb = await fetch(`${FIREBASE_URL}/firms_directory.json`);
            let data = await resDb.json();
            let dbFirms = data ? Object.values(data) : [];
            return res.status(200).json(dbFirms);
        }

        if (action === 'saveFirm') {
            const { newFirm } = req.body;
            await fetch(`${FIREBASE_URL}/firms_directory.json`, { method: 'POST', body: JSON.stringify(newFirm) });
            return res.status(200).json({ success: true });
        }

        if (action === 'deepResearch') {
            const { firmName, city, domId, address } = req.body;
            
            let fbRes = await fetch(`${FIREBASE_URL}/firm_personnel/${domId}.json`);
            let fbData = await fbRes.json();
            
            if (fbData !== null) { 
                return res.status(200).json(fbData.empty ? [] : fbData); 
            }
            
            const prompt = "You are an elite corporate researcher. Find 1 to 3 actual Key Personnel (Partners, Directors, or HR) for the CA Firm '" + firmName + "' located at '" + address + "', '" + city + "', Pakistan. CRITICAL RULES: 1. You MUST ONLY use real, verifiable names and emails associated with this specific office. 2. DO NOT invent names. DO NOT generate fake generic HR departments. 3. If you cannot find REAL public data for this specific firm, you MUST return an empty array []. 4. Return ONLY a valid JSON array. Format: " + '[{"name": "Real Name", "position": "Title", "contact": "email@domain.com"}]';
            
            const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: { "Authorization": `Bearer ${GROQ_RESEARCH_KEY}`, "Content-Type": "application/json" },
                body: JSON.stringify({ model: "llama-3.3-70b-versatile", messages: [{ role: "system", content: prompt }], temperature: 0.1 })
            });
            
            let groqData = await groqRes.json();
            let content = groqData.choices[0].message.content.trim();
            let jsonMatch = content.match(/\[\s*\{[\s\S]*\}\s*\]/) || content.match(/\[\s*\]/);
            let personnelData = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(content.replace(/```json/gi, '').replace(/```/g, '').trim());
            
            let saveData = personnelData.length === 0 ? { empty: true } : personnelData;
            await fetch(`${FIREBASE_URL}/firm_personnel/${domId}.json`, { method: 'PUT', body: JSON.stringify(saveData) });
            
            return res.status(200).json(personnelData);
        }

        if (action === 'generateTrend') {
            const { firmName, firmId, targetFeedbacks } = req.body;
            const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;
            const now = Date.now();

            let cacheRes = await fetch(`${FIREBASE_URL}/firm_trends/${firmId}.json`);
            let cachedData = await cacheRes.json();

            if (cachedData && cachedData.timestamp && (now - cachedData.timestamp) < TWO_WEEKS_MS) {
                return res.status(200).json({ htmlReport: cachedData.htmlReport, cached: true });
            }

            if (!targetFeedbacks || targetFeedbacks.length === 0) {
                return res.status(400).json({ error: "Not enough recent interview data." });
            }

            let combinedText = targetFeedbacks.map(f => `- ${f.message}`).join('\n\n');
            const prompt = "You are an elite Career Consultant specializing in CA articleship interviews. Analyze the following recent interview feedbacks for the firm '" + firmName + "'. Strictly extract and predict: 1. The most frequent technical topics asked. 2. Common exact interview questions. 3. Overall interview structure/style. CRITICAL RULES: - Prioritize technical topics and common questions heavily over HR details. - Respond ONLY with clean HTML elements (use h4, ul, li, p tags). Do NOT use any markdown backticks or markdown code block syntax. Start directly with the raw HTML text. - Keep the tone highly professional, objective, and insightful. - Do not mention the word 'feedback', act as if you are providing an 'Interview Blueprint' or 'Prediction'. Feedbacks to analyze:\n" + combinedText;

            const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: { "Authorization": `Bearer ${GROQ_TREND_KEY}`, "Content-Type": "application/json" },
                body: JSON.stringify({ model: "llama-3.3-70b-versatile", messages: [{ role: "system", content: prompt }], temperature: 0.3 })
            });

            let groqData = await groqRes.json();
            let reportHtml = groqData.choices[0].message.content.replace(/```html/gi, '').replace(/```/g, '').trim();

            await fetch(`${FIREBASE_URL}/firm_trends/${firmId}.json`, { 
                method: 'PUT', 
                body: JSON.stringify({ timestamp: now, htmlReport: reportHtml }) 
            });

            return res.status(200).json({ htmlReport: reportHtml, cached: false });
        }

        return res.status(404).json({ error: "Invalid action" });

    } catch (error) {
        console.error("API Route Error:", error);
        return res.status(500).json({ error: error.message });
    }
}
