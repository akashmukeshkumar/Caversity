export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
    const { action } = req.body;

    if (action === 'get_access_code') {
        const today = new Date();
        const date = String(today.getDate()).padStart(2, '0');
        const dayIndex = today.getDay();
        const letters = ["A", "B", "C", "D", "E", "F", "G"];
        const secretLetter = letters[dayIndex];
        const finalCode = "AUDIT" + date + secretLetter;
        
        return res.status(200).json({ code: finalCode });
    }
}
