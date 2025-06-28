// ESG Q&A Database - Add all questions here
const esgQA = {
  "carbon accounting": {
    answer: `Carbon accounting measures greenhouse gas emissions across:<br><br>
             <strong>Scope 1:</strong> Direct emissions (e.g., company vehicles)<br>
             <strong>Scope 2:</strong> Energy indirect (e.g., electricity)<br>
             <strong>Scope 3:</strong> Value chain (e.g., supplier emissions)<br><br>
             <em>Start with:</em> <a href="https://ghgprotocol.org/" target="_blank">GHG Protocol</a>`,
    sources: ["GHG Protocol", "ISO 14064"]
  },
  "scope 3": {
    answer: `Scope 3 includes 15 categories like:<br><br>
             • Purchased goods/services<br>
             • Business travel<br>
             • Investments<br><br>
             <strong>Priority:</strong> Category 1 (supply chain) is 40-80% of emissions.`,
    sources: ["CDP Scope 3 Guidance"]
  }
  // Add 100+ more...
};

function getESGAnswer(question) {
  const q = question.toLowerCase();
  
  // 1. Exact match
  if (esgQA[q]) return esgQA[q];
  
  // 2. Keyword match
  for (const [keyword, data] of Object.entries(esgQA)) {
    if (q.includes(keyword)) return data;
  }
  
  // 3. Default
  return {
    answer: "Ask me about:<br><br>• Carbon accounting<br>• Scope 3<br>• ESG scores",
    sources: []
  };
}
