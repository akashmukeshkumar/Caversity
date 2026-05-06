import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { file } = req.query; // Browser batayega konsi file chahiye
  
  try {
    // 1. Chupi hui file ka rasta
    const filePath = path.join(process.cwd(), 'api/data', `${file}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // 2. 🛡️ Security Check: Sirf tab data do agar request hamari website se ho
    const referer = req.headers.referer;
    if (!referer || !referer.includes("caversity.vercel.app")) {
      return res.status(403).send("<h1>403 Forbidden</h1> direct access mana hai!");
    }

    // 3. 🚀 AUTO-ENCODER: Data ko Base64 (Ajeeb alphabets) mein badal do
    const encodedData = Buffer.from(fileContent).toString('base64');
    
    // Sirf encoded string bhejo
    res.status(200).json({ payload: encodedData });
  } catch (e) {
    res.status(404).json({ error: "File nahi mili" });
  }
}
