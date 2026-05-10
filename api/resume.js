// /api/resume.js
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
    
    if (req.body.action === 'get_config') {
        const programConfigs = {
            ca: {
                builderTitle: "CA Resume Builder", identityTitle: "4. CA Identity (Optional)",
                primaryLabel: "FTS Number", secondaryLabel: "CRN Number",
                primaryShort: "FTS", secondaryShort: "CRN", primaryDefault: "45", secondaryDefault: "123456",
                summary: "A highly motivated CA student looking for an opportunity to apply analytical skills and technical knowledge in a professional audit firm to serve the profession and achieve its goals.",
                mainQualLabel: "CAF (ICAP) Status", basicQualLabel: "PRC / AFC Status",
                mainQualTitle: "Certificate in Accounting & Finance (CAF)", basicQualTitle: "Pre-Requisite Competencies (PRC)",
                basicQualTitles: { prc: "Pre-Requisite Competencies (PRC)", afc: "Assessment of Fundamental Competencies (AFC)" },
                institute: "ICAP", mainQualDefault: "1 paper result awaiting, 3 in progress", basicQualDefault: "Passed",
                techDefault: "Microsoft Office, Financial Modeling, Data Analysis, Audit Procedures",
                softDefault: "Effective Communication, Problem Solving, Teamwork, Presentation",
                certDefault: "1st Position in Debates (2018), PCSC Certified",
                expTitleDefault: "Accountant at Ammar Shawls", expDateDefault: "July 2023 - Present",
                expDescDefault: "Maintained overall accounts, Handled customer dealing, Managed payroll and labour commissions",
                pdfName: "CA_Professional_Resume.pdf"
            },
            acca: {
                builderTitle: "ACCA Resume Builder", identityTitle: "4. ACCA Identity (Optional)",
                primaryLabel: "ACCA Registration No.", secondaryLabel: "ACCA Status / Level",
                primaryShort: "ACCA Reg", secondaryShort: "Status", primaryDefault: "1234567", secondaryDefault: "Applied Skills",
                summary: "A motivated ACCA student with a strong interest in accounting, audit, taxation and financial reporting, seeking an opportunity to apply technical knowledge and develop professionally in a progressive organization.",
                mainQualLabel: "ACCA Qualification Status", basicQualLabel: "Applied Knowledge / Foundation Status",
                mainQualTitle: "Association of Chartered Certified Accountants (ACCA)", basicQualTitle: "Applied Knowledge / Foundation Level",
                institute: "ACCA", mainQualDefault: "Applied Skills papers in progress", basicQualDefault: "Applied Knowledge passed",
                techDefault: "Microsoft Office, Financial Reporting, Audit Procedures, Taxation, Data Analysis",
                softDefault: "Effective Communication, Problem Solving, Teamwork, Time Management",
                certDefault: "ACCA Student, Microsoft Office Certified",
                expTitleDefault: "Accounts Trainee at ABC Firm", expDateDefault: "June 2024 - Present",
                expDescDefault: "Prepared bookkeeping records, Assisted in bank reconciliations, Supported audit and tax documentation",
                pdfName: "ACCA_Professional_Resume.pdf"
            }
        };
        return res.status(200).json(programConfigs);
    }
    return res.status(400).json({ error: "Invalid Action" });
}
