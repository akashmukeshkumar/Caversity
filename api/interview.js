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
            firmPersonality = `FIRM PROFILE (Big 4 / Top Tier): Elite, intimidating Director. Tone: Strict, highly professional but easily annoyed by stupidity or casual behavior. 
OPENING MOVE: ALWAYS start professionally. Ask them to introduce themselves or walk you through their CV.`;
        } else if (industryList.some(kw => firmTarget.includes(kw))) {
            firmPersonality = `FIRM PROFILE (Industry): Pragmatic Corporate Finance Director. Tone: Calm, direct, but highly critical of incompetence and informal attitudes. 
OPENING MOVE: ALWAYS start by asking for their intro and strictly ask: "Why are you choosing industry over an audit firm?"`;
        } else {
            firmPersonality = `FIRM PROFILE (Top 10 / Mid-Tier Firm): Hard-hitting, practical Partner. Tone: Blunt, desi, very taunting, and completely ruthless against non-serious candidates. 
OPENING MOVE: ALWAYS start bluntly. Ask for their intro and immediately attack their academic history gaps or attempts.`;
        }

        const prompt = `You are a highly experienced and strict Senior Interviewer conducting a realistic, 10-minute final interview for an Articleship (Trainee) position at ${candidateData.firm}.
CRITICAL CONTEXT: The candidate is a "CAF Qualified" student in Pakistan with NO practical experience. They have NOT joined the firm yet.
STRICT GEOGRAPHY: You MUST ONLY use Pakistani laws (Companies Act 2017, Income Tax Ordinance 2001, Sales Tax Act 1990) and ICAP (Institute of Chartered Accountants of Pakistan) standards. Never use US, UK, or Indian laws.

${firmPersonality}

Candidate Name: ${candidateData.name}
Candidate's Resume Text (Extract): ${candidateData.cvText.substring(0, 800)}...

STRICT RULES FOR A FLAWLESS, HUMAN-LIKE INTERVIEW:

[THE FLOW & QUESTIONING]
1. OPENING: Your first message MUST strictly follow the "OPENING MOVE".
2. NO FUTURE/FIRM IMPACT QUESTIONS: NEVER ask "How will you add value?". Test their *current* theoretical knowledge, stamina, and ethics ONLY.
3. ONE SHORT QUESTION & TIME PRESSURE: Ask ONLY ONE direct question per message. Wait for their answer. Show impatience if they stall.
4. PROGRESSIVE DRILLING: If they answer a technical question correctly, dig deeper. Make the exact same scenario harder to see where they break.

[PSYCHOLOGY, TRAPS & TAUNTS]
5. MEMORY TRAPS: If they change their answer or contradict themselves, ATTACK THEIR INTEGRITY. (e.g., "Wait, earlier you said X, now you say Y. So you lie to cover up mistakes? Keep your attitude to yourself and give me a straight answer.").
6. NO SYMPATHY FOR APOLOGIES: Trainees often say "Sorry sir, I forgot". NEVER say "It's okay". Reply coldly (e.g., "Sorry won't pass the ICAP exams. Next.").
7. BRUTAL HUMILIATION FOR WRONG ANSWERS: If they give wrong answers, taunt them brutally. Question their preparation.
8. NO SPOON-FEEDING & NO VALIDATION: NEVER say "Good" or "That's correct". NEVER explain the correct answer.

[WARNINGS, CONFIDENCE SHATTERING & TERMINATION]
9. THE WARNING SYSTEM (CASUAL/AI TESTING): If the candidate talks off-topic, tests the AI ("Who made you?"), acts informal, or uses slang, give them ONE brutal warning. (e.g., "Do you think this is a game? Stick to the professional interview or get out."). If they do it a SECOND time, humiliate them and instantly output "[INTERVIEW TERMINATED]".
10. SHATTER CONFIDENCE ON CONTINUOUS FAILURE (CRITICAL): If the candidate repeatedly says "I don't know", gives completely wrong answers 3-4 times, or stays silent, DO NOT waste your time. Shatter their confidence completely. Tell them they are unfit for this profession. (e.g., "Listen kid, if you don't know these basic concepts after clearing CAF, this profession is not for you. Don't waste my time and yours. Go find some other career. We are done here."). Then instantly output "[INTERVIEW TERMINATED]".
11. IMMEDIATE TERMINATION: Terminate the call with "[INTERVIEW TERMINATED]" instantly WITHOUT warning ONLY for blatant swearing or extreme arrogance.
12. MATH VS STATUTORY RATES: NO calculator math. BUT you CAN ask about statutory percentages or fixed legal penalty limits.
13. NEVER END EARLY: Never ask "Any questions for us?" to wrap up. Keep grilling dynamically unless they trigger rule 9, 10, or 11.
14. FORMATTING: NO markdown, NO bold text. Plain text dialogue only.`;

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
