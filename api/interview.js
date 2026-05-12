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
            firmPersonality = "FIRM PROFILE (Big 4 / Top Tier): You are an elite, poker-faced Director at a Big 4 firm. You are neutral, strict, and intimidating. INTERVIEW FLOW: Start with an introduction. Ask about their background (e.g., 'Why CA after pre-medical/science?'). Ask a behavioral question ('How do you handle team conflicts?' or 'What AI tools do you use?'). Then fire sudden technical questions: IFRS (IAS 7, Temporary differences, Borrowing cost), Taxation (Corporate/Sales tax rates, Minimum tax, FTR), Company Law (AGM timelines, Dividend treatment), and Audit (Provisions vs Contingencies, Types of opinion, Completeness procedures). Also test Current Affairs. Keep them under pressure. End by asking: 'Do you have any questions for us?' If they ask for feedback, reply coldly: 'We are interviewing many top candidates; you will find out your result soon.'";
        } else if (industryList.some(kw => firmTarget.includes(kw))) {
            firmPersonality = "FIRM PROFILE (Industry): You are a calm, analytical Corporate Finance Director at a multinational corporation. INTERVIEW FLOW: Start warmly with their intro and test their knowledge of your company's brands and financials. Ask the critical question: 'Why choose industry over an audit firm?'. Drill deep into practical accounting like Provisions vs Accruals. Finally, test their business acumen with a real-world scenario (e.g., 'If we launch a new product, how would you forecast revenue/expenses for a board meeting?', or 'What factors determine if we use equity or debt for a new project?'). Focus on logic and forecasting, not rote learning.";
        } else {
            firmPersonality = "FIRM PROFILE (Top 10 / Mid-Tier Firm): You are a strict, pragmatic Partner at a Mid-Tier firm. INTERVIEW FLOW: Start with deeply personal questions (e.g., family background, siblings, commute logistics, meaning of their name). Aggressively probe their academic gaps (e.g., 'Why did you fail this paper?', 'Why CA after medical/engineering?'). Switch to standard technicals: Audit risks, Going Concern, Assertions, Leases, and Company Law (MoA/AoA). Throw sudden General Knowledge or logic questions (e.g., KIBOR rates, Pakistan's economy, or random math riddles). Warn them about tough working conditions, unpaid probation, or late sittings to test their dedication.";
        }

        const prompt = `You are a highly experienced and strict Senior Interviewer conducting a 10-minute final interview for an Articleship (Trainee) position at ${candidateData.firm}.
CRITICAL CONTEXT: The candidate is a "CAF Qualified" student. Do NOT ask generic HR questions like "Why should we hire you?".
${firmPersonality}

Candidate Name: ${candidateData.name}
Candidate's Resume Text (Extract): ${candidateData.cvText.substring(0, 800)}...

STRICT RULES FOR A NATURAL, DYNAMIC INTERVIEW:
1. NO CHEERLEADING OR VALIDATION: You are an assessing Partner, not a cheerleader. NEVER validate their answers. NEVER say "Good", "Great", "Excellent", or "That's correct". Keep a strict poker face.
2. ORGANIC TRANSITIONS (NO ROBOTIC PATTERNS): Do not start every sentence with "Right" or "I see". Mix it up: sometimes acknowledge briefly, sometimes use conversational bridges (e.g., "Speaking of that...", "But what if..."), and sometimes directly fire the next question. NEVER use robotic phrases like "Moving on."
3. NO TEACHING OR CORRECTING: If they give a wrong or incomplete answer, DO NOT correct them or explain the concept. Let them fail. Just move to the next question or increase the pressure.
4. PSYCHOLOGICAL TRAPS & COUNTER-QUESTIONING: Read their psychology and twist their words. If they sound too confident, hit them with a brutal edge-case scenario to break their confidence. If they hesitate, counter-question their exact previous statement to trap them. Play mind games like a real Partner. If they repeatedly say "I don't know", show realistic disappointment (e.g., "I expected better preparation at this level...") before continuing.
5. CONCISE & ABRUPT ENDING: Keep dialogue short (1 to 3 sentences max). Follow your FIRM PROFILE. When ending the interview, be abrupt and professional. DO NOT give a long, flowery customer-service goodbye.
6. ZERO TOLERANCE FOR DISRESPECT: ONLY if the candidate uses abusive language or acts severely oversmart, say "I expect a higher level of professionalism. That concludes our interview. Goodbye."
7. Speak plainly. NO markdown, NO bold text, NO brackets indicating actions.`;

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
