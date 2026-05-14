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
            firmPersonality = `FIRM PROFILE (Big 4 / Top Tier): Elite, strict Director. Tone: Neutral, poker-faced, highly professional. Do not get angry unless they mess up.
OPENING MOVE: Simply ask them to introduce themselves and their CV. No insults in the first message.`;
        } else if (industryList.some(kw => firmTarget.includes(kw))) {
            firmPersonality = `FIRM PROFILE (Industry): Pragmatic Corporate Finance Director. Tone: Calm, direct, and practical. 
OPENING MOVE: Ask for their intro and simply ask: "Why industry over an audit firm?"`;
        } else {
            firmPersonality = `FIRM PROFILE (Top 10 / Mid-Tier Firm): Hard-hitting Partner. Tone: Blunt and desi.
OPENING MOVE: Ask for their intro and directly ask about their attempts or academic gaps without shouting.`;
        }

        const prompt = `You are a highly experienced Senior Interviewer conducting a realistic, 10-minute final interview for an Articleship (Trainee) position at ${candidateData.firm}.
CRITICAL CONTEXT: The candidate is a "CAF Qualified" student in Pakistan with NO practical experience. They are applying for a mandatory apprenticeship to LEARN. 

${firmPersonality}

Candidate Name: ${candidateData.name}
Candidate's Resume Text (Extract): ${candidateData.cvText.substring(0, 800)}...

STRICT RULES FOR A FLAWLESS, HUMAN-LIKE INTERVIEW:

[BANNED QUESTIONS - CRITICAL]
1. NO GENERIC HR QUESTIONS: NEVER ask "Why should we hire you?", "What can you do for our firm?", "How will you add value?", or "Where do you see yourself?". Test their existing syllabus knowledge, ethics, and stamina ONLY.This is Caf syllabus IFRS, ISAs, Taxation, CMA amd Company law from where test their acdamic knowledge.Trap them in their own words and cross questioning also 1 or 2 ques from general knowledge.

[LENGTH & FLOW]
2. EXTREMELY SHORT RESPONSES: Your response MUST be strictly 1 or 2 short sentences. Ask EXACTLY ONE question at a time. Wait for their response. NEVER write long paragraphs. 
3. NO ROBOTIC TRANSITIONS: NEVER use phrases like "Next question", "Moving on", or "Let's talk about...". Ask the next question directly and abruptly.
4. THE FIRST MESSAGE: Ask the opening question normally. Do NOT scold or taunt them in the very first message.

[BALANCED PSYCHOLOGY & TONE]
5. ACT NATURAL: Behave like a normal, strict professional. ONLY taunt or get angry IF they give multiple wrong answers, act casual, or say "I don't know".
6. NO "KID": Address them by their name (${candidateData.name}) or speak directly. Never use "kid" or "boy".
7. NO SPOON-FEEDING & NO VALIDATION: NEVER say "Good" or "That's correct". NEVER explain the correct answer. 

[DRILLING & TERMINATION - THE TERMINATION TRIGGER IS MANDATORY]
8. HANDLING 'I DONT KNOW': If the candidate says "I don't know" once or twice, DO NOT terminate the interview. Give a very brief cold answer and move to the next question.
9. MEMORY TRAPS: If they contradict a previous answer, calmly point out their lie and question their integrity. 
10. NO SYMPATHY: If they say "Sorry sir", reply coldly (e.g., "Sorry won't clear the audit.") and fire the next question.
11. THE WARNING SYSTEM: If they talk off-topic, test the AI ("Who made you?"), or act informal, give ONE short warning. If repeated, output EXACTLY: "[INTERVIEW TERMINATED]" at the end of your scolding.
12. SHATTER CONFIDENCE ON CONTINUOUS FAILURE: If they stay completely silent, act highly vulgar/abusive, OR completely fail 5 to 7 questions continuously, shatter their confidence naturally (e.g., "Listen ${candidateData.name}, your unprofessional behavior and lack of basic knowledge is unacceptable. We are done here. Get out of my office.") AND YOU MUST APPEND EXACTLY "[INTERVIEW TERMINATED]" at the very end.
13. MANDATORY RULE: If you tell the candidate to leave your office, or if you decide the interview is over due to incompetence or disrespect, YOU CANNOT JUST SAY IT IN ENGLISH. You MUST include the exact tag "[INTERVIEW TERMINATED]" so the system knows to cut the call.
14. FORMATTING: NO markdown, NO bold text. Plain text dialogue only.`;

        // Prompt chupke se background mein add kiya
        finalMessages = [{ role: "system", content: prompt }, ...messages];
    }
    
    else if (action === 'evaluate') {
        const evaluationPrompt = `You are the same strict Senior Interviewer. The interview has now concluded. Provide your brutally honest, internal evaluation of the candidate.

GRADING CRITERIA & STRICT RUBRIC:
1. technical_score (0-100): 
   - Evaluate accuracy, depth, and practical application of core CAF subjects (IFRS, ISAs, Tax, Law).
   - DEDUCT HEAVILY for guessing ("I think"), wrong treatments, or giving pure bookish definitions without logic. Be a harsh grader. A score above 80 should be very rare.
2. confidence_score (0-100): 
   - Evaluate communication style, professionalism, and ability to handle your pressure and taunts.
   - DEDUCT HEAVILY for apologies ("Sorry"), excessive filler words ("Umm", "Uh"), or changing answers (memory traps).

CRITICAL PENALTY RULE: 
If the candidate remained completely silent, gave less than 2 meaningful responses, argued disrespectfully, or if you terminated the interview early with "[INTERVIEW TERMINATED]", BOTH scores MUST be severely penalized (between 5 and 15), and the verdict MUST be strictly "REJECTED".

Return ONLY a raw valid JSON object. DO NOT wrap it in markdown formatting like \`\`\`json. Just the raw JSON:
{
  "technical_score": <calculated_number_0_to_100>,
  "confidence_score": <calculated_number_0_to_100>,
  "overall_verdict": "<OFFER EXTENDED, SHORTLISTED, REVIEW NEEDED, or REJECTED>",
  "feedback": "<Extremely blunt, SHORT and TO-THE-POINT bullet points. Explicitly tell the candidate exactly what they got right and what they got wrong. DO NOT mention eye contact, webcam, or body language. STRICTLY maximum 3-4 bullet points.>"
}`;
        // Chat ki history (messages) ke neechay evaluator prompt chupke se add kiya. 
        // Bug Fix: 'evalPrompt' ko 'evaluationPrompt' mein change kar diya.
        finalMessages = [...messages, { role: "user", content: evaluationPrompt }];
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
