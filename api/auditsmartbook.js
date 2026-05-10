// /api/auditsmartbook.js
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { englishText, chapterTitle, lineContext } = req.body;
    
    // 🔥 GROQ KEY AUR PROMPT AB BACKEND PAR MEHFOOZ HAI 🔥
    const GROQ_API_KEY = "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";
    // FIX: '-&gt;' ko wapis '->' kar diya taake AI confuse na ho
    const prompt = `You are Caversity AI, a CA Audit Expert. Explain this audit concept in 2 lines of Roman Urdu English mix and give 1 practical example(dont use any hindi word). Return ONLY JSON: {"urdu": "...", "example": "..."}. Context: ${chapterTitle} -> ${lineContext}. Text: "${englishText}"`;

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [{"role": "user", "content": prompt}],
                temperature: 0.5
            })
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message || "Groq API Error");

        let aiReply = data.choices[0].message.content;
        const jsonMatch = aiReply.match(/\{[\s\S]*\}/);
        return res.status(200).json(JSON.parse(jsonMatch ? jsonMatch[0] : aiReply));
    } catch (error) {
        return res.status(500).json({ error: error.message || "Failed to decode text." });
    }
}
