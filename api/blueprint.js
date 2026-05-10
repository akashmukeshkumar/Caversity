// /api/blueprint.js
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
    
    // 🔥 SARI EXTERNAL APIS AUR UNKI IDs YAHAN SECURE HAIN 🔥
    const API_BASE = "https://api.quran.com/api/v4";
    const TRANSLATION_IDS = "131,20"; 
    const TAFSIR_ID_EN = 169; // English Ibn Kathir
    const TAFSIR_ID_UR = 160; // Urdu Tafsir
    const TRANS_ID_UR = 97;   // Urdu Translation

    const { action, startPage, endPage, verseKey, lang } = req.body;

    try {
        if (action === 'get_verses') {
            let allVerses = [];
            for (let p = startPage; p <= endPage; p++) {
                const url = `${API_BASE}/verses/by_page/${p}?language=en&words=true&word_fields=text_indopak,translation&translations=${TRANSLATION_IDS}&fields=text_indopak`;
                const response = await fetch(url);
                const data = await response.json();
                if (data.verses) allVerses = allVerses.concat(data.verses);
            }
            return res.status(200).json({ verses: allVerses });
        }

        if (action === 'get_tafsir') {
            const tId = lang === 'ur' ? TAFSIR_ID_UR : TAFSIR_ID_EN;
            const response = await fetch(`${API_BASE}/tafsirs/${tId}/by_ayah/${verseKey}`);
            const data = await response.json();
            return res.status(200).json(data);
        }

        if (action === 'get_translation') {
            const response = await fetch(`${API_BASE}/verses/by_key/${verseKey}?language=ur&translations=${TRANS_ID_UR}`);
            const data = await response.json();
            return res.status(200).json(data);
        }
    } catch (error) {
        return res.status(500).json({ error: "External Data Failure" });
    }
}
