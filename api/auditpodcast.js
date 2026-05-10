// /api/auditpodcast.js
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
    
    if (req.body.action === 'get_podcast_data') {
        // This data is now hidden from the frontend source code.
        const PODCAST_DATA = [
            {
                id: "ep1",
                title: "The Art of Professional Skepticism",
                subtitle: "Decoding ISA 200 & Real-World Scenarios",
                audioUrl: "subjects/caf8_audit/features/assets/podcasts/ep1.mp3",
                duration: "12:45"
            },
            {
                id: "ep2",
                title: "Cracking the Code of Ethics",
                subtitle: "Navigating Threats & Safeguards",
                audioUrl: "subjects/caf8_audit/features/assets/podcasts/ep2.mp3",
                duration: "15:20"
            },
            {
                id: "ep3",
                title: "ISA 240: The Fraud Triangle",
                subtitle: "Identifying Red Flags in Financials",
                audioUrl: "subjects/caf8_audit/features/assets/podcasts/ep3.mp3",
                duration: "18:10"
            },
            // Add more podcast objects here...
        ];
        return res.status(200).json(PODCAST_DATA);
    }
    
    return res.status(400).json({ error: "Invalid Action" });
}

