// Premium ESG Knowledge Base
const esgKnowledgeBase = [
  {
    question: "carbon accounting",
    tags: ["carbon", "accounting", "emissions", "ghg"],
    answer: `## Comprehensive Guide to Carbon Accounting

**What is Carbon Accounting?**
Carbon accounting is the systematic process of measuring an organization's greenhouse gas (GHG) emissions. It's the foundation for any credible climate action plan.

**Step-by-Step Implementation:**

1. **Define Organizational Boundaries**
   - Choose between equity share (investments) or control approach (facilities you operate)
   - Document all subsidiaries, joint ventures, and leased assets

2. **Identify Emission Sources** (Scopes 1-3):
   - *Scope 1*: Direct emissions from owned sources
     - Fuel combustion
     - Company vehicles
     - Fugitive emissions (leaks)
   - *Scope 2*: Indirect emissions from purchased energy
     - Electricity
     - Heat
     - Steam
     - Cooling
   - *Scope 3*: All other indirect emissions
     - Purchased goods/services
     - Business travel
     - Employee commuting
     - Investments
     - Waste disposal

3. **Collect Activity Data**
   - Energy bills (electricity, gas, fuel)
   - Travel records (flights, hotels)
   - Procurement data
   - Facility square footage
   - Employee commuting surveys

4. **Apply Emission Factors**
   - Use latest GHG Protocol conversion factors
   - Example calculation:
     \`Electricity Emissions = kWh used × Local grid emission factor\`
   - For accuracy:
     - Use supplier-specific factors when available
     - Apply market-based vs location-based for Scope 2

5. **Calculate Results**
   - Convert all emissions to CO2 equivalents (CO2e)
   - Use global warming potential (GWP) values:
     - CO2 = 1
     - Methane = 25
     - Nitrous oxide = 298

6. **Quality Assurance**
   - Data validation checks
   - Third-party verification (recommended)
   - Uncertainty analysis

**Tools & Resources:**
- GHG Protocol Corporate Standard
- EPA GHG Emission Factors Hub
- Carbon Disclosure Project (CDP) reporting templates

**Common Pitfalls:**
- Underestimating Scope 3 (often 80% of footprint)
- Using outdated emission factors
- Not accounting for leased assets
- Ignoring data quality assessments`
  },
  {
    question: "scope 1 emissions",
    tags: ["scope1", "direct emissions", "ghg"],
    answer: `## Complete Guide to Scope 1 Emissions

**Definition:**
Scope 1 emissions are direct greenhouse gas emissions from sources owned or controlled by your organization.

**Detailed Breakdown:**

1. **Stationary Combustion**
   - Boilers, furnaces, turbines
   - Types of fuels:
     - Natural gas
     - Coal
     - Diesel
     - Propane
   - Calculation method:
     \`Emissions = Fuel consumed × Emission factor\`

2. **Mobile Combustion**
   - Company vehicles (cars, trucks, forklifts)
   - Aviation (owned aircraft)
   - Marine (owned vessels)
   - Tracking requirements:
     - Fuel purchases
     - Mileage logs
     - Engine types

3. **Process Emissions**
   - Chemical reactions in manufacturing
   - Cement production (calcination)
   - Aluminum production (PFC emissions)
   - Electronics (SF6 use)

4. **Fugitive Emissions**
   - Refrigerant leaks (HVAC systems)
   - Methane leaks (pipelines)
   - Industrial gas releases
   - Monitoring methods:
     - Infrared cameras
     - Ultrasonic detectors
     - Manual inspections

**Measurement Best Practices:**
- Continuous monitoring where possible
- Quarterly leak detection surveys
- EPA Method 21 for leak quantification
- Use of calibrated flow meters

**Reduction Strategies:**
- Fuel switching to lower-carbon alternatives
- Leak detection and repair programs
- Process optimization
- Equipment upgrades
- Carbon capture pilot projects

**Reporting Requirements:**
- Must be included in GHG Protocol reporting
- CDP disclosure
- SEC climate disclosure rules (upcoming)`
  },
  {
    question: "net zero target",
    tags: ["netzero", "carbon neutral", "climate target"],
    answer: `## Implementing a Credible Net Zero Target

**Definition:**
Net zero means achieving a balance between greenhouse gas emissions produced and emissions removed from the atmosphere.

**Step-by-Step Roadmap:**

1. **Baseline Assessment**
   - Complete carbon footprint (Scopes 1-3)
   - Identify emission hotspots
   - Project future growth scenarios

2. **Target Setting**
   - Near-term targets (5-10 years)
   - Long-term net zero date (2040-2050)
   - Science-based targets initiative (SBTi) validation
   - Recommended reductions:
     - 50% by 2030
     - 90% by 2040
     - Neutralize remaining 10% by 2050

3. **Reduction Strategies**
   - *Energy*:
     - 100% renewable electricity
     - Building retrofits
     - On-site generation
   - *Operations*:
     - Fleet electrification
     - Sustainable procurement
     - Circular economy practices
   - *Value Chain*:
     - Supplier engagement programs
     - Low-carbon product design
     - Logistics optimization

4. **Removal Strategies**
   - Nature-based solutions:
     - Reforestation
     - Soil carbon sequestration
   - Technological solutions:
     - Direct air capture
     - Carbon mineralization
   - Offsets (only for residual emissions):
     - Gold Standard certified
     - Verified Carbon Standard

5. **Governance**
   - Board-level oversight
   - Dedicated climate team
   - Employee training
   - Tied to executive compensation

6. **Reporting & Verification**
   - Annual progress reports
   - Third-party verification
   - CDP disclosure
   - TCFD-aligned reporting

**Common Mistakes:**
- Relying too heavily on offsets
- Ignoring Scope 3 emissions
- Lack of interim targets
- No clear governance structure
- Underestimating removal costs

**Resources:**
- SBTi Net Zero Standard
- Oxford Offsetting Principles
- GHG Protocol Mitigation Goal Standard`
  },
  // Add 97+ more detailed entries like these
  {
    question: "esg reporting frameworks",
    tags: ["reporting", "frameworks", "standards"],
    answer: `## ESG Reporting Framework Comparison Guide

**1. Global Reporting Initiative (GRI)**
- Most widely used global standard
- 200+ performance indicators
- Sector-specific supplements
- Strong focus on impacts

**2. Sustainability Accounting Standards Board (SASB)**
- Industry-specific standards
- Financially material issues
- Used for SEC filings
- 77 industry standards

**3. Task Force on Climate-related Disclosures (TCFD)**
- Climate risk focus
- Governance, strategy, risk management
- Metrics and targets
- Becoming mandatory in many jurisdictions

**... (additional detailed comparison of 8 more frameworks) ...`

  }
];

// Advanced matching algorithm
function getAnswer(userQuestion) {
  const lowerQuestion = userQuestion.toLowerCase().trim();
  
  // 1. Try exact match
  const exactMatch = esgKnowledgeBase.find(item => 
    item.question.toLowerCase() === lowerQuestion);
  if (exactMatch) return formatAnswer(exactMatch.answer);
  
  // 2. Try tag matches
  const tagMatches = esgKnowledgeBase.filter(item => 
    item.tags.some(tag => lowerQuestion.includes(tag)));
  
  if (tagMatches.length > 0) {
    // Return best tag match (could enhance with scoring)
    return formatAnswer(tagMatches[0].answer);
  }
  
  // 3. Try partial question matches
  const questionMatches = esgKnowledgeBase.filter(item => 
    item.question.toLowerCase().includes(lowerQuestion) || 
    lowerQuestion.includes(item.question.toLowerCase()));
  
  if (questionMatches.length > 0) {
    return formatAnswer(questionMatches[0].answer);
  }
  
  // 4. Return default with suggestions
  return formatAnswer(`I couldn't find an exact match for your question about "${userQuestion}". 
  
Here are some related topics I can help with:
- Carbon accounting methodology
- Scope 1 vs 2 vs 3 emissions
- Setting science-based targets
- ESG reporting frameworks comparison
- Calculating your carbon footprint

Try rephrasing or asking about one of these topics.`);
}

// Format markdown-style answers
function formatAnswer(text) {
  // Convert markdown headers to HTML
  let formatted = text.replace(/## (.*)/g, '<h3>$1</h3>');
  
  // Convert lists
  formatted = formatted.replace(/- (.*)/g, '<li>$1</li>');
  formatted = formatted.replace(/\* (.*)/g, '<li>$1</li>');
  
  // Preserve code blocks
  formatted = formatted.replace(/`(.*?)`/g, '<code>$1</code>');
  
  return formatted;
}
