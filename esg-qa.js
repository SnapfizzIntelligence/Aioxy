// ====== CORE ESG QUESTIONS ======
const esgQA = {
  // 1. CARBON ACCOUNTING (Detailed Answer)
  "carbon accounting": {
    answer: `<strong>Carbon Accounting Guide</strong><br><br>
             <u>Scope 1</u>: Direct emissions (facilities, vehicles)<br>
             • <em>Calculation</em>: Fuel used × Emission factor<br><br>
             
             <u>Scope 2</u>: Purchased energy<br>
             • Location-based vs Market-based<br><br>
             
             <u>Scope 3</u>: 15 categories (supply chain, investments)<br>
             • <a href="https://ghgprotocol.org/" target="_blank">GHG Protocol Calculator</a>`,
    sources: ["GHG Protocol", "ISO 14064"]
  },

  // 2. COMPANY DATA TEMPLATE
  "company template": {
    answer: `Ask specifically:<br><br>
             • "[Company] ESG score"<br>
             • "[Company] supply chain risks"<br>
             • "[Company] vs [Competitor]"`,
    sources: []
  }
};

// ====== ANSWER GENERATOR ======
async function getAnswer(question) {
  // 1. Check for company data
  const companies = ["apple", "tesla", "nike", "nestle"];
  const foundCompany = companies.find(c => question.toLowerCase().includes(c));
  
  if (foundCompany) {
    try {
      const data = await import(`./companies/${foundCompany}.js`);
      return {
        answer: `<strong>${data.default.name} ESG Report</strong><br><br>
                📊 <u>Score</u>: ${data.default.score}/100<br>
                ⚠️ <u>Top Risk</u>: ${data.default.leaks[0].issue}<br>
                💰 <u>Impact</u>: ${data.default.leaks[0].impact}`,
        sources: ["Aioxy AI Analysis"]
      };
    } catch {
      return esgQA["company template"];
    }
  }
  
  // 2. General ESG questions
  const q = question.toLowerCase();
  return esgQA[q] || {
    answer: `<strong>Try asking:</strong><br><br>
            • "Carbon accounting"<br>
            • "Apple ESG score"<br>
            • "Scope 3 calculation"`,
    sources: []
  };
}
