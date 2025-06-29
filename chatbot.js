// ======================
// BREAKTHROUGH KNOWLEDGE BASE
// ======================
const esgKnowledgeBase = [
  
  // 1. CARBON ACCOUNTING (FLAGSHIP FEATURE)
  {
    question: "carbon accounting",
    answer: `<div class="guide-response">
      <h3>Comprehensive Carbon Accounting Guide</h3>
      
      <p><strong>What is it?</strong><br>
      Carbon accounting measures greenhouse gas (GHG) emissions across Scopes 1-3 (GHG Protocol), tracking direct and indirect emissions to assess a company’s carbon footprint.</p>
      
      <p><strong>Why it Matters:</strong></p>
      <ul>
        <li>Reduces 20-30% reporting errors in ESG disclosures (CDP, 2023)</li>
        <li>Unlocks $2M+ annual savings via energy efficiency (Energy Star, 2024)</li>
        <li>Meets SEC Climate Rules and EU CSRD mandates</li>
      </ul>
      
      <p><strong>Step-by-Step Implementation:</strong></p>
      <ol>
        <li><strong>Scope 1 (Direct Emissions)</strong><br>
        - Track fuel use (e.g., diesel, gasoline)<br>
        - Formula: Volume (L) × Emission Factor (kg CO2e/L)<br>
        - Example: 50,000L diesel × 2.68kg CO2/L = 134,000kg CO2e (EPA factor)<br>
        - Template: Log monthly fuel receipts</li>
        
        <li><strong>Scope 2 (Purchased Energy)</strong><br>
        - Collect electricity/gas bills<br>
        - Apply local grid factor: Use <a href="https://www.epa.gov/energy/power-profiler" target="_blank">EPA Power Profiler</a><br>
        - Example: 1M kWh × 0.5kg CO2e/kWh = 500,000kg CO2e</li>
        
        <li><strong>Scope 3 (Value Chain)</strong><br>
        - Gather procurement spend and supplier data<br>
        - Method: Spend ($) × Industry Factor (kg CO2e/$)<br>
        - Example: $10M spend × 0.6kg CO2e/$ = 6,000,000kg CO2e<br>
        - Focus: Travel, goods, waste</li>
      </ol>
      
      <p><strong>Tools & Templates:</strong><br>
      - <a href="https://ghgprotocol.org/calculation-tools" target="_blank">GHG Protocol Calculator</a> (free tool)<br>
      - <a href="https://sciencebasedtargets.org/resources/files/SBTi-FLAG-guidance.pdf" target="_blank">SBTi FLAG Guidance</a> (PDF template)</p>
    </div>`
  },

  // 2. SCIENCE-BASED TARGETS (SBTi)
  {
    question: "science-based target setting",
    answer: `<div class="guide-response">
      <h3>Science-Based Targets (SBTi) Master Guide</h3>
      
      <p><strong>What is it?</strong><br>
      SBTi-validated targets align emissions reductions with a 1.5°C global warming limit, per Paris Agreement.</p>
      
      <p><strong>Business Impact:</strong></p>
      <ul>
        <li>75% of investors demand SBTi targets (Bloomberg, 2023)</li>
        <li>Cuts regulatory risks in EU/CSRD zones</li>
        <li>Boosts brand value by 15% (McKinsey, 2024)</li>
      </ul>
      
      <p><strong>Implementation Roadmap:</strong></p>
      <ol>
        <li><strong>Baseline Year (2018-2022)</strong><br>
        - Use historical data (include Scope 3)<br>
        - Example: 2020 baseline with 1M tCO2e</li>
        
        <li><strong>Boundary Setting</strong><br>
        - Cover ≥67% of Scope 3 emissions<br>
        - Template: SBTi Boundary Tool</li>
        
        <li><strong>Target Types</strong><br>
        - Absolute: 42% reduction by 2030<br>
        - Sector: 24% per ton for cement (SBTi sector guidance)<br>
        - Example: Reduce 420,000 tCO2e by 2030</li>
        
        <li><strong>Validation</strong><br>
        - Submit to SBTi ($4,800-$14,500 fee)<br>
        - Timeline: 6-12 months</li>
      </ol>
      
      <p><strong>Resource:</strong><br>
      - <a href="https://sciencebasedtargets.org/target-dashboard" target="_blank">SBTi Target Dashboard</a> (benchmark tool)</p>
    </div>`
  },

  // 3. CSRD COMPLIANCE
  {
    question: "CSRD compliance",
    answer: `<div class="guide-response">
      <h3>CSRD Compliance Checklist (2024 Update)</h3>
      
      <p><strong>New EU Mandate:</strong><br>
      Requires double materiality and detailed ESG reporting for EU firms and non-EU with €150M+ EU revenue.</p>
      
      <p><strong>Key Risks:</strong></p>
      <ul>
        <li>Fines up to €50k+ per violation</li>
        <li>Reputation hit from non-compliance</li>
      </ul>
      
      <p><strong>Action Plan:</strong></p>
      <ol>
        <li><strong>Double Materiality Assessment</strong><br>
        - Map financial (e.g., $20M risk) and impact (e.g., water use)<br>
        - Use <a href="https://www.globalreporting.org/standards/" target="_blank">GRI Standards</a> template</li>
        
        <li><strong>ESRS Reporting</strong><br>
        - Cover 12 standards (e.g., GHG, diversity)<br>
        - Example: Report 500,000 tCO2e Scope 3</li>
        
        <li><strong>Audit Prep</strong><br>
        - Limited assurance (2024) → Reasonable (2028)<br>
        - Checklist: 12-month data archive</li>
      </ol>
      
      <p><strong>Resource:</strong><br>
      - <a href="https://www.efrag.org/draft-standards" target="_blank">EFRAG ESRS Guidance</a> (free download)</p>
    </div>`
  },

  // 4. ESG DATA COLLECTION
  {
    question: "ESG data collection",
    answer: `<div class="guide-response">
      <h3>ESG Data Collection Framework</h3>
      
      <p><strong>Best Practice:</strong><br>
      Combines automated and manual methods for 15-20 material KPIs.</p>
      
      <p><strong>Benefits:</strong></p>
      <ul>
        <li>Cuts audit findings by 40% (PwC, 2023)</li>
        <li>Enables tools like Aioxy’s scanner</li>
        <li>Saves 100+ hours/year</li>
      </ul>
      
      <p><strong>7-Step Process:</strong></p>
      <ol>
        <li><strong>Materiality Matrix</strong><br>
        - List top 5 ESG issues (e.g., emissions, labor)<br>
        - Template: SASB Materiality Map</li>
        
        <li><strong>Automated Feeds</strong><br>
        - Energy: <a href="https://urjanet.com/" target="_blank">Urjanet</a> API<br>
        - Travel: Card data integration<br>
        - Example: 1M kWh tracked monthly</li>
        
        <li><strong>Manual Inputs</strong><br>
        - Supplier surveys: <a href="https://ecovadis.com/solutions/supplier-assessment" target="_blank">EcoVadis</a> form<br>
        - Example: 50 suppliers surveyed</li>
      </ol>
      
      <p><strong>Tools:</strong><br>
      - <a href="https://www.workiva.com/" target="_blank">Workiva</a> (data aggregation)<br>
      - <a href="https://www.salesforce.com/products/sustainability/" target="_blank">Salesforce Net Zero Cloud</a></p>
    </div>`
  },

  // 5. SUPPLY CHAIN EMISSIONS
  {
    question: "supply chain emissions",
    answer: `<div class="guide-response">
      <h3>Supply Chain Emissions Mapping Guide</h3>
      
      <p><strong>Focus Area:</strong><br>
      Scope 3 Category 1: Purchased goods/services emissions.</p>
      
      <p><strong>Importance:</strong></p>
      <ul>
        <li>80% of total carbon footprint (CDP, 2023)</li>
        <li>Mandated by SEC Climate Rules</li>
      </ul>
      
      <p><strong>Methodology Options:</strong></p>
      <ol>
        <li><strong>Spend-Based (Beginner)</strong><br>
        - Formula: Spend ($) × Factor (kg CO2e/$)<br>
        - Example: $1M × 0.5kg CO2/$ = 500,000kg CO2e<br>
        - Template: Excel tracker</li>
        
        <li><strong>Supplier-Specific (Advanced)</strong><br>
        - Use <a href="https://www.cdp.net/en/supply-chain" target="_blank">CDP Supply Chain</a> data<br>
        - Example: Supplier A reports 200,000kg CO2e</li>
      </ol>
      
      <p><strong>Tip:</strong> Target top 20 suppliers for 80% coverage.</p>
    </div>`
  },

  // 6. ESG AUDIT PREP
  {
    question: "ESG audit preparation",
    answer: `<div class="guide-response">
      <h3>ESG Audit Readiness Blueprint</h3>
      
      <p><strong>Standards Covered:</strong><br>
      GRI, SASB, SEC climate disclosure audits.</p>
      
      <p><strong>Risk Insight:</strong></p>
      <ul>
        <li>68% fail first audit (KPMG, 2023)</li>
        <li>Average delay: 3 months</li>
      </ul>
      
      <p><strong>Checklist:</strong></p>
      <ol>
        <li><strong>Pre-Audit Review</strong><br>
        - Mock audit with <a href="https://materiality.sasb.org/" target="_blank">SASB Materiality Map</a><br>
        - Example: Test 5 key metrics</li>
        
        <li><strong>Documentation</strong><br>
        - 12 months of bills/contracts<br>
        - Template: Audit log spreadsheet</li>
        
        <li><strong>Training</strong><br>
        - Drill 10 common questions<br>
        - Example: “How’s Scope 3 verified?”</li>
      </ol>
      
      <p><strong>Red Flags:</strong><br>
      - Missing Scope 3 data<br>
      - Unverified renewable claims</p>
    </div>`
  },

  // 7. BIODIVERSITY RISK
  {
    question: "biodiversity risk",
    answer: `<div class="guide-response">
      <h3>Biodiversity Risk Assessment Guide</h3>
      
      <p><strong>Framework:</strong><br>
      TNFD and CSRD-aligned ecosystem impact evaluation.</p>
      
      <p><strong>Pressure Points:</strong></p>
      <ul>
        <li>EU mandates by 2025</li>
        <li>44% of GDP tied to nature (WEF, 2023)</li>
      </ul>
      
      <p><strong>4-Step Process:</strong></p>
      <ol>
        <li><strong>Mapping</strong><br>
        - Use <a href="https://www.ibat-alliance.org/" target="_blank">IBAT Protected Areas</a> overlay<br>
        - Example: Check 5km radius</li>
        
        <li><strong>Risk ID</strong><br>
        - Water: <a href="https://www.wri.org/aqueduct" target="_blank">WRI Aqueduct</a><br>
        - Deforestation: FSC timber audit<br>
        - Example: 10% water stress risk</li>
        
        <li><strong>Targets</strong><br>
        - TNFD-aligned goals (e.g., 20% habitat restoration)</li>
      </ol>
      
      <p><strong>Tool:</strong><br>
      - <a href="https://encore.naturalcapital.org/" target="_blank">ENCORE Biodiversity Module</a> (free)</p>
    </div>`
  },

  // 8. DOUBLE MATERIALITY 
  {
    question: ["double materiality", "double materiality cost calculator", "csrd materiality"],
    answer: `<div class="guide-response">
    <h3>Double Materiality Cost & Risk Solution</h3>

    <p><strong>What is it?</strong><br>
    A CSRD-required assessment of both:
    <ul>
      <li><strong>Financial Materiality</strong>: ESG issues that could impact company value</li>
      <li><strong>Impact Materiality</strong>: Company’s environmental & social impact</li>
    </ul></p>

    <p><strong>Why this matters:</strong></p>
    <ul>
      <li>CSRD compliance mandatory by 2024-2025 (EU fines $50k+)</li>
      <li>Consultants charge $100K–$300K; time: 3-6 months (PwC, EY)</li>
    </ul>

    <p><strong>Aioxy instant solution:</strong></p>
    <ol>
      <li><strong>Instant Risk Matrix</strong> — Aioxy generates a heat map:
        <ul>
          <li>Financial risk: Quantifies exposure (e.g., cotton volatility = $20M/yr)</li>
          <li>Impact risk: Quantifies harm (e.g., 500M liters water overuse / year)</li>
        </ul>
      </li>
      <li><strong>Materiality Ranking</strong> — Prioritizes top 10 ESG topics based on:
        <ul>
          <li>Industry benchmarks (from SASB + GRI)</li>
          <li>Revenue, region, sector data</li>
        </ul>
      </li>
      <li><strong>Compliance Checklist</strong> — Auto-generates list of CSRD must-haves</li>
      <li><strong>Downloadable Report</strong> — Summary ready for audit prep</li>
    </ol>

    <p><strong>Comparison:</strong></p>
    <table border="1" cellpadding="4">
      <tr><th>Traditional Consultant</th><th>Aioxy</th></tr>
      <tr><td>$100K–300K, 3-6 months</td><td>Free / low cost, instant</td></tr>
      <tr><td>Manual stakeholder workshops</td><td>Auto-prioritized risk zones</td></tr>
    </table>

    <p><strong>Try tools:</strong><br>
    - <a href="https://materiality.sasb.org/" target="_blank">SASB Materiality Map</a> (manual)<br>
    - Aioxy: Automated double materiality in seconds</p>
  </div>`
  }

  // 9. SUPPLIER ESG ENGAGEMENT
  {
    question: "supplier ESG engagement",
    answer: `<div class="guide-response">
      <h3>Supplier ESG Engagement Framework</h3>
      
      <p><strong>Goal:</strong><br>
      Transform value chain ESG performance.</p>
      
      <p><strong>Business Case:</strong></p>
      <ul>
        <li>30% Scope 3 reduction (CDP, 2023)</li>
        <li>Meets CSRD/SEC mandates</li>
      </ul>
      
      <p><strong>5-Step Framework:</strong></p>
      <ol>
        <li><strong>Assessment</strong><br>
        - Use <a href="https://ecovadis.com/" target="_blank">EcoVadis</a> questionnaire<br>
        - Example: Score 50 suppliers</li>
        
        <li><strong>Scoring</strong><br>
        - A-F ratings (GHG, labor)<br>
        - Example: 60% rated C or below</li>
        
        <li><strong>Improvement</strong><br>
        - Co-fund solar (e.g., $100k for 5 suppliers)<br>
        - Template: Improvement plan</li>
        
        <li><strong>Monitoring</strong><br>
        - Annual reassessment<br>
        - Example: 15% improvement target</li>
      </ol>
      
      <p><strong>Tip:</strong> Target 20% of suppliers for 80% impact.</p>
    </div>`
  },

  // 10. NET ZERO ROADMAP
  {
    question: "net zero roadmap",
    answer: `<div class="guide-response">
      <h3>Corporate Net Zero Roadmap Blueprint</h3>
      
      <p><strong>Goal:</strong><br>
      Achieve net-zero emissions by 2050 (Paris-aligned).</p>
      
      <p><strong>Market Trends:</strong></p>
      <ul>
        <li>60% of Fortune 500 have targets</li>
        <li>Mandatory for SBTi certification</li>
      </ul>
      
      <p><strong>Key Phases:</strong></p>
      <ol>
        <li><strong>Near-Term (2025-2030)</strong><br>
        - 50% reduction via renewables/efficiency<br>
        - Example: 250,000 tCO2e cut with solar</li>
        
        <li><strong>Long-Term (2040-2050)</strong><br>
        - Carbon removal (DAC, reforestation)<br>
        - Example: 100,000 tCO2e via planting</li>
        
        <li><strong>Compensation</strong><br>
        - Residual 10% via offsets<br>
        - Template: Offset purchase log</li>
      </ol>
      
      <p><strong>Must Include:</strong><br>
      - Scope 3 plan<br>
      - Just Transition strategy (e.g., worker retraining)</p>
    </div>`
    }

]

// ======================
// FUTURE-PROOF ANSWER ENGINE
// ======================
class ESGAnswerEngine {
  static #companies = ['apple', 'tesla', 'unilever'];
  
  static async #loadCompanyData(companyName) {
    try {
      const normalizedName = companyName.toLowerCase().replace(/\s+/g, '');
      const module = await import(`./companies/${normalizedName}.js`);
      return module.default;
    } catch {
      return null;
    }
  }

  static async getAnswer(userQuestion) {
    const lowerQuestion = userQuestion.toLowerCase().trim();
    
    // 1. Check for company data
    for (const company of this.#companies) {
      if (lowerQuestion.includes(company)) {
        const data = await this.#loadCompanyData(company);
        if (data) return this.#formatCompanyResponse(data);
      }
    }
    
    // 2. Find best matching question
    let bestMatch = null;
    let highestScore = 0;

    for (const item of esgKnowledgeBase) {
      const questions = Array.isArray(item.question) ? item.question : [item.question];
      
      for (const q of questions) {
        const score = this.#calculateMatchScore(lowerQuestion, q.toLowerCase());
        if (score > highestScore) {
          highestScore = score;
          bestMatch = item.answer;
        }
      }
    }

    return bestMatch || this.#getFallbackResponse();
  }

  static #calculateMatchScore(question, keyword) {
    if (question === keyword) return Infinity; // Exact match
    if (question.includes(keyword)) return keyword.length * 2; // Partial match
    
    // Keyword matching
    return keyword.split(/\s+/)
      .filter(word => word.length > 3 && question.includes(word))
      .reduce((sum, word) => sum + word.length, 0);
  }

  static #formatCompanyResponse(data) {
    return `
      <div class="company-response">
        <h3>${data.name} ESG Report</h3>
        <div class="company-score">${data.score}/100</div>
        <p><strong>Key Risk:</strong> ${data.leaks[0].issue}</p>
        <p><strong>Solution:</strong> ${data.leaks[0].solution}</p>
        <a href="${data.leaks[0].source.url}" target="_blank">Source</a>
      </div>`;
  }

  static #getFallbackResponse() {
    return `<p>I specialize in:<br>
      - Carbon accounting<br>
      - CSRD compliance<br>
      - ESG audits<br>
      Try rephrasing your question.</p>`;
  }
}

// ======================
// CHAT INTERFACE CONTROLLER
// ======================
class ChatInterface {
  static init() {
    document.getElementById('user-input')
      .addEventListener('keypress', (e) => e.key === 'Enter' && this.sendMessage());
  }

  static async sendMessage() {
    const input = document.getElementById('user-input');
    const question = input.value.trim();

    if (!question) return;

    this.#hideSuggestions();
    this.#addMessage(question, 'user');
    input.value = '';

    const typingIndicator = this.#createTypingIndicator();
    document.getElementById('chat-messages').appendChild(typingIndicator);

    try {
      const answer = await ESGAnswerEngine.getAnswer(question);
      setTimeout(() => {
        typingIndicator.remove();
        this.#addMessage(answer, 'bot');
      }, 800 + Math.random() * 400);
    } catch (error) {
      console.error("Error:", error);
      typingIndicator.remove();
      this.#addMessage("<p>Sorry, I encountered an error. Please try again.</p>", 'bot');
    }
  }

  static #addMessage(content, sender) {
    const messages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = content;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
  }

  static #hideSuggestions() {
    document.getElementById('suggested-questions').classList.add('hidden');
  }

  static #createTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'message bot-message typing-indicator';
    indicator.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>`;
    return indicator;
  }
}

// Initialize
window.sendMessage = ChatInterface.sendMessage;
window.askQuestion = (question) => {
  document.getElementById('user-input').value = question;
  ChatInterface.sendMessage();
};
ChatInterface.init();
