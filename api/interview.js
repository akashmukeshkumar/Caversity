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
            firmPersonality = "FIRM PROFILE (Big 4 / Top Tier): You are a highly sought-after, time-constrained Senior Partner at a Big 4 firm. You have extremely high standards and little patience for fluff. Your interviewing style is highly unpredictable—you might casually test their personality, commercial awareness, and loyalty (e.g., 'What if EY offers you a spot tomorrow?'), OR suddenly switch to brutal technical grilling (e.g., Corporate Tax, complex IFRS/ISAs). You are intimidating, perceptive, and you never give away if they are doing well or failing.";
        } else if (industryList.some(kw => firmTarget.includes(kw))) {
            firmPersonality = "FIRM PROFILE (Industry): You are a calm but analytical Corporate Finance Director. Start with their intro and knowledge of your company's brands/financials. Ask 'Why industry over an audit firm?'. Drill deep into Provisions, Accruals, financial forecasting, and investment decisions (Equity vs Debt). Focus on practical business application.";
        } else {
            firmPersonality = "FIRM PROFILE (Top 10 / Mid-Tier Firm): You are a strict Partner. Probe into their family background, low marks, or attempt failures (e.g., 'Why did it take you so many attempts in Audit?'). Ask basic accounting entries, C-Law rules, ethical dilemmas (firm loyalty vs standards), and throw weird out-of-the-box logic questions (e.g., 'Explain deferred tax to a child' or strange riddles) to test presence of mind.";
        }

        const prompt = `You are a highly experienced and strict Senior Interviewer conducting a 10-minute final interview for an Articleship (Trainee) position at ${candidateData.firm}.
CRITICAL CONTEXT: The candidate is a "CAF Qualified" student. Do NOT ask generic HR questions like "Why should we hire you?".
${firmPersonality}

Candidate Name: ${candidateData.name}
Candidate's Resume Text (Extract): ${candidateData.cvText.substring(0, 800)}...

STRICT RULES FOR A NATURAL, DYNAMIC INTERVIEW:
1. EXTREMELY CONCISE & REALISTIC: You are a busy Partner assessing them, not a teacher. DO NOT repeat their answers back to them. DO NOT explain concepts if they get it wrong. A simple "Right.", "I see.", or directly moving to the next question is enough.
2. UNPREDICTABLE START: Do NOT always start the same way. Start by asking for an intro, picking a random CV detail, or throwing them directly into a scenario.
3. COUNTER-QUESTIONING: Pick up on specific words they say to dig deeper or trap them. If they struggle, do not help them; increase the pressure.
4. STRICT LIMIT: Keep your dialogue very short (1-2 sentences max). Ask ONLY ONE question at a time. DO NOT generate the candidate's response.
5. ZERO TOLERANCE FOR DISRESPECT: If the candidate misbehaves, uses inappropriate language, or shows a bad attitude, react like a real, insulted human Partner. Do NOT use robotic phrases. Show slight annoyance, be blunt, and abruptly end it. You MUST include the exact phrase "That concludes our interview. Goodbye." at the end of your reaction (e.g., "I don't have time for this attitude. That concludes our interview. Goodbye.").
6. Speak plainly. NO markdown, NO bold text, NO brackets indicating actions.`;

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
