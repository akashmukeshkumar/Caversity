export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
    const { action, code, selectedSubjects, isMultiSubjectMode, currentSubjectContextId } = req.body;

    if (action === 'verify_coupon') {
        try {
            // Firebase Firestore REST API (Backend se direct check, no admin SDK needed)
            const firestoreUrl = `<https://firestore.googleapis.com/v1/projects/caversity-48b29/databases/(default)/documents/coupons/${code.toUpperCase()}>`;
            const response = await fetch(firestoreUrl);
            if (!response.ok) throw new Error("Invalid");
            
            const doc = await response.json();
            if (!doc.fields) throw new Error("Invalid");

            // Extract data from Firestore REST format
            const couponData = {};
            for (let key in doc.fields) {
                couponData[key] = doc.fields[key].stringValue || doc.fields[key].integerValue || doc.fields[key].arrayValue;
            }

            // Subject Restriction Check
            let allowedSubjects = couponData.subjectId || couponData.subjectid || couponData.applicableFor || "all";
            if (allowedSubjects !== "all") {
                if (typeof allowedSubjects === 'string') {
                    allowedSubjects = allowedSubjects.split(',').map(s => s.replace(/\s+/g, '').toLowerCase());
                } else if (allowedSubjects.values) {
                    allowedSubjects = allowedSubjects.values.map(v => v.stringValue.replace(/\s+/g, '').toLowerCase());
                }

                let isValid = true;
                if (isMultiSubjectMode) {
                    selectedSubjects.forEach(sub => { if (!allowedSubjects.includes(sub.replace(/\s+/g, '').toLowerCase())) isValid = false; });
                } else {
                    if (!allowedSubjects.includes(currentSubjectContextId.replace(/\s+/g, '').toLowerCase())) isValid = false;
                }
                if (!isValid) return res.status(400).json({ error: 'This coupon is not valid for the selected subject(s).' });
            }

            // Bulletproof Discount Extraction
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
                return res.status(200).json({ discount: discountFound, code: code.toUpperCase() });
            } else {
                return res.status(400).json({ error: 'Coupon applied but no discount value found in database.' });
            }
        } catch (error) {
            return res.status(400).json({ error: 'Invalid or expired coupon code.' });
        }
    }
}
