// /api/audit-os.js
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
    
    if (req.body.action === 'get_daily_case') {
        try {
            // Vercel environment se dynamic base URL nikalna
            const protocol = req.headers['x-forwarded-proto'] || 'http';
            const host = req.headers.host;
            const baseUrl = `${protocol}://${host}`;
            
            // Backend par securely question bank fetch karo
            const response = await fetch(`${baseUrl}/api/get-data?file=questionbank`);
            if (!response.ok) throw new Error("Failed to fetch database");
            const result = await response.json();
            
            // 🛠️ UTF-8 FIX: Decode the payload strictly on the Server!
            const decodedPayload = new TextDecoder("utf-8").decode(Uint8Array.from(atob(result.payload), c => c.charCodeAt(0)));
            const ALL_SCENARIOS = JSON.parse(decodedPayload);
            
            // Auto Rotation Logic (Server-Side)
            const now = new Date();
            const dateBlockString = `${now.getFullYear()}${now.getMonth()}${now.getDate()}${now.getHours() >= 12 ? 1 : 0}`;
            const localBlockNumber = parseInt(dateBlockString);
            
            // Select ONLY the current case
            const caseIndex = localBlockNumber % ALL_SCENARIOS.length;
            const CASE_DATA = ALL_SCENARIOS[caseIndex];
            
            // Sirf 1 case frontend ko bhejo (Baqi sub chupay hue hain)
            return res.status(200).json(CASE_DATA);
        } catch (error) {
            return res.status(500).json({ error: "Data secure restricted." });
        }
    }
    
    return res.status(400).json({ error: "Invalid Action" });
}
