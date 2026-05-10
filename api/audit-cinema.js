// /api/audit-cinema.js
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
    
    if (req.body.action === 'get_acu_data') {
        const ACU_DATA = [
            {
                id: "movie_1", title: "The Gatekeeper", year: "2023", tag: "Phase 1: Foundation",
                desc: "Mastering the Code of Ethics, Laws, and Acceptance Procedures.",
                img: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=100&w=800&auto=format&fit=crop", 
                books: [
                    { title: "S1: Ethics", folder: "season_1", chapters: 20 },
                    { title: "S2: Law", folder: "season_2", chapters: 15 },
                    { title: "S3: ISA 210", folder: "season_3", chapters: 10 },
                    { title: "S4: ISA 230", folder: "season_4", chapters: 10 },
                    { title: "S5: Quality", folder: "season_5", chapters: 8 }
                ]
            },
            {
                id: "movie_2", title: "The Blueprint", year: "2024", tag: "Phase 2: Strategy",
                desc: "Identifying Risks, Planning the Audit Strategy, and Materiality.",
                img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=100&w=800&auto=format&fit=crop",
                books: [
                    { title: "S6: Risk", folder: "season_1", chapters: 20 },
                    { title: "S7: Strategy", folder: "season_2", chapters: 10 },
                    { title: "S8: Materiality", folder: "season_3", chapters: 12 },
                    { title: "S9: Controls", folder: "season_4", chapters: 25 },
                    { title: "S10: IT Audit", folder: "season_5", chapters: 15 }
                ]
            },
            {
                id: "movie_3", title: "The Investigation", year: "2025", tag: "Phase 3: Fieldwork",
                desc: "Collecting Evidence, Sampling, and Detecting Fraud in Financials.",
                img: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=100&w=800&auto=format&fit=crop",
                books: [
                    { title: "S11: Substantive", folder: "season_1", chapters: 30 },
                    { title: "S12: Fraud", folder: "season_2", chapters: 20 },
                    { title: "S13: Sampling", folder: "season_3", chapters: 15 },
                    { title: "S14: Related", folder: "season_4", chapters: 15 },
                    { title: "S15: Confirmed", folder: "season_5", chapters: 12 },
                    { title: "S16: IA", folder: "season_6", chapters: 10 },
                    { title: "S17: Expert", folder: "season_7", chapters: 8 }
                ]
            },
            {
                id: "movie_4", title: "The Verdict", year: "2026", tag: "Phase 4: Reporting",
                desc: "Reviewing Subsequent Events and Signing the Final Auditor's Report.",
                img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=100&w=800&auto=format&fit=crop",
                books: [
                    { title: "S18: Subsequent", folder: "season_1", chapters: 15 },
                    { title: "S19: Reps", folder: "season_2", chapters: 10 },
                    { title: "S20: Report", folder: "season_3", chapters: 25 },
                    { title: "S21: Review", folder: "season_4", chapters: 10 }
                ]
            }
        ];
        return res.status(200).json(ACU_DATA);
    }
    return res.status(400).json({ error: "Invalid Action" });
}
