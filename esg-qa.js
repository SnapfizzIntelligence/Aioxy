// ESG Question-Answer Database
function getESGAnswer(question) {
  const q = question.toLowerCase();
  const answers = {
    "carbon accounting": {
      answer: `Carbon accounting tracks greenhouse gas emissions across three scopes:<br><br>
               <strong>Scope 1:</strong> Direct emissions from owned sources (e.g., company vehicles)<br>
               <strong>Scope 2:</strong> Indirect emissions from purchased energy<br>
               <strong>Scope 3:</strong> All other indirect emissions (supply chain, investments, etc.)<br><br>
               <em>Pro Tip:</em> Start with Scope 1 & 2 before tackling Scope 3.`,
      sources: ["GHG Protocol", "ISO 14064"]
    },
    "scope 3": {
      answer: `Scope 3 emissions include 15 categories like:<br><br>
               • Purchased goods/services<br>
               • Business travel<br>
               • Investments<br><br>
               <strong>Quick Win:</strong> Category 1 (supply chain) often represents 40-80% of Scope 3.`,
      sources: ["CDP Scope 3 Guidance"]
    }
    // Add 100+ more questions...
  };

  // Exact match
  if (answers[q]) return answers[q];
  
  // Keyword match
  for (const [keyword, data] of Object.entries(answers)) {
    if (q.includes(keyword)) return data;
  }

  // Default response
  return {
    answer: "I specialize in ESG leaks. Try asking about:<br><br>• Carbon accounting<br>• Scope 3 emissions<br>• ESG report gaps",
    sources: []
  };
}
