// ====== COMBINED CHATBOT LOGIC + ESG DATA ======
const esgQA = {
  "carbon accounting": {
    answer: `Measures greenhouse gas emissions across:<br><br>
             <strong>Scope 1:</strong> Direct emissions (e.g., company vehicles)<br>
             <strong>Scope 2:</strong> Purchased energy<br>
             <strong>Scope 3:</strong> Supply chain (often 80% of emissions)<br><br>
             <em>Tool:</em> <a href="https://ghgprotocol.org/" target="_blank">GHG Protocol</a>`,
    sources: ["GHG Protocol"]
  },
  // Add more Q&A here...
};

// NEW: Unified function to handle BOTH company data and ESG questions
async function getAnswer(question) {
  // 1. Check for company name
  const companyMatch = question.match(/(apple|tesla|nike|nestle|unilever)/i);
  
  // 2. If company question
  if (companyMatch) {
    const company = companyMatch[0].toLowerCase();
    try {
      const data = await import(`./companies/${company}.js`);
      return {
        answer: `ESG Analysis for ${data.default.name}:<br><br>
                <strong>Score:</strong> ${data.default.score}/100<br>
                <strong>Top Leak:</strong> ${data.default.leaks[0].issue}<br><br>
                <a href="#" onclick="showFullReport('${company}')">View Full Report</a>`,
        sources: ["Snapfizz Intelligence"]
      };
    } catch {
      return { answer: `Ask about ${company}'s:<br>• Carbon emissions<br>• Supply chain risks` };
    }
  }
  
  // 3. General ESG question
  const q = question.toLowerCase();
  return esgQA[q] || {
    answer: "Ask me about:<br><br>• Specific companies (Apple/Tesla)<br>• ESG concepts<br>• Regulatory risks",
    sources: []
  };
}
