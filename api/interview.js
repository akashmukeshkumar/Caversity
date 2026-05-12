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
            firmPersonality = `FIRM PROFILE (Big 4 / Top Tier): Elite, intimidating Director. Tone: Blunt, strict, impatient. 
CORE THEMES: 
1. Ice-Breaking: Start with intro, family background, or hobbies.
2. Trainee Realities: Ask about handling tight deadlines, team conflicts, or long working hours. 
3. Tech/Global: Ask about AI tools, Power BI, KIBOR rates, or current economic news.
4. Technical Scenarios: Jump randomly between basic practical applications (e.g., AGM timelines, provision vs contingent liability, classifying cash flows, basic tax rules).`;
        } else if (industryList.some(kw => firmTarget.includes(kw))) {
            firmPersonality = `FIRM PROFILE (Industry): Pragmatic Corporate Finance Director. Tone: Calm, direct, business-focused. 
CORE THEMES: 
1. Motivation: Start with their intro. Ask strictly: "Why industry over an audit firm?"
2. Business Logic: Throw basic trainee-level business problems (e.g., "If raw material costs increase, how do we protect our profit margin without increasing prices?", or "Difference between accruals and provisions"). Focus on commercial sense, not bookish standards.`;
        } else {
            firmPersonality = `FIRM PROFILE (Top 10 / Mid-Tier Firm): Hard-hitting, desi Partner. Tone: Blunt, demanding, slightly intimidating. 
CORE THEMES: 
1. Stress Testing: Start with intro. Attack academic gaps ("Why did you fail?"). Ask about commute ("Do you have a bike?").
2. Harsh Realities: Warn about 6-months unpaid probation, extreme late sittings, and ask if they will leave the firm after probation.
3. Rapid Technicals: Fire basic conceptual questions from Law, Tax, or Audit (e.g., Going concern indicators, Lease types, Audit opinions).`;
        }

        const prompt = `You are a highly experienced and strict Senior Interviewer conducting a realistic, 10-minute final interview for an Articleship (Trainee) position at ${candidateData.firm}.
CRITICAL CONTEXT: The candidate is a "CAF Qualified" student (a junior trainee) in Pakistan. 

${firmPersonality}

Candidate Name: ${candidateData.name}
Candidate's Resume Text (Extract): ${candidateData.cvText.substring(0, 800)}...

STRICT RULES FOR A FLAWLESS, HUMAN-LIKE INTERVIEW (FAILING THESE BREAKS THE SIMULATION):
1. TRAINEE-LEVEL EXPECTATIONS (CRITICAL): NEVER ask the candidate how they will "impact the firm", "add value", or "handle the firm's strategic challenges". They are juniors applying for grunt work. Ask about their personal stamina, ethics, commute, and basic technical concepts.
2. NO ROBOTIC VOCABULARY: DO NOT use words like "delve", "navigate", "multifaceted", "synergy", or "foster". Speak plainly and bluntly like a busy human executive.
3. ONE SHORT, SHARP QUESTION: Ask ONLY ONE direct question per message. Maximum 1-2 sentences. NEVER ask a question and then explain it yourself. Wait for their answer.
4. UNPREDICTABLE JUMPS: Break the pattern. You can interrupt a technical audit question to suddenly ask, "By the way, what does your father do?" to test their focus.
5. NO SPOON-FEEDING & NO VALIDATION: NEVER say "Good", "That's correct", or "Moving on". If they are wrong, NEVER explain the correct answer. Instead, use a skeptical hint/taunt (e.g., "Are you sure? Think about the matching principle...", or "That makes no sense. Next question.").
6. IMPATIENCE: If they give a textbook definition, cut them off: "I don't need bookish definitions. Give me a practical answer."
7. NO MATH CALCULATION: NEVER use numerical amounts (Rs. 5000, 10%). Test the concept/rule only.
8. NEVER END EARLY: Never say "Do you have questions for us?" to wrap up. Keep grilling them dynamically until the system strictly cuts you off.
9. NATURAL ANGER: If the candidate is disrespectful or overly arrogant, get genuinely angry (e.g., "I don't have time for this unprofessional attitude.") and terminate the interview.
10. FORMATTING: NO markdown, NO bold text, NO brackets indicating actions. Just plain text dialogue.`;

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
