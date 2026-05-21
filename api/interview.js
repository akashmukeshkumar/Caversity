// ==========================================
// 🔒 SECURE BACKEND: api/interview.js
// Vercel Serverless Function for Interview Engine (COMBINED & 100% EXACT LOGIC)
// ==========================================

const FIREBASE_URL = 'https://caversity-48b29-default-rtdb.firebaseio.com';

// 🔒 API KEYS YAHAN SECURE HAIN (Rotating Keys for Fallback) 🔒
const GROQ_API_KEYS = [
    "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",
    "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",
    "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",
    "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",
    "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"
];

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
    { id: "Junaidy Shoaib Asad (JSA)", aliases: ["junaidy shoaib asad", "junaidi shoaib asad", "jsa"] },
    { id: "Salman & Raheel (SRCA)", aliases: ["salman & raheel", "salman and raheel", "srca"] },
    { id: "YB Holdings", aliases: ["yb holdings", "yb holding", "yb"] }
];

function getCleanFirmName(text, existingFirm) {
    let lowerText = text.toLowerCase();
    let firm = existingFirm || "Unspecified Firm";
    
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
    return firm;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const action = req.body?.action || req.query?.action;
    const { candidateData, messages, firm } = req.body || {};

    try {
        // --- PING ACTION ---
        if (action === 'ping') {
            try {
                const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                    method: "POST",
                    headers: { "Authorization": `Bearer ${GROQ_API_KEYS[0]}`, "Content-Type": "application/json" },
                    body: JSON.stringify({ model: "llama-3.3-70b-versatile", messages: [{"role": "system", "content": "ping"}], max_tokens: 1 })
                });
                if (response.ok) return res.status(200).json({ status: "ok", success: true });
            } catch (e) { return res.status(500).json({ error: "API down" }); }
            return res.status(200).json({ success: true });
        }

        // --- GET FIRMS ACTION ---
        if (action === 'getFirms') {
            const fbRes = await fetch(`${FIREBASE_URL}/feedbacks.json`);
            const fbData = await fbRes.json();
            let interviewFirms = new Set();

            if (fbData) {
                Object.values(fbData).forEach(item => {
                    if (!item || !item.message) return;
                    let msgLow = item.message.toLowerCase();
                    
                    // 100% EXACT ORIGINAL LOGIC 
                    if (msgLow.includes("channel") || msgLow.includes("feedback share") || msgLow.includes("cv accepted") || msgLow.includes("received interview") || msgLow.includes("please share") || msgLow.includes("interview guidance") || msgLow.includes("conducted tomorrow") || msgLow.includes("test mail") || msgLow.includes("ca firms") || msgLow.includes("visited") || /\bcalling\b/.test(msgLow) || msgLow.includes("another toop") || msgLow.includes("update about") || msgLow.includes("umeed") || msgLow.includes("cv drop") || msgLow.includes("this post") || msgLow.includes("interview call") || msgLow.includes("updates and feedback")) {
                        return; 
                    }
                        
                    let type = 'Induction';
                    let isStrictInduction = msgLow.includes("induction alert");
                    let isFeedback = msgLow.includes("gave interview") || msgLow.includes("asked questions") || msgLow.includes("interview experience") || msgLow.includes("mcqs") || msgLow.includes("penalist") || msgLow.includes("interview feedback") || msgLow.includes("gave test") || msgLow.includes("1st interview") || msgLow.includes("technical questions") || msgLow.includes("any questions");
                    let isHiring = msgLow.includes("hiring") || msgLow.includes("induction") || msgLow.includes("trainee") || msgLow.includes("opportunity") || msgLow.includes("apply") || msgLow.includes("vacancies") || msgLow.includes("looking for");
                    
                    let isCallNotify = (msgLow.includes("received") || msgLow.includes("recieved") || msgLow.includes("got")) && (msgLow.includes("call") || msgLow.includes("email") || msgLow.includes("mail") || msgLow.includes("message"));
                    let isTestNotify = msgLow.includes("test") || msgLow.includes("system") || msgLow.includes("shortlist") || msgLow.includes("schedule") || msgLow.includes("scheduled");
                    let isInterviewMailNotify = msgLow.includes("interview") && (msgLow.includes("mail") || msgLow.includes("email") || msgLow.includes("message"));
                    let isShort = item.message.length < 300; 
                    
                    if (isStrictInduction) {
                        type = 'Induction';
                    } else if (isShort && (isCallNotify || isTestNotify || isInterviewMailNotify) && !isFeedback && !isHiring) {
                        type = 'Call Alert';
                    } else if (isFeedback || msgLow.includes("interview") || msgLow.includes("feedback")) {
                        type = 'Feedback';
                    } else if (isHiring) {
                        type = 'Induction';
                    }

                    if (type === 'Feedback') {
                        let cleanFirm = getCleanFirmName(item.message, item.firm);
                        if (cleanFirm !== "Unspecified Firm") interviewFirms.add(cleanFirm);
                    }
                });
            }
            return res.status(200).json(Array.from(interviewFirms).sort());
        }

        // --- GET FIRM HISTORY ACTION ---
        if (action === 'getFirmHistory') {
            const fbRes = await fetch(`${FIREBASE_URL}/feedbacks.json`);
            const fbData = await fbRes.json();
            let firmHistoryText = "No specific recent feedback available. Proceed with general firm technicals.";

            if (fbData) {
                const now = Date.now();
                const SIXTY_DAYS = 60 * 24 * 60 * 60 * 1000;
                let recentQuestions = [];

                Object.values(fbData).forEach(item => {
                    if (!item || !item.message) return;
                    let msgLow = item.message.toLowerCase();
                    
                    // 100% EXACT ORIGINAL LOGIC 
                    if (msgLow.includes("channel") || msgLow.includes("feedback share") || msgLow.includes("cv accepted") || msgLow.includes("received interview") || msgLow.includes("please share") || msgLow.includes("interview guidance") || msgLow.includes("conducted tomorrow") || msgLow.includes("test mail") || msgLow.includes("ca firms") || msgLow.includes("visited") || /\bcalling\b/.test(msgLow) || msgLow.includes("another toop") || msgLow.includes("update about") || msgLow.includes("umeed") || msgLow.includes("cv drop") || msgLow.includes("this post") || msgLow.includes("interview call") || msgLow.includes("updates and feedback")) {
                        return; 
                    }
                        
                    let type = 'Induction';
                    let isStrictInduction = msgLow.includes("induction alert");
                    let isFeedback = msgLow.includes("gave interview") || msgLow.includes("asked questions") || msgLow.includes("interview experience") || msgLow.includes("mcqs") || msgLow.includes("penalist") || msgLow.includes("interview feedback") || msgLow.includes("gave test") || msgLow.includes("1st interview") || msgLow.includes("technical questions") || msgLow.includes("any questions");
                    let isHiring = msgLow.includes("hiring") || msgLow.includes("induction") || msgLow.includes("trainee") || msgLow.includes("opportunity") || msgLow.includes("apply") || msgLow.includes("vacancies") || msgLow.includes("looking for");
                    
                    let isCallNotify = (msgLow.includes("received") || msgLow.includes("recieved") || msgLow.includes("got")) && (msgLow.includes("call") || msgLow.includes("email") || msgLow.includes("mail") || msgLow.includes("message"));
                    let isTestNotify = msgLow.includes("test") || msgLow.includes("system") || msgLow.includes("shortlist") || msgLow.includes("schedule") || msgLow.includes("scheduled");
                    let isInterviewMailNotify = msgLow.includes("interview") && (msgLow.includes("mail") || msgLow.includes("email") || msgLow.includes("message"));
                    let isShort = item.message.length < 300; 
                    
                    if (isStrictInduction) {
                        type = 'Induction';
                    } else if (isShort && (isCallNotify || isTestNotify || isInterviewMailNotify) && !isFeedback && !isHiring) {
                        type = 'Call Alert';
                    } else if (isFeedback || msgLow.includes("interview") || msgLow.includes("feedback")) {
                        type = 'Feedback';
                    } else if (isHiring) {
                        type = 'Induction';
                    }

                    if (type === 'Feedback') {
                        let cleanFirm = getCleanFirmName(item.message, item.firm);
                        if (cleanFirm === firm && item.timestamp && (now - item.timestamp <= SIXTY_DAYS)) {
                            recentQuestions.push(item.message.replace(/\*/g, '').trim());
                        }
                    }
                });

                if (recentQuestions.length > 0) {
                    let topQuestions = recentQuestions.reverse().slice(0, 5); 
                    firmHistoryText = topQuestions.join("\n---\n");
                }
            }
            return res.status(200).json({ firmHistoryText });
        }

        // --- CHAT & EVALUATE ACTIONS ---
        if (action === 'chat' || action === 'evaluate') {
            let finalMessages = [];

            if (action === 'chat') {
                const prompt = `You are a highly experienced Senior Interviewer (Partner/Director) conducting a realistic, 10-minute final interview for an Articleship (Trainee) position at ${candidateData.firm}.
CRITICAL CONTEXT: The candidate is a "CAF Qualified" student in Pakistan with NO practical experience. They are applying for a mandatory apprenticeship to LEARN. 

TONE & PERSONALITY: You are a strict, poker-faced, and highly professional interviewer. Do not get angry unless they mess up.
OPENING MOVE: Simply ask them to introduce themselves and their CV. No insults in the first message.

Candidate Name: ${candidateData.name}
Candidate's Resume Text (Extract): ${candidateData.cvText.substring(0, 800)}...

🔥 DATA SOURCE: FIRM'S ACTUAL INTERVIEW HISTORY (Past 2 Months):
${candidateData.firmHistory ? candidateData.firmHistory.substring(0, 2000) : "No recent history. Proceed with standard rigorous CA interview."}

STRICT RULES FOR A FLAWLESS, HUMAN-LIKE INTERVIEW:

[QUESTION STRATEGY - THE SUPER PROMPT]
1. Start by asking 1 or 2 questions strictly from their CV (experience, skills, or education).
2. Then, transition smoothly into asking 2 to 3 technical or tricky questions based EXACTLY on the 'FIRM'S ACTUAL INTERVIEW HISTORY' provided above. Twist the scenarios slightly so it doesn't sound robotic.
3. If no actual history is available, ask general difficult Audit/Tax/IFRS questions relevant to a CA student.

[BANNED QUESTIONS - CRITICAL]
4. NO GENERIC HR QUESTIONS: NEVER ask "Why should we hire you?", "What can you do for our firm?", "How will you add value?", or "Where do you see yourself?". Test their existing syllabus knowledge, ethics, and stamina ONLY.

[LENGTH & FLOW]
5. EXTREMELY SHORT RESPONSES: Your response MUST be strictly 1 or 2 short sentences. Ask EXACTLY ONE question at a time. Wait for their response. NEVER write long paragraphs. 
6. NO ROBOTIC TRANSITIONS: NEVER use phrases like "Next question", "Moving on", or "Let's talk about...". Ask the next question directly and abruptly.
7. THE FIRST MESSAGE: Ask the opening question normally. Do NOT scold or taunt them in the very first message.

[BALANCED PSYCHOLOGY & TONE]
8. ACT NATURAL: Behave like a normal, strict professional. ONLY taunt or get angry IF they give multiple wrong answers, act casual, or say "I don't know".
9. NO "KID": Address them by their name (${candidateData.name}) or speak directly. Never use "kid" or "boy".
10. NO SPOON-FEEDING & NO VALIDATION: NEVER say "Good" or "That's correct". NEVER explain the correct answer. 

[DRILLING & TERMINATION - THE TERMINATION TRIGGER IS MANDATORY]
11. HANDLING 'I DONT KNOW': If the candidate says "I don't know" once or twice, DO NOT terminate the interview. Give a very brief cold answer and move to the next question.
12. MEMORY TRAPS: If they contradict a previous answer, calmly point out their lie and question their integrity. 
13. NO SYMPATHY: If they say "Sorry sir", reply coldly (e.g., "Sorry won't clear the audit.") and fire the next question.
14. THE WARNING SYSTEM: If they talk off-topic, test the AI ("Who made you?"), or act informal, give ONE short warning. If repeated, output EXACTLY: "[INTERVIEW TERMINATED]" at the end of your scolding.
15. SHATTER CONFIDENCE ON CONTINUOUS FAILURE: If they stay completely silent, act highly vulgar/abusive, OR completely fail 5 to 7 questions continuously, shatter their confidence naturally. YOU MUST APPEND EXACTLY "[INTERVIEW TERMINATED]" at the very end.
16. MANDATORY RULE: If you tell the candidate to leave your office, or if you decide the interview is over due to incompetence or disrespect, YOU CANNOT JUST SAY IT IN ENGLISH. You MUST include the exact tag "[INTERVIEW TERMINATED]" so the system knows to cut the call.
17. FORMATTING: NO markdown, NO bold text. Plain text dialogue only.`;

                finalMessages = [{ role: "system", content: prompt }, ...messages];
            } 
            else if (action === 'evaluate') {
                const evaluationPrompt = `You are the same strict Senior Interviewer. The interview has now concluded. Provide your brutally honest, internal evaluation of the candidate.

GRADING CRITERIA & STRICT RUBRIC:
1. technical_score (0-100): 
   - Evaluate accuracy, depth, and practical application of core CAF subjects (IFRS, ISAs, Tax, Law) based on the questions asked.
   - DEDUCT HEAVILY for guessing ("I think"), wrong treatments, or giving pure bookish definitions without logic. Be a harsh grader. A score above 80 should be very rare.
2. confidence_score (0-100): 
   - Evaluate communication style, professionalism, and ability to handle your pressure and taunts.
   - DEDUCT HEAVILY for apologies ("Sorry"), excessive filler words ("Umm", "Uh"), or changing answers (memory traps).

CRITICAL PENALTY RULE: 
If the candidate remained completely silent, gave less than 2 meaningful responses, argued disrespectfully, or if you terminated the interview early with "[INTERVIEW TERMINATED]", BOTH scores MUST be severely penalized (between 5 and 15), and the verdict MUST be strictly "REJECTED".

Return ONLY a raw valid JSON object. DO NOT wrap it in markdown formatting like \`\`\`json. Just the raw JSON:
{
  "technical_score": <calculated_number_0_to_100>,
  "confidence_score": <calculated_number_0_to_100>,
  "overall_verdict": "<OFFER EXTENDED, SHORTLISTED, REVIEW NEEDED, or REJECTED>",
  "feedback": "<Extremely blunt, SHORT and TO-THE-POINT bullet points. Explicitly tell the candidate exactly what they got right and what they got wrong. DO NOT mention eye contact, webcam, or body language. STRICTLY maximum 3-4 bullet points.>"
}`;
                
                finalMessages = [...messages, { role: "user", content: evaluationPrompt }];
            }

            // 🔥 SMART API KEY FALLBACK LOGIC 🔥
            let currentKeyIndex = 0;
            while (currentKeyIndex < GROQ_API_KEYS.length) {
                try {
                    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${GROQ_API_KEYS[currentKeyIndex]}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            model: "llama-3.3-70b-versatile",
                            messages: finalMessages,
                            temperature: action === 'evaluate' ? 0.2 : 0.6,
                            max_tokens: action === 'evaluate' ? 500 : 150
                        })
                    });

                    if (!groqResponse.ok) {
                        if (groqResponse.status === 429) { currentKeyIndex++; continue; }
                        throw new Error(`Groq API Error: ${groqResponse.status}`);
                    }

                    const data = await groqResponse.json();
                    const textReply = data.choices[0].message.content;

                    return res.status(200).json({ reply: textReply });

                } catch (error) {
                    currentKeyIndex++;
                }
            }
            return res.status(500).json({ error: "Server limits exhausted. Please try again later." });
        }

        return res.status(400).json({ error: "Invalid action specified." });

    } catch (error) {
        console.error("Interview API Error:", error);
        return res.status(500).json({ error: error.message });
    }
}
