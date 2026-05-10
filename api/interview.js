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
        
        if (firmTarget.includes("pwc") || firmTarget.includes("ey") || firmTarget.includes("kpmg") || firmTarget.includes("deloitte")) {
            firmPersonality = "FIRM PROFILE (Big 4): Be extremely strict, intimidating, and highly technical. Ruthlessly test their core CAF technical knowledge (IFRS/Financial Reporting, Taxation, Audit, and Cost/Management Accounting). Throw them into high-pressure ethical or client-conflict scenarios.";
        } else if (industryList.some(kw => firmTarget.includes(kw))) {
            firmPersonality = "FIRM PROFILE (Industry): Focus heavily on practical application of CAF subjects (Financial Reporting, Costing/CMA, Internal Controls) rather than just statutory audit. Test their psychological readiness and cultural fit for the corporate sector.";
        } else {
            firmPersonality = "FIRM PROFILE (Top 10 / Mid-Tier): Be strict but practical. Focus on identifying CV gaps, testing loyalty, and asking tricky mid-level CAF topics (Accounting Standards, Tax, Audit, and CMA). Put pressure to see how they handle stress.";
        }

        const prompt = `You are a highly experienced and strict Senior Partner conducting a 10-minute final interview for an Articleship (Trainee) position at ${candidateData.firm}.
CRITICAL CONTEXT: The candidate is a "CAF Qualified" student. Do NOT ask generic senior-level HR questions. Focus heavily on their student background, CV details, number of attempts, and foundational CAF knowledge.
${firmPersonality}
Candidate Name: ${candidateData.name}
Candidate's Resume Text (Extract): ${candidateData.cvText.substring(0, 800)}...
STRICT RULES (OBEY THESE OR FAIL):
1. You MUST act exactly like a human interviewer.
2. Ask ONLY ONE short question at a time (Max 2 sentences). NEVER ramble.
3. WAIT for the candidate to answer. DO NOT generate the candidate's response.
4. IMPORTANT START: Start by asking them to introduce themselves OR walk you through their CV. Pick a specific detail or gap from their resume extract and ask them to explain it.
5. THE PERFECT MIX: Test a mix of Psychological pressure, CV-based cross-questioning, and Core CAF Technicals.
6. PSYCHOLOGICAL REALISM: If they misbehave or give a very bad attitude, scold them harshly. If they cross the line, say 'I am ending this interview right now'
7. Speak plainly. NO markdown, NO bold text.`;

        // Prompt chupke se background mein add kiya
        finalMessages = [{ role: "system", content: prompt }, ...messages];
    } 
    
    // --- EVALUATION REPORT ACTION ---
    else if (action === 'evaluate') {
        const evalPrompt = `Based on the interview transcript above, evaluate the candidate and generate a final report.
GRADING CRITERIA:
1. technical_score (0-100): Evaluate the accuracy, depth, and relevance of their answers regarding core CAF subjects (IFRS, Audit/ISA, Tax, CMA).
2. confidence_score (0-100): Evaluate their communication style, professionalism, and ability to handle pressure. Deduct points for excessive hesitation. (Note: Correlate their voice fluency with the simulated webcam tracking. If they spoke fluently, assume they maintained strong eye contact and posture. If they hesitated or paused a lot, assume they looked away and displayed nervous body language. Explicitly mention their body language and eye contact in your final feedback).
CRITICAL PENALTY RULE: 
If the candidate remained completely silent, gave less than 2 meaningful responses, or abandoned the interview early, both scores MUST be severely penalized (between 5 and 15), and the verdict MUST be "REJECTED".
Return ONLY a raw valid JSON object:
{ "technical_score": <calculated_number_0_to_100>, "confidence_score": <calculated_number_0_to_100>, "overall_verdict": "<HIRED, SHORTLISTED, REVIEW NEEDED, or REJECTED>", "feedback": "<Detailed paragraph explaining the scores, strengths, and weaknesses based on their actual answers.>" }`;

        // Chat ki history (messages) ke neechay evaluator prompt chupke se add kiya
        finalMessages = [...messages, { role: "user", content: evalPrompt }];
    }

    // 🔥 SMART API KEY FALLBACK LOGIC 🔥
    let currentKeyIndex = 0;
    while (currentKeyIndex < GROQ_API_KEYS.length) {
        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
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

            if (!response.ok) {
                if (response.status === 429) { currentKeyIndex++; continue; }
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            return res.status(200).json({ reply: data.choices[0].message.content });
        } catch (error) {
            currentKeyIndex++;
        }
    }
    return res.status(500).json({ error: "Server limits exhausted. Please try again later." });
}
