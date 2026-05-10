// /api/auditmindmap.js
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
    
    if (req.body.action === 'get_mindmaps') {
        try {
            // Vercel environment base URL
            const protocol = req.headers['x-forwarded-proto'] || 'http';
            const host = req.headers.host;
            const baseUrl = `${protocol}://${host}`;
            
            // Backend par securely encrypted data fetch karo
            const response = await fetch(`${baseUrl}/api/get-data?file=mindmaps`);
            if (!response.ok) throw new Error("Failed to fetch database");
            const result = await response.json();
            
            // 🛠️ Decoding purely on the server! (Hacker cannot see the scrambled payload anymore)
            const decodedPayload = Buffer.from(result.payload, 'base64').toString('utf-8');
            const MINDMAP_DATA = JSON.parse(decodedPayload);
            
            // Send clean response to frontend
            return res.status(200).json(MINDMAP_DATA);
        } catch (error) {
            return res.status(500).json({ error: "Data secure restricted." });
        }
    }
    
    return res.status(400).json({ error: "Invalid Action" });
}
