// ====== ESG MASTER KNOWLEDGE BASE ======
const esgQA = {
  // 1. CARBON MANAGEMENT (8 KEY QUESTIONS)
  "scope 1 emissions": {
    answer: `<strong>Direct Emissions (Scope 1)</strong><br><br>
            🔥 <u>What counts</u>:<br>
            • On-site fuel combustion (boilers, furnaces)<br>
            • Company vehicles (gasoline/diesel)<br>
            • Fugitive emissions (AC leaks, methane)<br><br>
            
            📝 <u>Calculation Method</u>:<br>
            1. Collect fuel purchase records<br>
            2. Apply emission factors (EPA GHG Database)<br>
            3. Exclude biomass CO2<br><br>
            
            🏭 <u>Reduction Tactics</u>:<br>
            • Electrification of fleet<br>
            • Leak detection systems<br>
            • EPA's ENERGY STAR guidelines`,
    sources: ["EPA Scope 1 Guidance", "GHG Protocol Chapter 4"]
  },

  "scope 2 emissions": {
    answer: `<strong>Energy Indirect (Scope 2)</strong><br><br>
            ⚡ <u>Two Calculation Methods</u>:<br>
            1. <b>Location-based</b>: Grid average emission factor<br>
            2. <b>Market-based</b>: Supplier-specific contracts<br><br>
            
            📊 <u>Data Needed</u>:<br>
            • Electricity bills (kWh)<br>
            • Renewable Energy Certificates (RECs)<br>
            • PPAs documentation<br><br>
            
            💡 <u>Pro Tip</u>:<br>
            Report BOTH methods per GHG Protocol`,
    sources: ["GHG Protocol Scope 2 Guidance", "CDP Reporting Handbook"]
  },

  "scope 3 emissions": {
    answer: `<strong>Value Chain Emissions (Scope 3)</strong><br><br>
            🚛 <u>Top 3 High-Impact Categories</u>:<br>
            1. <b>Purchased Goods</b> (40-80% of total)<br>
            2. <b>Capital Goods</b> (manufacturing equipment)<br>
            3. <b>Use of Sold Products</b> (especially autos, electronics)<br><br>
            
            🔍 <u>Calculation Approaches</u>:<br>
            • Spend-based ($$ × industry EF)<br>
            • Average-data (units × kgCO2e/unit)<br>
            • Supplier-specific (gold standard)<br><br>
            
            🛠️ <u>Tool</u>: <a href="https://ghgprotocol.org/scope-3-calculator" target="_blank">GHG Protocol Scope 3 Calculator</a>`,
    sources: ["Science-Based Targets Scope 3 Manual", "CDP Supply Chain Program"]
  },

  // 2. ESG REPORTING (6 KEY QUESTIONS)
  "esg reporting frameworks": {
    answer: `<strong>Framework Selection Guide</strong><br><br>
            🏛️ <u>Regulatory</u>:<br>
            • CSRD (EU)<br>
            • SEC Climate Rules (US)<br><br>
            
            📈 <u>Investor-Grade</u>:<br>
            • SASB (industry-specific)<br>
            • TCFD (climate risk)<br><br>
            
            🌍 <u>Impact-Focused</u>:<br>
            • GRI (stakeholder view)<br>
            • CDP (environmental deep-dive)<br><br>
            
            💡 <u>Strategic Tip</u>:<br>
            Start with SASB + GRI combo for 80% coverage`,
    sources: ["SASB Materiality Finder", "GRI Standards Download"]
  },

  "double materiality assessment": {
    answer: `<strong>Double Materiality in 3 Steps</strong><br><br>
            1. <b>Inside-Out Analysis</b>:<br>
            • How operations impact world (GRI approach)<br><br>
            
            2. <b>Outside-In Analysis</b>:<br>
            • How ESG trends impact finances (SASB approach)<br><br>
            
            3. <b>Prioritization Matrix</b>:<br>
            • X-axis: Financial significance<br>
            • Y-axis: Stakeholder concern<br><br>
            
            🛠️ <u>Tool</u>: <a href="https://www.sasb.org/materiality-finder/" target="_blank">SASB Materiality Finder</a>`,
    sources: ["EU ESRS Implementation Guide", "GRI Materiality Disclosures"]
  },

  // 3. SUPPLY CHAIN (5 KEY QUESTIONS)
  "supply chain due diligence": {
    answer: `<strong>5-Step Supply Chain Audit</strong><br><br>
            1. <b>Map Tier 1-3 Suppliers</b>:<br>
            • Use platforms like EcoVadis or Sedex<br><br>
            
            2. <b>Risk Screening</b>:<br>
            • Modern slavery (Walk Free Index)<br>
            • Deforestation (Global Forest Watch)<br><br>
            
            3. <b>On-Site Assessments</b>:<br>
            • SMETA audits for labor<br>
            • RSPO for palm oil<br><br>
            
            4. <b>Corrective Action Plans</b><br>
            5. <b>Public Disclosure</b> (per CSRD)`,
    sources: ["UNGP Reporting Framework", "OECD Due Diligence Guidance"]
  },

  // 4. CLIMATE RISK (4 KEY QUESTIONS)
  "transition risk assessment": {
    answer: `<strong>Climate Transition Risks</strong><br><br>
            💸 <u>Financial Impacts</u>:<br>
            • Carbon pricing ($50-100/ton by 2030)<br>
            • Stranded assets (fossil reserves)<br><br>
            
            📉 <u>Scenario Analysis</u>:<br>
            1. IEA Net Zero Scenario<br>
            2. IPCC RCP 4.5<br>
            3. Hot House World (>3°C)<br><br>
            
            🛡️ <u>Mitigation</u>:<br>
            • TCFD-aligned disclosure<br>
            • Science-based targets`,
    sources: ["TCFD Implementation Guide", "SASB Climate Risk Standard"]
  },

  // 5. SOCIAL (6 KEY QUESTIONS)
  "human rights due diligence": {
    answer: `<strong>UNGP Compliance Checklist</strong><br><br>
            1. <b>Policy Commitment</b>:<br>
            • Public human rights policy<br><br>
            
            2. <b>Impact Assessment</b>:<br>
            • Focus on high-risk operations<br><br>
            
            3. <b>Integration</b>:<br>
            • Contract clauses with suppliers<br><br>
            
            4. <b>Tracking</b>:<br>
            • GRTI benchmark performance<br><br>
            
            5. <b>Remediation</b>:<br>
            • Operational grievance mechanisms`,
    sources: ["UNGPs Reporting Framework", "KnowTheChain Benchmark"]
  },

  // 6. GOVERNANCE (4 KEY QUESTIONS)
  "esg board oversight": {
    answer: `<strong>Best Practices for Boards</strong><br><br>
            👔 <u>Committee Structure</u>:<br>
            • Dedicated ESG committee (40% of S&P 500)<br>
            • Combined with audit/risk (emerging option)<br><br>
            
            📊 <u>Metrics to Monitor</u>:<br>
            • Carbon intensity (tons CO2e/$M revenue)<br>
            • Pay equity ratios<br>
            • Ethics hotline reports<br><br>
            
            🎯 <u>Linking to Compensation</u>:<br>
            • 30% of Fortune 500 now include ESG metrics`,
    sources: ["WEF Stakeholder Capitalism Metrics", "ISS ESG Governance Guide"]
  },

  // 7. INVESTOR RELATIONS (3 KEY QUESTIONS)
  "esg investor questions": {
    answer: `<strong>Top 5 Investor ESG Queries</strong><br><br>
            1. "What's your Scope 3 roadmap?"<br>
            2. "How are you preparing for CSRD?"<br>
            3. "Show pay equity metrics"<br>
            4. "Climate scenario analysis results"<br>
            5. "Supply chain audit coverage"<br><br>
            
            💡 <u>Response Strategy</u>:<br>
            • Prepare SASB-aligned Q&A deck<br>
            • Disclose via Bloomberg ESG terminal`,
    sources: ["SASB Investor Guide", "BlackRock ESG Engagement Reports"]
  },

  // 8. EMERGING TOPICS (3 KEY QUESTIONS)
  "biodiversity reporting": {
    answer: `<strong>TNFD Implementation Guide</strong><br><br>
            🌳 <u>Core Requirements</u>:<br>
            • Location-specific impact assessments<br>
            • DEFRA biodiversity metric<br>
            • SBTN nature targets (pilot phase)<br><br>
            
            📈 <u>Financial Risks</u>:<br>
            • Agricultural supply chain disruption<br>
            • Pharma genetic resource access<br><br>
            
            🛠️ <u>Tool</u>: <a href="https://tnfd.global/" target="_blank">TNFD Beta Framework</a>`,
    sources: ["TNFD Beta Framework v0.4", "SBTN Initial Guidance"]
  }
  // Add more as needed...
};

// ====== UNIFIED ANSWER SYSTEM ====== 
async function getAnswer(question) {
  const q = question.toLowerCase();
  
  // 1. Check for company data
  const companyMatch = q.match(/(apple|tesla|nike|nestle|unilever)/i);
  if (companyMatch) {
    const company = companyMatch[0].toLowerCase();
    try {
      const data = await import(`./companies/${company}.js`);
      return {
        answer: `<strong>${data.default.name} ESG Intelligence</strong><br><br>
                📈 <u>Score</u>: ${data.default.score}/100<br>
                🔍 <u>Top Risk</u>: ${data.default.leaks[0].issue}<br>
                💰 <u>Financial Impact</u>: ${data.default.leaks[0].impact}<br><br>
                <button onclick="showFullReport('${company}')" 
                        style="background:var(--premium-accent); color:white; border:none; padding:8px 16px; border-radius:6px; cursor:pointer; font-size:0.9rem;">
                  <i class="fas fa-download"></i> Full Report
                </button>`,
        sources: ["Snapfizz AI Analysis"]
      };
    } catch {
      return { 
        answer: `Ask specifically about ${company}'s:<br><br>
                • Carbon emissions (Scope 1-3)<br>
                • Latest ESG controversies<br>
                • Peer benchmarking` 
      };
    }
  }
  
  // 2. General ESG questions
  for (const [keyword, data] of Object.entries(esgQA)) {
    if (q.includes(keyword)) return data;
  }
  
  // 3. Default fallback
  return {
    answer: `<strong>Try these expert queries:</strong><br><br>
            • "Scope 3 calculation methodology"<br>
            • "CSRD compliance checklist"<br>
            • "How to set SBTi targets"<br>
            • "Apple vs Tesla ESG comparison"`,
    sources: []
  };
    }
