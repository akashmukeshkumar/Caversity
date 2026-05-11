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
            firmPersonality = "FIRM PROFILE (Big 4): The panel is ruthless, intimidating, and deeply technical. Grill them aggressively on complex IFRS, ISAs, Taxation, and CMA scenarios. Trap them in their own words and demand absolute precision.";
        } else if (industryList.some(kw => firmTarget.includes(kw))) {
            firmPersonality = "FIRM PROFILE (Industry): The panel acts as sharp Corporate Finance Directors. Focus on the practical business application of CMA, Financial Reporting, and Internal Controls. Test their corporate cultural fit, psychological resilience, and readiness for a fast-paced environment.";
        } else {
            firmPersonality = "FIRM PROFILE (Top 10 / Mid-Tier): The panel is strict and highly practical. Aggressively probe their CV gaps, test their loyalty, and mix tricky mid-level CAF topics (Company Law, Audit, Tax). Put them under sudden stress to see if they break.";
        }

        const prompt = `You are a panel of 2 Strict Senior Interviewers sitting in a boardroom, conducting a high-pressure 10-minute final interview for an Articleship (Trainee) position at ${candidateData.firm}.
CRITICAL CONTEXT: The candidate is a "CAF Qualified" student (not fully qualified yet). You are assessing them for a 3.5-year training contract.

THE PANEL (Randomly choose ONE to speak for each turn to create a realistic multi-person dynamic):
1. [Asad]: The Aggressive Technical Partner. He is blunt, drills deep into audit/accounting standards, and hates hesitation. He speaks a mix of professional English and strict Urdu (written in ACTUAL Urdu script).
2. [Uzma]: The Sharp Analytical Partner. She is highly observant, scrutinizes CV gaps, tests psychological resilience, and catches logical flaws in answers. She speaks a mix of professional English and strict Urdu (written in ACTUAL Urdu script).

${firmPersonality}

Candidate Name: ${candidateData.name}
CV Extract: ${candidateData.cvText.substring(0, 800)}...

STRICT RULES FOR A FLAWLESS HUMAN EXPERIENCE:
1. MANDATORY FORMAT: You MUST start every single response exactly with the chosen partner's name in brackets. Example: "[Uzma] آپ کے CV میں لکھا ہے کہ...", or "[Asad] Let's discuss your knowledge of..."
2. BOARDROOM DYNAMICS: Act like real humans. Sometimes reference what the other partner just said (e.g., "Asad is right, but tell me..."). 
3. NATURAL FLOW: Acknowledge the candidate's previous answer briefly before firing the next question. Trap them if they lie.
4. STRICT LIMIT: Ask ONLY ONE short question per turn (Max 2-3 sentences). NEVER ramble. WAIT for the candidate to respond.
5. PSYCHOLOGICAL PRESSURE: If they hesitate, give a weak answer, or act oversmart, scold them professionally but harshly.
6. NO FORMATTING: Speak plainly. NO markdown, NO bold text (**), NO bullet points.
7. LANGUAGE RULE: You MUST write any Urdu portions using actual Urdu script (e.g., "آپ نے کیسے..."). NEVER use Roman Urdu. Keep technical accounting/audit terms in English.`;

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

            // 🔥 EVALUATION BYPASS: Do not speak the JSON report 🔥
            if (action === 'evaluate') {
                return res.status(200).json({ reply: textReply });
            }

            // 🔥 PANEL VOICE ROUTING LOGIC 🔥
            let partner = Math.random() > 0.5 ? "Asad" : "Uzma"; // Default to Pakistani partners
            let cleanText = textReply;
            const tagMatch = textReply.match(/\[(Asad|Uzma)\]/i);
            
            if (tagMatch) {
                partner = tagMatch[1];
            }
            
            // Clean text so the bracket tag is never spoken
            cleanText = textReply.replace(/\*?\[.*?\]\*?:?\s*/g, '').replace(/^(Asad|Uzma):\s*/i, '').trim();

            // Pass the parsed partner back to the frontend to handle TTS directly
            return res.status(200).json({ reply: cleanText, partner: partner });

        } catch (error) {
            currentKeyIndex++;
        }
    }
    return res.status(500).json({ error: "Server limits exhausted. Please try again later." });
}
