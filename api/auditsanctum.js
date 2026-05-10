// /api/auditsanctum.js
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
    
    if (req.body.action === 'get_sanctum_data') {
        try {
            // Get dynamic base URL for Vercel environment
            const protocol = req.headers['x-forwarded-proto'] || 'http';
            const host = req.headers.host;
            const baseUrl = `${protocol}://${host}`;
            
            // Securely fetch the payload on the backend
            const response = await fetch(`${baseUrl}/api/get-data?file=auditninja`);
            if (!response.ok) throw new Error("Failed to fetch database");
            const result = await response.json();
            
            // 🛠️ Decode completely on the server so the frontend never sees the scrambled base64 payload
            const decodedPayload = Buffer.from(result.payload, 'base64').toString('utf-8');
            const SANCTUM_DATA = JSON.parse(decodedPayload);
            
            return res.status(200).json(SANCTUM_DATA);
        } catch (error) {
            return res.status(500).json({ error: "Data secure restricted." });
        }
    }
    
    return res.status(400).json({ error: "Invalid Action" });
}
