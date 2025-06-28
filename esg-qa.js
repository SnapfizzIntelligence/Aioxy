// ====== EXPERT-LEVEL ESG Q&A ======
const esgQA = {
  // 1. CARBON ACCOUNTING (ULTRA-DETAILED)
  "carbon accounting": {
    answer: `<strong>Carbon Accounting Framework</strong><br><br>
             🌍 <u>Scope 1 (Direct Emissions)</u>:<br>
             • Fuel combustion (facilities, vehicles)<br>
             • Process emissions (chemical production)<br>
             • Fugitive emissions (leaks, refrigeration)<br>
             <em>Calculation:</em> Fuel used × Emission factor<br><br>
             
             🔌 <u>Scope 2 (Energy Indirect)</u>:<br>
             • Purchased electricity/heat/steam<br>
             • Location-based vs market-based methods<br>
             <em>Pro Tip:</em> Use supplier-specific data when available<br><br>
             
             🚛 <u>Scope 3 (Value Chain)</u>:<br>
             • 15 categories including:<br>
             - Category 1: Purchased goods/services (40-80% of emissions)<br>
             - Category 6: Business travel<br>
             - Category 11: Use of sold products<br>
             <em>Tool:</em> <a href="https://ghgprotocol.org/" target="_blank">GHG Protocol Calculator</a>`,
    sources: ["GHG Protocol", "ISO 14064-1"]
  },

  // 2. ESG REPORTING STANDARDS
  "esg reporting": {
    answer: `<strong>Key Reporting Frameworks</strong><br><br>
             📊 <u>Financial-Linked</u>:<br>
             • SASB (77 industry standards)<br>
             • TCFD (climate risk disclosure)<br><br>
             
             🌱 <u>Impact-Focused</u>:<br>
             • GRI (Universal Standards 2021)<br>
             • CDP (Carbon Disclosure Project)<br><br>
             
             💡 <u>Implementation Steps</u>:<br>
             1. Materiality assessment<br>
             2. Gap analysis against frameworks<br>
             3. Integrated report drafting<br>
             <em>Template:</em> <a href="https://www.globalreporting.org/" target="_blank">GRI Standards</a>`,
    sources: ["SASB Materiality Map", "TCFD Implementation Guide"]
  },

  // 3. SUPPLY CHAIN RISKS
  "supply chain risks": {
    answer: `<strong>Top 5 ESG Supply Chain Risks</strong><br><br>
             1️⃣ <u>Forced Labor</u>:<br>
             • High-risk sectors: Apparel, electronics<br>
             • Solution: SMETA audits<br><br>
             
             2️⃣ <u>Deforestation</u>:<br>
             • Palm oil, soy, cattle supply chains<br>
             • Tool: <a href="https://www.trase.earth/" target="_blank">Trase</a> for mapping<br><br>
             
             3️⃣ <u>Water Stress</u>:<br>
             • Textile dyeing, semiconductor manufacturing<br>
             • Metric: WRI Aqueduct Water Risk Atlas`,
    sources: ["KnowTheChain Benchmark", "Ecovadis Reports"]
  },

  // 4. CLIMATE TARGETS
  "net zero strategy": {
    answer: `<strong>5-Step Net Zero Roadmap</strong><br><br>
             1. <u>Baseline</u>: Full Scope 1-3 inventory<br>
             2. <u>Targets</u>:<br>
                - Near-term: SBTi-validated (50% by 2030)<br>
                - Long-term: Net zero by 2050<br>
             3. <u>Reduction</u>:<br>
                - Energy efficiency (LED, HVAC upgrades)<br>
                - Renewable PPAs (solar/wind contracts)<br>
             4. <u>Offsetting</u>:<br>
                - Only for residual emissions<br>
                - Gold Standard or Verra credits<br>
             5. <u>Disclosure</u>: Annual CDP reporting`,
    sources: ["SBTi Corporate Manual", "Net Zero Standard"]
  }
  // Add more as needed...
};

// ====== UNIFIED ANSWER SYSTEM ======
async function getAnswer(question) {
  const q = question.toLowerCase();
  
  // 1. Check for company data (Apple/Tesla)
  const companyMatch = q.match(/(apple|tesla|nike|nestle|unilever)/i);
  if (companyMatch) {
    const company = companyMatch[0].toLowerCase();
    try {
      const data = await import(`./companies/${company}.js`);
      return {
        answer: `<strong>${data.default.name} ESG Report</strong><br><br>
                📊 <u>Score</u>: ${data.default.score}/100<br>
                ⚠️ <u>Top Risk</u>: ${data.default.leaks[0].issue}<br>
                💰 <u>Financial Impact</u>: ${data.default.leaks[0].impact}<br><br>
                <button onclick="showFullReport('${company}')" style="background:var(--premium-accent); color:white; border:none; padding:8px 16px; border-radius:6px; cursor:pointer;">
                  View Full Analysis
                </button>`,
        sources: ["Snapfizz AI Analysis"]
      };
    } catch {
      return { 
        answer: `Ask specifically about ${company}'s:<br><br>
                • Carbon emissions data<br>
                • Supply chain violations<br>
                • Recent ESG controversies` 
      };
    }
  }
  
  // 2. General ESG questions
  for (const [keyword, data] of Object.entries(esgQA)) {
    if (q.includes(keyword)) return data;
  }
  
  // 3. Default fallback
  return {
    answer: `<strong>Ask me about:</strong><br><br>
            • "Explain Scope 3 emissions"<br>
            • "Show Apple's ESG score"<br>
            • "How to set net zero targets"<br>
            • "Top supply chain risks in fashion"`,
    sources: []
  };
        }
