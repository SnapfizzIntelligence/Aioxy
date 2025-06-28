// ====== CORE ESG KNOWLEDGE BASE ======
const esgQA = {
  // 1. CARBON ACCOUNTING (Detailed)
  "what is carbon accounting": {
    answer: `<strong>Carbon Accounting Explained</strong><br><br>
            It's the process of measuring how much carbon dioxide (CO₂) and other greenhouse gases your company emits.<br><br>
            
            <u>3 Key Steps:</u><br>
            1. <b>Data Collection</b>: Gather fuel, electricity, and activity data<br>
            2. <b>Calculations</b>: Use emission factors (kg CO₂e per unit)<br>
            3. <b>Reporting</b>: Disclose in ESG reports<br><br>
            
            <em>Tool:</em> <a href="https://ghgprotocol.org/" target="_blank">GHG Protocol Calculator</a>`,
    sources: ["GHG Protocol Corporate Standard"]
  },

  // 2. SCOPE 1 EMISSIONS
  "scope 1 emissions": {
    answer: `<strong>Direct Emissions (Scope 1)</strong><br><br>
            <u>What counts:</u><br>
            • Company vehicles (gasoline/diesel)<br>
            • On-site fuel combustion (boilers, generators)<br>
            • Fugitive emissions (AC leaks, methane)<br><br>
            
            <u>Calculation Example:</u><br>
            Diesel used (liters) × 2.68 kg CO₂/liter = Scope 1 emissions`,
    sources: ["EPA Scope 1 Guidance"]
  },

  // 3. SCOPE 2 EMISSIONS  
  "scope 2 emissions": {
    answer: `<strong>Energy Indirect (Scope 2)</strong><br><br>
            <u>Two Methods:</u><br>
            1. <b>Location-based</b>: Uses grid average emission factors<br>
            2. <b>Market-based</b>: Uses supplier-specific data (RECs, PPAs)<br><br>
            
            <u>Required Data:</u><br>
            • Electricity bills (kWh)<br>
            • Renewable energy certificates`,
    sources: ["GHG Protocol Scope 2 Guidance"]
  },

  // 4. SCOPE 3 EMISSIONS
  "scope 3 emissions": {
    answer: `<strong>Value Chain Emissions (Scope 3)</strong><br><br>
            <u>15 Categories:</u><br>
            • Category 1: Purchased goods/services (most significant)<br>
            • Category 4: Upstream transportation<br>
            • Category 11: Use of sold products<br><br>
            
            <u>Calculation Tip:</u> Start with spend-based method ($ × industry EF)`,
    sources: ["GHG Protocol Scope 3 Standard"]
  },

  // 5. ESG REPORTING
  "how to start esg reporting": {
    answer: `<strong>ESG Reporting Roadmap</strong><br><br>
            1. <b>Materiality Assessment</b>: Identify key issues<br>
            2. <b>Data Collection</b>: Gather 12 months of operational data<br>
            3. <b>Framework Selection</b>:<br>
               - GRI (General Disclosures)<br>
               - SASB (Industry-specific)<br>
            4. <b>Verification</b>: Get external audit<br><br>
            
            <em>Template:</em> <a href="https://www.globalreporting.org/" target="_blank">GRI Standards</a>`,
    sources: ["GRI Implementation Guide"]
  },

  // 6. SUPPLY CHAIN RISKS
  "supply chain esg risks": {
    answer: `<strong>Top 3 Supply Chain Risks</strong><br><br>
            1. <b>Forced Labor</b>: Especially in apparel, electronics<br>
               - <em>Solution:</em> SMETA audits<br><br>
            2. <b>Deforestation</b>: Palm oil, soy, cattle supply chains<br>
               - <em>Tool:</em> <a href="https://www.trase.earth/" target="_blank">Trase Supply Chain Maps</a><br><br>
            3. <b>Water Stress</b>: Textile dyeing, semiconductor manufacturing`,
    sources: ["KnowTheChain Benchmark"]
  },

  // 7. NET ZERO TARGETS
  "how to set net zero targets": {
    answer: `<strong>5-Step Net Zero Plan</strong><br><br>
            1. Baseline emissions (Scope 1-3)<br>
            2. Set near-term targets (e.g., 50% by 2030)<br>
            3. Reduce operations (energy efficiency, renewables)<br>
            4. Offset residual emissions (high-quality carbon credits)<br>
            5. Disclose annually via CDP<br><br>
            
            <em>Standard:</em> <a href="https://sciencebasedtargets.org/" target="_blank">SBTi Net Zero</a>`,
    sources: ["SBTi Corporate Manual"]
  },

  // 8. ESG INVESTORS
  "what esg investors look for": {
    answer: `<strong>Investor Priority Checklist</strong><br><br>
            • Carbon reduction roadmap<br>
            • Board-level ESG oversight<br>
            • Supply chain due diligence<br>
            • Pay equity ratios<br>
            • Climate scenario analysis<br><br>
            
            <em>Reporting Tip:</em> Align with SASB standards`,
    sources: ["BlackRock ESG Engagement Priorities"]
  },

  // 9. CSRD COMPLIANCE  
  "what is csrd": {
    answer: `<strong>EU Corporate Sustainability Reporting</strong><br><br>
            • Applies to companies with €150M+ revenue in EU<br>
            • Requires double materiality assessment<br>
            • Mandates Scope 3 emissions disclosure<br>
            • Effective 2024 for large companies<br><br>
            
            <em>Guide:</em> <a href="https://www.csrd-tool.com/" target="_blank">CSRD Implementation Toolkit</a>`,
    sources: ["EU CSRD Directive"]
  },

  // 10. GREENWASHING
  "how to avoid greenwashing": {
    answer: `<strong>Anti-Greenwashing Rules</strong><br><br>
            1. Substantiate all claims with data<br>
            2. Disclose calculation methodologies<br>
            3. Avoid vague terms like "eco-friendly"<br>
            4. Report negative impacts alongside positives<br>
            5. Get third-party verification<br><br>
            
            <em>Case Study:</em> SEC fined BNY Mellon $1.5M for greenwashing`,
    sources: ["SEC Greenwashing Guidelines"]
  }
};

// ====== COMPANY DATA INTEGRATION ======
async function getAnswer(question) {
  // 1. Check for company name
  const companies = ["apple", "tesla", "nike", "nestle", "unilever"];
  const foundCompany = companies.find(c => question.toLowerCase().includes(c));
  
  // 2. If company question
  if (foundCompany) {
    try {
      const data = await import(`./companies/${foundCompany}.js`);
      return {
        answer: `<strong>${data.default.name} ESG Report</strong><br><br>
                📊 <u>Score</u>: ${data.default.score}/100<br>
                ⚠️ <u>Top Risk</u>: ${data.default.leaks[0].issue}<br>
                💰 <u>Financial Impact</u>: ${data.default.leaks[0].impact}<br><br>
                <a href="#" onclick="showFullReport('${foundCompany}')" style="color:var(--premium-accent);">View Full Analysis →</a>`,
        sources: ["Aioxy AI Database"]
      };
    } catch {
      return { 
        answer: `Ask specifically about ${foundCompany}:<br><br>
                • Carbon emissions<br>
                • Supply chain risks<br>
                • Latest ESG controversies` 
      };
    }
  }
  
  // 3. General ESG questions
  const q = question.toLowerCase();
  for (const [keyword, data] of Object.entries(esgQA)) {
    if (q.includes(keyword)) return data;
  }
  
  // 4. Default fallback
  return {
    answer: `<strong>Try these queries:</strong><br><br>
            • "Scope 1 vs 2 emissions"<br>
            • "Apple ESG score"<br>
            • "How to start ESG reporting"<br>
            • "CSRD compliance checklist"`,
    sources: []
  };
              }
