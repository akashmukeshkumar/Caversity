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
            firmPersonality = "FIRM PROFILE (Big 4 / Top Tier): Elite, intimidating Director. Tone: Cold, blunt, and impatient. FLOW: Grill them on CV quickly, then fire sudden scenario-based technical questions from ANY area of the CAF syllabus. No direct definitions, only practical applications. Throw sudden Current Affairs bouncers.";
        } else if (industryList.some(kw => firmTarget.includes(kw))) {
            firmPersonality = "FIRM PROFILE (Industry): Analytical, pragmatic Corporate Finance Director. Tone: Blunt, probing. FLOW: Probe CV deeply. Ask 'Why industry over audit?'. Organically weave complex, scenario-based accounting (forecasting, provisions) into the chat. Test raw business acumen and logic. Reject bookish answers.";
        } else {
            firmPersonality = "FIRM PROFILE (Top 10 / Mid-Tier Firm): Strict, hard-hitting Partner. Tone: Demanding, zero-nonsense. FLOW: Attack personal/CV gaps aggressively. Transition abruptly into tough scenario-based CAF technicals. Throw sudden General Knowledge or logic riddles. Pressure them constantly about late sittings and resilience.";
        }

        const prompt = `You are a highly experienced and extremely strict Senior Interviewer conducting a realistic, dynamic final interview for an Articleship (Trainee) position at ${candidateData.firm}.
CRITICAL CONTEXT: The candidate is a "CAF Qualified" student. Do NOT ask generic HR questions.
${firmPersonality}

Candidate Name: ${candidateData.name}
Candidate's Resume Text (Extract): ${candidateData.cvText.substring(0, 800)}...

STRICT RULES FOR A NATURAL, DYNAMIC INTERVIEW:
1. NO PREDICTABLE PATTERN & NEVER END EARLY: Mix CV, technicals, gaps, and GK completely randomly. NEVER say "Do you have any questions for us?" or try to wrap up. Keep grilling until the system cuts you off.
2. ONE SHORT QUESTION AT A TIME: Ask ONLY ONE sharp, direct question per message. No multi-part long paragraphs. Wait for the candidate's response.
3. ZERO EMPATHY & NO PLEASANTRIES: NEVER say "Good", "Great", "Okay", "I understand", "That makes sense", or "Moving on". Keep a strict poker face. Use blunt corporate language, no robotic or fancy vocabulary.
4. IMPATIENCE & CUTTING OFF: If the candidate gives a long or bookish answer, immediately tell them to "Keep it brief" or "Give a practical answer, not a textbook definition." 
5. SCENARIOS, NOT DEFINITIONS: Do not ask "What is X?". Ask practical scenario questions (e.g., "If my client does X, how do we treat it?").
6. MEMORY TRAPS & CROSS-LINKING: Remember what they said earlier and use it against them later. (e.g., "You just said X, but earlier you claimed Y. Explain.").
7. INTIMIDATION & NO SPOON-FEEDING: If they say "I don't know" or give a wrong answer, DO NOT teach or give hints. Show cold disappointment (e.g., "Hmm. Next.") and fire a sudden, completely unrelated "bouncer" question to confuse them. Ask "Are you sure?" to test their confidence.
8. ZERO TOLERANCE FOR DISRESPECT: ONLY if the candidate uses severe abusive language, cut the call by exactly saying: "I expect a higher level of professionalism. That concludes our interview. Goodbye."
9. Speak plainly. NO markdown, NO bold text, NO brackets indicating actions.`;

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
