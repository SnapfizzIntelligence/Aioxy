// ======================
// BREAKTHROUGH KNOWLEDGE BASE
// ======================
const esgKnowledgeBase = [
  // 1. CARBON ACCOUNTING (FLAGSHIP FEATURE)
  {
    question: "carbon accounting",
    answer: `<div class="guide-response">
      <h3>Complete Carbon Accounting Guide</h3>
      
      <p><strong>What is it?</strong><br>
      The process of measuring greenhouse gas emissions (Scopes 1-3) following GHG Protocol standards.</p>
      
      <p><strong>Why this matters:</strong></p>
      <ul>
        <li>Prevents 20-30% reporting errors found in ESG disclosures</li>
        <li>Identifies $2M+ annual cost savings (Energy Star data)</li>
      </ul>
      
      <p><strong>Step-by-Step Implementation:</strong></p>
      <ol>
        <li><strong>Scope 1 (Direct Emissions)</strong><br>
        - Track diesel/gasoline use<br>
        - Multiply by EPA factors: <em>50,000L diesel × 2.68kg CO2/L = 134,000kg CO2e</em></li>
        
        <li><strong>Scope 2 (Purchased Energy)</strong><br>
        - Collect electricity bills<br>
        - Apply local grid emission factor (<a href="https://www.epa.gov/energy/power-profiler" target="_blank">EPA Power Profiler</a>)</li>
        
        <li><strong>Scope 3 (Value Chain)</strong><br>
        - Use procurement spend data × industry factors<br>
        - Focus areas: Business travel, purchased goods</li>
      </ol>
      
      <p><strong>Recommended Tools:</strong><br>
      - <a href="https://ghgprotocol.org/calculation-tools" target="_blank">GHG Protocol Calculator</a><br>
      - SBTi FLAG Guidance</p>
    </div>`
  },

  // 2. SCIENCE-BASED TARGETS (SBTi)
  {
    question: "science-based target setting",
    answer: `<div class="guide-response">
      <h3>Science-Based Targets (SBTi) Master Guide</h3>
      
      <p><strong>What is it?</strong><br>
      Emissions reduction targets aligned with keeping global warming to 1.5°C, validated by SBTi.</p>
      
      <p><strong>Business Impact:</strong></p>
      <ul>
        <li>75% of investors now require SBTi-validated targets (Bloomberg 2023)</li>
        <li>Reduces regulatory risk in EU/California markets</li>
      </ul>
      
      <p><strong>Implementation Roadmap:</strong></p>
      <ol>
        <li><strong>Baseline Year Selection</strong><br>
        - Use 2018-2022 data (must include Scope 3)</li>
        
        <li><strong>Boundary Setting</strong><br>
        - Cover ≥67% of Scope 3 emissions</li>
        
        <li><strong>Target Types</strong><br>
        - Absolute reduction (e.g., 42% by 2030)<br>
        - Sector-specific (e.g., 24% per ton for cement)</li>
        
        <li><strong>Validation Process</strong><br>
        - Submit to SBTi ($4,800-$14,500 fee)</li>
      </ol>
      
      <p><strong>Pro Tip:</strong> Use the <a href="https://sciencebasedtargets.org/target-dashboard" target="_blank">SBTi Target Dashboard</a> for sector benchmarks.</p>
    </div>`
  },

  // 3. CSRD COMPLIANCE
  {
    question: "CSRD compliance",
    answer: `<div class="guide-response">
      <h3>CSRD Compliance Checklist (2024)</h3>
      
      <p><strong>New EU Requirements:</strong><br>
      Mandatory double materiality assessments and detailed ESG reporting.</p>
      
      <p><strong>Critical Risks:</strong></p>
      <ul>
        <li>$50k+ fines for non-compliance</li>
        <li>Required for EU companies + non-EU with €150M+ EU revenue</li>
      </ul>
      
      <p><strong>Action Plan:</strong></p>
      <ol>
        <li><strong>Double Materiality Assessment</strong><br>
        - Map financial AND impact materiality<br>
        - Use <a href="https://www.globalreporting.org/" target="_blank">GRI Standards</a></li>
        
        <li><strong>ESRS Reporting</strong><br>
        - 12 European Sustainability Reporting Standards<br>
        - Must include Scope 3 GHG, diversity metrics</li>
        
        <li><strong>Audit Preparation</strong><br>
        - Limited assurance (2024) → Reasonable assurance (2028)</li>
      </ol>
      
      <p><strong>Resource:</strong> <a href="https://www.efrag.org/" target="_blank">EFRAG Implementation Guide</a></p>
    </div>`
  },

  // 4. ESG DATA COLLECTION
  {
    question: "ESG data collection",
    answer: `<div class="guide-response">
      <h3>ESG Data Collection System</h3>
      
      <p><strong>Best Practice Framework:</strong><br>
      Automated and manual processes to gather 15-20 material KPIs.</p>
      
      <p><strong>Why This Matters:</strong></p>
      <ul>
        <li>Reduces audit findings by 40% (PwC 2023)</li>
        <li>Enables AI-driven analytics like Aioxy's scanner</li>
      </ul>
      
      <p><strong>7-Step Implementation:</strong></p>
      <ol>
        <li><strong>Materiality Matrix</strong><br>
        - Prioritize top ESG issues</li>
        
        <li><strong>Automated Feeds</strong><br>
        - Energy: <a href="https://urjanet.com/" target="_blank">Urjanet</a> for utility APIs<br>
        - Travel: Credit card spend data</li>
        
        <li><strong>Manual Inputs</strong><br>
        - Supplier surveys (<a href="https://ecovadis.com/" target="_blank">EcoVadis template</a>)</li>
      </ol>
      
      <p><strong>Software Solutions:</strong><br>
      - Workiva<br>
      - Salesforce Net Zero Cloud</p>
    </div>`
  },

  // 5. SUPPLY CHAIN EMISSIONS
  {
    question: "supply chain emissions",
    answer: `<div class="guide-response">
      <h3>Supply Chain Emissions Mapping</h3>
      
      <p><strong>Scope 3 Category 1 Focus:</strong><br>
      Calculating emissions from purchased goods/services.</p>
      
      <p><strong>Business Critical:</strong></p>
      <ul>
        <li>Often 80% of total carbon footprint</li>
        <li>Now required by SEC Climate Rules</li>
      </ul>
      
      <p><strong>Methodology Options:</strong></p>
      <ol>
        <li><strong>Spend-Based (Beginner)</strong><br>
        - Formula: $1M procurement × 0.5kg CO2/$ (industry factor)</li>
        
        <li><strong>Supplier-Specific (Gold Standard)</strong><br>
        - Primary data via <a href="https://www.cdp.net/en/supply-chain" target="_blank">CDP Supply Chain</a></li>
      </ol>
      
      <p><strong>Pro Tip:</strong> Start with top 20 suppliers (Pareto principle).</p>
    </div>`
  },

  // 6. ESG AUDIT PREP
  {
    question: "ESG audit preparation",
    answer: `<div class="guide-response">
      <h3>ESG Audit Readiness Guide</h3>
      
      <p><strong>Compliance Essentials:</strong><br>
      Preparation for GRI/SASB/SEC climate disclosure audits.</p>
      
      <p><strong>Risk Alert:</strong></p>
      <ul>
        <li>68% of companies fail first ESG audit (KPMG 2023)</li>
      </ul>
      
      <p><strong>Checklist:</strong></p>
      <ol>
        <li><strong>Pre-Audit Review</strong><br>
        - Mock audit using <a href="https://materiality.sasb.org/" target="_blank">SASB Materiality Map</a></li>
        
        <li><strong>Documentation</strong><br>
        - 12 months of utility bills<br>
        - Supplier contracts</li>
        
        <li><strong>Staff Training</strong><br>
        - Common auditor questions drill</li>
      </ol>
      
      <p><strong>Red Flags:</strong><br>
      - Missing Scope 3 data<br>
      - Unverified renewable energy claims</p>
    </div>`
  },

  // 7. BIODIVERSITY RISK
  {
    question: "biodiversity risk",
    answer: `<div class="guide-response">
      <h3>Biodiversity Risk Assessment</h3>
      
      <p><strong>TNFD/CSRD Framework:</strong><br>
      Evaluating operational impacts on ecosystems.</p>
      
      <p><strong>Regulatory Pressure:</strong></p>
      <ul>
        <li>EU biodiversity disclosures mandatory by 2025</li>
        <li>44% of global GDP depends on nature (WEF)</li>
      </ul>
      
      <p><strong>4-Step Process:</strong></p>
      <ol>
        <li><strong>Facility Mapping</strong><br>
        - <a href="https://www.ibat-alliance.org/" target="_blank">IBAT Protected Areas</a> overlay</li>
        
        <li><strong>Risk Identification</strong><br>
        - Water scarcity (<a href="https://www.wri.org/aqueduct" target="_blank">WRI Aqueduct</a>)<br>
        - Deforestation (FSC-certified timber)</li>
        
        <li><strong>Target Setting</strong><br>
        - TNFD-aligned nature goals</li>
      </ol>
      
      <p><strong>Tool:</strong> <a href="https://encore.naturalcapital.org/" target="_blank">ENCORE Biodiversity Module</a></p>
    </div>`
  },

  // 8. DOUBLE MATERIALITY
  {
    question: "double materiality",
    answer: `<div class="guide-response">
      <h3>Double Materiality Case Study</h3>
      
      <p><strong>CSRD Requirement:</strong><br>
      Assess both financial and societal impacts.</p>
      
      <p><strong>Apparel Industry Example:</strong></p>
      <ul>
        <li><strong>Financial Risk:</strong> Cotton price volatility ($20M/yr exposure)</li>
        <li><strong>Impact Risk:</strong> Water pollution affecting communities</li>
      </ul>
      
      <p><strong>Implementation Guide:</strong></p>
      <ol>
        <li><strong>Stakeholder Workshops</strong><br>
        - Identify top 10 material issues</li>
        
        <li><strong>Heat Mapping</strong><br>
        - <a href="https://materiality.sasb.org/" target="_blank">SASB Materiality Tool</a></li>
        
        <li><strong>Monetization</strong><br>
        - Natural Capital Protocol</li>
      </ol>
    </div>`
  },

  // 9. SUPPLIER ESG ENGAGEMENT
  {
    question: "supplier ESG engagement",
    answer: `<div class="guide-response">
      <h3>Supplier ESG Engagement Program</h3>
      
      <p><strong>Value Chain Transformation:</strong><br>
      System to improve suppliers' ESG performance.</p>
      
      <p><strong>Business Case:</strong></p>
      <ul>
        <li>Reduces Scope 3 emissions by 30% (CDP)</li>
        <li>Meets CSRD/SEC requirements</li>
      </ul>
      
      <p><strong>5-Step Framework:</strong></p>
      <ol>
        <li><strong>Assessment</strong><br>
        - <a href="https://ecovadis.com/" target="_blank">EcoVadis questionnaire</a></li>
        
        <li><strong>Scoring</strong><br>
        - A-F ratings (GHG, labor, ethics)</li>
        
        <li><strong>Improvement</strong><br>
        - Co-fund solar panels for key suppliers</li>
        
        <li><strong>Monitoring</strong><br>
        - Annual reassessments</li>
      </ol>
      
      <p><strong>Pro Tip:</strong> Focus on 20% of suppliers causing 80% of risk.</p>
    </div>`
  },

  // 10. NET ZERO ROADMAP
  {
    question: "net zero roadmap",
    answer: `<div class="guide-response">
      <h3>Corporate Net Zero Roadmap</h3>
      
      <p><strong>Paris-Aligned Strategy:</strong><br>
      Balance emissions produced/removed by 2050.</p>
      
      <p><strong>Market Trends:</strong></p>
      <ul>
        <li>60% of Fortune 500 have targets</li>
        <li>Required for SBTi certification</li>
      </ul>
      
      <p><strong>Key Phases:</strong></p>
      <ol>
        <li><strong>Near-Term (2025-2030)</strong><br>
        - 50% reduction via renewables/efficiency</li>
        
        <li><strong>Long-Term (2040-2050)</strong><br>
        - Carbon removal (DAC, reforestation)</li>
        
        <li><strong>Compensation</strong><br>
        - Only for residual emissions (max 10%)</li>
      </ol>
      
      <p><strong>Must Include:</strong><br>
      - Scope 3 action plan<br>
      - Just Transition strategy</p>
    </div>`
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
          <div class="score">${data.score}/100</div>
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
  
  return q?.answer || `I specialize in:<br>
  - Carbon accounting<br>
  - CSRD compliance<br>
  - ESG audits<br>
  Try: "Explain ${userQuestion}"`;
    }
