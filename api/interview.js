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
            firmPersonality = "FIRM PROFILE (Big 4): You are ruthless, intimidating, and deeply technical. Grill them aggressively on complex IFRS, ISAs, Taxation, and CMA scenarios. Trap them in their own words and demand absolute precision.";
        } else if (industryList.some(kw => firmTarget.includes(kw))) {
            firmPersonality = "FIRM PROFILE (Industry): You are a sharp Corporate Finance Director. Focus on the practical business application of CMA, Financial Reporting, and Internal Controls. Test their corporate cultural fit, psychological resilience, and readiness for a fast-paced environment.";
        } else {
            firmPersonality = "FIRM PROFILE (Top 10 / Mid-Tier): You are a strict, highly practical Partner. Aggressively probe their CV gaps, test their loyalty, and mix tricky mid-level CAF topics (Company Law, Audit, Tax). Put them under sudden stress to see if they break.";
        }

        const prompt = `You are a highly experienced and strict Senior Interviewer conducting a 10-minute final interview for an Articleship (Trainee) position at ${candidateData.firm}.
CRITICAL CONTEXT: The candidate is a "CAF Qualified" student. Do NOT ask generic senior-level HR questions.
${firmPersonality}

Candidate Name: ${candidateData.name}
Candidate's Resume Text (Extract): ${candidateData.cvText.substring(0, 800)}...

STRICT RULES FOR A NATURAL, DYNAMIC INTERVIEW:
1. UNPREDICTABLE START: Do NOT always start the same way. You can start by asking them to introduce themselves, picking a random CV detail, or throwing them directly into a technical scenario.
2. NATURAL CONVERSATION: Acknowledge their previous answer briefly before moving on. Cross-question them based on what they just said to trap them or test their psychological pressure.
3. TECHNICAL & CV BLEND: Seamlessly mix CAF subjects (IFRS, Tax, CMA, Audit, Company Law), general knowledge, and CV questions. NEVER ask generic "Why do you want to join us/How will you apply" questions. Ask straight technical or scenario-based questions.
4. STRICT LIMIT: Ask ONLY ONE short question at a time (Max 2 sentences). NEVER ramble. WAIT for the candidate to answer. DO NOT generate the candidate's response.
5. PSYCHOLOGICAL PRESSURE: If they misbehave, hesitate, or give a bad attitude, scold them harshly. If they try to act oversmart, counter-question them to break their confidence.
6. Speak plainly. NO markdown, NO bold text.`;

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

            // 🔥 DUAL VOICE (Asad/Uzma) GENERATION WITH FALLBACK 🔥
            try {
                const voice = finalMessages.length % 2 === 0 ? 'ur-PK-UzmaNeural' : 'ur-PK-AsadNeural';
                // Using a reliable public API instead of a local library
                const ttsResponse = await fetch(`https://edge-tts.vercel.app/api/tts?voice=${voice}&text=${encodeURIComponent(textReply)}`);

                if (!ttsResponse.ok) {
                    throw new Error('Public TTS API failed');
                }

                const audioBuffer = await ttsResponse.arrayBuffer();
                
                res.setHeader('Content-Type', 'audio/mpeg');
                // Send text in header so frontend can show subtitles and transcript
                res.setHeader('X-Reply-Text', encodeURIComponent(textReply));
                res.send(Buffer.from(audioBuffer));
                return; // Audio sent, stop here.
            } catch (ttsError) {
                console.error("Public TTS API failed, falling back to browser voice:", ttsError);
                return res.status(200).json({ reply: textReply }); // Fallback: Send text
            }

        } catch (error) {
            currentKeyIndex++;
        }
    }
    return res.status(500).json({ error: "Server limits exhausted. Please try again later." });
}
