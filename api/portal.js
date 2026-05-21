import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAeIvzRYa7G2f0iqfpgmRaaRRoDDb-OBZ8",
    authDomain: "caversity-48b29.firebaseapp.com",
    projectId: "caversity-48b29",
    storageBucket: "caversity-48b29.firebasestorage.app",
    messagingSenderId: "836067330285",
    appId: "1:836067330285:web:b20c125a385f7a2107e4e4",
    measurementId: "G-9QYDS8R9RJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    // Frontend jo payload bhej raha hai usko extract kiya
    const { code, isMultiSubjectMode, currentSubjectId, selectedSubjects } = req.body.payload;

    try {
        // --- DITTO COPY PASTE FROM YOUR FRONTEND ---
        
        // Firebase se 'coupons' collection mein is code ko dhoondo
        const couponDoc = await getDoc(doc(db, "coupons", code));
        
        if (couponDoc.exists()) {
            const couponData = couponDoc.data();
            
            // Check if coupon is restricted to specific subjects
            let allowedSubjects = couponData.subjectId || couponData.subjectid || couponData.applicableFor || "all";
            if (allowedSubjects !== "all") {
                if (typeof allowedSubjects === 'string') {
                    allowedSubjects = allowedSubjects.split(',').map(s => s.replace(/\s+/g, '').toLowerCase());
                } else if (Array.isArray(allowedSubjects)) {
                    allowedSubjects = allowedSubjects.map(s => s.replace(/\s+/g, '').toLowerCase());
                }

                let isValid = true;
                if (isMultiSubjectMode) {
                    // Vercel pe DOM nahi hota, isliye selectedSubjects array use ki hai
                    selectedSubjects.forEach(chk => { if (!allowedSubjects.includes(chk.replace(/\s+/g, '').toLowerCase())) isValid = false; });
                } else {
                    if (!allowedSubjects.includes(currentSubjectId.replace(/\s+/g, '').toLowerCase())) isValid = false;
                }
                
                if (!isValid) {
                    return res.status(400).json({ error: 'This coupon is not valid for the selected subject(s).' });
                }
            }

            // 🔥 BULLETPROOF COUPON EXTRACTOR 🔥
            let discountFound = 0;
            for (let key in couponData) {
                let k = key.toLowerCase();
                if (k.includes('discount') || k.includes('amount') || k.includes('value') || k.includes('val')) {
                    let parsed = parseInt(couponData[key], 10);
                    if (!isNaN(parsed) && parsed > 0) {
                        discountFound = parsed;
                        break;
                    }
                }
            }
            
            if (discountFound > 0) {
                return res.status(200).json({ discount: discountFound, code: code });
            } else {
                return res.status(400).json({ error: 'Coupon applied but no discount value found in database.' });
            }
        } else {
            return res.status(400).json({ error: "Invalid" });
        }
        
        // --- END DITTO COPY PASTE ---
        
    } catch (error) {
        return res.status(500).json({ error: error.message || 'Invalid or expired coupon code.' });
    }
}
