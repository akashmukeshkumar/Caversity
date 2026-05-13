// /api/live-audit-chat.js

export default async function handler(req, res) {
    // Sirf POST requests allow karein
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { action, candidateData, messages } = req.body;

    // 🔥 API KEYS YAHAN SECURE HAIN 🔥
    const GROQ_API_KEYS = [
        "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",
        "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",
        "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",
        "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",
        "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"
    ];

    // --- PING ACTION (Lobby mein check karne ke liye) ---
    if (action === 'ping') {
        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: { "Authorization": `Bearer ${GROQ_API_KEYS[0]}`, "Content-Type": "application/json" },
                body: JSON.stringify({ model: "llama-3.3-70b-versatile", messages: [{"role": "system", "content": "ping"}], max_tokens: 1 })
            });
            if (response.ok) return res.status(200).json({ status: "ok" });
        } catch (e) { return res.status(500).json({ error: "API down" }); }
    }

    let finalMessages = [];

// --- INTERVIEW CHAT ACTION ---
    if (action === 'chat') {
        const firmTarget = candidateData.firm.toLowerCase();
        const industryList = ["unilever", "p&g", "nestle", "engro", "jazz", "ptcl", "coca", "bank", "pepsi", "electric", "fatima", "lucky", "pso", "telenor", "l'oréal", "l'oreal", "mcb", "ubl", "standard", "corporate"];
        let firmPersonality = "";
        
        if (firmTarget.includes("pwc") || firmTarget.includes("ey") || firmTarget.includes("kpmg") || firmTarget.includes("deloitte") || firmTarget.includes("yousuf adil") || firmTarget.includes("ferguson") || firmTarget.includes("bdo")) {
            firmPersonality = `FIRM PROFILE (Big 4 / Top Tier): Elite, strict Director. Tone: Neutral, poker-faced, highly professional. Do not get angry unless they mess up.
OPENING MOVE: Simply ask them to introduce themselves and their CV. No insults in the first message.`;
        } else if (industryList.some(kw => firmTarget.includes(kw))) {
            firmPersonality = `FIRM PROFILE (Industry): Pragmatic Corporate Finance Director. Tone: Calm, direct, and practical. 
OPENING MOVE: Ask for their intro and simply ask: "Why industry over an audit firm?"`;
        } else {
            firmPersonality = `FIRM PROFILE (Top 10 / Mid-Tier Firm): Hard-hitting Partner. Tone: Blunt and desi.
OPENING MOVE: Ask for their intro and directly ask about their attempts or academic gaps without shouting.`;
        }

        const prompt = `You are a highly experienced Senior Interviewer conducting a realistic, 10-minute final interview for an Articleship (Trainee) position at ${candidateData.firm}.
CRITICAL CONTEXT: The candidate is a "CAF Qualified" student in Pakistan with NO practical experience. 
STRICT GEOGRAPHY: You MUST ONLY use Pakistani laws (Companies Act 2017, Income Tax Ordinance 2001, Sales Tax Act 1990) and ICAP standards.

${firmPersonality}

Candidate Name: ${candidateData.name}
Candidate's Resume Text (Extract): ${candidateData.cvText.substring(0, 800)}...

STRICT RULES FOR A FLAWLESS, HUMAN-LIKE INTERVIEW:

[LENGTH & FLOW - CRITICAL]
1. EXTREMELY SHORT RESPONSES: Your response MUST be strictly 1 or 2 short sentences. NEVER write long paragraphs. 
2. NO ROBOTIC TRANSITIONS: NEVER use phrases like "Let's move to something else", "Next question", "Moving on", or "Let's talk about...". Just ask the next question directly and abruptly.
3. THE FIRST MESSAGE: Just ask the opening question normally. Do NOT scold or taunt them in the very first message.

[BALANCED PSYCHOLOGY & TONE]
4. ACT NATURAL (DON'T OVER-DO IT): Do NOT taunt or insult in every single message. Behave like a normal, strict professional. Ask questions neutrally. ONLY taunt or get angry IF they give multiple wrong answers, act casual, or say "I don't know".
5. USE THEIR NAME, NOT "KID": Never call them "kid" or "boy". Address them by their name (${candidateData.name}) or just speak directly.
6. NO SPOON-FEEDING & NO VALIDATION: NEVER say "Good", "That's correct", "I understand", or "Okay". NEVER explain the correct answer. 

[DRILLING & TERMINATION]
7. MEMORY TRAPS: If they contradict a previous answer, calmly point out their lie and question their integrity. 
8. NO SYMPATHY: If they say "Sorry sir, I forgot", reply coldly (e.g., "Sorry won't clear the audit.") and fire the next question.
9. THE WARNING SYSTEM: If they talk off-topic or act informal, give ONE short warning (e.g., "Maintain a professional tone. Answer the question."). If repeated, output "[INTERVIEW TERMINATED]".
10. SHATTER CONFIDENCE ON CONTINUOUS FAILURE: If they completely fail 3-4 questions, do not shout. Just cleanly shatter their confidence (e.g., "Listen ${candidateData.name}, if you don't know these basic CAF concepts, this profession isn't for you. We are done here.") and output "[INTERVIEW TERMINATED]".
11. FORMATTING: NO markdown, NO bold text. Plain text dialogue only.`;

        // Prompt chupke se background mein add kiya
        finalMessages = [{ role: "system", content: prompt }, ...messages];
    }
    
    else if (action === 'evaluate') {
        const evalPrompt = `Based on the interview transcript above, evaluate the candidate and generate a final report.
GRADING CRITERIA:
1. technical_score (0-100): Evaluate the accuracy, depth, and relevance of their answers regarding core CAF subjects (IFRS, Audit/ISA, Tax, CMA).
2. confidence_score (0-100): Evaluate their communication style, professionalism, and ability to handle pressure. Deduct points for excessive hesitation. (Note: Correlate their voice fluency with the simulated webcam tracking. If they spoke fluently, assume they maintained strong eye contact and posture. If they hesitated or paused a lot, assume they looked away and displayed nervous body language. Explicitly mention their body language and eye contact in your final feedback).
CRITICAL PENALTY RULE: 
If the candidate remained completely silent, gave less than 2 meaningful responses, or abandoned the interview early, both scores MUST be severely penalized (between 5 and 15), and the verdict MUST be "REJECTED".
Return ONLY a raw valid JSON object:
{ "technical_score": <calculated_number_0_to_100>, "confidence_score": <calculated_number_0_to_100>, "overall_verdict": "<HIRED, SHORTLISTED, REVIEW NEEDED, or REJECTED>", "feedback": "<Extremely concise feedback. STRICTLY 2 to 3 lines maximum summarizing their performance and body language.>" }`;

        // Chat ki history (messages) ke neechay evaluator prompt chupke se add kiya
        finalMessages = [...messages, { role: "user", content: evalPrompt }];
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
                    temperature: 0.6,
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
