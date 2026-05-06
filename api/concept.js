export const auditData = [
  {
    id: 1,
    title: "Purpose of an Audit",
    concept: "The primary objective of an audit is to enhance the confidence of intended users (e.g., banks, shareholders) in the financial statements.",
    detail: "<ul><li><strong>The Agency Problem:</strong> Users (shareholders/banks) provide resources but do not manage day-to-day operations. They cannot blindly trust management, who prepares the financial statements.</li><li><strong>Role of the Auditor:</strong> An independent auditor is appointed to verify assertions (e.g., existence of assets) and express an opinion on whether the financial statements are free from material misstatement.</li><li><strong>Outcome:</strong> This independent verification allows users to make economic decisions (like lending money or buying shares) with higher confidence.</li></ul>"
  },
  {
    id: 2,
    title: "Audit Assertions: Existence vs. Rights & Obligations",
    concept: "Physically seeing an asset proves 'Existence,' but it does not prove 'Ownership' (Rights). Both must be verified separately.",
    detail: "<ul><li><strong>The Difference:</strong> An asset (e.g., inventory or investment property) might physically exist in the warehouse, but it could belong to a third party or be held as collateral.</li><li><strong>Verification Procedure:</strong></li><ul><li><strong>For Existence:</strong> Physical count or inspection.</li><li><strong>For Rights:</strong> Reviewing title deeds, invoices, or insurance documents.</li></ul><li><strong>Real-Life Risk:</strong> If an auditor only counts the stock but fails to check the invoices, they might confirm assets that the company does not actually own.</li></ul>"
  },
  {
    id: 3,
    title: "Understanding the Entity and Environment (Isa 315)",
    concept: "An auditor cannot effectively identify risks without understanding the client's business model, regulatory environment, and external factors.",
    detail: "<ul><li><strong>Why it matters:</strong> Without understanding operations, an auditor might verify invoices for sales that were legally impossible (e.g., sales recorded during an import ban).</li><li><strong>Key Factors to Study:</strong></li><ul><li><strong>Business Operations:</strong> How do they generate revenue?</li><li><strong>Regulations:</strong> Are they in a high-risk sector like Pharma (DRAP regulations)?</li><li><strong>External Factors:</strong> New competitors, technology changes (e.g., 5G replacing 4G), or environmental disasters (floods).</li></ul></ul>"
  },
  {
    id: 4,
    title: "Risk of Impairment (IAS 36) – Technology Obsolescence",
    concept: "Technological advancements (like 5G rollout) can render existing assets (4G towers) obsolete, requiring a revision of useful life or immediate impairment.",
    detail: "<ul><li><strong>The Trigger:</strong> If a new technology is launching soon, the existing infrastructure’s future cash flows will decrease.</li><li><strong>Audit Action:</strong> The auditor must not just check depreciation calculations. They must inquire with engineering/technical teams about the remaining useful life of the assets.</li><li><strong>Financial Impact:</strong> If useful life is overestimated, depreciation is understated, and assets/profits are overstated. The asset must be written down to its recoverable amount.</li></ul>"
  },
  {
    id: 5,
    title: "Provisions vs. Contingent Liabilities (Legal & Regulatory)",
    concept: "In regulated industries (e.g., Pharma/Telecom), penalties must be assessed based on the probability of outflow (The 50% Rule).",
    detail: "<ul><li><strong>Assessment Criteria:</strong></li><ul><li><strong>Probable (>50% chance of losing):</strong> Must record a provision (Expense).</li><li><strong>Possible (<50% chance of losing):</strong> Disclose as a Contingent Liability in notes.</li></ul><li><strong>Verification:</strong> Auditors cannot rely solely on management's word ('We will win'). They must review correspondence with regulators (e.g., DRAP notices) and obtain an external legal opinion.</li><li><strong>Risk:</strong> Management often conceals penalties or avoids recording them to protect profits.</li></ul>"
  },
  {
    id: 6,
    title: "Going Concern Assessment (ISA 570)",
    concept: "Management is responsible for assessing the company's ability to continue for the next 12 months; the auditor evaluates this assessment.",
    detail: "<ul><li><strong>Red Flags:</strong> Breach of loan covenants (e.g., interest cover ratio), loss of key management without replacement, import bans, or continuous negative cash flows.</li><li><strong>Audit Procedure:</strong> If management claims they have a survival plan (e.g., a sponsor will inject cash), the auditor must obtain written proof (wealth statements/agreements), not just verbal assurance.</li><li><strong>Impact:</strong> If the company is not a going concern, financial statements must be prepared on a Breakup Basis (assets at liquidation value), not the standard IFRS basis.</li></ul>"
  },
  {
    id: 7,
    title: "Analytical Procedures: Price vs. Quantity Logic",
    concept: "Revenue increases should be logically consistent with market data. If prices rise, quantity usually drops. If both rise significantly against market trends, it is a fraud risk.",
    detail: "<ul><li><strong>The Anomaly:</strong> If a company raises prices by 15% and revenue jumps excessively without a clear reason (like new customers), it suggests fake sales.</li><li><strong>Audit Action:</strong></li><ul><li>Verify if new customers actually exist.</li><li>Check volume data (Gate passes/delivery notes) to confirm goods actually left the warehouse.</li><li>Compare revenue growth with industry competitors.</li></ul></ul>"
  },
  {
    id: 8,
    title: "Revenue Recognition: Performance Obligations (Cut-off)",
    concept: "Revenue can only be recognized when the performance obligation is satisfied, not necessarily when cash is received.",
    detail: "<ul><li><strong>Example (Telecom/Service):</strong> Selling a prepaid card or booking a tour in advance brings cash, but revenue is not earned until the customer uses the service.</li><li><strong>The Risk:</strong> Recording the cash receipt immediately as revenue leads to Overstatement of Revenue.</li><li><strong>Correct Treatment:</strong> It should be recorded as a Liability (Unearned Revenue/Advance from Customer) until the service is delivered.</li></ul>"
  },
  {
    id: 9,
    title: "Inventory Valuation: NRV and Aging Analysis",
    concept: "Inventory must be valued at the lower of Cost or Net Realizable Value (NRV). An increase in 'Inventory Days' is a major indicator of obsolescence.",
    detail: "<ul><li><strong>The Indicator:</strong> If inventory days increase (e.g., from 25 to 58 days), it means stock is not selling. This implies the stock might be damaged, expired, or obsolete.</li><li><strong>Verification:</strong></li><ul><li>Obtain an Aging Report (identify items >90 days old).</li><li>Perform physical inspection for condition.</li><li>Check post-year-end sales prices to see if items are being sold at a loss.</li></ul></ul>"
  },
  {
    id: 10,
    title: "Receivables: Aging and Bad Debt Provision",
    concept: "Old receivables that are not being recovered suggest potential bad debts or fake sales.",
    detail: "<ul><li><strong>The Risk:</strong> If receivable days increase significantly, or if balances remain outstanding beyond credit terms, the asset is likely impaired.</li><li><strong>Audit Procedure:</strong></li><ul><li>Analyze the Ageing Report.</li><li>Send External Confirmations to customers.</li><li>Check for subsequent cash receipts (did they pay after year-end?).</li></ul><li><strong>Control Risk:</strong> If a company lacks an aging report, they cannot effectively monitor recovery, leading to understated bad debt expense.</li></ul>"
  },
  {
    id: 11,
    title: "Internal Controls: Design vs. Implementation",
    concept: "A control may \"exist\" (e.g., a CCTV camera), but if it is not effective (e.g., facing the wall), the control risk remains high.",
    detail: "<ul><li><strong>Design Deficiency:</strong> A control is poorly designed if the person approving a limit has a conflict of interest (e.g., Sales Director approving credit limits to boost sales bonuses).</li><li><strong>Implementation Failure:</strong> A control is designed well but ignored in practice (e.g., entering inventory into the system 3 days late).</li><li><strong>Audit Impact:</strong> The auditor must test both the design and the implementation of controls, not just their existence.</li></ul>"
  },
  {
    id: 12,
    title: "Capitalization Risks (CWIP & Cut-off)",
    concept: "Assets must only be capitalized when they are available for use. Delays in capitalization manipulate depreciation expense.",
    detail: "<ul><li><strong>Risk of Late Capitalization:</strong> Keeping completed assets in CWIP (Capital Work in Progress) avoids depreciation charges, artificially inflating profits.</li><li><strong>Risk of Early Capitalization:</strong> Capitalizing bulk assets (e.g., 800 laptops) before they are actually distributed/in-use overstates assets and starts depreciation too early.</li><li><strong>Verification:</strong> Cross-reference GRNs (Goods Receipt Notes), Vendor Confirmations, and Employee Issue logs to verify the actual date of use.</li></ul>"
  },
  {
    id: 13,
    title: "Foreign Exchange (FX) Risks (IAS 21)",
    concept: "Transactions must be recorded at the exchange rate on the transaction date, not the settlement date. Monetary assets/liabilities must be retranslated at year-end.",
    detail: "<ul><li><strong>Transaction Risk:</strong> Using an average rate or a single year-end rate for all sales during the year is incorrect.</li><li><strong>Translation Risk:</strong> Foreign currency bank accounts or payables must be revalued at the reporting date rate.</li><li><strong>Audit Check:</strong> Verify rates used against an official source (e.g., Central Bank rates) and ensure FX gains/losses are recorded in the P&L.</li></ul>"
  },
  {
    id: 14,
    title: "Investment in Subsidiary: Impairment Testing",
    concept: "If a subsidiary (e.g., a bank owned by a parent) is making losses or has negative equity, the parent company must test its investment for impairment.",
    detail: "<ul><li><strong>The Trigger:</strong> Continuous losses, defaults on loans, or regulatory breaches in the subsidiary are indicators of impairment.</li><li><strong>Valuation Method:</strong> For unlisted subsidiaries, the auditor reviews the \"Value in Use\" (VIU) model, checking future cash flow projections and assumptions.</li><li><strong>Risk:</strong> Overstatement of Investment in the Parent’s Balance Sheet if impairment is ignored.</li></ul>"
  },
  {
    id: 15,
    title: "Payroll Fraud (Ghost Employees)",
    concept: "If the number of employees increases significantly (e.g., massive hiring) but payroll expense remains flat, it indicates a risk of \"Ghost Employees\" or under-recorded expenses.",
    detail: "<ul><li><strong>Analytical Procedure:</strong> Compare the % increase in headcount with the % increase in payroll cost. They should correlate.</li><li><strong>Verification:</strong> Reconcile the employee master list with payroll records and verify bank transfers to ensure salaries are going to real people.</li></ul>"
  },
  {
    id: 16,
    title: "NPO (Non-Profit) Specific Risks",
    concept: "NPOs face unique risks regarding the completeness of income (donations) and compliance with donor restrictions.",
    detail: "<ul><li><strong>Completeness of Income:</strong> Cash collections (donation boxes) are high risk for theft. Auditors must check controls over opening boxes and counting cash.</li><li><strong>Restricted Funds:</strong> If a donor gives money for a specific purpose (e.g., building a school), using it for general expenses is a breach of contract and misstatement.</li><li><strong>Admin Limits:</strong> Many regulators limit admin expenses (e.g., max 10% of donations). Misclassifying admin costs as project costs to hide this is a compliance risk.</li></ul>"
  },
  {
    id: 17,
    title: "Cash Handling and Existence",
    concept: "For cash-intensive businesses (retail), the primary risk is \"Existence\" (theft), not just valuation.",
    detail: "<ul><li><strong>The Gap:</strong> If cash is collected daily but deposited weekly, the delay creates an opportunity for misappropriation (teeming and lading).</li><li><strong>Audit Procedure:</strong> Perform a surprise cash count at year-end (or randomly) to reconcile physical cash with the book balance.</li></ul>"
  },
  {
    id: 18,
    title: "Debt Covenants and Classification",
    concept: "Breaching a loan condition (like an Interest Cover Ratio) allows the bank to demand immediate repayment. This forces non-current liabilities to be reclassified as current.",
    detail: "<ul><li><strong>The Trigger:</strong> Auditors must recalculate ratios (e.g., Interest Cover) to verify compliance.</li><li><strong>Consequence:</strong> If breached, the loan becomes payable on demand. If the company cannot pay, it triggers a Going Concern issue.</li></ul>"
  },
  {
    id: 19,
    title: "Sampling Risk",
    concept: "Examining less than 100% of items creates the risk that the auditor's conclusion on the sample differs from the conclusion on the whole population.",
    detail: "<ul><li><strong>The Error:</strong> Finding 2 errors in a sample of 6 might imply a 33% error rate, but the rest of the population might be clean—or vice versa.</li><li><strong>Strategy:</strong> Auditors use \"Risk Targeting\" (focusing on high-value/high-risk items like old receivables) rather than random blind checking to minimize this risk.</li></ul>"
  },
  {
    id: 20,
    title: "Research vs. Development (IAS 38)",
    concept: "Research costs must always be expensed. Development costs can only be capitalized if specific criteria (PIRATE) are met.",
    detail: "<ul><li><strong>Research:</strong> Investigation and theory (Outcome uncertain) → Expense immediately.</li><li><strong>Development:</strong> Application of findings (Outcome probable) → Capitalize ONLY if technical feasibility, intention to sell, and resource availability are proven.</li><li><strong>Audit Risk:</strong> Management often tries to capitalize research costs to boost current year profits.</li></ul>"
  },
  {
    id: 21,
    title: "The Concept of Internal Control (Purpose)",
    concept: "Internal controls are policies and procedures designed by management to provide reasonable assurance about the achievement of entity objectives.",
    detail: "<ul><li><strong>Objectives:</strong> Reliability of financial reporting, efficiency of operations, and compliance with laws.</li><li><strong>Auditor's Interest:</strong> The auditor is primarily interested in controls relevant to financial reporting. If controls are strong, the auditor can reduce substantive testing.</li><li><strong>Limitation:</strong> Controls can only provide reasonable assurance, not absolute, due to inherent limitations (e.g., human error, collusion, management override).</li></ul>"
  },
  {
    id: 22,
    title: "Components of Internal Control (CRIME)",
    concept: "The framework for internal control consists of five key components: Control Environment, Risk Assessment, Information Systems, Monitoring, and Existing Control Activities.",
    detail: "<ul><li><strong>Control Environment:</strong> The \"tone at the top\" (integrity, ethics of management).</li><li><strong>Risk Assessment:</strong> How management identifies and analyzes risks (e.g., new tech, rapid growth).</li><li><strong>Control Activities:</strong> The actual policies (Segregation of Duties, Authorizations).</li><li><strong>Information System:</strong> How transactions are initiated, recorded, and reported.</li><li><strong>Monitoring:</strong> Assessing the performance of controls over time (e.g., internal audit).</li></ul>"
  },
  {
    id: 23,
    title: "Segregation of Duties (SoD) – The Golden Rule",
    concept: "No single person should handle a transaction from start to finish. Key functions must be separated: Authorization, Custody, and Recording.",
    detail: "<ul><li><strong>The Risk:</strong> If one person can authorize a purchase, receive the goods, and record the payment, they can easily steal assets and cover it up.</li><li><strong>Ideal Split:</strong></li><ul><li><strong>Custody:</strong> Warehouse Manager holding goods.</li><li><strong>Recording:</strong> Accountant recording the inventory.</li><li><strong>Authorization:</strong> Manager approving the purchase order.</li></ul></ul>"
  },
  {
    id: 24,
    title: "Sales Cycle: Credit Limit Authorization",
    concept: "Before accepting a new order, the system must check if the customer has exceeded their credit limit to prevent bad debts.",
    detail: "<ul><li><strong>Control:</strong> Sales orders should be automatically blocked if the Credit Limit is exceeded.</li><li><strong>Weakness:</strong> If the Sales Director (who wants higher sales bonuses) can override credit limits, this is a design deficiency.</li><li><strong>Audit Test:</strong> Check a sample of sales orders against customer credit limits and look for unauthorized overrides.</li></ul>"
  },
  {
    id: 25,
    title: "Sales Cycle: Dispatch & Invoicing (3-Way Match)",
    concept: "An invoice should only be generated if goods have actually been dispatched. The \"Three-Way Match\" ensures accuracy.",
    detail: "<ul><li><strong>The Match:</strong> The Sales Order, Goods Dispatch Note (GDN), and Sales Invoice must match in quantity and description.</li><li><strong>Risk:</strong> Billing for goods not shipped (Revenue Overstatement) or shipping goods without billing (Revenue Understatement).</li><li><strong>Control:</strong> The system should not allow an invoice to be printed without a linked GDN.</li></ul>"
  },
  {
    id: 26,
    title: "Purchases Cycle: Requisition vs. Order",
    concept: "Purchasing should separate the need (Requisition) from the buying (Order) to prevent unnecessary purchases or fraud.",
    detail: "<ul><li><strong>Purchase Requisition (PR):</strong> Raised by the department needing goods (e.g., Factory).</li><li><strong>Purchase Order (PO):</strong> Raised by the Procurement Department after selecting the best supplier.</li><li><strong>Control:</strong> The Procurement Dept should not originate PRs; they should only process PRs received from other departments.</li></ul>"
  },
  {
    id: 27,
    title: "Purchases Cycle: Goods Received Note (GRN)",
    concept: "The GRN is the critical evidence for the \"Existence\" of liability and \"Occurrence\" of purchase.",
    detail: "<ul><li><strong>Procedure:</strong> Warehouse staff must count and inspect goods before signing the GRN.</li><li><strong>Blind GRN:</strong> A strong control is a \"Blind GRN\" where the quantity column is blank, forcing the receiver to actually count the goods rather than just copying the PO number.</li><li><strong>Risk:</strong> If staff sign GRNs without counting, the company pays for short-delivered or damaged goods.</li></ul>"
  },
  {
    id: 28,
    title: "Purchases Cycle: Payment Authorization",
    concept: "Payments to suppliers must only be made for goods ordered and received.",
    detail: "<ul><li><strong>Control:</strong> The Accounts Payable department must perform a 3-way match (PO + GRN + Invoice) before authorizing payment.</li><li><strong>Segregation:</strong> The person signing the check (Treasurer) should not be the one approving the invoice (Controller).</li><li><strong>Audit Test:</strong> Review the \"voucher package\" for the stamp \"PAID\" to prevent duplicate payments.</li></ul>"
  },
  {
    id: 29,
    title: "Payroll: Ghost Employees Risk",
    concept: "A major fraud risk in payroll is paying non-existent employees (\"ghosts\").",
    detail: "<ul><li><strong>Risk Indicator:</strong> Total payroll expense increases while headcount remains flat, or multiple employees share the same bank account/address.</li><li><strong>Control:</strong> Periodic \"Headcount\" or \"Pay-out\" where an independent manager (not HR/Payroll) physically verifies employees receiving pay.</li><li><strong>Segregation:</strong> HR (hiring) must be separate from Payroll (processing salaries) and Finance (making payments).</li></ul>"
  },
  {
    id: 30,
    title: "Payroll: Overtime Authorization",
    concept: "Overtime payments are high-risk for manipulation and must be pre-authorized.",
    detail: "<ul><li><strong>Control:</strong> Overtime sheets must be signed by the department supervisor before being sent to payroll.</li><li><strong>Risk:</strong> Employees clocking in for friends (\"buddy punching\") or claiming overtime not worked.</li><li><strong>Audit Test:</strong> Compare overtime hours paid with production output (Analytical Procedure).</li></ul>"
  },
  {
    id: 31,
    title: "Inventory: Physical Count (Stocktake)",
    concept: "The periodic physical count verifies \"Existence\" and helps assess \"Valuation\" (condition of goods).",
    detail: "<ul><li><strong>Control:</strong> Counts should be done by teams of two (one counter, one checker) who are independent of the warehouse (not the custodian).</li><li><strong>Cut-off:</strong> Movement of goods (IN/OUT) must stop during the count to ensure accuracy.</li><li><strong>Procedure:</strong> Pre-numbered tag sheets must be used to ensure all items are counted and no item is counted twice.</li></ul>"
  },
  {
    id: 32,
    title: "Inventory: Valuation & Obsolescence",
    concept: "Internal controls must identify slow-moving or damaged stock to ensure it is valued at the lower of Cost or NRV.",
    detail: "<ul><li><strong>Control:</strong> The system should generate an \"Inventory Aging Report\" regularly.</li><li><strong>Review:</strong> Management must review the aging report to identify items older than X days and assess if a provision is needed.</li><li><strong>Risk:</strong> If old inventory is not identified, assets and profits are overstated.</li></ul>"
  },
  {
    id: 33,
    title: "Cash Controls: Bank Reconciliation",
    concept: "Bank reconciliations are the primary control to detect cash discrepancies, errors, or fraud.",
    detail: "<ul><li><strong>Control:</strong> Bank reconciliations must be prepared monthly by someone who does not handle cash or sign checks.</li><li><strong>Review:</strong> A senior manager must review and sign the reconciliation, investigating old outstanding items.</li><li><strong>Risk:</strong> Teeming and lading (using today’s receipts to cover yesterday’s theft) is detected through timely reconciliations.</li></ul>"
  },
  {
    id: 34,
    title: "Cash Controls: Petty Cash",
    concept: "Petty cash is susceptible to theft; an \"Imprest System\" is the best control.",
    detail: "<ul><li><strong>Imprest System:</strong> A fixed float (e.g., Rs 10,000) is maintained. Cash + Vouchers must always equal the float amount.</li><li><strong>Control:</strong> Vouchers must be signed by the claimant and approved by a manager. Surprise cash counts should be conducted.</li><li><strong>Risk:</strong> Using petty cash for personal expenses or unauthorized loans.</li></ul>"
  },
  {
    id: 35,
    title: "PPE: Capital Expenditure (Capex) Authorization",
    concept: "Buying fixed assets involves large sums; strict authorization limits are required.",
    detail: "<ul><li><strong>Control:</strong> tiered authorization limits (e.g., Manager < 50k, Director < 500k, Board > 500k).</li><li><strong>Comparison:</strong> Actual Capex should be compared against the approved Budget regularly.</li><li><strong>Risk:</strong> Unauthorized purchase of unnecessary assets or treating repairs as capital expenditure.</li></ul>"
  },
  {
    id: 36,
    title: "PPE: Asset Register Maintenance",
    concept: "The Fixed Asset Register (FAR) is the master record verifying the \"Completeness\" and \"Existence\" of assets.",
    detail: "<ul><li><strong>Control:</strong> All assets must be tagged with a unique ID physically and recorded in the FAR.</li><li><strong>Reconciliation:</strong> Periodically, physical assets should be reconciled with the FAR to detect stolen or missing assets.</li><li><strong>Disposal:</strong> Assets sold or scrapped must be removed from the FAR immediately to prevent overstating depreciation and assets.</li></ul>"
  },
  {
    id: 37,
    title: "IT General Controls (ITGC) vs. Application Controls",
    concept: "ITGCs apply to the whole IT environment, while Application Controls apply to specific processing tasks.",
    detail: "<ul><li><strong>ITGC Examples:</strong> Password policies, data backups, physical security of the server room, disaster recovery plans.</li><li><strong>Application Control Examples:</strong> Input validation checks (e.g., ensuring \"Quantity\" field only accepts numbers), limit checks, batch totals.</li><li><strong>Impact:</strong> If ITGCs are weak (e.g., weak passwords), Application Controls cannot be trusted.</li></ul>"
  },
  {
    id: 38,
    title: "IT Controls: Change Management",
    concept: "Changes to software or systems must be authorized and tested before going live.",
    detail: "<ul><li><strong>Control:</strong> Developers should not have access to the \"Live\" environment. Changes must be tested in a \"Test\" environment first.</li><li><strong>Approval:</strong> Final migration to the live system requires approval from the IT Manager and the User Department.</li><li><strong>Risk:</strong> A developer introducing unauthorized code (fraud or error) directly into the live system.</li></ul>"
  },
  {
    id: 39,
    title: "IT Controls: Backups & Disaster Recovery",
    concept: "Data loss is a major business risk; backups ensure continuity (Going Concern).",
    detail: "<ul><li><strong>Control:</strong> Daily backups should be taken and stored off-site (in a separate location or cloud).</li><li><strong>Testing:</strong> Mere backup is not enough; periodic \"Restore Tests\" must be done to ensure data can actually be recovered.</li><li><strong>Grandfather-Father-Son:</strong> A rotation strategy to keep daily, weekly, and monthly backups.</li></ul>"
  },
  {
    id: 40,
    title: "Control Deficiency: Significant Deficiency",
    concept: "Not all control weaknesses are equal. A \"Significant Deficiency\" merits attention by those charged with governance.",
    detail: "<ul><li><strong>Definition:</strong> A deficiency (or combination) that is important enough to merit the attention of the Board/Audit Committee.</li><li><strong>Reporting:</strong> The auditor communicates these in the \"Management Letter\" or \"Letter of Weakness\".</li><li><strong>Examples:</strong> Lack of SoD, evidence of fraud, ineffective risk assessment, or restatement of financials.</li></ul>"
  },
  {
    id: 41,
    title: "Revenue: Cut-off Controls",
    concept: "Sales must be recorded in the correct period. The GDN date determines the revenue date.",
    detail: "<ul><li><strong>Control:</strong> System should lock dates so sales invoices cannot be backdated.</li><li><strong>Procedure:</strong> Pre-numbered GDNs ensure that goods shipped on Dec 31st are recorded in Dec, and goods shipped Jan 1st are recorded in Jan.</li><li><strong>Risk:</strong> \"Channel Stuffing\" (forcing goods out at year-end to inflate sales).</li></ul>"
  },
  {
    id: 42,
    title: "Purchases: Supplier Statement Reconciliation",
    concept: "Reconciling the supplier's statement with the company's ledger is a key control for \"Completeness\" of liabilities.",
    detail: "<ul><li><strong>Control:</strong> Monthly reconciliation of major supplier statements.</li><li><strong>Benefit:</strong> Identifies missing invoices, disputed amounts, or payments not yet cleared.</li><li><strong>Risk:</strong> Understating payables by suppressing invoices.</li></ul>"
  },
  {
    id: 43,
    title: "Logical Access Controls (Passwords)",
    concept: "Access to systems must be restricted to authorized users only.",
    detail: "<ul><li><strong>Controls:</strong> Unique User IDs, complex passwords (alphanumeric), forced password changes every 90 days, and account lockouts after 3 failed attempts.</li><li><strong>Review:</strong> Access rights should be reviewed when an employee leaves or changes roles to prevent \"privilege creep\".</li></ul>"
  },
  {
    id: 44,
    title: "Physical Access Controls",
    concept: "Protecting physical assets (inventory, cash, servers) from unauthorized access.",
    detail: "<ul><li><strong>Controls:</strong> Swipe cards/biometrics for server rooms, locked warehouses, safes for cash, and CCTV monitoring.</li><li><strong>Log Review:</strong> Reviewing entry logs to see who accessed sensitive areas after hours.</li></ul>"
  },
  {
    id: 45,
    title: "Input Controls (Data Integrity)",
    concept: "\"Garbage In, Garbage Out.\" Controls must ensure data entering the system is accurate.",
    detail: "<ul><li><strong>Format Checks:</strong> Ensuring dates are DD/MM/YYYY.</li><li><strong>Range Checks:</strong> Salary cannot be negative or exceeding a max limit.</li><li><strong>Mandatory Fields:</strong> Preventing the system from processing if a key field (e.g., Customer ID) is empty.</li><li><strong>Check Digits:</strong> Detecting typo errors in codes (e.g., Account Numbers).</li></ul>"
  },
  {
    id: 46,
    title: "Batch Controls",
    concept: "Ensuring all documents in a batch are processed completely and accurately.",
    detail: "<ul><li><strong>Batch Total:</strong> Sum of a numerical field (e.g., Total Invoice Value).</li><li><strong>Hash Total:</strong> Sum of a non-financial field (e.g., Sum of Customer IDs) to verify no document was lost or added.</li><li><strong>Record Count:</strong> Checking if the number of documents input equals the number processed.</li></ul>"
  },
  {
    id: 47,
    title: "Master File Standing Data Controls",
    concept: "Changes to master data (e.g., Supplier Bank Details, Employee Salaries) are critical and high-risk.",
    detail: "<ul><li><strong>Control:</strong> Only specific senior staff should have rights to edit master files.</li><li><strong>Audit Trail:</strong> The system must log who changed what and when.</li><li><strong>Review:</strong> Periodic printout of changes to master data should be verified by an independent manager.</li></ul>"
  },
  {
    id: 48,
    title: "Control Environment: Tone at the Top",
    concept: "The ethical values and integrity demonstrated by management determine the strength of the entire control system.",
    detail: "<ul><li><strong>Indicators:</strong> Code of conduct enforcement, management’s attitude towards bypassing controls, and hiring competence.</li><li><strong>Impact:</strong> Even the best written policies fail if management demonstrates a lack of integrity.</li></ul>"
  },
  {
    id: 49,
    title: "Monitoring of Controls",
    concept: "Controls deteriorate over time; management must monitor them to ensure they stay effective.",
    detail: "<ul><li><strong>Methods:</strong> Internal Audit function, periodic management reviews, and analyzing customer complaints.</li><li><strong>Role of Internal Audit:</strong> To independently test controls and report weaknesses to the Audit Committee.</li></ul>"
  },
  {
    id: 50,
    title: "Limitations of Internal Control",
    concept: "No control system is perfect. Auditors must be aware of inherent limitations.",
    detail: "<ul><li><strong>Collusion:</strong> Two or more employees working together can bypass SoD (e.g., Storekeeper and Guard stealing together).</li><li><strong>Management Override:</strong> Senior management using their authority to force exceptions.</li><li><strong>Human Error:</strong> Fatigue, misunderstanding instructions, or mistakes.</li><li><strong>Cost vs. Benefit:</strong> Controls are only implemented if their cost is less than the benefit.</li></ul>"
  },
  {
    id: 51,
    title: "Narrative Notes vs. Flowcharts (Documentation)",
    concept: "Auditors must document their understanding of the client's systems.",
    detail: "<ul><li><strong>Narrative Notes:</strong> Written description of the system. Good for simple systems but can be dense.</li><li><strong>Flowcharts:</strong> Visual representation of document flow. Better for complex systems to identify control gaps.</li><li><strong>Questionnaires (ICQ/ICEQ):</strong> Checklists to identify strengths and weaknesses.</li></ul>"
  },
  {
    id: 52,
    title: "Walkthrough Test",
    concept: "Tracing a single transaction from start to finish to verify the system understanding.",
    detail: "<ul><li><strong>Purpose:</strong> To confirm that the documented system (Narrative/Flowchart) matches reality.</li><li><strong>Timing:</strong> Performed at the beginning of the audit during the risk assessment phase.</li></ul>"
  },
  {
    id: 53,
    title: "Test of Controls (TOC) vs. Substantive Testing",
    concept: "TOC tests if the system works; Substantive Testing tests if the numbers are right.",
    detail: "<ul><li><strong>Relationship:</strong> If TOCs prove controls are strong, the auditor can reduce (but not eliminate) Substantive Testing.</li><li><strong>If Controls Weak:</strong> The auditor abandons TOC and relies fully on Substantive Testing (increases sample sizes).</li></ul>"
  },
  {
    id: 54,
    title: "Payroll: Starters and Leavers",
    concept: "Risks associated with employees joining or leaving the company.",
    detail: "<ul><li><strong>Starters:</strong> Risk of creating fake employees. Control: Valid contract and ID proof required before adding to payroll.</li><li><strong>Leavers:</strong> Risk of continuing to pay after departure. Control: Immediate notification from Dept Head to Payroll to stop payments.</li></ul>"
  },
  {
    id: 55,
    title: "Purchases: Competitive Bidding",
    concept: "Ensuring the company gets the best price and quality.",
    detail: "<ul><li><strong>Control:</strong> For large purchases, at least 3 quotations must be obtained.</li><li><strong>Risk:</strong> Kickbacks (Supplier bribing the purchaser) or paying above market rates.</li></ul>"
  },
  {
    id: 56,
    title: "Sales: Price List Controls",
    concept: "Selling goods at authorized prices to protect margins.",
    detail: "<ul><li><strong>Control:</strong> Sales staff should only sell at the standard system price list.</li><li><strong>Discounts:</strong> Any discount above a certain % must be approved by a manager.</li><li><strong>Risk:</strong> Salesmen giving excessive discounts to friends or to meet volume targets.</li></ul>"
  },
  {
    id: 57,
    title: "Cash: Segregation in Mailroom",
    concept: "Controls for cash/cheques received by post.",
    detail: "<ul><li><strong>Control:</strong> Mail should be opened by two people present. A listing of cheques received should be made immediately.</li><li><strong>Purpose:</strong> Prevents theft before the money is even recorded in the ledger.</li></ul>"
  },
  {
    id: 58,
    title: "Inventory: Third-Party Stock",
    concept: "Goods held for others (or held by others) pose \"Rights & Obligations\" and \"Existence\" risks.",
    detail: "<ul><li><strong>Held for others:</strong> Must be physically segregated and excluded from the stock count.</li><li><strong>Held by others:</strong> Must be verified via Third-Party Confirmation or physical inspection.</li></ul>"
  },
  {
    id: 59,
    title: "Management Letter (Letter of Weakness)",
    concept: "The formal output of the internal control evaluation sent to management.",
    detail: "<ul><li><strong>Contents:</strong> Description of the deficiency, Possible Consequence (Risk), and Recommendation.</li><li><strong>Purpose:</strong> Constructive advice to the client, adding value to the audit service.</li></ul>"
  },
  {
    id: 60,
    title: "Application Controls: Sequence Check",
    concept: "Ensuring no document is missing from processing.",
    detail: "<ul><li><strong>Control:</strong> System checks for gaps in pre-numbered documents (e.g., Invoices 1001, 1002, 1004... where is 1003?).</li><li><strong>Assertion:</strong> Completeness.</li></ul>"
  },
  {
    id: 61,
    title: "Application Controls: Limit Check (Reasonableness)",
    concept: "Preventing illogical data entry.",
    detail: "<ul><li><strong>Example:</strong> Payroll system flags if \"Hours Worked\" > 24 per day or > 100 per week.</li><li><strong>Purpose:</strong> Prevents gross errors or fraud in data entry.</li></ul>"
  },
  {
    id: 62,
    title: "ITGC: Physical Security of Server Room",
    concept: "Protecting hardware is as important as protecting software.",
    detail: "<ul><li><strong>Risks:</strong> Theft of servers, damage by fire/water, or unauthorized physical access.</li><li><strong>Controls:</strong> Raised floors (flood protection), fire suppression systems (gas-based, not water), and climate control (AC).</li></ul>"
  },
  {
    id: 63,
    title: "ITGC: Antivirus and Firewalls",
    concept: "Protection against external cyber threats.",
    detail: "<ul><li><strong>Firewall:</strong> Filters traffic between the internal network and the internet (prevents hackers).</li><li><strong>Antivirus:</strong> Detects and removes malicious software.</li><li><strong>Update:</strong> Both must be updated automatically to recognize new threats.</li></ul>"
  },
  {
    id: 64,
    title: "Recurring Entries (Journals)",
    concept: "Automated entries reduce manual effort but need monitoring.",
    detail: "<ul><li><strong>Risk:</strong> If the setup is wrong, the error repeats every month (e.g., wrong depreciation rate).</li><li><strong>Control:</strong> Periodic review of standing instructions for recurring journals.</li></ul>"
  },
  {
    id: 65,
    title: "Exception Reports",
    concept: "Management by exception. The system highlights what went wrong.",
    detail: "<ul><li><strong>Example:</strong> A report showing all \"Sales Over Credit Limit\" or \"Inventory with Negative Balance.\"</li><li><strong>Action:</strong> Management must review these reports and document their resolution.</li></ul>"
  },
  {
    id: 66,
    title: "Direct vs. Indirect Controls",
    concept: "Controls can directly prevent error or indirectly support the environment.",
    detail: "<ul><li><strong>Direct:</strong> Checking an invoice calculation.</li><li><strong>Indirect:</strong> Management training on ethics (supports the environment but doesn't stop a specific math error).</li></ul>"
  },
  {
    id: 67,
    title: "Preventative vs. Detective Controls",
    concept: "It is better to stop an error than to find it later.",
    detail: "<ul><li><strong>Preventative:</strong> Passwords, Authorization limits, Validation checks (Stops it happening).</li><li><strong>Detective:</strong> Bank Reconciliations, Stock counts, Exception reports (Finds it after it happened).</li></ul>"
  },
  {
    id: 68,
    title: "Audit Committee",
    concept: "A subset of the Board (Non-Exec Directors) that oversees the audit and internal controls.",
    detail: "<ul><li><strong>Role:</strong> Acts as a buffer between the Auditor and Management to ensure independence.</li><li><strong>Function:</strong> Reviews internal control weaknesses and monitors the Internal Audit department.</li></ul>"
  },
  {
    id: 69,
    title: "System Logs (Audit Trails)",
    concept: "The \"Black Box\" of IT systems.",
    detail: "<ul><li><strong>Function:</strong> Records every action: User ID, Time, Data Before, Data After.</li><li><strong>Use:</strong> Essential for investigating fraud or system crashes.</li></ul>"
  },
  {
    id: 70,
    title: "Development vs. Testing vs. Live Environments",
    concept: "Segregation of duties in the IT world.",
    detail: "<ul><li><strong>Rule:</strong> Programmers write code in \"Dev\". It is moved to \"Test\" for checking. Only the IT Administrator moves it to \"Live\".</li><li><strong>Risk:</strong> If programmers access \"Live\", they can make unauthorized changes or hide fraud logic.</li></ul>"
  },
  {
    id: 71,
    title: "The Concept of \"Pervasiveness\"",
    concept: "A misstatement or lack of evidence is \"Pervasive\" if it impacts the financial statements as a whole, not just a single element.",
    detail: "<ul><li><strong>Definition:</strong> Pervasive effects are those that:</li><ul><li>Are not confined to specific elements, accounts, or items.</li><li>If confined, represent a substantial proportion of the financial statements.</li><li>Are fundamental to the user's understanding of the financial statements.</li></ul><li><strong>Decision Rule:</strong></li><ul><li><strong>Material but NOT Pervasive:</strong> The error is significant (e.g., Inventory is wrong), but the rest of the accounts (Cash, Sales, PPE) are fine.</li><li><strong>Material AND Pervasive:</strong> The error renders the entire financial statement misleading (e.g., Sales are fake, which affects Profit, Tax, Reserves, and Cash).</li></ul></ul>"
  },
  {
    id: 72,
    title: "Qualified Opinion (\"Except For\")",
    concept: "Issued when there is a material misstatement or scope limitation, but it is not pervasive.",
    detail: "<ul><li><strong>Wording:</strong> The auditor states that the financial statements present fairly, \"except for\" the effects of the specific matter described.</li><li><strong>Scenario 1 (Misstatement):</strong> The company did not depreciate machinery correctly. The error is material, but the rest of the balance sheet is correct.</li><li><strong>Scenario 2 (Scope Limitation):</strong> The auditor could not verify a specific inventory balance (e.g., kept at a remote branch), but verified everything else.</li></ul>"
  },
  {
    id: 73,
    title: "Adverse Opinion (\"Do Not Present Fairly\")",
    concept: "Issued when misstatements are both Material and Pervasive. The financial statements are totally misleading.",
    detail: "<ul><li><strong>Wording:</strong> The auditor states that the financial statements \"do not present fairly\" or \"do not give a true and fair view\".</li><li><strong>Scenario:</strong> The company did not consolidate a major subsidiary. This affects assets, liabilities, income, and expenses globally. A \"Qualified\" opinion is not enough because the whole picture is wrong.</li><li><strong>Significance:</strong> This is the worst possible opinion for a company; it essentially destroys credibility.</li></ul>"
  },
  {
    id: 74,
    title: "Disclaimer of Opinion (\"We Do Not Express an Opinion\")",
    concept: "Issued when the auditor is unable to obtain sufficient appropriate audit evidence, and the possible effects are Material and Pervasive.",
    detail: "<ul><li><strong>Wording:</strong> \"We do not express an opinion on the accompanying financial statements\".</li><li><strong>Scenario:</strong> A fire destroyed all accounting records, or management refused to let the auditor access any books. The auditor is \"blind\" and cannot say if the accounts are right OR wrong.</li><li><strong>Difference from Adverse:</strong> In Adverse, you know the accounts are wrong (evidence exists). In Disclaimer, you don't know anything (no evidence).</li></ul>"
  },
  {
    id: 75,
    title: "Key Audit Matters (KAM) – ISA 701",
    concept: "Matters that, in the auditor’s professional judgment, were of most significance in the audit of the current period.",
    detail: "<ul><li><strong>Applicability:</strong> Mandatory for Listed Entities.</li><li><strong>Purpose:</strong> To provide transparency about the \"tough parts\" of the audit (e.g., complex valuation of goodwill, significant tax disputes).</li><li><strong>Content:</strong> The auditor describes:</li><ul><li>Why the matter was significant.</li><li>How the matter was addressed in the audit.</li></ul><li><strong>Not a Qualification:</strong> KAMs are NOT modifications. The opinion remains \"Unmodified\" despite these risks, provided they are disclosed correctly.</li></ul>"
  },
  {
    id: 76,
    title: "Emphasis of Matter (EoM) – ISA 706",
    concept: "A paragraph used to draw users' attention to a matter already correctly disclosed in the financial statements that is fundamental to their understanding.",
    detail: "<ul><li><strong>Condition:</strong> The matter must not be a misstatement. If it's a misstatement, you modify the opinion, you don't use EoM.</li><li><strong>Examples:</strong></li><ul><li>A major subsequent event (e.g., a fire after year-end).</li><li>Significant uncertainty regarding litigation (that is properly disclosed).</li><li>A major catastrophe having a significant effect on the entity's financial position.</li></ul><li><strong>Placement:</strong> Usually immediately after the Opinion paragraph (or Basis for Opinion).</li></ul>"
  },
  {
    id: 77,
    title: "Other Matter (OM) Paragraph – ISA 706",
    concept: "Used to communicate matters other than those presented or disclosed in the financial statements (matters relevant to the audit/auditor's responsibilities).",
    detail: "<ul><li><strong>Distinction:</strong> EoM talks about what is inside the financial statements. OM talks about what is outside (e.g., audit scope, legal responsibilities).</li><li><strong>Examples:</strong></li><ul><li>If the prior period was audited by a predecessor auditor.</li><li>If the auditor is reporting on two sets of financial statements prepared under different frameworks.</li><li>Restricting the distribution of the audit report to specific users.</li></ul></ul>"
  },
  {
    id: 78,
    title: "Material Uncertainty Related to Going Concern (ISA 570)",
    concept: "If a material uncertainty exists regarding the entity's ability to continue as a going concern, and it is adequately disclosed, the opinion is Unmodified, but a special section is added.",
    detail: "<ul><li><strong>Scenario A (Disclosed):</strong> The company has lost a major customer but disclosed the risk and recovery plan.</li><li><strong>Audit Report:</strong> Unmodified Opinion + Separate section \"Material Uncertainty Related to Going Concern\" (This replaces the old practice of using EoM for Going Concern).</li><li><strong>Scenario B (Not Disclosed):</strong> Material uncertainty exists, but management hides it.</li><li><strong>Audit Report:</strong> Qualified or Adverse Opinion (because the lack of disclosure is a misstatement).</li></ul>"
  },
  {
    id: 79,
    title: "Scope Limitation: Management vs. Circumstances",
    concept: "The cause of the inability to obtain evidence affects the auditor's reaction, even if the reporting outcome (Qualified/Disclaimer) is similar.",
    detail: "<ul><li><strong>Circumstances:</strong> Fire, government seizure of records, or appointment after the year-end inventory count. These are often unavoidable.</li><li><strong>Management Imposed:</strong> Management refuses to let the auditor send confirmation letters or access minutes.</li><ul><li><strong>Auditor Action:</strong> This is serious. Communicate with governance. If unresolved, consider withdrawing from the engagement because management integrity is in doubt.</li></ul></ul>"
  },
  {
    id: 80,
    title: "Basis for Opinion Paragraph",
    concept: "Every audit report must include a \"Basis for Opinion\" paragraph immediately following the Opinion paragraph.",
    detail: "<ul><li><strong>Content:</strong></li><ul><li>States the audit was conducted in accordance with ISAs.</li><li>References the auditor's responsibilities section.</li><li>Statements about Independence and ethical compliance (Code of Ethics).</li><li>Statement that the auditor believes the evidence obtained is sufficient and appropriate to provide a basis for the opinion.</li></ul><li><strong>Modification:</strong> If the opinion is modified (Qualified/Adverse/Disclaimer), this paragraph becomes \"Basis for Qualified Opinion\" (etc.) and must describe the reason for the modification (quantification of the error).</li></ul>"
  },
  {
    id: 81,
    title: "Misstatement vs. Limitation on Scope (The Grid)",
    concept: "Auditors must classify the problem into one of two categories before deciding the opinion.",
    detail: "<ul><li><strong>Misstatement (Disagreement):</strong> The auditor has evidence, but the client's numbers/disclosures are wrong.</li><ul><li><strong>Examples:</strong> Wrong accounting policy, wrong amount, classification error, missing disclosure.</li></ul><li><strong>Limitation on Scope (No Evidence):</strong> The auditor cannot find evidence to prove the numbers are right OR wrong.</li><ul><li><strong>Examples:</strong> Missing records, no access to associates, inability to attend stock take.</li></ul></ul>"
  },
  {
    id: 82,
    title: "KAM vs. EoM (The Confusion)",
    concept: "Students often confuse Key Audit Matters (KAM) and Emphasis of Matter (EoM). They are distinct tools.",
    detail: "<ul><li><strong>KAM:</strong> Used for areas of Significant Risk or Judgment (e.g., Goodwill Impairment, Valuation of complex instruments). It explains how the audit was done. It is mandatory for listed companies.</li><li><strong>EoM:</strong> Used for Fundamental matters disclosed in FS (e.g., Subsequent Fire, Litigation outcome). It draws attention to a note. It does not explain audit procedures.</li><li><strong>Rule:</strong> If a matter is a KAM, it is usually NOT an EoM. KAM takes precedence in listed entities unless the matter is so fundamental (like a disaster) that EoM is required.</li></ul>"
  },
  {
    id: 83,
    title: "\"Present Fairly\" Framework",
    concept: "The audit opinion states that financial statements \"present fairly in all material respects.\" This implies the framework used is a Fair Presentation Framework.",
    detail: "<ul><li><strong>Fair Presentation Framework:</strong> Requires compliance with standards (IFRS) but acknowledges that sometimes, to achieve fair presentation, management may need to provide disclosures beyond the standard requirements.</li><li><strong>Compliance Framework:</strong> Requires strict adherence to the rules/laws, without the override for \"fair presentation\".</li></ul>"
  },
  {
    id: 84,
    title: "Evaluating Uncorrected Misstatements",
    concept: "The auditor must evaluate the effect of misstatements identified during the audit that management has refused to correct.",
    detail: "<ul><li><strong>Materiality:</strong> Are the uncorrected errors material individually?</li><li><strong>Aggregate:</strong> Are they material when added together? (e.g., 5 small errors might equal 1 big material error).</li><li><strong>Qualitative:</strong> Is the error material by nature? (e.g., Fraud, or a small error that changes a Loss into a Profit).</li></ul>"
  },
  {
    id: 85,
    title: "Date of the Audit Report",
    concept: "The audit report cannot be dated earlier than the date on which the auditor has obtained sufficient appropriate audit evidence.",
    detail: "<ul><li><strong>Prerequisite:</strong> All statements must be prepared, and management must have asserted that they have taken responsibility for them (usually the Directors' approval date).</li><li><strong>Implication:</strong> The auditor is responsible for subsequent events up to the date of the audit report.</li></ul>"
  },
  {
    id: 86,
    title: "Other Information (ISA 720)",
    concept: "\"Other Information\" refers to financial and non-financial information (like the Directors' Report or Chairman's Message) included in the annual report alongside the audited FS.",
    detail: "<ul><li><strong>Responsibility:</strong> The auditor does not audit this, but must read it to ensure it is consistent with the audited accounts.</li><li><strong>Inconsistency:</strong> If the Directors' Report says \"We made a huge profit\" but the FS shows a loss, the auditor must ask for a correction.</li><li><strong>Reporting:</strong> If uncorrected, the auditor describes the inconsistency in the \"Other Information\" section of the audit report.</li></ul>"
  },
  {
    id: 87,
    title: "Going Concern – Inappropriate Basis",
    concept: "If the company uses the Going Concern basis (standard accounting), but the auditor believes the company will effectively close down (Liquidation is imminent), the basis is inappropriate.",
    detail: "<ul><li><strong>Opinion:</strong> Adverse Opinion.</li><li><strong>Reason:</strong> The entire basis of preparing the accounts is wrong. Assets should be at liquidation value, not book value. No amount of disclosure can fix this fundamental error.</li></ul>"
  },
  {
    id: 88,
    title: "Emphasis of Matter – Specific Limitations",
    concept: "The auditor cannot use an Emphasis of Matter paragraph to avoid modifying the opinion.",
    detail: "<ul><li><strong>Rule:</strong> If there is a material misstatement, you must Qualify or give Adverse. You cannot just write an EoM saying \"Please look at Note X where they admit the error.\" This is widely tested in exams.</li><li><strong>Purpose:</strong> EoM is for correctly presented information only.</li></ul>"
  },
  {
    id: 89,
    title: "Key Audit Matters – \"The Why and The How\"",
    concept: "When writing a KAM, the auditor must describe why the matter was considered significant and how it was addressed in the audit.",
    detail: "<ul><li><strong>Why:</strong> \"We focused on Revenue Recognition because the contracts are complex and involve significant judgment...\".</li><li><strong>How:</strong> \"Our procedures included testing controls, inspecting a sample of contracts, and consulting with our internal experts...\".</li><li><strong>Outcome:</strong> This provides users with insight into the auditor's work, not just the company's numbers.</li></ul>"
  },
  {
    id: 90,
    title: "Disclaimer due to Scope Limitation – Multiple Uncertainties",
    concept: "A Disclaimer of Opinion is also appropriate when there are multiple uncertainties that, while individually might be manageable, collectively make it impossible to form an opinion.",
    detail: "<ul><li><strong>Scenario:</strong> A company facing a lawsuit, a tax investigation, and a loss of key records simultaneously.</li><li><strong>Interaction:</strong> Even if each issue is disclosed, the interaction of these uncertainties might be so complex that the auditor cannot judge the overall fairness.</li></ul>"
  },
  {
    id: 91,
    title: "Basis for Modification Paragraph (Content Requirement)",
    concept: "When an opinion is modified (Qualified, Adverse, or Disclaimer), simply changing the opinion paragraph is not enough. The \"Basis for Opinion\" paragraph immediately following it must also be modified.",
    detail: "<ul><li><strong>New Heading:</strong> The heading changes to \"Basis for Qualified Opinion\" (or Adverse/Disclaimer).</li><li><strong>Mandatory Content:</strong> The auditor must provide a Quantification of the misstatement (the specific amount).</li><li><strong>Example:</strong> \"Inventory is overstated by Rs. 10 million. Consequently, Cost of Sales is understated and Profit is overstated by Rs. 10 million.\"</li><li><strong>If Scope Limitation:</strong> The auditor must explain why the evidence could not be obtained (e.g., \"Records were destroyed by fire\").</li></ul>"
  },
  {
    id: 92,
    title: "Material Uncertainty Related to Going Concern (MURGC) vs. KAM",
    concept: "If a Going Concern uncertainty exists and is properly disclosed, it is NOT included in the Key Audit Matters (KAM) section. It has its own dedicated section.",
    detail: "<ul><li><strong>Rule:</strong> Going Concern issues are considered too fundamental to be mixed with KAMs.</li><li><strong>Placement:</strong> This appears under a separate heading: \"Material Uncertainty Related to Going Concern\".</li><li><strong>KAM Relation:</strong> The KAM section will either state \"We have nothing to report in this regard\" or discuss other risks (like Goodwill). Going Concern is excluded from KAM.</li></ul>"
  },
  {
    id: 93,
    title: "\"Close Call\" Situations (Going Concern)",
    concept: "Sometimes a company is close to failure but manages to survive (e.g., a solid management plan or bank waiver). This is termed a \"Close Call.\"",
    detail: "<ul><li><strong>Scenario:</strong> The company defaulted on a loan, but received a waiver from the bank before year-end.</li><li><strong>Disclosure:</strong> Management is required to disclose this \"Close Call\" situation in the Financial Statements (under IAS 1 judgments).</li><li><strong>Audit Reporting:</strong> If the disclosure is adequate, the opinion is Unmodified. However, the auditor may use KAM to highlight that this area required significant audit attention.</li></ul>"
  },
  {
    id: 94,
    title: "Pervasive Scope Limitation (Disclaimer) vs. Withdraw",
    concept: "If management intentionally refuses to provide evidence (Scope Limitation imposed by Management), the auditor prefers to Withdraw from the engagement rather than just issuing a Disclaimer.",
    detail: "<ul><li><strong>Logic:</strong> If management is hiding evidence, their integrity is in doubt.</li><li><strong>Action:</strong> A Disclaimer is insufficient because the auditor can no longer trust any representation made by management.</li><li><strong>Exam Tip:</strong> If the question states \"Management refuses to provide access,\" consider withdrawal as the primary option (if laws permit).</li></ul>"
  },
  {
    id: 95,
    title: "Evaluation of Uncorrected Misstatements (Aggregate Effect)",
    concept: "The auditor does not just look at large (material) errors individually; they also evaluate the Total (Aggregate) of smaller uncorrected misstatements.",
    detail: "<ul><li><strong>Scenario:</strong> Inventory has a 2 million error, Receivables 3 million, and Expenses 2 million.</li><li><strong>Individual:</strong> Individually, they might not be material (if materiality is 5 million).</li><li><strong>Aggregate:</strong> The total effect (2+3+2 = 7 million) exceeds materiality.</li><li><strong>Result:</strong> The auditor must issue a Qualified Opinion if management refuses to correct these to bring the total below materiality.</li></ul>"
  },
  {
    id: 96,
    title: "Other Information (Director's Report) Inconsistency",
    concept: "If the Financial Statements (FS) are correct, but the Director's Report contains a factual error (Inconsistency), the Audit Opinion remains Unmodified.",
    detail: "<ul><li><strong>Scenario:</strong> FS correctly shows a Loss of 10M, but the Director's Report claims \"We had a profitable year.\"</li><li><strong>Action:</strong> The auditor does not modify the opinion because the FS are accurate.</li><li><strong>Reporting:</strong> The auditor reports this issue in the separate \"Other Information\" section, stating that the \"Director's Report is inconsistent with the FS.\"</li></ul>"
  },
  {
    id: 97,
    title: "Comparative Information (Corresponding Figures)",
    concept: "The Audit Opinion usually relates only to the Current Period figures, not the prior year's figures (unless the prior issue remains unresolved).",
    detail: "<ul><li><strong>Rule:</strong> If the prior year's opinion was Qualified but the issue has been resolved in the current year, the current opinion is Unmodified.</li><li><strong>Exception:</strong> If the prior year's misstatement is unresolved, the auditor modifies the opinion regarding the \"possible effects on the corresponding figures.\"</li></ul>"
  },
  {
    id: 98,
    title: "Emphasis of Matter (EoM) - Specific Valid Examples",
    concept: "An Emphasis of Matter (EoM) paragraph is used ONLY when a matter is Fundamental to users' understanding and is Correctly Disclosed.",
    detail: "<ul><li><strong>Valid Examples for EoM:</strong></li><ul><li>Early Application of a new Accounting Standard (before it becomes mandatory).</li><li>Major Catastrophe (e.g., an Earthquake destroying a factory).</li><li>Major Subsequent Event (e.g., Post year-end lawsuit settlement).</li></ul><li><strong>Invalid Use:</strong> Using EoM to highlight a misstatement or accounting error is strictly prohibited (This requires a Qualified/Adverse opinion).</li></ul>"
  },
  {
    id: 99,
    title: "Omission of Disclosure = Misstatement",
    concept: "A \"misstatement\" isn't just a wrong number. If a required disclosure (Note) is missing from the financial statements, it is treated exactly like a wrong figure.",
    detail: "<ul><li><strong>Scenario:</strong> The company has a significant lawsuit but refuses to disclose it in the notes, even though no provision is needed yet.</li><li><strong>Audit Action:</strong> This is a material misstatement of disclosure.</li><li><strong>Opinion:</strong> Qualified or Adverse (depending on how critical that missing information is for understanding the FS).</li></ul>"
  },
  {
    id: 100,
    title: "Modification vs. KAM (The \"Not Both\" Rule)",
    concept: "A matter that leads to a Qualified, Adverse, or Disclaimer of opinion is NEVER reported as a Key Audit Matter (KAM).",
    detail: "<ul><li><strong>The Logic:</strong> KAMs are for \"significant matters\" that were addressed satisfactorily during the audit. If a matter causes the opinion to fail (modify), it is too serious to be just a KAM.</li><li><strong>Placement:</strong> It must be described in the \"Basis for Qualified/Adverse Opinion\" section.</li><li><strong>KAM Section:</strong> The KAM section (if present) might refer to the Basis for Opinion paragraph but should not duplicate the description.</li></ul>"
  },
  {
    id: 101,
    title: "Working Withdrawal due to Management-Imposed Limitation",
    concept: "If management prevents the auditor from obtaining evidence (e.g., \"You cannot look at these minutes\"), the auditor should consider withdrawing from the audit entirely.",
    detail: "<ul><li><strong>Why not just Disclaimer?</strong> A disclaimer handles the lack of evidence. However, management blocking access implies a lack of integrity.</li><li><strong>Implication:</strong> If management hides one thing, they might be hiding fraud elsewhere. The auditor cannot trust any representation from them.</li><li><strong>Exam Tip:</strong> If the question says \"Management refused access,\" discuss withdrawal first. If legally not possible, then issue a Disclaimer.</li></ul>"
  },
  {
    id: 102,
    title: "Prior Period Audited by Another Auditor (Other Matter)",
    concept: "If the previous year's financial statements were audited by a different firm (Predecessor Auditor), the current auditor uses an Other Matter (OM) paragraph to state this fact.",
    detail: "<ul><li><strong>Content:</strong> The OM paragraph will state:</li><ul><li>That the prior period FS were audited by a predecessor auditor.</li><li>The type of opinion they expressed (Unmodified/Modified).</li><li>The date of that report.</li></ul><li><strong>Purpose:</strong> To clarify that the current auditor is only responsible for the current year's figures.</li></ul>"
  },
  {
    id: 103,
    title: "Going Concern: \"Inappropriate Basis\" (Adverse Opinion)",
    concept: "If the company prepares accounts on a Going Concern basis, but the auditor concludes the company will likely shut down (Liquidation is imminent), the opinion is Adverse.",
    detail: "<ul><li><strong>The Trap:</strong> Students often think \"Going Concern issue = Material Uncertainty section.\"</li><li><strong>The Difference:</strong></li><ul><li><strong>Uncertainty:</strong> Company might survive (Unmodified + MURGC section).</li><li><strong>Inappropriate:</strong> Company will not survive (Adverse).</li></ul><li><strong>Reason:</strong> The entire method of valuation (Historical Cost vs. Liquidation Value) is wrong, making the FS fundamentally misleading.</li></ul>"
  },
  {
    id: 104,
    title: "KAM for Non-Listed Entities (Voluntary)",
    concept: "While KAM is mandatory for listed entities, it is voluntary for non-listed entities.",
    detail: "<ul><li><strong>Scenario:</strong> An unlisted charity or private company wants to show transparency.</li><li><strong>Decision:</strong> The auditor can include KAMs in the report if they decide it adds value or if management requests it.</li><li><strong>Constraint:</strong> If they choose to include KAMs, they must follow the full requirements of ISA 701 (cannot do a \"lite\" version).</li></ul>"
  },
  {
    id: 105,
    title: "Materiality: \"Substantial Proportion\" (Pervasiveness)",
    concept: "A misstatement can be pervasive even if it affects only one account, provided that account represents a substantial proportion of the financial statements.",
    detail: "<ul><li><strong>Example:</strong> Cash is 90% of a company's total assets.</li><li><strong>Scenario:</strong> The cash balance is fake/missing.</li><li><strong>Opinion:</strong> Even though it's \"just one account,\" it is Pervasive because without accurate cash figures, the balance sheet is meaningless.</li><li><strong>Result:</strong> Adverse Opinion.</li></ul>"
  },
  {
    id: 106,
    title: "Initial Audit Engagement (Opening Balances)",
    concept: "For a new client, if the auditor cannot verify the Opening Balances (e.g., Inventory from last year), they might need to modify the opinion for the current year.",
    detail: "<ul><li><strong>Why:</strong> Opening Inventory affects the Cost of Sales (Opening + Purchases - Closing = COGS).</li><li><strong>Impact:</strong> If Opening Inventory is unverified, the Profit for the current year is unverified.</li><li><strong>Opinion:</strong> The auditor might issue a Qualified Opinion regarding the Financial Performance (Profit) and Cash Flows, but an Unmodified Opinion on the Financial Position (Balance Sheet at year-end).</li></ul>"
  },
  {
    id: 107,
    title: "\"Other Information\" – Misstatement of Fact",
    concept: "If the \"Other Information\" (e.g., Chairman's Statement) contains a number unrelated to the FS but is factually wrong (e.g., \"We have 5000 employees\" but they only have 50), it is a Misstatement of Fact.",
    detail: "<ul><li><strong>Auditor's Duty:</strong> Although not auditing the number, the auditor must ask management to correct it to maintain credibility.</li><li><strong>Refusal:</strong> If management refuses, the auditor discusses with governance or considers the impact on management's integrity (ISA 720).</li></ul>"
  },
  {
    id: 108,
    title: "Date of Approval vs. Date of Report",
    concept: "The Auditor's Report cannot be dated before the date the Directors approve the financial statements.",
    detail: "<ul><li><strong>Sequence:</strong></li><ul><li>FS Prepared.</li><li>Directors Approve & Sign FS (e.g., Jan 15th).</li><li>Auditor Signs Report (Jan 15th or later).</li></ul><li><strong>Logic:</strong> The auditor cannot opine on something that doesn't officially exist yet.</li></ul>"
  },
  {
    id: 109,
    title: "Qualified Opinion: \"Except For\" Specific Wording",
    concept: "When issuing a Qualified Opinion, the phrase \"except for\" is the specific legal trigger.",
    detail: "<ul><li><strong>Exam Tip:</strong> Never write \"The accounts are true and fair subject to...\" or \"with the exception of...\".</li><li><strong>Correct Standard:</strong> You must use the exact phrase: \"In our opinion, except for the effects of the matter described in the Basis for Qualified Opinion section, the financial statements present fairly...\".</li></ul>"
  },
  {
    id: 110,
    title: "The Definition of Materiality",
    concept: "Information is material if its omission or misstatement could reasonably be expected to influence the economic decisions of users taken on the basis of the financial statements.",
    detail: "<ul><li><strong>User Perspective:</strong> Materiality is always judged from the perspective of the users (shareholders, banks, regulators), not the management.</li><li><strong>Context Matters:</strong> It is not an absolute number. A specific amount (e.g., $10,000) might be material for a small startup but immaterial for a multinational giant.</li><li><strong>Judgment:</strong> Determining materiality is a matter of professional judgment.</li></ul>"
  },
  {
    id: 111,
    title: "Performance Materiality (The \"Safety Buffer\")",
    concept: "Performance Materiality is set at a value lower than overall materiality to reduce the risk that the total of uncorrected and undetected misstatements exceeds the overall materiality.",
    detail: "<ul><li><strong>Purpose:</strong> It acts as a safety buffer. If you audit everything to the exact limit of overall materiality, you leave no room for error or undetected items.</li><li><strong>Calculation:</strong> It is usually a percentage (e.g., 60-85%) of overall materiality, depending on the risk of misstatement.</li><li><strong>Application:</strong> Auditors use this lower threshold when designing audit procedures (e.g., selecting sample sizes).</li></ul>"
  },
  {
    id: 112,
    title: "Benchmarks for Calculating Materiality",
    concept: "Materiality is calculated by applying a percentage to a chosen benchmark from the financial statements.",
    detail: "<ul><li><strong>Common Benchmarks:</strong></li><ul><li><strong>Profit Before Tax:</strong> (5-10%) Used for profit-oriented entities.</li><li><strong>Total Revenue:</strong> (0.5-1%) Used for entities with volatile profits or high sales volume.</li><li><strong>Total Assets:</strong> (1-2%) Used for asset-heavy entities or when the focus is on the balance sheet.</li><li><strong>Net Assets/Equity:</strong> Used for investment funds or startups.</li></ul><li><strong>Selection Criteria:</strong> The benchmark must reflect what users focus on. For a listed company, users care about Profit. For a non-profit, they care about Total Expenses or Assets.</li></ul>"
  },
  {
    id: 113,
    title: "Revision of Materiality (Dynamic Nature)",
    concept: "Materiality is not static. It must be revised if the auditor becomes aware of information during the audit that would have caused them to determine a different amount initially.",
    detail: "<ul><li><strong>Trigger:</strong></li><ul><li>A change in circumstances (e.g., a major disposal of assets).</li><li>New information (e.g., actual year-end figures are significantly different from the interim figures used for planning).</li></ul><li><strong>Impact:</strong> If overall materiality is lowered, Performance Materiality must also be lowered, and audit procedures (like sample sizes) usually need to be increased.</li></ul>"
  },
  {
    id: 114,
    title: "Qualitative Materiality (Nature vs. Size)",
    concept: "Misstatements can be material due to their nature, even if the amount is small (quantitatively immaterial).",
    detail: "<ul><li><strong>Examples:</strong></li><ul><li><strong>Fraud:</strong> Even a small theft by a CFO is material because it reflects on integrity.</li><li><strong>Legal Compliance:</strong> A small bribe or penalty might trigger huge regulatory consequences.</li><li><strong>Debt Covenants:</strong> A small error that changes a ratio (e.g., turning a profit into a loss, or breaching a loan condition) is material.</li><li><strong>Related Party Transactions:</strong> These are always considered material by nature due to the risk of collusion.</li></ul></ul>"
  },
  {
    id: 115,
    title: "Documentation Requirements (ISA 320)",
    concept: "The auditor must document the specific figures and the reasoning used to derive them.",
    detail: "<ul><li><strong>What to Document:</strong></li><ul><li><strong>Overall Materiality:</strong> The figure and the benchmark used.</li><li><strong>Performance Materiality:</strong> The figure and the rationale for the percentage chosen.</li><li><strong>Revisions:</strong> If materiality changed during the audit, the reason for the change must be documented.</li></ul><li><strong>Why:</strong> To provide a record of the judgments made for future reference or inspection.</li></ul>"
  },
  {
    id: 116,
    title: "Clearly Trivial Threshold (CTT)",
    concept: "Auditors set a \"Clearly Trivial\" threshold (e.g., 5% of overall materiality). Any error below this amount is ignored entirely.",
    detail: "<ul><li><strong>Distinction:</strong> \"Clearly Trivial\" is not the same as \"Not Material.\"</li><li><strong>Not Material:</strong> An error that is significant but below the overall limit. It is noted on a list of uncorrected misstatements.</li><li><strong>Clearly Trivial:</strong> An error so small (e.g., $10 rounding difference) that it has clearly no consequence. It is not even documented in the summary of uncorrected misstatements.</li></ul>"
  },
  {
    id: 117,
    title: "Materiality for Specific Classes of Transactions",
    concept: "Sometimes, a lower materiality level is set for specific accounts that are sensitive to users, even if the overall materiality is higher.",
    detail: "<ul><li><strong>Scenario:</strong> A company has high overall materiality based on assets. However, users are very sensitive to Director's Remuneration or Related Party Disclosures.</li><li><strong>Action:</strong> The auditor sets a specific, lower materiality just for these accounts to ensure even small errors in these sensitive areas are caught.</li></ul>"
  },
  {
    id: 118,
    title: "Volatility in Benchmarks",
    concept: "If the chosen benchmark (e.g., Profit) is volatile (fluctuates wildly year to year), the auditor should adjust it to find a stable basis.",
    detail: "<ul><li><strong>Solution:</strong> Use an average of the last 3-5 years' profits instead of just the current year.</li><li><strong>Alternative:</strong> Switch to a more stable benchmark like Total Revenue or Total Assets if profit is essentially meaningless due to volatility.</li></ul>"
  },
  {
    id: 119,
    title: "Materiality in the Public Sector",
    concept: "For public sector entities (government), legislators and the public are the primary users, and their focus is different.",
    detail: "<ul><li><strong>Benchmark:</strong> Usually Total Cost or Net Cost (expenses), rather than Profit, since governments are not profit-oriented.</li><li><strong>Qualitative Focus:</strong> Compliance with laws, regulations, and spending authority is often more important than the exact numbers.</li></ul>"
  },
  {
    id: 120,
    title: "Adjusting vs. Non-Adjusting Events (The Core Concept)",
    concept: "Not all events after the year-end need to be recorded. We must distinguish between those that provide evidence of conditions existing at year-end (Adjusting) and those that are new (Non-Adjusting).",
    detail: "<ul><li><strong>Adjusting Event:</strong> Provides evidence of conditions that existed at the balance sheet date.</li><ul><li><strong>Example:</strong> A customer goes bankrupt in Jan (shows they were likely insolvent in Dec).</li><li><strong>Action:</strong> Adjust the financial statements (Record the loss/provision).</li></ul><li><strong>Non-Adjusting Event:</strong> Indicates a condition that arose after the balance sheet date.</li><ul><li><strong>Example:</strong> A fire destroys the factory in Jan (the factory was fine in Dec).</li><li><strong>Action:</strong> Do not adjust numbers. Disclose in notes if material (Nature + Financial Effect).</li></ul></ul>"
  },
  {
    id: 121,
    title: "The Three Critical Time Zones (Audit Timeline)",
    concept: "The auditor’s responsibility changes based on three key dates: The Financial Statement (FS) Date (Year-end), the Audit Report Date, and the FS Issuance Date.",
    detail: "<ul><li><strong>Zone A (Active Duty):</strong> From Year-End to Audit Report Date. The auditor must perform procedures to identify events.</li><li><strong>Zone B (Passive Duty):</strong> From Audit Report Date to FS Issuance Date. The auditor has no obligation to look for events but must act if they become aware of one.</li><li><strong>Zone C (After Issuance):</strong> After FS are issued. The auditor has no obligation but must act if a fact is discovered that would have changed the report.</li></ul>"
  },
  {
    id: 122,
    title: "Zone A: Active Duty (Up to Audit Report)",
    concept: "Before signing the report, the auditor has an Active Duty to perform audit procedures to catch any subsequent events.",
    detail: "<ul><li><strong>Procedures:</strong></li><ul><li>Inquiring of management about new contingent liabilities.</li><li>Reading minutes of meetings held after year-end.</li><li>Reviewing the latest interim financial statements (e.g., Jan/Feb accounts).</li></ul><li><strong>Objective:</strong> To ensure all adjusting events are recorded and non-adjusting events are disclosed before the auditor signs off.</li></ul>"
  },
  {
    id: 123,
    title: "Zone B: Passive Duty (Report Date to Issue Date)",
    concept: "Once the report is signed, the auditor stops looking. However, if a material fact becomes known (e.g., Management tells them), they must act.",
    detail: "<ul><li><strong>Scenario:</strong> Report signed on March 15. Fire happens on March 20. FS issued on March 30.</li><li><strong>Action:</strong> Even though the auditor signed, the FS are not yet with shareholders. The auditor must ask management to amend the FS (add disclosure).</li><li><strong>If Management Refuses:</strong> The auditor must take action to prevent reliance on the report (e.g., speak at the AGM, threaten legal action).</li></ul>"
  },
  {
    id: 124,
    title: "Dual Dating (Restricting Liability)",
    concept: "If a subsequent event requires amendment after the original audit report date, the auditor can re-date the report (extending liability for everything) OR use Dual Dating (limiting liability).",
    detail: "<ul><li><strong>Option 1 (New Date):</strong> Update the entire audit to the new date (e.g., March 25). This is risky/expensive as you must check everything up to March 25.</li><li><strong>Option 2 (Dual Dating):</strong> Keep original date (March 15) but add \"except for Note X, which is as of March 25\".</li><li><strong>Benefit:</strong> The auditor’s liability for the specific event extends to the new date, but for everything else, it ends at the original date.</li></ul>"
  },
  {
    id: 125,
    title: "Bankruptcy of a Customer (The Classic Adjusting Event)",
    concept: "If a major debtor goes bankrupt shortly after year-end, it is almost always an Adjusting Event.",
    detail: "<ul><li><strong>Logic:</strong> Bankruptcy doesn't happen overnight. It implies the customer was already in financial distress at the balance sheet date.</li><li><strong>Audit Action:</strong> The trade receivable balance at year-end must be written off (or provided for) as a Bad Debt in the current year's financials.</li></ul>"
  },
  {
    id: 126,
    title: "Inventory Sale Below Cost (NRV Testing)",
    concept: "Selling inventory after year-end at a price lower than cost is evidence that the Net Realizable Value (NRV) was low at year-end.",
    detail: "<ul><li><strong>Scenario:</strong> Item Cost = 100. Sold in Jan for 80.</li><li><strong>Implication:</strong> The inventory was likely worth only 80 at Dec 31.</li><li><strong>Action:</strong> This is an Adjusting Event. Write down inventory by 20 in the year-end accounts.</li></ul>"
  },
  {
    id: 127,
    title: "Litigation Settlement (Court Case)",
    concept: "If a court case is settled after year-end for a different amount than was provided, it is an Adjusting Event.",
    detail: "<ul><li><strong>Scenario:</strong> Provision of 1M recorded. Court rules in Jan that company must pay 2M.</li><li><strong>Action:</strong> Adjust the year-end provision to 2M. The ruling confirms the obligation that existed at the balance sheet date.</li></ul>"
  },
  {
    id: 128,
    title: "Dividends Declared (Non-Adjusting Exception)",
    concept: "Dividends declared after the reporting period are Non-Adjusting, even if they relate to the profits of that year.",
    detail: "<ul><li><strong>Rule (IAS 10):</strong> A liability for dividends is only recorded when it is declared/approved. If approved in Jan, it was not a liability in Dec.</li><li><strong>Action:</strong> Do NOT record a liability in the Balance Sheet. Only disclose in the notes.</li></ul>"
  },
  {
    id: 129,
    title: "Management Refusal to Amend (Conflict)",
    concept: "If a material subsequent event occurs and management refuses to adjust/disclose it, the auditor must modify the opinion.",
    detail: "<ul><li><strong>Before Report Signed:</strong> Issue Qualified or Adverse opinion.</li><li><strong>After Report Signed (but before issue):</strong> If management issues the old FS anyway, the auditor should take steps to prevent reliance (e.g., resign, legal notice).</li></ul>"
  },
  {
    id: 130,
    title: "Effect on Going Concern (The Ultimate Override)",
    concept: "A non-adjusting event (like a fire) can become an adjusting event if it destroys the Going Concern assumption.",
    detail: "<ul><li><strong>Scenario:</strong> A fire in Jan destroys the entire factory (Non-adjusting by nature).</li><li><strong>Twist:</strong> The company cannot operate anymore.</li><li><strong>Action:</strong> The accounts must now be prepared on a Breakup Basis (Adjusting the entire basis of accounting). The \"Non-adjusting\" rule is overridden because the entity is no longer viable.</li></ul>"
  },
  {
    id: 131,
    title: "Facts Discovered After Issue (Zone C)",
    concept: "If the auditor finds a material error after the financial statements have been issued to the public, they have no obligation to look, but a duty to act if found.",
    detail: "<ul><li><strong>Procedure:</strong></li><ul><li>Discuss with management.</li><li>Determine if FS need revision.</li><li>If yes, management issues Revised FS.</li><li>Auditor issues a new Audit Report on the revised FS (usually with an Emphasis of Matter regarding the revision).</li></ul></ul>"
  },
  {
    id: 132,
    title: "Verification of Additions (New Assets)",
    concept: "Ensuring that new assets recorded actually exist, are owned by the company, and are capitalized at the correct cost.",
    detail: "<ul><li><strong>Procedure:</strong></li><ul><li><strong>Authorization:</strong> Inspect Board Minutes or Capex Approval forms to verify the purchase was authorized.</li><li><strong>Cost:</strong> Agree the purchase cost to the Supplier Invoice.</li><li><strong>Ownership:</strong> Verify title by inspecting Title Deeds (for land/buildings) or Registration Documents (for vehicles).</li><li><strong>Existence:</strong> Physically inspect the asset to ensure it is on site.</li></ul><li><strong>Installation Costs:</strong> Verify that only directly attributable costs (delivery, installation) are capitalized, not general overheads.</li></ul>"
  },
  {
    id: 133,
    title: "Verification of Disposals (Sold Assets)",
    concept: "Ensuring assets sold are removed from the books and the profit/loss on disposal is calculated correctly.",
    detail: "<ul><li><strong>Procedure:</strong></li><ul><li><strong>Authorization:</strong> Check minutes for approval of the sale.</li><li><strong>Proceeds:</strong> Agree the cash received to the Bank Statement and Sale Agreement.</li><li><strong>Calculation:</strong> Recalculate the Profit/Loss on disposal (Sale Proceeds – Carrying Amount) and agree to the P&L account.</li><li><strong>Removal:</strong> Verify that the asset and its accumulated depreciation are completely removed from the Fixed Asset Register.</li></ul></ul>"
  },
  {
    id: 134,
    title: "Depreciation & Revaluation (Valuation Assertion)",
    concept: "Assessing whether the asset's value is reasonable and depreciation is consistent.",
    detail: "<ul><li><strong>Depreciation:</strong></li><ul><li><strong>Analytical Procedure:</strong> Compare the depreciation rate with previous years and industry averages.</li><li><strong>Recalculation:</strong> Select a sample of assets and recalculate the depreciation charge to verify accuracy.</li><li><strong>Useful Life:</strong> Discuss with management if the useful life needs revision (e.g., old machinery).</li></ul><li><strong>Revaluation:</strong></li><ul><li><strong>Expert:</strong> Inspect the Valuation Report from an independent valuer.</li><li><strong>Accounting:</strong> Verify the surplus is credited to the Revaluation Surplus (OCI), not P&L.</li><li><strong>Disclosures:</strong> Ensure the valuer’s name, qualification, and date of report are disclosed.</li></ul></ul>"
  },
  {
    id: 135,
    title: "The Physical Stock Count (Attendance)",
    concept: "The auditor attends the stock count to observe controls and perform test counts, NOT to count the whole stock.",
    detail: "<ul><li><strong>Observation:</strong> Observe if staff are following instructions (e.g., stopping production, not moving goods).</li><li><strong>Test Counts (Dual Direction):</strong></li><ul><li><strong>Floor to Sheet (Completeness):</strong> Select items physically on the shelf and trace them to the stock sheet.</li><li><strong>Sheet to Floor (Existence):</strong> Select items from the stock sheet and find them physically on the shelf.</li></ul><li><strong>Cut-Off:</strong> Record the numbers of the last GRN (Goods Received Note) and last GDN (Goods Dispatch Note) issued before the count to test cut-off later.</li></ul>"
  },
  {
    id: 136,
    title: "Inventory Valuation (Lower of Cost or NRV)",
    concept: "Inventory must be valued at the lower of Cost and Net Realizable Value (NRV).",
    detail: "<ul><li><strong>Cost Testing:</strong> Agree unit costs to recent Supplier Invoices.</li><li><strong>NRV Testing:</strong></li><ul><li>Compare the unit cost to the selling price of items sold after the year-end (Post year-end sales).</li><li>Review the Inventory Aging Report for old/slow-moving items (these likely have low NRV).</li><li>Inspect the condition of goods during the count (damaged goods need write-down).</li></ul></ul>"
  },
  {
    id: 137,
    title: "Cut-Off Testing (Inventory)",
    concept: "Ensuring goods are recorded in the correct period.",
    detail: "<ul><li><strong>Procedure:</strong></li><ul><li><strong>Purchase Cut-off:</strong> Select the last few GRNs before year-end and ensure they are included in Inventory and Payables.</li><li><strong>Sales Cut-off:</strong> Select the last few GDNs before year-end and ensure they are excluded from Inventory and included in Cost of Sales.</li></ul></ul>"
  },
  {
    id: 138,
    title: "Direct Circularization (External Confirmation)",
    concept: "The strongest evidence for Existence and Rights. Writing directly to customers to ask \"Do you owe this amount?\".",
    detail: "<ul><li><strong>Positive Confirmation:</strong> Customer must reply (Used for high risk/material amounts).</li><li><strong>Negative Confirmation:</strong> Customer replies only if they disagree (Used for low risk/many small balances).</li><li><strong>Process:</strong></li><ul><li>Auditor selects sample.</li><li>Client prepares letter, Auditor sends it.</li><li>Replies come directly to the Auditor.</li></ul><li><strong>Alternative Procedures (If no reply):</strong></li><ul><li>Inspect Cash received after year-end (strongest evidence).</li><li>Inspect Signed Delivery Notes to prove goods were delivered.</li></ul></ul>"
  },
  {
    id: 139,
    title: "Bad Debt Provision (Valuation)",
    concept: "Assessing if the provision for doubtful debts is sufficient.",
    detail: "<ul><li><strong>Procedure:</strong></li><ul><li>Review the Aged Receivables Ledger to identify old debts (>90 days).</li><li>Inspect correspondence with customers (e.g., disputes, legal notices).</li><li>Inspect post year-end cash receipts (if they paid in Jan, no provision is needed).</li><li>Discuss the recoverability of large overdue balances with the Credit Manager.</li></ul></ul>"
  },
  {
    id: 140,
    title: "Bank Confirmation Letter",
    concept: "A standard letter sent to all banks the client deals with to confirm balances and other details.",
    detail: "<ul><li><strong>Procedure:</strong></li><ul><li>Obtain written authority from the client to send the letter.</li><li>The bank confirms: Balances (all accounts), Loans, Mortgages/Security, Accrued Interest, and Custody of assets (e.g., title deeds held by bank).</li></ul><li>It confirms Completeness of liabilities as well as Existence of assets.</li></ul>"
  },
  {
    id: 141,
    title: "Bank Reconciliation Statement",
    concept: "Reconciling the Cash Book balance with the Bank Statement balance.",
    detail: "<ul><li><strong>Procedure:</strong></li><ul><li>Agree the balance per bank statement to the Bank Confirmation Letter.</li><li>Cast (add up) the reconciliation to check arithmetic accuracy.</li><li>Unpresented Cheques: Verify these cleared in the bank statement after year-end.</li><li>Outstanding Lodgments: Verify these were credited to the bank shortly after year-end.</li></ul></ul>"
  },
  {
    id: 142,
    title: "Cash Count (Petty Cash)",
    concept: "Verifying physical cash in hand.",
    detail: "<ul><li><strong>Procedure:</strong></li><ul><li>Perform a surprise count (to prevent window dressing).</li><li>Count cash in the presence of the custodian.</li><li>Reconcile the count to the Petty Cash Book.</li><li>Inspect IOUs or expense vouchers for valid authorization.</li></ul></ul>"
  },
  {
    id: 143,
    title: "Supplier Statement Reconciliation",
    concept: "The best test for Completeness of payables. Comparing the supplier's record with the client's ledger.",
    detail: "<ul><li><strong>Procedure:</strong></li><ul><li>Select a sample of major suppliers (even those with zero balances).</li><li>Request statements from suppliers.</li><li>Reconcile the statement balance to the Purchase Ledger.</li><li>Investigate reconciling items (e.g., \"Cash in Transit\" or \"Goods in Transit\").</li></ul></ul>"
  },
  {
    id: 144,
    title: "Search for Unrecorded Liabilities",
    concept: "Testing if the company \"forgot\" to record any liabilities to improve their balance sheet.",
    detail: "<ul><li><strong>Procedure:</strong></li><ul><li>Review payments made after year-end (in the bank statement).</li><li>Trace these payments back to invoices.</li><li>Check the invoice date: If the service/goods were received before year-end, ensure a liability was recorded. If not, it's an unrecorded liability.</li></ul></ul>"
  },
  {
    id: 145,
    title: "Analytical Procedures for Sales",
    concept: "Using logic and trends to verify revenue reasonableness.",
    detail: "<ul><li><strong>Procedure:</strong></li><ul><li>Compare monthly sales to the prior year.</li><li>Analyze Gross Profit Margin (Revenue - Cost / Revenue). If it fluctuates, investigate why.</li><li>Compare Sales growth with Industry trends.</li></ul></ul>"
  },
  {
    id: 146,
    title: "Tests of Detail (Sales)",
    concept: "Verifying individual transactions.",
    detail: "<ul><li><strong>Procedure:</strong></li><ul><li>Trace a sample of Sales Orders -> GDNs -> Sales Invoices -> Sales Ledger (Completeness).</li><li>Trace a sample of Sales Ledger entries -> Invoices -> GDNs (Occurrence).</li><li>Check that sales near year-end are recorded in the correct period (Cut-off).</li></ul></ul>"
  },
  {
    id: 147,
    title: "Proof in Total (Analytical Procedure)",
    concept: "Estimating the total payroll expense to see if the recorded amount is reasonable.",
    detail: "<ul><li><strong>Formula:</strong> (Last year's average salary) x (Inflation increase) x (Number of employees).</li><li><strong>Action:</strong> Compare this expectation with the actual recorded expense. Investigate significant differences.</li></ul>"
  },
  {
    id: 148,
    title: "Ghost Employees Test",
    concept: "Ensuring wages are paid to real people.",
    detail: "<ul><li><strong>Procedure:</strong></li><ul><li>Select a sample of employees from the payroll sheet.</li><li>Physically verify their existence (meet them) or check their HR files for ID/Contract.</li><li>Attend a cash pay-out (if paid in cash) to see who collects the money.</li></ul></ul>"
  },
  {
    id: 149,
    title: "Legal Confirmation Letter",
    concept: "Obtaining an independent view on lawsuits and disputes.",
    detail: "<ul><li><strong>Procedure:</strong></li><ul><li>Send a letter to the client's external lawyers.</li><li>Ask for: A list of open cases, the probability of losing (Probable/Possible), and the estimated financial impact.</li><li>Verify that \"Probable\" losses are recorded as Provisions and \"Possible\" losses are disclosed.</li></ul></ul>"
  },
  {
    id: 150,
    title: "Verification of Equity",
    concept: "Ensuring shares issued are legal and recorded correctly.",
    detail: "<ul><li><strong>Procedure:</strong></li><ul><li>Agree total share capital to the Register of Members and Memorandum/Articles.</li><li>Verify new share issues to Board Minutes and Bank Statements (cash received).</li><li>Ensure dividends declared are consistent with distributable reserves.</li></ul></ul>"
  },
  {
    id: 151,
    title: "The Definition of Audit Sampling",
    concept: "Audit sampling is the application of audit procedures to less than 100% of items within a population of audit relevance such that all sampling units have a chance of selection.",
    detail: "<ul><li><strong>Purpose:</strong> To provide the auditor with a reasonable basis on which to draw conclusions about the entire population.</li><li><strong>Condition:</strong> Every item in the population (e.g., every invoice) must have a chance of being selected. If you pick \"all items over $10,000\" and ignore the rest, that is NOT sampling; that is specific item selection.</li></ul>"
  },
  {
    id: 152,
    title: "Sampling Risk (The \"Bad Luck\" Risk)",
    concept: "The risk that the auditor's conclusion based on a sample may be different from the conclusion if the entire population were subjected to the same audit procedure.",
    detail: "<ul><li><strong>Two Types:</strong></li><ul><li><strong>Risk of Over-Reliance (Beta Risk):</strong> The sample says \"Controls are effective,\" but they are actually ineffective. This leads to an incorrect audit opinion (effectiveness issue).</li><li><strong>Risk of Under-Reliance (Alpha Risk):</strong> The sample says \"Controls are bad,\" but they are actually good. This leads to excessive work (efficiency issue).</li></ul><li><strong>Mitigation:</strong> Increasing the sample size reduces sampling risk.</li></ul>"
  },
  {
    id: 153,
    title: "Non-Sampling Risk (The \"Human Error\" Risk)",
    concept: "The risk that the auditor reaches an erroneous conclusion for any reason not related to sampling risk.",
    detail: "<ul><li><strong>Causes:</strong></li><ul><li>Use of inappropriate audit procedures.</li><li>Misinterpretation of audit evidence (e.g., failing to recognize an error).</li><li>Failure to recognize a misstatement or deviation.</li></ul><li><strong>Mitigation:</strong> Cannot be mathematically eliminated, but can be reduced through proper planning, supervision, and review.</li></ul>"
  },
  {
    id: 154,
    title: "Statistical vs. Non-Statistical Sampling",
    concept: "Statistical sampling involves random selection and the use of probability theory, while non-statistical sampling relies on auditor judgment.",
    detail: "<ul><li><strong>Statistical Sampling:</strong></li><ul><li>Requires Random Selection of items.</li><li>Uses Probability Theory to evaluate sample results (allows measurement of sampling risk).</li></ul><li><strong>Non-Statistical (Judgmental) Sampling:</strong></li><ul><li>The auditor uses experience to decide sample size and selection.</li><li>Sampling risk cannot be precisely measured.</li></ul></ul>"
  },
  {
    id: 155,
    title: "Stratification (Efficiency Technique)",
    concept: "The process of dividing a population into sub-populations (strata), each of which is a group of sampling units which have similar characteristics (often monetary value).",
    detail: "<ul><li><strong>Example:</strong> Dividing Accounts Receivable into:</li><ul><li>Strata 1: Balances > $100,000 (Test 100%).</li><li>Strata 2: Balances $10k - $100k (Test 50%).</li><li>Strata 3: Balances < $10k (Test 5%).</li></ul><li><strong>Benefit:</strong> Reduces the variability of items within each stratum, allowing for a smaller sample size without increasing risk.</li></ul>"
  },
  {
    id: 156,
    title: "Tolerable Misstatement / Rate of Deviation",
    concept: "The maximum error the auditor is willing to accept in the population without concluding that the population is materially misstated.",
    detail: "<ul><li><strong>Tests of Controls:</strong> Called Tolerable Rate of Deviation. If the actual deviation rate > tolerable rate, the control is ineffective.</li><li><strong>Tests of Details:</strong> Called Tolerable Misstatement. It is the application of performance materiality to a specific sampling procedure.</li></ul>"
  },
  {
    id: 157,
    title: "Systematic Selection (Interval Sampling)",
    concept: "The number of sampling units in the population is divided by the sample size to give a sampling interval.",
    detail: "<ul><li><strong>Method:</strong></li><ul><li>Calculate Interval: 500 items / 50 sample size = Every 10th item.</li><li>Select a starting point randomly (e.g., item 3).</li><li>Select every 10th item thereafter (3, 13, 23...).</li></ul><li><strong>Risk:</strong> If the population has a pattern (e.g., every 10th check is a payroll check), the sample will be biased.</li></ul>"
  },
  {
    id: 158,
    title: "Haphazard Selection",
    concept: "The auditor selects the sample without following a structured technique but avoids any conscious bias or predictability.",
    detail: "<ul><li><strong>Constraint:</strong> This method is not appropriate for statistical sampling.</li><li><strong>Warning:</strong> Auditors must avoid bias (e.g., avoiding difficult-to-locate items or picking only the first few items on a page).</li></ul>"
  },
  {
    id: 159,
    title: "Value-Weighted Selection (Monetary Unit Sampling)",
    concept: "The sampling unit is defined as an individual monetary unit (e.g., a dollar) rather than a physical item (e.g., an invoice).",
    detail: "<ul><li><strong>Logic:</strong> Every dollar has an equal chance of being picked.</li><li><strong>Result:</strong> Larger items (containing more dollars) have a higher chance of selection. This automatically directs audit effort toward larger value items.</li><li><strong>Benefit:</strong> Often results in smaller sample sizes for populations with few expected errors.</li></ul>"
  },
  {
    id: 160,
    title: "Anomalous Error",
    concept: "A misstatement or deviation that is demonstrably not representative of misstatements or deviations in the population.",
    detail: "<ul><li><strong>Strict Rule:</strong> You cannot just label an error as \"isolated\" or \"anomalous\" to ignore it. You must perform additional procedures to prove it does not affect the rest of the population.</li><li><strong>Risk:</strong> If you wrongly classify a systemic error as anomalous, you will underestimate the total error in the population.</li></ul>"
  },
  {
    id: 161,
    title: "Projected Misstatement (Extrapolation)",
    concept: "The auditor is required to project misstatements found in the sample to the population.",
    detail: "<ul><li><strong>Method:</strong></li><ul><li>Error found in sample: $100.</li><li>Sample coverage: 10% of population.</li><li>Projected Error: $100 / 10% = $1,000.</li></ul><li><strong>Decision:</strong> Compare the Projected Error + Anomalous Error against Tolerable Misstatement. If Projected > Tolerable, the population is misstated.</li></ul>"
  },
  {
    id: 162,
    title: "Sample Size Factors (Increase vs. Decrease)",
    concept: "Various factors influence how big the sample needs to be.",
    detail: "<ul><li><strong>Increase Sample Size if:</strong></li><ul><li>Risk of material misstatement is higher.</li><li>Expected rate of deviation/error is higher.</li><li>Desired assurance level is higher.</li></ul><li><strong>Decrease Sample Size if:</strong></li><ul><li>Tolerable error/deviation rate is higher (you are willing to accept more errors).</li><li>You are using Stratification.</li></ul></ul>"
  },
  {
    id: 163,
    title: "Block Selection (Cluster Sampling)",
    concept: "Selection of a block(s) of contiguous items from within the population.",
    detail: "<ul><li><strong>Risk:</strong> Generally cannot be used for audit sampling because most populations are structured such that items in a sequence can be similar to each other but different from other items elsewhere in the population.</li><li><strong>Use:</strong> Only useful for specific tests (e.g., checking cut-off for a specific week), not for representative sampling.</li></ul>"
  },
  {
    id: 164,
    title: "Random Selection",
    concept: "Applied through random number generators (e.g., random number tables).",
    detail: "<ul><li><strong>Method:</strong> Using computer software or random number tables to pick items.</li><li><strong>Advantage:</strong> Every item has an equal probability of selection, making it the foundation of Statistical Sampling.</li></ul>"
  },
  {
    id: 165,
    title: "Design of the Sample",
    concept: "When designing an audit sample, the auditor shall consider the purpose of the audit procedure and the characteristics of the population.",
    detail: "<ul><li><strong>Completeness:</strong> The population needs to be complete.</li><li><strong>Appropriateness:</strong> The population must be appropriate for the specific audit objective (e.g., to test for overstatement of payables, sample from the list of payments, not the list of invoices).</li></ul>"
  },
  {
    id: 166,
    title: "The 5 Fundamental Principles (The Pillars)",
    concept: "Every professional accountant must comply with these five principles to maintain the public trust.",
    detail: "<ul><li><strong>Integrity:</strong> To be straightforward and honest in all professional and business relationships.</li><li><strong>Objectivity:</strong> To not allow bias, conflict of interest, or undue influence of others to override professional or business judgments.</li><li><strong>Professional Competence and Due Care:</strong> To maintain professional knowledge and skill at the level required to ensure that a client or employer receives competent professional service.</li><li><strong>Confidentiality:</strong> To respect the confidentiality of information acquired as a result of professional and business relationships.</li><li><strong>Professional Behavior:</strong> To comply with relevant laws and regulations and avoid any action that discredits the profession.</li></ul>"
  },
  {
    id: 167,
    title: "Self-Interest Threat",
    concept: "The threat that a financial or other interest will inappropriately influence the professional accountant’s judgment or behavior.",
    detail: "<ul><li><strong>Examples:</strong></li><ul><li>A member of the audit team having a direct financial interest (shares) in the client.</li><li>The firm having undue dependence on total fees from a client.</li><li>A member of the audit team entering into employment negotiations with the audit client.</li><li>The firm entering into a contingent fee arrangement relating to an assurance engagement.</li></ul><li><strong>Safeguard:</strong> Disposing of the interest, removing the individual from the team, or refusing the engagement.</li></ul>"
  },
  {
    id: 168,
    title: "Self-Review Threat",
    concept: "The threat that an auditor will not appropriately evaluate the results of a previous judgment or service performed by the auditor (or their firm) on which the auditor will rely when forming a judgment as part of the current service.",
    detail: "<ul><li><strong>Examples:</strong></li><ul><li>The firm issuing an assurance report on the effectiveness of the operation of financial systems after designing or implementing the systems.</li><li>Having prepared the original data used to generate records that are the subject matter of the assurance engagement.</li><li>A member of the assurance team being, or having recently been, a director or officer of the client.</li></ul><li><strong>Safeguard:</strong> Using professionals who are not members of the audit team to perform the service, or obtaining an external quality control review.</li></ul>"
  },
  {
    id: 169,
    title: "Advocacy Threat",
    concept: "The threat that a professional accountant will promote a client’s or employer’s position to the point that the professional accountant’s objectivity is compromised.",
    detail: "<ul><li><strong>Examples:</strong></li><ul><li>Promoting shares in an audit client.</li><li>Acting as an advocate on behalf of an audit client in litigation or disputes with third parties.</li></ul><li><strong>Safeguard:</strong> Withdraw from the engagement or refuse to perform the specific service that creates the threat.</li></ul>"
  },
  {
    id: 170,
    title: "Familiarity Threat",
    concept: "The threat that due to a long or close relationship with a client or employer, a professional accountant will be too sympathetic to their interests or too accepting of their work.",
    detail: "<ul><li><strong>Examples:</strong></li><ul><li>A member of the engagement team having a close or immediate family member who is a director or officer of the client.</li><li>A member of the engagement team having a close or immediate family member who is an employee of the client who is in a position to exert significant influence over the subject matter of the engagement.</li><li>A director or officer of the client or an employee in a position to exert significant influence over the subject matter of the engagement having recently served as the engagement partner.</li><li>Acceptance of gifts or hospitality from a client, unless the value is trivial and inconsequential.</li></ul><li><strong>Safeguard:</strong> Rotating senior personnel of the assurance team (Long association rule).</li></ul>"
  },
  {
    id: 171,
    title: "Intimidation Threat",
    concept: "The threat that a professional accountant will be deterred from acting objectively because of actual or perceived pressures, including attempts to exercise undue influence over the professional accountant.",
    detail: "<ul><li><strong>Examples:</strong></li><ul><li>Being threatened with dismissal or replacement.</li><li>Being threatened with litigation.</li><li>Being pressured to reduce inappropriately the extent of work performed in order to reduce fees.</li></ul><li><strong>Safeguard:</strong> Involving an additional professional accountant to review the work done or advise as necessary.</li></ul>"
  },
  {
    id: 172,
    title: "Long Association of Senior Personnel",
    concept: "Using the same senior personnel on an assurance engagement over a long period of time may create a familiarity and self-interest threat.",
    detail: "<ul><li><strong>Rule (Listed Entities):</strong> The Engagement Partner and the EQCR (Engagement Quality Control Reviewer) must rotate off the audit after a specified period (usually 5-7 years) to maintain independence (\"Cooling-off\" period).</li><li><strong>Safeguard:</strong> Rotate the senior personnel off the assurance team.</li></ul>"
  },
  {
    id: 173,
    title: "Gifts and Hospitality",
    concept: "Accepting gifts or hospitality from an assurance client may create self-interest and familiarity threats.",
    detail: "<ul><li><strong>Rule:</strong> Unless the value is trivial and inconsequential, a firm or a member of the assurance team shall not accept such gifts or hospitality.</li><li><strong>Reason:</strong> It could be perceived that the auditor's objectivity is impaired by the benefit received.</li></ul>"
  },
  {
    id: 174,
    title: "Fees - Overdue and Contingent",
    concept: "Financial dependence on a client creates pressure to keep them happy.",
    detail: "<ul><li><strong>Overdue Fees:</strong> If fees from a client remain unpaid for a long time (e.g., usually more than one year), it may be perceived as a loan to the client, creating a Self-Interest threat.</li><li><strong>Contingent Fees:</strong> Fees calculated on a predetermined basis relating to the outcome of a transaction or result of the work performed (e.g., % of tax saved). These are strictly prohibited for assurance engagements.</li></ul>"
  },
  {
    id: 175,
    title: "Providing Non-Assurance Services to Audit Clients",
    concept: "Firms have strict rules about providing other services (like bookkeeping or valuation) to audit clients because it often creates a Self-Review Threat.",
    detail: "<ul><li><strong>Prohibition:</strong> A firm shall not provide services that involve assuming management responsibility (e.g., authorizing transactions, deciding which recommendations to implement).</li><li><strong>Accounting Services:</strong> For public interest entities, audit firms are generally prohibited from preparing accounting records or financial statements.</li><li><strong>Valuation Services:</strong> Prohibited if the valuation is material to the financial statements and involves a significant degree of subjectivity.</li></ul>"
  },
  {
    id: 176,
    title: "Actual vs. Perceived Independence",
    concept: "Independence is a state of mind (Actual) and a state of facts (Perceived). Both are required.",
    detail: "<ul><li><strong>Independence of Mind:</strong> The state of mind that permits the expression of a conclusion without being affected by influences that compromise professional judgment.</li><li><strong>Independence in Appearance:</strong> The avoidance of facts and circumstances that are so significant that a reasonable and informed third party would be likely to conclude that a firm's or a member of the assurance team's integrity, objectivity, or professional skepticism has been compromised.</li></ul>"
  },
  {
    id: 177,
    title: "Confidentiality Exceptions",
    concept: "Confidentiality is not absolute. There are specific circumstances where a professional accountant is or may be required to disclose confidential information.",
    detail: "<ul><li><strong>Required by Law:</strong></li><ul><li>Production of documents or other provision of evidence in the course of legal proceedings.</li><li>Disclosure to the appropriate public authorities of infringements of the law that come to light.</li></ul><li><strong>Permitted by Law and Authorized by Client:</strong> When the client gives permission.</li><li><strong>Professional Duty or Right:</strong></li><ul><li>To comply with the quality review of a member body or professional body.</li><li>To respond to an inquiry or investigation by a member body or regulatory body.</li><li>To protect the professional interests of a professional accountant in legal proceedings.</li><li>To comply with technical standards and ethics requirements.</li></ul></ul>"
  },
  {
    id: 178,
    title: "Conflicts of Interest",
    concept: "A conflict of interest creates a threat to objectivity and may create a threat to the other fundamental principles.",
    detail: "<ul><li><strong>Scenarios:</strong></li><ul><li>The professional accountant undertakes a professional activity related to a particular matter for two or more parties whose interests with respect to that matter are in conflict.</li><li>The professional accountant’s interests with respect to a particular matter and the interests of a party for whom the professional accountant undertakes a professional activity related to that matter are in conflict.</li></ul><li><strong>Safeguard:</strong> Notify the client of the firm’s business interest or activities that may represent a conflict of interest and obtain their consent to act.</li></ul>"
  },
  {
    id: 179,
    title: "Second Opinions",
    concept: "Providing a second opinion on the application of accounting standards to a specific transaction for a company that is not an existing client can create a threat to professional competence and due care.",
    detail: "<ul><li><strong>The Risk:</strong> The second opinion may be based on inadequate facts or implies that the existing auditor's opinion is wrong.</li><li><strong>Safeguard:</strong> The professional accountant should contact the existing accountant to clarify the facts and understand the context before giving the opinion.</li></ul>"
  },
  {
    id: 180,
    title: "Marketing Professional Services",
    concept: "When a professional accountant solicits new work through advertising or other forms of marketing, there may be a threat to compliance with the fundamental principles.",
    detail: "<ul><li><strong>Constraint:</strong> A professional accountant shall not bring the profession into disrepute.</li><li><strong>Prohibited Actions:</strong></li><ul><li>Making exaggerated claims for the services offered, qualifications possessed, or experience gained.</li><li>Making disparaging references or unsubstantiated comparisons to the work of others.</li></ul></ul>"
  },
  {
    id: 181,
    title: "Lowballing (Underpricing)",
    concept: "Quoting a significantly lower fee than the predecessor auditor just to win the client.",
    detail: "<ul><li><strong>The Threat:</strong> Professional Competence and Due Care. If the fee is too low, the auditor might not be able to perform the audit in accordance with applicable technical and professional standards (cutting corners to save costs).</li><li><strong>Safeguard:</strong> The auditor must be able to demonstrate that appropriate time and qualified staff are assigned to the task and that all applicable standards are being adhered to, regardless of the fee.</li></ul>"
  },
  {
    id: 182,
    title: "Custody of Client Assets",
    concept: "Holding money or other assets on behalf of a client creates a Self-Interest Threat.",
    detail: "<ul><li><strong>Rule:</strong> A professional accountant shall not assume custody of client monies or other assets unless permitted by law and, if so, in compliance with any additional legal duties imposed on a professional accountant holding such assets.</li><li><strong>Safeguard:</strong></li><ul><li>Keep such assets separately from personal or firm assets.</li><li>Use such assets only for the purpose for which they are intended.</li><li>At all times be ready to account for those assets and any income, dividends, or gains generated.</li></ul></ul>"
  },
  {
    id: 183,
    title: "Referral Fees and Commissions",
    concept: "Receiving a fee for referring a client to another professional (or receiving a commission for recommending a product/service to a client).",
    detail: "<ul><li><strong>The Threat:</strong> Objectivity and Professional Competence. The advice might be biased by the desire to earn the commission rather than the client's best interest.</li><li><strong>Safeguard:</strong></li><ul><li><strong>Disclosure:</strong> The accountant must disclose to the client the fact that they will receive a referral fee or commission.</li><li><strong>Consent:</strong> Obtain the client’s advance agreement.</li></ul></ul>"
  },
  {
    id: 184,
    title: "Confidentiality After Termination",
    concept: "The duty of confidentiality continues even after the professional relationship has ended.",
    detail: "<ul><li><strong>Rule:</strong> A professional accountant who changes employment or acquires a new client is entitled to use prior experience but shall not use or disclose any confidential information either acquired or received as a result of a professional or business relationship.</li><li><strong>Example:</strong> You cannot tell your new firm the trade secrets of your old client.</li></ul>"
  },
  {
    id: 185,
    title: "Offers of Employment",
    concept: "If a member of the audit team is negotiating to join the client as an employee, it creates a Self-Interest and Intimidation threat.",
    detail: "<ul><li><strong>The Risk:</strong> The auditor might be too lenient during the audit to please their future boss.</li><li><strong>Safeguard:</strong></li><ul><li>Remove the individual from the audit team immediately.</li><li>Perform an independent review of any significant judgments made by that individual while on the team.</li></ul></ul>"
  },
  {
    id: 186,
    title: "Provision of Non-Assurance Services: Tax Services",
    concept: "Preparing tax calculations for an audit client creates a Self-Review Threat.",
    detail: "<ul><li><strong>General Rule:</strong> It is generally permitted for non-public interest entities, provided the auditor does not make management decisions.</li><li><strong>Constraint:</strong> If the tax calculation is material to the financial statements and depends on a future audit judgment, it is prohibited for public interest entities.</li><li><strong>Advocacy Risk:</strong> Representing the client in a tax dispute in court creates an Advocacy Threat and is generally prohibited if material.</li></ul>"
  },
  {
    id: 187,
    title: "Loans and Guarantees",
    concept: "Accepting a loan from a client (or giving one to them) creates a Self-Interest Threat.",
    detail: "<ul><li><strong>Client is a Bank:</strong> If the loan is made under normal lending procedures, terms, and conditions, it is permissible.</li><li><strong>Client is NOT a Bank:</strong> It is prohibited to accept a loan from (or give a loan to) an audit client, as it creates a direct financial interest.</li></ul>"
  },
  {
    id: 188,
    title: "Corporate Finance Services",
    concept: "Assisting an audit client in raising capital, underwriting shares, or advising on mergers.",
    detail: "<ul><li><strong>Advocacy Threat:</strong> Promoting the client's shares or listing makes the auditor an advocate.</li><li><strong>Self-Review Threat:</strong> Advising on a merger valuation that will later be audited.</li><li><strong>Prohibition:</strong> Most corporate finance services that involve promoting, dealing in, or underwriting the client's shares are prohibited for audit clients.</li></ul>"
  },
  {
    id: 189,
    title: "Family and Personal Relationships (Specifics)",
    concept: "The severity of the threat depends on the closeness of the relationship and the role of the family member.",
    detail: "<ul><li><strong>Immediate Family (Spouse, Dependent Child):</strong> Creates a significant threat. If they are a director or in a position to exert significant influence, the auditor must be removed from the team.</li><li><strong>Close Family (Parent, Sibling, Non-dependent Child):</strong> Creates a threat that must be evaluated.</li><li><strong>Safeguard:</strong> Structure the team so the auditor does not deal with matters within the responsibility of their family member.</li></ul>"
  },
  {
    id: 190,
    title: "Temporary Staff Assignments (Secondments)",
    concept: "Lending audit staff to a client for a short period to help with work.",
    detail: "<ul><li><strong>The Threat:</strong> Self-Review (auditing their own work later) and Familiarity.</li><li><strong>Safeguard:</strong></li><ul><li>The staff member must not make management decisions.</li><li>The staff member should not be involved in auditing the work they performed during the secondment.</li><li>The client acknowledges responsibility for directing and supervising the staff.</li></ul></ul>"
  },
  {
    id: 191,
    title: "Litigation Support Services",
    concept: "Acting as an expert witness for the client in a legal case.",
    detail: "<ul><li><strong>The Threat:</strong> Advocacy and Self-Review.</li><li><strong>Constraint:</strong> If the service involves estimating damages that will be material to the financial statements, it creates a self-review threat.</li><li><strong>Safeguard:</strong> Use professionals who are not part of the audit team.</li></ul>"
  },
  {
    id: 192,
    title: "Resolving Ethical Conflicts",
    concept: "A framework for what to do when compliance with fundamental principles is threatened.",
    detail: "<ul><li><strong>Process:</strong></li><ul><li>Identify relevant facts.</li><li>Identify ethical issues involved.</li><li>Identify fundamental principles related to the matter in question.</li><li>Determine established internal procedures.</li><li>Consider alternative courses of action.</li></ul><li><strong>Action:</strong> If the conflict cannot be resolved, the professional accountant may have to refuse to be associated with the matter or withdraw from the engagement/resign.</li></ul>"
  },
  {
    id: 193,
    title: "Whistleblowing (NOCLAR - Non-Compliance with Laws and Regulations)",
    concept: "The duty to report illegal acts by the client to external authorities, overriding confidentiality.",
    detail: "<ul><li><strong>Trigger:</strong> If the auditor suspects non-compliance that has a material effect on FS or public interest.</li><li><strong>Procedure:</strong></li><ul><li>Discuss with management/governance.</li><li>If not resolved, determine if there is a legal duty to report (e.g., Money Laundering).</li><li>If no legal duty but public interest is harmed, consider reporting to an appropriate authority as a \"right\".</li></ul></ul>"
  },
  {
    id: 194,
    title: "Fees - Relative Size",
    concept: "If fees from a single client represent a large proportion of the firm's total fees, the firm is overly dependent on that client.",
    detail: "<ul><li><strong>Rule:</strong> If fees from a public interest entity exceed 15% of the firm's total fees for two consecutive years:</li><ul><li>Disclose to those charged with governance.</li><li>Apply a safeguard (e.g., Pre-issuance review by an external accountant).</li></ul><li><strong>Reason:</strong> The firm might hesitate to issue a qualified opinion for fear of losing such a major client (Self-Interest Threat).</li></ul>"
  },
  {
    id: 195,
    title: "Inducements (Bribes)",
    concept: "Being offered money or favors to influence judgment.",
    detail: "<ul><li><strong>Rule:</strong> A professional accountant shall not accept any inducement which is made with the intent to improperly influence behavior.</li><li><strong>Action:</strong> Immediately reject the offer and inform higher management or those charged with governance.</li></ul>"
  },
  {
    id: 196,
    title: "Fraud vs. Error (The Intent Factor)",
    concept: "The distinguishing factor between fraud and error is Intent.",
    detail: "<ul><li><strong>Error:</strong> Unintentional mistakes (e.g., mathematical slip, misunderstanding a policy).</li><li><strong>Fraud:</strong> An intentional act involving the use of deception to obtain an unjust or illegal advantage.</li><li><strong>Auditor's Duty:</strong> The auditor must obtain reasonable assurance that the financial statements are free from material misstatement, whether caused by fraud or error.</li></ul>"
  },
  {
    id: 197,
    title: "The Fraud Triangle (Why Fraud Happens)",
    concept: "Three conditions are generally present when fraud occurs: Incentive/Pressure, Opportunity, and Rationalization.",
    detail: "<ul><li><strong>Incentive/Pressure:</strong> The motivation to commit fraud (e.g., Bonuses linked to profit targets, company needing a loan, or meeting market expectations).</li><li><strong>Opportunity:</strong> The ability to commit fraud (e.g., Weak internal controls, lack of segregation of duties, physical access to assets).</li><li><strong>Rationalization:</strong> The mindset to justify the dishonest act (e.g., \"Everyone does it,\" or \"I am underpaid\").</li></ul>"
  },
  {
    id: 198,
    title: "Two Types of Fraud",
    concept: "Auditors focus on two types of fraud that result in material misstatement.",
    detail: "<ul><li><strong>Fraudulent Financial Reporting:</strong> Intentionally manipulating the numbers to mislead users (e.g., Overstating Revenue, Understating Expenses, Manipulating Estimates).</li><li><strong>Misappropriation of Assets:</strong> Theft of company resources (e.g., Stealing cash/inventory, using company assets for personal use).</li></ul>"
  },
  {
    id: 199,
    title: "Management Override of Controls (Significant Risk)",
    concept: "Management is in a unique position to perpetrate fraud because they can directly override controls that otherwise appear to be operating effectively.",
    detail: "<ul><li><strong>The Risk:</strong> Even if controls look strong, the CEO/CFO can force an adjustment.</li><li><strong>Required Procedure:</strong> The auditor must perform Journal Entry Testing (JET) to detect this override, irrespective of past experience with management.</li></ul>"
  },
  {
    id: 200,
    title: "Audit Procedures: Journal Entry Testing (JET)",
    concept: "Specific characteristics of journal entries indicate a higher risk of fraud.",
    detail: "<ul><li><strong>What to look for (Red Flags):</strong></li><ul><li><strong>Timing:</strong> Entries posted on weekends, holidays, or late at night.</li><li><strong>Amount:</strong> Round numbers (e.g., 10,000,000) often indicate manual estimation or fraud rather than actual transaction values.</li><li><strong>User:</strong> Entries posted by unauthorized personnel or senior management who usually don't post entries.</li><li><strong>Description:</strong> Unusual, vague, or unrelated descriptions in the ledger.</li></ul></ul>"
  },
  {
    id: 201,
    title: "Fraud in Accounting Estimates (Manipulation)",
    concept: "Management often uses \"Subjective Estimates\" (like Bad Debts or Depreciation) to manipulate profits.",
    detail: "<ul><li><strong>Red Flag:</strong> A sudden, unjustified change in an estimate.</li><li><strong>Example:</strong> Bad debt provision dropping from 15% to 2% without a valid reason.</li><li><strong>Example:</strong> Increasing the useful life of assets to reduce depreciation expense and boost profit.</li><li><strong>Audit Procedure:</strong> Perform a retrospective review (compare last year's estimate to this year's actual outcome) to check for bias.</li></ul>"
  },
  {
    id: 202,
    title: "Revenue Recognition Fraud (Presumed Risk)",
    concept: "There is a rebuttable presumption in auditing that Revenue Recognition is a fraud risk area.",
    detail: "<ul><li><strong>Techniques:</strong> Recording fake sales (fictitious invoices), recording sales before delivery (cut-off fraud), or channel stuffing.</li><li><strong>Audit Procedure:</strong></li><ul><li><strong>Cut-off Testing:</strong> Ensure sales near year-end are recorded in the correct period.</li><li><strong>Confirmations:</strong> Send letters to customers to verify outstanding balances.</li></ul></ul>"
  },
  {
    id: 203,
    title: "Team Discussion (Brainstorming)",
    concept: "The engagement team must hold a discussion (planning meeting) to brainstorm where the financial statements might be susceptible to fraud.",
    detail: "<ul><li><strong>Purpose:</strong> To share insights from experienced members and to set the \"Professional Skepticism\" tone for the audit.</li><li><strong>Mindset:</strong> The discussion must be held setting aside beliefs about management's honesty—assume fraud could happen.</li></ul>"
  },
  {
    id: 204,
    title: "Misappropriation of Assets: Key Indicators",
    concept: "Theft is often enabled by weak physical controls.",
    detail: "<ul><li><strong>Red Flags:</strong></li><ul><li>Inventory or Cash held without Physical Access Controls (e.g., no lockbox, open warehouse).</li><li>Missing assets (e.g., laptops) identified during physical verification.</li></ul><li><strong>Accounting Treatment:</strong> If theft occurs, the asset must be written down to zero or its recoverable amount (fair value adjustment), and the loss must be recorded.</li></ul>"
  },
  {
    id: 205,
    title: "Reporting Fraud",
    concept: "If fraud is identified, the auditor has specific reporting duties.",
    detail: "<ul><li><strong>To Management:</strong> Report to a level above the person involved (e.g., if manager involved, tell Director).</li><li><strong>To Governance (Audit Committee):</strong> If senior management is involved or internal control is significantly breached.</li><li><strong>To Regulators:</strong> If there is a legal duty (e.g., money laundering laws), confidentiality is overridden.</li></ul>"
  },
  {
    id: 206,
    title: "Professional Skepticism",
    concept: "The auditor must maintain an attitude of professional skepticism throughout the audit, recognizing that management may be dishonest, regardless of past integrity.",
    detail: "<ul><li><strong>Action:</strong> Don't take management's word at face value. Verify everything with evidence.</li><li><strong>Example:</strong> If an invoice is missing customer details (address/ID), do not record the revenue; investigate it.</li></ul>"
  },
  {
    id: 207,
    title: "Related Party Transactions (Fraud Opportunity)",
    concept: "Transactions with friends, family, or related entities are a major vehicle for fraud (Conflict of Interest).",
    detail: "<ul><li><strong>Risk:</strong> Procurement manager buying from a relative at inflated prices.</li><li><strong>Audit Action:</strong> Check for undisclosed related party transactions and verify they are at \"Arm's Length\".</li></ul>"
  },
  {
    id: 208,
    title: " \"Round Tripping\" or Fictitious Entries",
    concept: "Creating fake entries to boost appearances.",
    detail: "<ul><li><strong>Scenario:</strong> Booking a sale and then reversing it after year-end, or moving money between accounts to make cash look higher.</li><li><strong>Procedure:</strong> Analyze the General Ledger (GL) for entries that cancel each other out or lack commercial substance.</li></ul>"
  },
  {
    id: 209,
    title: "Lifestyle Mismatch (Behavioral Red Flag)",
    concept: "An employee living a lifestyle far beyond their known salary is a strong indicator of asset misappropriation.",
    detail: "<ul><li><strong>Observation:</strong> If a junior cashier drives a luxury car, it warrants investigation into cash controls.</li></ul>"
  },
  {
    id: 210,
    title: "System-Generated vs. Manual Entries",
    concept: "Fraud is less likely in automated system-generated entries (like standard interest calculations) and more likely in Manual Adjustments.",
    detail: "<ul><li><strong>Audit Focus:</strong> The auditor should filter the ledger to focus testing on Manual Journal Entries, as these represent human intervention and potential manipulation.</li></ul>"
  },
  {
    id: 211,
    title: "Debt Covenants (The \"Window Dressing\" Pressure)",
    concept: "Companies with bank loans are often required to maintain specific ratios (e.g., Current Ratio > 1). If they are close to breaching these, the risk of fraud increases.",
    detail: "<ul><li><strong>The Trick:</strong> Management might intentionally misclassify long-term liabilities as current (or vice versa) or delay recording expenses to keep ratios looking healthy.</li><li><strong>Audit Action:</strong> Scrutinize classification of liabilities and calculate ratios yourself to verify compliance with loan agreements.</li></ul>"
  },
  {
    id: 212,
    title: "Procurement Fraud (Conflict of Interest)",
    concept: "Fraud often happens when an employee has a hidden relationship with a supplier (e.g., buying from a spouse's company).",
    detail: "<ul><li><strong>Red Flag:</strong> If a procurement manager insists on using a specific vendor despite higher prices or poor quality.</li><li><strong>Audit Action:</strong> Perform background checks on major vendors and cross-reference addresses/names with employee records to detect conflicts of interest.</li></ul>"
  },
  {
    id: 213,
    title: "Accounting for Stolen Assets (The Write-Off)",
    concept: "If an asset (e.g., a laptop or inventory) is stolen, it must be removed from the books. Keeping it recorded is a misstatement.",
    detail: "<ul><li><strong>Correct Treatment:</strong> The asset should be written down to zero (if not recovered) or adjusted to its recoverable amount.</li><li><strong>The Fraud:</strong> Management might try to keep the stolen asset on the Balance Sheet to avoid showing a loss and reducing profits.</li></ul>"
  },
  {
    id: 214,
    title: "Senior Management Resignation (Behavioral Red Flag)",
    concept: "Sudden resignation of senior executives (CEO/CFO) without a clear reason is a major fraud indicator.",
    detail: "<ul><li><strong>Implication:</strong> It often suggests they are fleeing a sinking ship or refusing to sign off on fraudulent accounts.</li><li><strong>Audit Action:</strong> The auditor should inquire about the real reasons for departure and be extra skeptical of the period leading up to the resignation.</li></ul>"
  },
  {
    id: 215,
    title: "New System Implementation (Data Migration Risk)",
    concept: "When a company switches software (e.g., to a new ERP), the risk of \"loss of audit trail\" or intentional manipulation increases during the data transfer.",
    detail: "<ul><li><strong>The Risk:</strong> Fraudsters may blame \"system errors\" for missing data or altered balances during migration.</li><li><strong>Audit Action:</strong> Verify the completeness and accuracy of data transfer (Opening Balance in new system = Closing Balance in old system).</li></ul>"
  },
  {
    id: 216,
    title: "Whistleblowing Mechanisms (Detective Control)",
    concept: "Fraud is often detected by tips from employees. A lack of an anonymous reporting channel is a significant control weakness.",
    detail: "<ul><li><strong>Control:</strong> Companies should have a \"Whistleblower Program\" where staff can report unethical behavior without fear of retaliation.</li><li><strong>Audit Check:</strong> Verify if such a mechanism exists and review the log of reported incidents to see if management investigated them.</li></ul>"
  },
  {
    id: 217,
    title: "Inconsistency: Internal Audit vs. Management",
    concept: "If the Internal Audit department finds issues that Management denies or downplays, the Auditor must trust the evidence, not the management.",
    detail: "<ul><li><strong>Scenario:</strong> Internal Audit reports \"Control Weakness in Cash,\" but Management says \"Controls are Strong\".</li><li><strong>Action:</strong> This discrepancy itself is a risk factor. The auditor must perform independent tests and cannot simply rely on management's representation.</li></ul>"
  },
  {
    id: 218,
    title: "Missing Customer Information (Fictitious Revenue)",
    concept: "Incomplete master data for customers is a strong sign of fake sales.",
    detail: "<ul><li><strong>Red Flag:</strong> Revenue recorded for customers with missing addresses, tax IDs, or contact details.</li><li><strong>Logic:</strong> Real customers have physical locations. \"Ghost\" customers often exist only in the ledger.</li><li><strong>Audit Action:</strong> Do not verify revenue just by looking at the invoice; verify the existence of the customer.</li></ul>"
  },
  {
    id: 219,
    title: "\"Significant Risks\" (Presumed by ISAs)",
    concept: "Certain areas are always treated as Significant Risks in an audit, requiring special attention.",
    detail: "<ul><li><strong>The List:</strong></li><ol><li><strong>Revenue Recognition:</strong> Presumed to be a fraud risk unless proven otherwise.</li><li><strong>Management Override of Controls:</strong> A risk present in all entities.</li></ol><li><strong>Impact:</strong> You cannot rely solely on analytical procedures for these; you must perform Tests of Detail (like Journal Entry Testing).</li></ul>"
  },
  {
    id: 220,
    title: "Physical Verification Discrepancies",
    concept: "If the physical count does not match the system records, it’s not just an error—it’s a potential theft or fraud.",
    detail: "<ul><li><strong>Scenario:</strong> System says 100 units, Physical count finds 85.</li><li><strong>Action:</strong> Don't just adjust the variance. Investigate why it is missing. Is it theft? Is it poor recording?</li><li><strong>Tracking:</strong> Use serial numbers or asset tags to trace specific missing items.</li></ul>"
  },
  {
    id: 221,
    title: "Round Numbers in Large Entries",
    concept: "Humans tend to use round numbers (e.g., 5,000,000) when estimating or inventing figures. Real transactions (with tax, discounts) are rarely round.",
    detail: "<ul><li><strong>Audit Procedure:</strong> Use audit software (CAATs) to filter and extract all journal entries with round numbers (ending in 000s).</li><li><strong>Investigation:</strong> Ask for the supporting invoice. If the invoice is also exactly 5,000,000 without a logical basis, it is highly suspicious.</li></ul>"
  },
  {
    id: 222,
    title: "Segregation of Duties (The Fraud Preventer)",
    concept: "Fraud is easy when one person controls the whole cycle (e.g., hiring employees AND processing payroll).",
    detail: "<ul><li><strong>The Rule:</strong> The person who authorizes a transaction should not be the one who records it or holds the asset.</li><li><strong>Risk:</strong> Finance staff with high turnover or limited staff often leads to a breakdown in this segregation, creating opportunity for fraud.</li></ul>"
  },
  {
    id: 223,
    title: "Intimidation Threat (Fraud Link)",
    concept: "If management threatens the auditor (e.g., \"We will fire you if you don't sign off\"), it is often because they are hiding fraud.",
    detail: "<ul><li><strong>Indicator:</strong> Limitation of scope imposed by management (e.g., \"You cannot see those files\").</li><li><strong>Action:</strong> This is a major red flag for management integrity. Consider withdrawing from the engagement.</li></ul>"
  },
  {
    id: 224,
    title: "Unexpected \"Perfect\" Performance",
    concept: "If a company consistently meets targets exactly (or beats them by a tiny margin) every quarter, it suggests manipulation.",
    detail: "<ul><li><strong>Reality:</strong> Real business is volatile.</li><li><strong>Fraud:</strong> \"Smoothing\" profits to look stable for investors.</li><li><strong>Audit Action:</strong> Analyze the timing of revenue. Was a huge chunk recorded in the last few days of the quarter to hit the target?</li></ul>"
  },
  {
    id: 225,
    title: "The \"Tone at the Top\"",
    concept: "Fraud isn't just about controls; it's about culture. If the CEO ignores ethics, employees will too.",
    detail: "<ul><li><strong>Assessment:</strong> The auditor must evaluate the Control Environment. Does management demonstrate integrity? Do they have a code of conduct?</li><li><strong>Indicator:</strong> If management is obsessed with stock price or tax evasion, the risk of fraudulent financial reporting is high.</li></ul>"
  },
  {
    id: 226,
    title: "Definition of a Related Party",
    concept: "A related party is not just a subsidiary or parent. It includes any person or entity that has control, significant influence, or is under common control with the reporting entity.",
    detail: "<ul><li><strong>Key Categories:</strong></li><ul><li><strong>Parent & Subsidiary:</strong> Entities within the same group.</li><li><strong>Common Control:</strong> Two companies owned by the same person or having common directors.</li><li><strong>Key Management Personnel (KMP):</strong> Directors, CEO, CFO, and department heads who have authority and responsibility for planning/controlling activities.</li><li><strong>Close Family Members:</strong> Spouses, children, or dependents of directors/KMP.</li><li><strong>Post-Employment Benefit Plans:</strong> Provident Funds or Pension Funds managed by the company.</li></ul></ul>"
  },
  {
    id: 227,
    title: "The \"Provident Fund\" Distinction",
    concept: "Not all transactions involving a Provident Fund are Related Party Transactions (RPT). It depends on who is transacting.",
    detail: "<ul><li><strong>Not RPT:</strong> If an employee withdraws their own money from the fund, it is a transaction between the Fund and the Employee. The company is not directly involved.</li><li><strong>Is RPT:</strong> Transactions between the Company and the Fund (e.g., Company borrowing money from the fund or managing its assets) are Related Party Transactions.</li></ul>"
  },
  {
    id: 228,
    title: "The \"Arm's Length\" Assertion",
    concept: "Management often claims RPTs were conducted at \"Arm's Length\" (market terms). The auditor must verify this claim; they cannot just accept it.",
    detail: "<ul><li><strong>The Claim:</strong> Management asserts that the transaction was done at normal market prices and terms, just like with an unrelated third party.</li><li><strong>Audit Action:</strong></li><ul><li>Compare the price/terms to identical transactions with unrelated parties.</li><li>Engage an external expert to determine the fair market value (e.g., for land or specialized assets).</li></ul><li>If evidence does not support the assertion, management must remove the \"Arm's Length\" claim from the financial statements.</li></ul>"
  },
  {
    id: 229,
    title: "Undisclosed Related Parties (The Hidden Risk)",
    concept: "The biggest risk is that management fails to disclose a related party (intentionally or unintentionally). The auditor cannot rely solely on the list provided by management.",
    detail: "<ul><li><strong>Audit Procedure:</strong></li><ul><li>Inspect Shareholder Registers to identify major owners.</li><li>Review Investment Registers to see where the company has invested.</li><li>Check Conflict of Interest Declarations filed by directors.</li><li>Review Life Insurance Policies (who are the beneficiaries?).</li><li>Inquire about affiliations of directors with other companies.</li></ul></ul>"
  },
  {
    id: 230,
    title: "Transactions Outside the Normal Course of Business",
    concept: "Significant transactions that appear unusual or outside the company's normal operations are \"Red Flags\" for related party fraud.",
    detail: "<ul><li><strong>Examples:</strong></li><ul><li>Buying a property from a subsidiary at a price significantly higher than market value.</li><li>Selling goods with an unusually long credit period (e.g., 180 days vs. standard 60 days).</li><li>Interest-free or low-interest loans to directors.</li></ul><li><strong>Audit Action:</strong></li><ul><li>Inspect the underlying Contracts/Agreements.</li><li>Evaluate the Business Rationale (Does this deal make commercial sense?).</li><li>Check if it was authorized by the Board/Audit Committee.</li></ul></ul>"
  },
  {
    id: 231,
    title: "Identification of a Previously Undisclosed Related Party",
    concept: "If the auditor discovers a related party that management did not disclose, strict procedures must be followed immediately.",
    detail: "<ul><li><strong>Immediate Action:</strong> Communicate the information to the entire engagement team.</li><li><strong>Request:</strong> Ask management to identify all transactions with this newly found party.</li><li><strong>Investigate:</strong> Ask why the entity’s controls failed to identify it earlier (Was it intentional fraud?).</li><li><strong>Re-evaluate:</strong> Reconsider the risk of fraud and whether other undisclosed parties might exist.</li></ul>"
  },
  {
    id: 232,
    title: "Audit Procedures for RPTs (Substantive Testing)",
    concept: "How to verify the numbers and disclosures of identified RPTs.",
    detail: "<ul><li><strong>Confirmation:</strong> Send confirmation letters to the related party to verify the terms and amounts.</li><li><strong>Bank Confirmations:</strong> Check for guarantees given to/from related parties.</li><li><strong>Minutes of Meetings:</strong> Review board minutes for approval of these transactions.</li><li><strong>Cash Flow Trace:</strong> Ensure the money actually moved and wasn't just a book entry (substance over form).</li></ul>"
  },
  {
    id: 233,
    title: "Role of the Audit Committee",
    concept: "The Audit Committee plays a crucial role in preventing abusive RPTs by providing independent approval.",
    detail: "<ul><li><strong>Function:</strong> Unlike normal transactions approved by managers, significant RPTs usually require approval from the Audit Committee or the Board.</li><li><strong>Independence:</strong> The Chairman of the Audit Committee is independent, acting as a safeguard against management collusion.</li></ul>"
  },
  {
    id: 234,
    title: "Disclosure Requirements (IAS 24)",
    concept: "Failure to disclose RPTs is a material misstatement. The standard requires specific details to be disclosed in the notes.",
    detail: "<ul><li><strong>Required Disclosures:</strong></li><ul><li>Name of the related party.</li><li>Nature of the relationship (e.g., Parent, Associate).</li><li>Amount of transactions during the year.</li><li>Outstanding balances at year-end.</li><li>Any provisions for doubtful debts related to these parties.</li></ul></ul>"
  },
  {
    id: 235,
    title: "Fraud Risk Factors in RPTs",
    concept: "RPTs are often used to facilitate fraudulent financial reporting or misappropriation of assets.",
    detail: "<ul><li><strong>Schemes:</strong></li><ul><li><strong>Channel Stuffing:</strong> Forcing a subsidiary to buy excess inventory to boost parent company sales.</li><li><strong>Asset Stripping:</strong> Selling assets to a director at a low price.</li><li><strong>Round Tripping:</strong> Sending money to a related party and having them send it back as \"Revenue\".</li></ul><li><strong>Auditor Attitude:</strong> Maintain Professional Skepticism throughout the audit.</li></ul>"
  },
  {
    id: 236,
    title: "Director's Loan (Always RPT)",
    concept: "Any loan taken by a director from the company is automatically a Related Party Transaction and must be disclosed.",
    detail: "<ul><li><strong>Rule:</strong> It does not matter if the loan is small or large; the relationship (Director) makes it reportable.</li><li><strong>Audit Check:</strong> Verify if the loan was approved by shareholders (if required by local law) and disclosed in the financial statements.</li></ul>"
  },
  {
    id: 237,
    title: "Dominant Influence",
    concept: "If a single individual (e.g., a Founder/CEO) dominates management and there are no compensating controls, it is a fraud risk factor.",
    detail: "<ul><li><strong>Risk:</strong> The dominant individual can easily override controls to approve RPTs that benefit them personally.</li><li><strong>Safeguard:</strong> Strong oversight by an independent Board or Audit Committee.</li></ul>"
  },
  {
    id: 238,
    title: "\"Substance Over Form\"",
    concept: "Auditors must look at the economic reality of a transaction, not just its legal form.",
    detail: "<ul><li><strong>Example:</strong> A company sells a building to a related party but continues to use it for free.</li><li><strong>Form:</strong> Sale.</li><li><strong>Substance:</strong> It might be a financing arrangement or a sham transaction to hide assets.</li><li><strong>Action:</strong> The auditor must audit the substance.</li></ul>"
  },
  {
    id: 239,
    title: "Maintaining Alertness (Ongoing Process)",
    concept: "Identifying RPTs is not just a planning activity; the auditor must remain alert throughout the audit.",
    detail: "<ul><li><strong>Sources:</strong></li><ul><li>Reviewing invoices from lawyers (might verify a guarantee to a related party).</li><li>Reviewing regulatory filings (SECP returns).</li><li>Checking correspondence with the entity's professional advisors.</li></ul></ul>"
  },
  {
    id: 240,
    title: "Written Representations",
    concept: "The auditor must obtain a written letter from management confirming they have disclosed all known related parties.",
    detail: "<ul><li><strong>Purpose:</strong> To acknowledge management's responsibility.</li><li><strong>Limitation:</strong> This representation is not sufficient audit evidence on its own. It must be supported by other testing.</li></ul>"
  },
  {
    id: 241,
    title: "Definition & Purpose of Written Representation",
    concept: "A written statement by management provided to the auditor to confirm certain matters or to support other audit evidence.",
    detail: "<ul><li><strong>Nature:</strong> It is necessary audit evidence, but it is NOT sufficient appropriate audit evidence on its own.</li><li><strong>Role:</strong> It acts as a \"Safety Net\" or supporting evidence. It complements the testing done by the auditor but does not replace it.</li><li><strong>Why Written?</strong> \"Spoken words can be denied, written words cannot.\" It forces management to be careful and accountable.</li></ul>"
  },
  {
    id: 242,
    title: "Management Responsibilities (The Core Confirmation)",
    concept: "The auditor must request a written representation that management has fulfilled its fundamental responsibilities.",
    detail: "<ul><li><strong>Preparation of FS:</strong> Confirmation that they have prepared the financial statements in accordance with the applicable financial reporting framework.</li><li><strong>Information Provided:</strong> Confirmation that they have provided the auditor with all relevant information, records, and unrestricted access to persons within the entity.</li><li><strong>Internal Controls:</strong> Confirmation that they have designed, implemented, and maintained internal controls to prevent and detect fraud.</li></ul>"
  },
  {
    id: 243,
    title: "Who Signs the Representation Letter?",
    concept: "It must be requested from management with appropriate responsibilities for the financial statements and knowledge of the matters concerned.",
    detail: "<ul><li><strong>Signatories:</strong> Typically the CEO (Chief Executive Officer) and CFO (Chief Financial Officer).</li><li><strong>Reason:</strong> They are the ones responsible for the daily operations and preparation of the accounts, so they must take ownership.</li></ul>"
  },
  {
    id: 244,
    title: "Date of the Written Representation",
    concept: "The date of the representation letter is critical for the auditor's liability.",
    detail: "<ul><li><strong>The Rule:</strong> The date should be as near as practicable to, but not after, the date of the Auditor’s Report.</li><li><strong>Coverage:</strong> It must cover all financial periods referred to in the auditor’s report.</li><li><strong>Logic:</strong> If the auditor signs the report on March 15, the representation letter should be dated March 15 (or very close before). If it is dated March 5, the auditor has no coverage for events between March 5 and 15.</li></ul>"
  },
  {
    id: 245,
    title: "Representations Required by Other ISAs",
    concept: "Besides the general responsibilities, specific ISAs require specific written confirmations.",
    detail: "<ul><li><strong>ISA 240 (Fraud):</strong> Management acknowledges its responsibility for internal control against fraud and discloses any known/suspected fraud.</li><li><strong>ISA 250 (Laws & Regulations):</strong> All known instances of non-compliance have been disclosed.</li><li><strong>ISA 450 (Misstatements):</strong> Confirmation that the effects of uncorrected misstatements are immaterial, both individually and in aggregate.</li><li><strong>ISA 550 (Related Parties):</strong> All related party relationships and transactions have been disclosed.</li><li><strong>ISA 560 (Subsequent Events):</strong> All events occurring after the balance sheet date requiring adjustment or disclosure have been dealt with.</li><li><strong>ISA 570 (Going Concern):</strong> Management's assessment of the entity's ability to continue as a going concern is appropriate.</li></ul>"
  },
  {
    id: 246,
    title: "Reliability of Written Representations",
    concept: "Written representations are considered low-reliability evidence compared to external evidence (like bank confirmations).",
    detail: "<ul><li><strong>Inconsistency:</strong> If the written representation contradicts other audit evidence (e.g., Management says \"No Lawsuits,\" but the Lawyer says \"Huge Lawsuit\"), the auditor must investigate.</li><li><strong>Action:</strong></li><ul><li>Re-evaluate the integrity of management.</li><li>Consider the effect on the reliability of other representations (if they lied here, did they lie elsewhere?).</li><li>Perform additional audit procedures to resolve the matter.</li></ul></ul>"
  },
  {
    id: 247,
    title: "Refusal to Provide Written Representations",
    concept: "If management refuses to provide the requested representations, it is a significant issue.",
    detail: "<ul><li><strong>Implication:</strong> It implies management is hiding something or refuses to accept responsibility.</li><li><strong>Auditor Action:</strong></li><ul><li>Discuss the matter with management.</li><li>Re-evaluate the integrity of management and the reliability of other evidence.</li><li>Take Appropriate Action: If they refuse the fundamental representations (about preparing FS or providing info), the auditor MUST issue a Disclaimer of Opinion. (Because the scope limitation is pervasive).</li></ul></ul>"
  },
  {
    id: 248,
    title: "Doubt as to Management Integrity",
    concept: "If the auditor has serious concerns about the competence, integrity, or ethical values of management, the written representation becomes worthless.",
    detail: "<ul><li><strong>Rule:</strong> If management is not honest, their written word is meaningless.</li><li><strong>Result:</strong> The auditor determines that the written representations are not reliable.</li><li><strong>Outcome:</strong> The auditor must Disclaimer of Opinion or Withdraw from the engagement.</li></ul>"
  },
  {
    id: 249,
    title: "Uncorrected Misstatements (Immateriality)",
    concept: "Management must confirm in writing that any errors found by the auditor but left uncorrected are \"Immaterial.\"",
    detail: "<ul><li><strong>Procedure:</strong> The auditor usually attaches a summary list of these uncorrected errors to the representation letter.</li><li><strong>Purpose:</strong> To ensure management explicitly acknowledges these errors and confirms their belief that they do not damage the financial statements' truth and fairness.</li></ul>"
  },
  {
    id: 250,
    title: "\"Verbal\" vs. \"Written\" Confirmation",
    concept: "A verbal promise from the CEO is not enough for audit standards.",
    detail: "<ul><li><strong>Scenario:</strong> The CEO says, \"I promise all related parties are disclosed\" but refuses to sign the letter.</li><li><strong>Auditor Response:</strong> This is a refusal to provide representations. The auditor cannot sign the audit report based on verbal assurance alone.</li><li><strong>Impact:</strong> Limitation on scope -> Disclaimer of Opinion.</li></ul>"
  },
  {
    id: 251,
    title: "Management Representation Letter (MRL) Format",
    concept: "The MRL is a formal letter on the Client's Letterhead, addressed to the Auditor.",
    detail: "<ul><li><strong>Header:</strong> Entity Name & Logo.</li><li><strong>Addressee:</strong> To the Auditor.</li><li><strong>Date:</strong> Same date as the Auditor's Report.</li><li><strong>Body:</strong> \"We confirm that...\" followed by the list of assertions (FS preparation, Fraud, Laws, etc.).</li><li><strong>Signature:</strong> Signed by CEO and CFO.</li></ul>"
  },
  {
    id: 252,
    title: "Events during the \"Intervening Period\"",
    concept: "If the CEO is unavailable (e.g., sick) during the final audit days, the auditor cannot just wait or accept a letter signed weeks ago.",
    detail: "<ul><li><strong>Scenario:</strong> Audit report to be signed March 10. CEO unavailable March 5-15.</li><li><strong>Option A:</strong> CEO signs on March 4. (Risky - events between March 4-10 are not covered).</li><li><strong>Option B (Best):</strong> CEO signs on March 16 (after return). The Audit Report is also dated March 16.</li><li><strong>Constraint:</strong> The Audit Report cannot be dated before the Written Representation. The auditor needs the representation in hand before signing the opinion.</li></ul>"
  },
  {
    id: 253,
    title: "Objective of ISA 220 (The Partner's Duty)",
    concept: "The primary objective is to implement quality control procedures at the engagement level to provide reasonable assurance that the audit complies with professional standards and the report is appropriate.",
    detail: "<ul><li><strong>Responsibility:</strong> While the firm establishes the system (ISQC 1), the Engagement Partner is ultimately responsible for quality on the specific audit engagement.</li><li><strong>Outcome:</strong> Proper QC ensures accurate audit conclusions, professional service to the client, and protection against negligence claims.</li></ul>"
  },
  {
    id: 254,
    title: "Client Acceptance and Continuance",
    concept: "The partner must ensure the client is \"safe\" to audit before signing the engagement letter. This is the \"Gatekeeper\" stage.",
    detail: "<ul><li><strong>Background Checks:</strong> The team must investigate the client's integrity (e.g., checking Global Watch Lists, news for fraud, money laundering).</li><li><strong>Competence:</strong> Does the firm have the time, resources, and industry knowledge to handle this specific client?</li><li><strong>Ethics:</strong> Can the firm comply with ethical requirements (Independence)?</li><li><strong>Process:</strong> The Engagement Letter is only signed and sent after the Partner reviews and signs off on the acceptance/continuance form.</li></ul>"
  },
  {
    id: 255,
    title: "Leadership Responsibilities (\"Tone at the Top\")",
    concept: "The Engagement Partner must take responsibility for the overall quality on each audit engagement.",
    detail: "<ul><li><strong>Action:</strong> The partner sets the direction, supervision, and performance standards.</li><li><strong>Significance:</strong> If the junior staff sees the Partner cutting corners, they will too. The Partner must emphasize that quality is essential and overriding commercial considerations.</li></ul>"
  },
  {
    id: 256,
    title: "Engagement Performance: Direction, Supervision, & Review",
    concept: "The Partner must be actively involved throughout the audit, not just at the end.",
    detail: "<ul><li><strong>Direction:</strong> Informing the team of their responsibilities and the objectives of the work (Planning phase).</li><li><strong>Supervision:</strong> Tracking progress and addressing issues during the audit (Fieldwork phase).</li><li><strong>Review:</strong> Checking the work performed to ensure it supports the conclusions reached (Completion phase).</li></ul>"
  },
  {
    id: 257,
    title: "Consultation (Seeking Help)",
    concept: "For difficult or contentious matters (e.g., complex accounting for derivatives), the engagement team must consult with experts or other partners.",
    detail: "<ul><li><strong>Requirement:</strong> The Partner must ensure appropriate consultation takes place.</li><li><strong>Documentation:</strong> The nature, scope, and conclusions of the consultation must be documented and implemented.</li><li><strong>Dispute:</strong> If there is a difference of opinion, it must be resolved according to the firm's policy before the report is issued.</li></ul>"
  },
  {
    id: 258,
    title: "Engagement Quality Control Review (EQCR)",
    concept: "A \"Fresh Pair of Eyes.\" A mandatory review for Listed Entities (and high-risk Public Interest Entities) performed by a qualified individual not part of the engagement team.",
    detail: "<ul><li><strong>Who:</strong> A Partner, senior internal person, or external expert with sufficient authority.</li><li><strong>Focus:</strong> They evaluate the Significant Judgments made and the Conclusions reached. They do not re-audit the whole file.</li><li><strong>Timing:</strong> The audit report cannot be dated (signed) until the EQCR is complete.</li></ul>"
  },
  {
    id: 259,
    title: "Responsibilities: Engagement Partner vs. EQC Reviewer",
    concept: "It is crucial to distinguish between the two roles to avoid \"Over-reliance\" or gaps in responsibility.",
    detail: "<ul><li><strong>Engagement Partner:</strong> Responsible for the entire audit, day-to-day direction, detailed reviews, and signing the report.</li><li><strong>EQC Reviewer:</strong> Responsible for an objective evaluation of significant judgments (e.g., Materiality, Going Concern, Fraud Risks, Audit Opinion). They act as a safety check before issuance.</li></ul>"
  },
  {
    id: 260,
    title: "EQCR: Matters for Evaluation",
    concept: "The EQC Reviewer focuses on high-risk areas.",
    detail: "<ul><li><strong>Key Questions:</strong></li><ul><li>Has the firm's independence been maintained?</li><li>Are the significant risks (e.g., Fraud) identified and responded to?</li><li>Is the proposed audit opinion (Qualified/Unmodified) appropriate?</li><li>Are the financial statements and consultation conclusions consistent with the evidence?</li></ul></ul>"
  },
  {
    id: 261,
    title: "Documentation of Quality Control",
    concept: " \"If it isn't documented, it's not done.\" The system (e.g., Canvas) requires specific sign-offs.",
    detail: "<ul><li><strong>Content:</strong></li><ul><li>Issues identified regarding ethics/independence and how they were resolved.</li><li>Conclusions on client acceptance.</li><li>Nature and scope of consultations.</li><li>Evidence that the EQCR has been performed before the report date.</li></ul><li><strong>Lockdown:</strong> Electronic files usually require a formal \"Sign-off\" by the EQC Reviewer before the file can be closed or the report issued.</li></ul>"
  },
  {
    id: 262,
    title: "Public Interest Entities (PIEs)",
    concept: "Entities holding significant public assets (Banks, Insurance, Pension Funds) require stricter quality control, similar to listed companies.",
    detail: "<ul><li><strong>Why:</strong> Audit failure here harms the public, not just private shareholders.</li><li><strong>Action:</strong> An EQC Review is usually appointed voluntarily by the firm for PIEs even if not strictly \"Listed,\" to manage risk and reputation.</li></ul>"
  },
  {
    id: 263,
    title: "Monitoring the Quality Control Policies",
    concept: "The firm must monitor its own system to ensure it works.",
    detail: "<ul><li><strong>Inspection:</strong> The firm selects a sample of completed audits (archived files) for inspection.</li><li><strong>Feedback:</strong> Deficiencies are communicated to the Engagement Partners.</li><li><strong>Partner's Duty:</strong> The Engagement Partner must consider the results of this monitoring (e.g., \"Did my last audit have errors?\") and improve current work.</li></ul>"
  },
  {
    id: 264,
    title: "Difference of Opinion",
    concept: "What happens if the Engagement Partner and the EQC Reviewer disagree?",
    detail: "<ul><li><strong>Rule:</strong> The Audit Report cannot be issued.</li><li><strong>Resolution:</strong> The firm must have a policy for resolving differences (e.g., referring to a Senior Technical Partner or Managing Partner).</li><li><strong>Outcome:</strong> The report is only issued once the matter is resolved.</li></ul>"
  },
  {
    id: 265,
    title: "The Two Types of Assurance Engagements",
    concept: "It is vital to distinguish between an Audit (Reasonable Assurance) and a Review (Limited Assurance).",
    detail: "<ul><li><strong>Audit:</strong> Provides Reasonable Assurance (High but not absolute). Requires extensive evidence (inspection, observation, confirmation). The opinion is Positive (\"In our opinion, the FS give a true and fair view\").</li><li><strong>Review:</strong> Provides Limited Assurance (Lower level). Relies primarily on Inquiry and Analytical Procedures. The conclusion is Negative (\"Nothing has come to our attention...\").</li></ul>"
  },
  {
    id: 266,
    title: "The \"Negative Conclusion\" (Wording is Key)",
    concept: "In a review engagement, the practitioner does not say the accounts are \"correct.\" They only say they didn't find anything \"wrong.\"",
    detail: "<ul><li><strong>Standard Wording:</strong> \"Based on our review, nothing has come to our attention that causes us to believe that the financial statements are not prepared, in all material respects, in accordance with the applicable financial reporting framework\".</li><li><strong>Implication:</strong> This places less responsibility on the practitioner compared to an audit opinion, as the scope of work is significantly less.</li></ul>"
  },
  {
    id: 267,
    title: "Primary Procedures: Inquiry and Analytical",
    concept: "Unlike an audit, a review does not typically involve inspecting assets, observing stock takes, or sending external confirmations.",
    detail: "<ul><li><strong>Inquiry:</strong> Asking management about accounting policies, recording of transactions, and significant changes.</li><li><strong>Analytical Procedures:</strong> Comparing current year figures with prior years or budgets to identify unusual fluctuations (e.g., Gross Profit margin analysis).</li><li><strong>Constraint:</strong> If these two procedures indicate a material misstatement, then the practitioner performs additional procedures.</li></ul>"
  },
  {
    id: 268,
    title: "Internal Controls in a Review",
    concept: "Testing internal controls is optional in a review engagement, unlike in an audit where understanding controls is mandatory.",
    detail: "<ul><li><strong>Practitioner's Role:</strong> The focus is on Material Misstatements and Risk Assessment, not on the operating effectiveness of controls.</li><li><strong>Example:</strong> Even if management has prepared internal controls, the practitioner is not required to test them; they simply obtain an understanding to plan the review.</li></ul>"
  },
  {
    id: 269,
    title: "Adjustments: Prepaid Expenses & Liabilities",
    concept: "The reviewer checks if cut-off and accruals are logically consistent.",
    detail: "<ul><li><strong>Scenario:</strong> If a future liability is 120 but the prepaid portion is 100, the entry must correctly reflect the expense incurred vs. the asset (prepayment) held.</li><li><strong>Review Action:</strong> The practitioner reviews the journal entries for capitalization errors or calculation mistakes to ensure the net value recorded is correct.</li></ul>"
  },
  {
    id: 270,
    title: "Adjustments: CWIP & Capitalization",
    concept: "A common review area is distinguishing between expenses (Repairs) and assets (Capital Work in Progress - CWIP).",
    detail: "<ul><li><strong>Risk:</strong> Management might expense a capital item to reduce tax, or capitalize an expense to boost profit.</li><li><strong>Review Action:</strong> Review the list of additions to CWIP and inquire about the nature of the costs to ensure proper classification (IAS 16).</li></ul>"
  },
  {
    id: 271,
    title: "Property Valuation and Tax Assessment",
    concept: "Significant estimates like Property Valuation are high-risk areas in a review.",
    detail: "<ul><li><strong>Procedure:</strong> Since the practitioner might not hire an external expert (as in an audit), they perform a reasonableness check of the valuation and tax assessments.</li><li><strong>Scope Limitation:</strong> If the valuation seems unreasonable and management refuses to fix it, it leads to a modification of the conclusion.</li></ul>"
  },
  {
    id: 272,
    title: "Independence Requirements",
    concept: "Even though it is a \"Limited\" assurance engagement, the practitioner must still be Independent of the client.",
    detail: "<ul><li><strong>Rule:</strong> ISRE 2400 requires compliance with the Code of Ethics. You cannot review the accounts if you prepared them (Self-Review Threat), unless safeguards are in place.</li><li><strong>Compliance:</strong> The report must state that the practitioner is independent of the entity.</li></ul>"
  },
  {
    id: 273,
    title: "Materiality in Review Engagements",
    concept: "Materiality is applied the same way in a review as in an audit.",
    detail: "<ul><li><strong>The Logic:</strong> A misstatement is material if it affects user decisions, regardless of whether you are auditing or reviewing.</li><li><strong>Application:</strong> The practitioner sets a materiality level to decide which variances in analytical procedures are significant enough to investigate.</li></ul>"
  },
  {
    id: 274,
    title: "Reporting: Scope Limitations",
    concept: "If the practitioner cannot perform necessary inquiries or analysis, they cannot issue a clean conclusion.",
    detail: "<ul><li><strong>Scenario:</strong> Management refuses to provide a breakdown of \"Miscellaneous Expenses.\"</li><li><strong>Outcome:</strong> Since the practitioner relies on inquiry, this refusal is a Scope Limitation.</li><li><strong>Report:</strong> The conclusion is qualified (\"Except for...\") or a disclaimer is issued, depending on pervasiveness.</li></ul>"
  },
  {
    id: 275,
    title: "Understanding the Financial Reporting Framework (FRF)",
    concept: "Before starting the audit, the auditor must understand which framework (rules) the entity uses to prepare its financial statements.",
    detail: "<ul><li><strong>Why:</strong> To verify if the entity is compliant. Management claims \"We followed the rules,\" and the auditor must know those rules to check them.</li><li><strong>Examples:</strong></li><ul><li><strong>General Purpose:</strong> IFRS (International Financial Reporting Standards).</li><li><strong>Regulator Specific:</strong> Banking regulations (e.g., SBP guidelines for NPLs) or Insurance rules.</li><li><strong>Entity Specific:</strong> If a subsidiary is abroad (e.g., USA branch), local laws and currency translation (IAS 21) apply.</li></ul></ul>"
  },
  {
    id: 276,
    title: "Audit Strategy vs. Audit Plan",
    concept: "Planning involves two levels: The high-level Strategy and the detailed Plan.",
    detail: "<ul><li><strong>Audit Strategy:</strong> Sets the Scope, Timing, and Direction of the audit. It guides the development of the detailed plan.</li><ul><li><strong>Decisions:</strong> Reporting deadlines, reliance on IT controls, team resource allocation, and key risk areas.</li></ul><li><strong>Audit Plan:</strong> More detailed than the strategy. It describes the Nature, Timing, and Extent of specific audit procedures (risk assessment and substantive procedures) to be performed.</li></ul>"
  },
  {
    id: 277,
    title: "Interim Audit (Pre-Year-End Work)",
    concept: "To meet tight deadlines, auditors often perform procedures before the financial year-end (e.g., in November for a December year-end).",
    detail: "<ul><li><strong>Activities:</strong> Testing internal controls, risk assessment, reading interim financial statements, and reviewing board minutes.</li><li><strong>Benefit:</strong> Reduces the workload during the \"busy season\" (final audit).</li><li><strong>Limitation:</strong> It reduces substantive testing at year-end but does not eliminate it. The auditor must perform \"Roll-forward\" procedures to cover the remaining period (e.g., Nov-Dec).</li></ul>"
  },
  {
    id: 278,
    title: "Impact of IT on Planning",
    concept: "For high-tech companies (e.g., Telecoms like Ufone), revenue is recorded via automated systems without paper trails. The audit plan must adapt to this.",
    detail: "<ul><li><strong>Challenge:</strong> The auditor cannot verify transactions manually with customers easily.</li><li><strong>Solution:</strong> The plan must include Test of Controls over the IT system and may require engaging an IT Expert to test the system logic. This decision is made during the planning phase.</li></ul>"
  },
  {
    id: 279,
    title: "Materiality in Planning (Interim vs. Final)",
    concept: "Materiality is estimated during planning but must be revised when actual year-end figures are available.",
    detail: "<ul><li><strong>Interim Calculation:</strong> Based on annualized figures (e.g., Profit for 9 months extrapolated to 12 months).</li><li><strong>Final Revision:</strong> Re-calculated using actual year-end profit.</li><li><strong>Risk:</strong> If actual profit is significantly lower than planned, materiality decreases. This means smaller errors become material, requiring more audit testing than originally planned.</li></ul>"
  },
  {
    id: 280,
    title: "The \"Not Documented, Not Done\" Rule",
    concept: "If a procedure is not documented in the working papers, legally and professionally, it is assumed not to have been performed.",
    detail: "<ul><li><strong>Purpose:</strong></li><ul><li>Provides evidence for the auditor's basis for a conclusion.</li><li>Provides evidence that the audit was planned and performed in accordance with ISAs.</li></ul><li><strong>Accountability:</strong> Documentation must show Who performed the work and Who reviewed it.</li></ul>"
  },
  {
    id: 281,
    title: "Assembly of the Final Audit File (The 60-Day Rule)",
    concept: "The auditor must assemble the final audit file on a timely basis after the audit report date.",
    detail: "<ul><li><strong>Time Limit:</strong> Usually 60 days after the date of the auditor's report.</li><li><strong>Activity:</strong> This is an administrative process (sorting, numbering, discarding drafts).</li><li><strong>Restriction:</strong> No new audit procedures can be performed, and no new conclusions can be drawn during assembly. You generally cannot delete documents after this period.</li></ul>"
  },
  {
    id: 282,
    title: "Retention Period",
    concept: "The firm must retain audit documentation for a specific period to satisfy legal and professional requirements.",
    detail: "<ul><li><strong>Minimum Period:</strong> 5 years from the date of the auditor's report (or the group auditor's report, whichever is later).</li><li><strong>Ownership:</strong> The working papers are the property of the Auditor, not the client. The client cannot demand them.</li></ul>"
  },
  {
    id: 283,
    title: "Modification of Documentation After Report Date",
    concept: "Modifying the file after the audit report is signed is strictly restricted and only allowed in exceptional circumstances.",
    detail: "<ul><li><strong>Scenario:</strong> If new information arises (e.g., a subsequent event or a missed procedure discovered later).</li><li><strong>Requirement:</strong> The auditor must document:</li><ul><li>When and By Whom the changes were made and reviewed.</li><li>The specific reasons for the change.</li><li>The impact on the auditor's conclusions.</li></ul></ul>"
  },
  {
    id: 284,
    title: "Documentation Structure (Content)",
    concept: "Working papers must be self-explanatory so that an experienced auditor (with no previous connection to the audit) can understand the work done.",
    detail: "<ul><li><strong>Key Elements:</strong></li><ul><li>Nature, Timing, and Extent of procedures performed.</li><li>Results of procedures and evidence obtained.</li><li>Significant Matters arising and conclusions reached.</li></ul><li><strong>Example:</strong> For a legal case, document the lawyer's letter, management's discussion, and the conclusion on provision vs. disclosure.</li></ul>"
  },
  {
    id: 285,
    title: "Preconditions for an Audit",
    concept: "Before accepting an audit, the auditor must establish that certain \"Preconditions\" exist. If not, the audit cannot be accepted.",
    detail: "<ul><li><strong>Condition 1:</strong> The Financial Reporting Framework (FRF) to be used is Acceptable (e.g., IFRS).</li><li><strong>Condition 2:</strong> Management agrees to its Responsibilities:</li><ul><li>Preparation of Financial Statements.</li><li>Internal Controls.</li><li>Providing the auditor with Access to all information and persons.</li></ul></ul>"
  },
  {
    id: 286,
    title: "The Engagement Letter",
    concept: "The written agreement between the auditor and the client that defines the scope and terms of the audit to avoid misunderstandings.",
    detail: "<ul><li><strong>Mandatory:</strong> It must be agreed upon before the audit commences.</li><li><strong>Key Contents:</strong></li><ul><li>Objective and Scope of the audit.</li><li>Responsibilities of the Auditor and Management.</li><li>Identification of the applicable FRF.</li><li>Reference to the expected form and content of the report (and a warning that the report may differ if circumstances change).</li></ul></ul>"
  },
  {
    id: 287,
    title: "Limitation on Scope Prior to Acceptance",
    concept: "If management imposes a limitation on the scope of the auditor's work before the engagement starts, which would result in a Disclaimer of Opinion, the auditor must decline the engagement.",
    detail: "<ul><li><strong>Example:</strong> Management says, \"You can audit us, but you cannot visit our factory\" or \"You cannot see our receivables list.\"</li><li><strong>Exception:</strong> Unless the audit is required by law (statutory audit), the auditor should refuse such an engagement.</li></ul>"
  },
  {
    id: 288,
    title: "Recurring Audits",
    concept: "The auditor does not need to send a new engagement letter every year, but must assess if a revision is needed.",
    detail: "<ul><li><strong>Triggers for New Letter:</strong></li><ul><li>Change in Senior Management or Ownership.</li><li>Significant change in the nature or size of the business.</li><li>Change in legal or regulatory requirements.</li><li>Indication that the client misunderstands the scope.</li></ul></ul>"
  },
  {
    id: 289,
    title: "Change in Terms of Engagement",
    concept: "If the client asks to change the engagement (e.g., from Audit to Review) during the work, the auditor must assess if there is \"Reasonable Justification.\"",
    detail: "<ul><li><strong>Reasonable:</strong> Change in circumstances (e.g., bank no longer requires an audit) or a misunderstanding of the original service. -> Accept and issue report on new terms.</li><li><strong>Unreasonable:</strong> The client wants to avoid a Qualified Opinion because the auditor found an error or couldn't get evidence. -> Reject.</li><li><strong>Consequence:</strong> If the auditor rejects the change and the client refuses to continue the original audit, the auditor must Withdraw.</li></ul>"
  },
  {
    id: 290,
    title: "Internal vs. External Auditor (The Core Distinction)",
    concept: "The external auditor must understand the fundamental differences in role, scope, and reporting to determine if they can rely on the internal auditor.",
    detail: "<ul><li><strong>Independence:</strong> External Auditors are independent of the entity. Internal Auditors are employees of the entity (less independent).</li><li><strong>Reporting:</strong> External reports to Shareholders. Internal reports to Management or the Audit Committee.</li><li><strong>Focus:</strong> External focuses on the Financial Statements (True & Fair View). Internal focuses on Operational Efficiency, risk management, and internal controls design/compliance.</li><li><strong>Scope:</strong> External scope is defined by Law/ISAs. Internal scope is defined by Management.</li></ul>"
  },
  {
    id: 291,
    title: "Using the Work of Internal Audit Function",
    concept: "The external auditor can use the work already performed by the internal audit function (e.g., control testing) to reduce their own work, provided certain conditions are met.",
    detail: "<ul><li><strong>The 3 Evaluation Criteria:</strong></li><ul><li><strong>Objectivity:</strong> To whom do they report? (Reporting to the Audit Committee is better than reporting to the CFO). Are there conflicting responsibilities?</li><li><strong>Competence:</strong> Do they have professional qualifications (CA/ACCA/CIA)? Do they have adequate resources and training?</li><li><strong>Systematic & Disciplined Approach:</strong> Do they document their work properly? Do they have quality control policies?</li></ul><li><strong>Limitation:</strong> You cannot use their work for high-risk areas or significant judgments without performing your own validation.</li></ul>"
  },
  {
    id: 292,
    title: "Direct Assistance (Internal Auditors as Team Members)",
    concept: "Instead of using their past work, the external auditor can ask internal auditors to work under their direction as if they were audit team members.",
    detail: "<ul><li><strong>Pre-conditions:</strong></li><ul><li>It must not be prohibited by law.</li><li>The internal auditor must be competent and objective.</li><li>The external auditor must direct, supervise, and review their work.</li></ul><li><strong>Restrictions:</strong> Internal auditors cannot be assigned to work on areas involving significant judgment, high risk of fraud, or work related to the internal audit function itself (self-review).</li></ul>"
  },
  {
    id: 293,
    title: "Responsibility of the External Auditor",
    concept: "Using internal auditors does NOT reduce the responsibility of the external auditor.",
    detail: "<ul><li><strong>Sole Responsibility:</strong> The audit opinion is solely the external auditor's responsibility. You cannot blame the internal auditor if something is missed.</li><li><strong>No Reference:</strong> The external auditor should not refer to the usage of internal audit in the audit report (unless required by law), as it might mislead users into thinking responsibility is shared.</li></ul>"
  },
  {
    id: 294,
    title: "Re-performance (Validation)",
    concept: "If the external auditor plans to rely on the work of the internal audit function, they must verify that work is reliable.",
    detail: "<ul><li><strong>Procedure:</strong> The external auditor must re-perform some of the tests carried out by the internal auditor to see if they reach the same conclusion.</li><li><strong>Documentation:</strong> Review their working papers to ensure evidence was gathered sufficient to support their findings.</li></ul>"
  },
  {
    id: 295,
    title: "Operational Compliance vs. Financial Audit",
    concept: "Internal audit often focuses on operational compliance (e.g., following SOPs), which may not be relevant to the external audit unless it impacts financial reporting.",
    detail: "<ul><li><strong>Relevance:</strong> The external auditor is only interested in internal audit work that relates to financial reporting controls and fraud detection. Work related to factory efficiency or environmental compliance might be irrelevant for the financial audit.</li></ul>"
  },
  {
    id: 296,
    title: "Qualification of Auditors (Who can Audit?)",
    concept: "The law strictly defines who is eligible to be appointed as an auditor based on the type of company.",
    detail: "<ul><li><strong>Public Companies & Private Companies (Capital ≥ 3 Million):</strong> Must be a Chartered Accountant (CA) having a valid Certificate of Practice.</li><li><strong>Private Companies (Capital < 3 Million):</strong> Can be a Chartered Accountant OR a Cost & Management Accountant (CMA) with a valid Certificate of Practice.</li><li><strong>Structure:</strong> The appointment must be in the name of the Firm, not an individual partner, though an engagement partner signs the report.</li></ul>"
  },
  {
    id: 297,
    title: "Disqualification of Auditors (The \"Negative List\")",
    concept: "A person is disqualified from being an auditor if they fall into specific categories affecting independence.",
    detail: "<ul><li><strong>Employees:</strong> A person who is (or was in the last 3 years) a director, officer, or employee of the company.</li><li><strong>Family:</strong> A person whose spouse or minor child holds shares in the company.</li><li><strong>Business Relationship:</strong> A person having a business relationship with the company (other than professional services).</li><li><strong>Guarantee:</strong> A person who has given a guarantee for the company's debt.</li><li><strong>Indebtedness:</strong> A person indebted to the company (e.g., taken a loan), other than in the ordinary course of business (like a credit card or utility bill).</li></ul>"
  },
  {
    id: 298,
    title: "Shareholding Rule (90 Days Grace Period)",
    concept: "Holding shares in a client company is a strict prohibition, but the law provides a window for correction upon appointment.",
    detail: "<ul><li><strong>The Rule:</strong> If an auditor (or their spouse/minor child) holds shares at the time of appointment, they must:</li><ul><li>Disclose the holding at the time of appointment.</li><li>Dispose of the shares within 90 days of appointment.</li></ul><li><strong>Failure:</strong> If they fail to dispose of the shares within 90 days, they effectively vacate the office of the auditor.</li></ul>"
  },
  {
    id: 299,
    title: "Appointment & Tenure (First vs. Subsequent)",
    concept: "The authority to appoint and the duration of the appointment differs for the first and subsequent auditors.",
    detail: "<ul><li><strong>First Auditor:</strong> Appointed by Directors within 90 days of incorporation. Holds office until the 1st AGM.</li><li><strong>Subsequent Auditor:</strong> Appointed by Members (Shareholders) at the AGM. Holds office from the conclusion of that AGM until the conclusion of the next AGM.</li><li><strong>Casual Vacancy:</strong> (e.g., Death or Disqualification) Filled by Directors within 30 days.</li></ul>"
  },
  {
    id: 300,
    title: "Removal of Auditor (Mid-Tenure)",
    concept: "Removing an auditor before their term ends is a serious matter and requires regulatory approval to protect auditor independence.",
    detail: "<ul><li><strong>Requirement:</strong> Requires a Special Resolution by shareholders AND approval from the SECP (Commission).</li><li><strong>Objective:</strong> To prevent management from firing auditors simply because the auditor refused to sign off on fraudulent accounts.</li></ul>"
  },
  {
    id: 301,
    title: "Representation Rights",
    concept: "A retiring auditor has the right to defend themselves if they are being replaced.",
    detail: "<ul><li><strong>Right:</strong> The auditor can make a written Representation to the company.</li><li><strong>Duty of Company:</strong> The company must send this representation to all members/shareholders before the AGM. If sent late, it must be read out loud at the AGM.</li><li><strong>Purpose:</strong> To ensure shareholders know the real reason the auditor is being changed (e.g., disagreements over accounting policies).</li></ul>"
  },
  {
    id: 302,
    title: "Indebtedness (Loans)",
    concept: "Owning money to a client destroys independence.",
    detail: "<ul><li><strong>Direct Rule:</strong> If the auditor owes money to the client, they are disqualified.</li><li><strong>Exception:</strong> Indebtedness in the ordinary course of business (e.g., an auditor having a credit card from a client bank or a loan from a client bank on standard market terms) is allowed, provided it is not \"preferential.\"</li></ul>"
  },
  {
    id: 303,
    title: "Change of Auditor (Notice Requirements)",
    concept: "If a member wants to propose a new auditor, they must show significant voting power and follow strict timelines.",
    detail: "<ul><li><strong>Proposer:</strong> Only a member having at least 10% shareholding can propose a new auditor.</li><li><strong>Notice:</strong> Notice must be sent to the company at least 7 days before the AGM.</li><li><strong>Company Action:</strong> The company must send a copy of this notice to the retiring auditor and post it on its website/notify members.</li></ul>"
  },
  {
    id: 304,
    title: "Restricted Services (Code of Ethics vs. Law)",
    concept: "Auditors are prohibited from providing certain non-audit services to their audit clients to prevent \"Self-Review Threats.\"",
    detail: "<ul><li><strong>Examples:</strong> An auditor cannot provide accounting services, internal audit services, or design financial information systems for their audit client.</li><li><strong>Impact:</strong> If an auditor provides these, they are deemed to lack independence and cannot perform the external audit.</li></ul>"
  },
  {
    id: 305,
    title: "Manual vs. Automated Controls",
    concept: "Auditors encounter two types of controls. Automated controls are generally more reliable as they eliminate human error, provided IT General Controls (ITGCs) are strong.",
    detail: "<ul><li><strong>Manual Controls:</strong> rely on human intervention.</li><ul><li><strong>Example:</strong> A manager physically stamping \"PAID\" on an invoice to prevent duplicate payment.</li></ul><li><strong>Automated Controls:</strong> Embedded in the software logic.</li><ul><li><strong>Example (Vendor Management System):</strong> The system automatically performs a \"Three-Way Match\" (Purchase Order + Goods Received Note + Invoice) before allowing payment. If they don't match, the system blocks the payment without human help.</li></ul></ul>"
  },
  {
    id: 306,
    title: "IT General Controls (ITGC) vs. Application Controls",
    concept: "It is vital to distinguish between controls that affect the whole environment and those that affect specific transactions.",
    detail: "<ul><li><strong>IT General Controls (The Umbrella):</strong> Policies and procedures that relate to many applications and support the effective functioning of application controls.</li><ul><li><strong>Examples:</strong> Passwords, Physical Security of the Server Room, Data Backups, Disaster Recovery Plans.</li></ul><li><strong>Application Controls:</strong> Controls within a specific software (e.g., Payroll or Sales) to ensure the integrity of accounting records.</li><ul><li><strong>Examples:</strong> Input validation (ensuring Tax ID is a number), Limit checks (Salary cannot exceed $10k), Sequence checks.</li></ul></ul>"
  },
  {
    id: 307,
    title: "Master File vs. Transaction File",
    concept: "Understanding data structure is essential for testing data integrity.",
    detail: "<ul><li><strong>Master File:</strong> Contains permanent or semi-permanent data that rarely changes.</li><ul><li><strong>Example:</strong> Employee Name, Date of Birth, Salary Rate, Vendor Bank Details.</li></ul><li><strong>Transaction File:</strong> Contains temporary data related to specific events that occur frequently.</li><ul><li><strong>Example:</strong> Hours worked this month, Items purchased today.</li></ul><li><strong>Audit Risk:</strong> Unauthorized changes to the Master File (e.g., changing a vendor's bank account number to a fraudster's account) are a significant fraud risk.</li></ul>"
  },
  {
    id: 308,
    title: "Batch Processing vs. Real-Time Processing (OLRT)",
    concept: "The timing of data processing affects how auditors test cut-off and occurrence.",
    detail: "<ul><li><strong>Batch Processing:</strong> Transactions are grouped and processed together at a specific time (e.g., Payroll processed at month-end).</li><ul><li><strong>Control:</strong> \"Batch Totals\" (Sum of all salaries) are checked before and after processing to ensure no data was lost.</li></ul><li><strong>Online Real-Time (OLRT):</strong> Transactions are processed immediately as they occur (e.g., Airline booking or Bank transfer).</li><ul><li><strong>Control:</strong> Immediate confirmation and locking of inventory/seats to prevent double booking.</li></ul></ul>"
  },
  {
    id: 309,
    title: "Computer Assisted Audit Techniques (CAATs)",
    concept: "When systems are complex or data volumes are huge, manual testing is impossible. Auditors use CAATs.",
    detail: "<ul><li><strong>Audit Software:</strong> The auditor uses their own software to analyze client data.</li><ul><li><strong>Uses:</strong> Re-calculating interest, extracting samples (e.g., all invoices > $10k), identifying gaps in sequence.</li></ul><li><strong>Test Data:</strong> The auditor enters \"fake\" data into the client's live system to see if the system reacts correctly.</li><ul><li><strong>Example:</strong> Entering a sale for a customer over their credit limit. If the system accepts it, the control is weak. If it blocks it, the control is strong.</li></ul></ul>"
  },
  {
    id: 310,
    title: "System Development Life Cycle (SDLC) & Change Management",
    concept: "How new systems are created or modified is a key ITGC.",
    detail: "<ul><li><strong>Segregation of Environments:</strong></li><ul><li><strong>Development:</strong> Where code is written.</li><li><strong>Testing:</strong> Where the code is verified (UAT - User Acceptance Testing).</li><li><strong>Live/Production:</strong> The real system used for business.</li></ul><li><strong>Control:</strong> Programmers should never have access to the Live environment. Only authorized administrators should migrate tested code to Live. This prevents unauthorized changes/fraud.</li></ul>"
  },
  {
    id: 311,
    title: "Logical Access Controls",
    concept: "Preventing unauthorized access to the system via software means.",
    detail: "<ul><li><strong>User Identification:</strong> Unique User IDs (no shared accounts).</li><li><strong>Authentication:</strong> Strong passwords (alphanumeric, periodic change required) or Biometrics.</li><li><strong>Authorization:</strong> Access rights based on job role (e.g., A Junior Accountant can view invoices but cannot approve payments).</li></ul>"
  },
  {
    id: 312,
    title: "Physical Access Controls",
    concept: "Protecting the physical hardware (Servers) is just as important as protecting the software.",
    detail: "<ul><li><strong>Risks:</strong> Theft of hard drives, environmental damage (fire/water), or physical sabotage.</li><li><strong>Controls:</strong> Locked server rooms, swipe card access logs, CCTV monitoring, fire suppression systems (gas-based to avoid water damage), and air conditioning (to prevent overheating).</li></ul>"
  },
  {
    id: 313,
    title: "Backups and Disaster Recovery",
    concept: "Ensuring the business can continue (Going Concern) after a system failure.",
    detail: "<ul><li><strong>Backup Policy:</strong> How often is data saved? (Daily/Weekly).</li><li><strong>Storage:</strong> Backups must be stored Off-Site (in a different location or cloud) so that a fire at the office doesn't destroy both the original data and the backup.</li><li><strong>Testing:</strong> Periodic \"Restore Tests\" must be performed to prove that the backup data can actually be recovered and used.</li></ul>"
  },
  {
    id: 314,
    title: "Distributed Data Processing (DDP)",
    concept: "When data is processed across multiple locations (e.g., branches) rather than one central mainframe.",
    detail: "<ul><li><strong>Advantage:</strong> Redundancy (if one branch fails, others work).</li><li><strong>Risk:</strong> Inconsistent data versions, difficult to secure all locations, data synchronization errors.</li><li><strong>Audit Focus:</strong> ensuring data transmission controls (Encryption) are strong between nodes.</li></ul>"
  },
  {
    id: 315,
    title: "Definition & Need for an Auditor's Expert",
    concept: "An auditor is an expert in accounting and auditing, not in other fields like engineering or law. If audit evidence depends on such fields, an expert is required.",
    detail: "<ul><li><strong>Scope:</strong> Used when expertise in a field other than accounting or auditing is necessary to obtain sufficient appropriate audit evidence.</li><li><strong>Examples:</strong></li><ul><li><strong>Valuation:</strong> Land, buildings, complex financial instruments.</li><li><strong>Actuarial:</strong> Pension liabilities, insurance claims (IBNR).</li><li><strong>Legal:</strong> Outcome of lawsuits or tax disputes.</li><li><strong>Engineering:</strong> Measuring oil reserves or completion of construction projects.</li></ul></ul>"
  },
  {
    id: 316,
    title: "Sole Responsibility of the Auditor",
    concept: "Using an expert does NOT reduce the auditor's responsibility for the audit opinion.",
    detail: "<ul><li><strong>The Rule:</strong> The expert is a source of audit evidence, just like a bank confirmation. The final conclusion and opinion belong solely to the auditor.</li><li><strong>Implication:</strong> If the expert makes a mistake and the auditor relies on it without proper checking, the auditor is liable for the wrong opinion.</li></ul>"
  },
  {
    id: 317,
    title: "Evaluation of the Expert (CCO Criteria)",
    concept: "Before engaging an expert, the auditor must evaluate three key attributes: Competence, Capability, and Objectivity.",
    detail: "<ul><li><strong>Competence:</strong> Does the expert have the necessary knowledge and qualifications? (e.g., Member of Actuarial Society, Licensed Valuer).</li><li><strong>Capability:</strong> Can they apply that knowledge in the specific circumstances? (e.g., Do they have the time, resources, and practical experience?).</li><li><strong>Objectivity:</strong> Are they independent? The auditor must check for conflicts of interest (e.g., financial interest in the client, family ties).</li></ul>"
  },
  {
    id: 318,
    title: "Understanding the Expert's Field",
    concept: "The auditor does not need to be an expert in the field, but must possess enough understanding to evaluate the expert's work.",
    detail: "<ul><li><strong>Requirement:</strong> The auditor must understand:</li><ul><li>The methods and assumptions used (e.g., Cost method vs. Income method for valuation).</li><li>The nature of internal/external data used.</li><li>Relevant industry standards (e.g., Insurance Rules).</li></ul><li><strong>Why:</strong> To determine if the expert's findings are reasonable and consistent with other audit evidence.</li></ul>"
  },
  {
    id: 319,
    title: "The Agreement (Engagement Letter with Expert)",
    concept: "There must be a written agreement between the auditor and the auditor's expert to avoid misunderstandings.",
    detail: "<ul><li><strong>Key Contents:</strong></li><ul><li>Nature, Scope, and Objectives of the expert's work.</li><li>Roles and Responsibilities (Who does detailed testing? Who checks source data?).</li><li>Confidentiality Requirements (The expert must not leak client data).</li><li>Form of Report (What output is expected and when?).</li></ul></ul>"
  },
  {
    id: 320,
    title: "Evaluating the Adequacy of the Expert's Work",
    concept: "The auditor cannot blindly accept the expert's report. They must perform specific procedures to verify it.",
    detail: "<ul><li><strong>Source Data:</strong> Verify the accuracy and completeness of data provided to the expert (e.g., sending an inaccurate list of employees to an actuary results in a wrong pension valuation).</li><li><strong>Assumptions:</strong> Evaluate if the assumptions (e.g., discount rates, growth rates) are reasonable and realistic.</li><li><strong>Consistency:</strong> Check if the expert's findings contradict other audit evidence (e.g., Expert says \"Property value up 50%\" but market data shows a crash).</li></ul>"
  },
];