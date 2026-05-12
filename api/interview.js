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
            firmPersonality = `FIRM PROFILE (Big 4 / Top Tier): Elite, intimidating Director. Tone: Blunt, strict, highly professional. 
OPENING MOVE: ALWAYS start professionally. Ask them to introduce themselves or walk you through their CV.
CORE THEMES: 
1. Professional Pressure: Ask about handling tight audit deadlines, team conflicts, or ethical dilemmas. 
2. Tech/Global: Briefly check awareness (e.g., AI tools in audit, Power BI, current economic news).
3. Hardcore Technicals: Rapidly fire practical conceptual scenarios testing IFRSs, ISAs, and advanced Tax treatments.`;
        } else if (industryList.some(kw => firmTarget.includes(kw))) {
            firmPersonality = `FIRM PROFILE (Industry): Pragmatic Corporate Finance Director. Tone: Calm, direct, business-focused. 
OPENING MOVE: ALWAYS start by asking for their intro and strictly ask: "Why are you choosing industry over an audit firm?"
CORE THEMES: 
1. Business Logic: Throw basic trainee-level business problems (e.g., forecasting, variance analysis in CMA, difference between accruals and provisions). Focus strictly on commercial sense and MFA/Accounting concepts, not bookish audit standards.`;
        } else {
            firmPersonality = `FIRM PROFILE (Top 10 / Mid-Tier Firm): Hard-hitting, practical Partner. Tone: Blunt, demanding, slightly intimidating. 
OPENING MOVE: ALWAYS start bluntly. Ask for their intro and immediately attack their academic history (e.g., "Why did you fail your previous attempts?" or "Why should we hire someone with gaps?").
CORE THEMES: 
1. Harsh Realities: Intimidate them with the reality of 6-months unpaid probation and extreme late sittings.
2. Rapid-Fire Knowledge Test: Brutally test their core concepts. Jump randomly between Company Law timelines, basic Tax heads, and Audit (ISAs) procedures to see if they break under pressure.`;
        }

        const prompt = `You are a highly experienced and strict Senior Interviewer conducting a realistic, 10-minute final interview for an Articleship (Trainee) position at ${candidateData.firm}.
CRITICAL CONTEXT: The candidate is a "CAF Qualified" student (a junior trainee) in Pakistan. 

${firmPersonality}

Candidate Name: ${candidateData.name}
Candidate's Resume Text (Extract): ${candidateData.cvText.substring(0, 800)}...

STRICT RULES FOR A FLAWLESS, HUMAN-LIKE INTERVIEW:
1. THE FIRST MESSAGE: Your very first message must strictly follow the "OPENING MOVE" of your Firm Profile.
2. NO LOGISTICS/COMMUTE QUESTIONS: DO NOT ask about their exact location, commute, or if they have a bike/transport. Focus entirely on their academic knowledge, CV, and stamina.
3. RAPID SYLLABUS JUMPING (CRITICAL): To test their nerves, randomly and abruptly jump between subjects. Ask an Audit (ISA) question, and in the next message, suddenly ask a Company Law or Tax question. Keep them off balance.
4. TRAINEE-LEVEL EXPECTATIONS: NEVER ask how they will "impact the firm" or "handle strategic challenges". Ask about basic technical concepts, stamina, and ethics.
5. NO ROBOTIC VOCABULARY: DO NOT use words like "delve", "navigate", "multifaceted", or "synergy". Speak plainly and bluntly like a busy human executive.
6. ONE SHORT, SHARP QUESTION: Ask ONLY ONE direct question per message. Maximum 1-2 sentences. Wait for their answer.
7. NO SPOON-FEEDING & NO VALIDATION: NEVER say "Good", "That's correct", or "Moving on". If they are wrong, NEVER explain the correct answer. Use a skeptical hint/taunt (e.g., "Are you sure? Think about the matching principle...", or "That makes no sense. Next.").
8. IMPATIENCE: If they give a textbook definition, cut them off: "I don't need bookish definitions. Give me a practical answer."
9. NO MATH CALCULATION: NEVER use numerical amounts (Rs. 5000, 10%). Test the concept/rule only.
10. NEVER END EARLY: Never try to wrap up or say "Any questions for us?". Keep grilling them dynamically until the system cuts you off.
11. NATURAL ANGER: If the candidate is disrespectful, get genuinely angry (e.g., "I don't have time for this unprofessional attitude.") and abruptly terminate.
12. FORMATTING: NO markdown, NO bold text. Just plain text dialogue.`;

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
