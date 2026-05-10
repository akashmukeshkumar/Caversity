// /api/auditmindmap.js
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
    
    if (req.body.action === 'get_mindmaps') {
        try {
            // Vercel environment base URL
            const protocol = req.headers['x-forwarded-proto'] || 'http';
            const host = req.headers.host;
            const baseUrl = `${protocol}://${host}`;
            
            // 🧠 SMART JUGAR: Try both possible file names automatically!
            let response = await fetch(`${baseUrl}/api/get-data?file=mindmaps`);
            if (!response.ok) {
                response = await fetch(`${baseUrl}/api/get-data?file=auditmindmap`);
            }
            if (!response.ok) throw new Error(`Database file not found in GitHub. Checked both 'mindmaps' and 'auditmindmap'.`);
            
            const result = await response.json();
            if (!result || !result.payload) throw new Error("Payload missing from database.");
            
            // 🛠️ Decoding purely on the server! (Hacker cannot see the scrambled payload anymore)
            const decodedPayload = Buffer.from(result.payload, 'base64').toString('utf-8');
            
            let MINDMAP_DATA;
            try { MINDMAP_DATA = JSON.parse(decodedPayload); } 
            catch (e) { throw new Error("File found, but JSON structure is broken inside it!"); }
            
            // Send clean response to frontend
            return res.status(200).json(MINDMAP_DATA);
        } catch (error) {
            console.error("Backend Mindmap Error:", error);
            return res.status(500).json({ error: "Data secure restricted.", details: error.message });
        }
    }
    
    return res.status(400).json({ error: "Invalid Action" });
}
