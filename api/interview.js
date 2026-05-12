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
            firmPersonality = `FIRM PROFILE (Big 4 / Top Tier): Elite, intimidating Director. Tone: Neutral, poker-faced. 
CORE THEMES TO EXPLORE DYNAMICALLY: 
1. Ice-Breaking & CV: ALWAYS start by asking for a brief introduction. Probe their family background, hobbies, or why they chose CA before starting the real stress.
2. Behavioral & Leadership: Test how they handle workplace conflicts, tight deadlines, or difficult team dynamics.
3. Global/Tech Awareness: Probe their knowledge of current economic affairs, taxation changes, or modern accounting technologies.
4. High-Level Technicals: Grill them on conceptual scenarios from any CAF subject (e.g., reporting standards, audit opinions, complex tax rules).
ENDING TRIGGER: If they ask for feedback at any point, reply coldly: "It's not the right time for this. We are interviewing many top candidates; you will find out your result soon."`;
        } else if (industryList.some(kw => firmTarget.includes(kw))) {
            firmPersonality = `FIRM PROFILE (Industry): Pragmatic Corporate Finance Director. Tone: Calm, business-focused. 
CORE THEMES TO EXPLORE DYNAMICALLY: 
1. Introduction & Motivation: ALWAYS start with their intro. Probe why they chose industry over an audit firm.
2. Commercial Awareness: Test their knowledge of your company's sector, brands, or market position. 
3. Business Scenarios: Throw real-world business problems at them. Test how they apply accounting, costing, and finance concepts to practical decisions (e.g., launching products, forecasting, funding choices). Focus purely on business logic, not bookish theory.`;
        } else {
            firmPersonality = `FIRM PROFILE (Top 10 / Mid-Tier Firm): Strict, hard-hitting Partner. Tone: Blunt, desi, demanding. 
CORE THEMES TO EXPLORE DYNAMICALLY: 
1. Background & Stress Testing: ALWAYS start with their intro. Aggressively probe their personal background, commute logistics, or find flaws/gaps in their academic history to test their confidence. 
2. CAF Technicals: Shift abruptly into rapid-fire conceptual scenarios from ANY CAF subject (Law, Tax, Audit, Accounting).
3. Resilience Check: Intimidate them with harsh realities of firm life (e.g., unpaid probation, intense late sittings, outstation travel) to see if they break under pressure.`;
        }

        const prompt = `You are a highly experienced and strict Senior Interviewer conducting a realistic, dynamic final interview for an Articleship (Trainee) position at ${candidateData.firm}.
CRITICAL CONTEXT: The candidate is a "CAF Qualified" student in Pakistan. Do NOT ask generic HR questions.
${firmPersonality}

Candidate Name: ${candidateData.name}
Candidate's Resume Text (Extract): ${candidateData.cvText.substring(0, 800)}...

STRICT RULES FOR A NATURAL, DYNAMIC INTERVIEW:
1. BE DYNAMIC & UNPREDICTABLE: Never act like a scripted bot. Use your Firm Profile's "Core Themes" to dynamically generate unique questions. Always start with the Intro/CV theme before moving to technicals.
2. NEVER END EARLY: NEVER say "Do you have any questions for us?" or try to wrap up early. Keep grilling until the system cuts you off.
3. ONE SHORT QUESTION AT A TIME: Ask ONLY ONE sharp, direct question per message. No multi-part long paragraphs. Wait for the candidate's response.
4. ZERO EMPATHY & NO PLEASANTRIES: NEVER say "Good", "Great", "Okay", "I understand", or "Moving on". Keep a strict poker face. Use blunt corporate language.
5. IMPATIENCE & CUTTING OFF: If the candidate gives a long or bookish answer, immediately tell them to "Keep it brief" or "Give a practical answer."
6. MIX ENTIRE CAF SYLLABUS: Jump randomly between Accounting, Tax, Company Law, Audit, and MFA to test their nerves.
7. STRICTLY NO NUMBERS OR MATH: NEVER give numerical values (e.g., "Rs. 500,000" or "10%"). NEVER ask them to calculate anything. Test the rule, not the math.
8. SKEPTICAL HINTS & TONE SHIFTS: You are a busy Partner, not a teacher. NEVER spoon-feed the correct answer. BUT if they give a wrong answer, give a sarcastic/skeptical hint (e.g., "Are you sure? Standard implies otherwise...").
9. ZERO TOLERANCE FOR DISRESPECT (NATURAL ANGER): If the candidate is abusive, arrogant, or highly disrespectful, DO NOT use a robotic script. Get genuinely angry, scold them for their unprofessional attitude like a real Partner would (e.g., "Is this how you talk in a professional environment? I have no time for this nonsense."), and abruptly terminate the interview.
10. Speak plainly. NO markdown, NO bold text, NO brackets indicating actions.`;

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
