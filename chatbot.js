// ======================
// PREMIUM ESG KNOWLEDGE BASE
// ======================
const esgKnowledgeBase = [
  // 1. CARBON ACCOUNTING GUIDE
  {
    question: "carbon accounting",
    answer: `## Comprehensive Carbon Accounting Guide

**What is it?**  
Systematic measurement of GHG emissions across Scopes 1-3 using standards like GHG Protocol.

**Why it matters:**  
- Avoids 20-30% reporting errors common in ESG disclosures  
- Identifies $2M+ annual cost savings opportunities (Energy Star)  

**Step-by-Step Implementation:**  
1. **Scope 1 (Direct Emissions)**  
   - Track fuel use (diesel, gasoline) → Multiply by EPA emission factors  
   - Example: 50,000L diesel × 2.68kg CO2/L = 134,000kg CO2e  

2. **Scope 2 (Purchased Energy)**  
   - Collect electricity bills → Multiply by local grid factor  
   - *Pro Tip:* Use [EPA Power Profiler](https://www.epa.gov/energy/power-profiler#/) for regional factors  

3. **Scope 3 (Value Chain)**  
   - Use spend data × industry-specific factors (EIO-LCA database)  
   - Critical categories: Business travel, purchased goods, waste  

**Tools:**  
- [GHG Protocol Calculator](https://ghgprotocol.org/calculation-tools)  
- [SBTi FLAG Guidance](https://sciencebasedtargets.org/resources/files/FLAG-Guidance.pdf)`
  },

  // 2. SCIENCE-BASED TARGETS (SBTi)  
  {
    question: "science-based target setting",
    answer: `## Science-Based Target (SBTi) Implementation  

**What is it?**  
Targets aligned with Paris Agreement to limit warming to 1.5°C, validated by SBTi.  

**Why it matters:**  
- 75% of investors now require SBTi-validated targets (Bloomberg 2023)  
- Reduces regulatory risk in EU/California  

**5-Step Setup:**  
1. **Baseline Year**  
   - Choose 2018-2022 as reference (must include Scope 3)  

2. **Boundary Setting**  
   - Include ≥67% of Scope 3 emissions (per SBTi criteria)  

3. **Target Types**  
   - Absolute reduction (e.g., 42% by 2030)  
   - Sector-specific (e.g., cement: 24% per ton)  

4. **Validation**  
   - Submit to SBTi ($4,800-$14,500 fee based on revenue)  

5. **Disclosure**  
   - Required in CDP, annual reports  

**Pro Tip:** Use the [SBTi Target Dashboard](https://sciencebasedtargets.org/target-dashboard) for sector benchmarks`
  },

  // 3. CSRD COMPLIANCE  
  {
    question: "CSRD compliance",
    answer: `## CSRD Compliance Checklist (2024)  

**What is it?**  
EU Corporate Sustainability Reporting Directive requiring double materiality assessments.  

**Why it matters:**  
- Mandatory for all large EU companies + non-EU with €150M+ EU revenue  
- $50k+ fines for non-compliance  

**Critical Requirements:**  
1. **Double Materiality**  
   - Map financial AND impact materiality (use [GRI Standards](https://www.globalreporting.org/))  

2. **ESRS Reporting**  
   - 12 European Sustainability Reporting Standards  
   - Must include Scope 3 GHG, diversity metrics  

3. **Audit Requirement**  
   - Limited assurance (2024) → Reasonable assurance (2028)  

**Pro Tip:** Start with cross-mapping SASB/GRI to ESRS using [EFRAG's Implementation Guide](https://www.efrag.org/)`
  },

  // 4. ESG DATA COLLECTION  
  {
    question: "ESG data collection",
    answer: `## ESG Data Collection Plan  

**What is it?**  
System to gather quantitative/qualitative ESG metrics across operations.  

**Why it matters:**  
- Reduces audit findings by 40% (PwC 2023)  
- Enables AI-driven analytics like your Aioxy scanner  

**7-Step Framework:**  
1. **Materiality Matrix** → Prioritize 15-20 KPIs  
2. **Automated Feeds**  
   - Energy: Connect utility APIs (e.g., [Urjanet](https://urjanet.com/))  
   - Travel: Export credit card spend data  
3. **Manual Inputs**  
   - Supplier surveys (use [EcoVadis template](https://ecovadis.com/))  
4. **Validation**  
   - 3rd-party verification for critical data  

**Tool Stack:**  
- **Software:** Workiva, Salesforce Net Zero Cloud  
- **Free Tools:** [CDP Reporting Templates](https://www.cdp.net/en/guidance)`
  },

  // 5. SUPPLY CHAIN EMISSIONS  
  {
    question: "supply chain emissions",
    answer: `## Supply Chain Emissions Mapping  

**What is it?**  
Calculating Scope 3 Category 1 (Purchased Goods/Services) emissions.  

**Why it matters:**  
- Often 80% of total carbon footprint  
- Now required by SEC Climate Rules  

**Methodology:**  
1. **Spend-Based** (Best for starters)  
   - Formula: $1M procurement × 0.5kg CO2/$ (industry factor)  
2. **Supplier-Specific** (Gold standard)  
   - Require primary data via [CDP Supply Chain](https://www.cdp.net/en/supply-chain)  

**Pro Tip:** Start with top 20 suppliers (Pareto principle) → Expand annually`
  },

  // 6. ESG AUDIT PREP  
  {
    question: "ESG audit preparation",
    answer: `## ESG Audit Readiness Guide  

**What is it?**  
Process to ensure compliance with frameworks like GRI/SASB.  

**Why it matters:**  
- 68% of companies fail first ESG audit (KPMG 2023)  

**Checklist:**  
1. **Pre-Audit**  
   - Conduct mock audit using [SASB Materiality Map](https://materiality.sasb.org/)  
2. **Documentation**  
   - Collect 12 months of utility bills, supplier contracts  
3. **Interviews**  
   - Train staff on common auditor questions  

**Red Flags to Fix:**  
- Missing Scope 3 data  
- Unverified renewable energy claims`
  },

  // 7. BIODIVERSITY RISK  
  {
    question: "biodiversity risk",
    answer: `## Biodiversity Risk Assessment  

**What is it?**  
Evaluating operational impacts on ecosystems using TNFD/CSRD frameworks.  

**Why it matters?**  
- New EU rules mandate biodiversity disclosures (2025)  
- 44% of economies depend on nature (WEF)  

**4-Step Process:**  
1. **Locate Facilities** → Map to [IBAT Protected Areas](https://www.ibat-alliance.org/)  
2. **Material Risks**  
   - Water scarcity (use [WRI Aqueduct](https://www.wri.org/aqueduct))  
   - Deforestation (source timber via [FSC](https://fsc.org/))  
3. **Mitigation**  
   - Science-based targets for nature (TNFD guidance)  

**Tool:** [ENCORE Biodiversity Module](https://encore.naturalcapital.org/)`
  },

  // 8. DOUBLE MATERIALITY  
  {
    question: "double materiality",
    answer: `## Double Materiality Case Example  

**What is it?**  
CSRD requirement to assess both:  
1. **Financial Materiality** (How ESG affects business)  
2. **Impact Materiality** (How business affects society)  

**Example: Apparel Company**  
- **Financial Risk:** Cotton price volatility from droughts ($20M/yr exposure)  
- **Impact Risk:** Water pollution affecting local communities  

**How to Implement:**  
1. **Stakeholder Workshops** → Identify top 10 issues  
2. **Heat Mapping** → Use [SASB Materiality Tool](https://materiality.sasb.org/)  
3. **Quantify** → Monetize risks via [Natural Capital Protocol](https://naturalcapitalcoalition.org/)`
  },

  // 9. SUPPLIER ESG ENGAGEMENT  
  {
    question: "supplier ESG engagement",
    answer: `## Supplier ESG Engagement Plan  

**What is it?**  
Program to improve suppliers' ESG performance.  

**Why it matters?**  
- Reduces Scope 3 emissions by 30% (CDP data)  
- Meets CSRD/SEC requirements  

**5-Step Framework:**  
1. **Assess** → Send [EcoVadis questionnaire](https://ecovadis.com/)  
2. **Score** → Rate suppliers A-F on GHG, labor, ethics  
3. **Improve** → Co-fund solar panels for key suppliers  
4. **Monitor** → Annual re-assessments  
5. **Exit** → Replace chronic underperformers  

**Pro Tip:** Start with 20% of suppliers generating 80% of risk`
  },

  // 10. NET ZERO ROADMAP  
  {
    question: "net zero roadmap",
    answer: `## Corporate Net Zero Roadmap  

**What is it?**  
Plan to achieve balance between emissions produced/removed by 2050.  

**Why it matters?**  
- Required for SBTi certification  
- 60% of Fortune 500 now have targets  

**Key Phases:**  
1. **Near-Term (2025-2030)**  
   - 50% emission reduction via renewables, efficiency  
2. **Long-Term (2040-2050)**  
   - Carbon removal (DAC, reforestation)  
3. **Compensation**  
   - Only for residual emissions (max 10%)  

**Must-Include Elements:**  
- Scope 3 action plan  
- Just Transition strategy for workers  
- Annual progress reporting`
  }
];

// ======================
// COMPANY DATA INTEGRATION
// ======================
async function loadCompanyData(companyName) {
  try {
    const normalizedName = companyName.toLowerCase().replace(/\s+/g, '');
    const module = await import(`./companies/${normalizedName}.js`);
    return module.default;
  } catch {
    return null; 
  }
}

// ======================
// ANSWER GENERATOR
// ======================
async function getAnswer(userQuestion) {
  // 1. Check for company-specific questions
  const companies = ['apple', 'tesla', 'unilever'];
  const company = companies.find(c => userQuestion.toLowerCase().includes(c));
  
  if (company) {
    const data = await loadCompanyData(company);
    if (data) {
      return `
        <div class="company-response">
          <h3>${data.name} ESG Report</h3>
          <div class="company-score">${data.score}/100</div>
          <p><strong>Key Risk:</strong> ${data.leaks[0].issue}</p>
          <p><strong>Solution:</strong> ${data.leaks[0].solution}</p>
          <a href="${data.leaks[0].source.url}" target="_blank">Source</a>
        </div>
      `;
    }
  }
  
  // 2. General ESG questions
  const q = esgKnowledgeBase.find(item => 
    userQuestion.toLowerCase().includes(item.question.toLowerCase()));
  
  return q?.answer || `I specialize in:  
  - Carbon accounting  
  - CSRD compliance  
  - ESG audits  
  Try: "Explain ${userQuestion}"`;
}
