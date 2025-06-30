// =====================
// AIOXY ESG AUDIT ENGINE
// =====================

// 1. COMPLETE BRAND DATASETS (YOUR ORIGINAL DATA)
const brandData = {
  cocacola: {
    carbon: {
      scope1: 283745,
      scope2: 151795,
      scope3: 4827581,
      total_system_ghg_2023: 52631220,
      errors: [
        {
          issue: "Scope 3 reporting, particularly for plastic packaging, may underestimate full lifecycle impact, and the system's total plastic footprint (estimated ~3 Mt/year) is a major unaddressed emissions driver.",
          source: {
            label: "Packaging Europe: Coca-Cola to rework 'misleading' recycling claims on plastic bottles (May 2025)",
            url: "https://packagingeurope.com/news/coca-cola-to-rework-misleading-recycling-claims-on-plastic-bottles/12829.article"
          }
        },
        {
          issue: "Reliance on Energy Attribute Certificates (EACs/RECs) for market-based Scope 2 emissions, potentially overstating actual operational renewable energy adoption and diluting true decarbonization impact.",
          source: {
            label: "Coca-Cola Europacific Partners 2024 Sustainability reporting methodology (discloses EAC use); NGO critiques",
            url: "https://www.cocacolaep.com/assets/Download-centre/2024-Methodology.pdf"
          }
        }
      ]
    },
    csrd: {
      risks: [
        {
          risk: "Significant 'greenwashing' risk due to dropping the ambitious 25% reusable packaging target by 2030, shifting focus to lower recycled content targets (35-40% by 2035).",
          source: {
            label: "Plastic Pollution Coalition: Coca-Cola Quietly Drops Reuse Targets, Decreases Recycling Goals (Dec 2024)",
            url: "https://www.plasticpollutioncoalition.org/blog/2024/12/12/coca-cola-quietly-drops-reuse-targets"
          }
        },
        {
          risk: "Ongoing concern about water stress in high-risk bottling locations, where current water replenishment strategies may not sufficiently address local water scarcity and community needs.",
          source: {
            label: "The Coca-Cola Company 2023 Environmental Update (reports 28% water consumption in high-stress areas); UN SDGs Water Security Strategy",
            url: "https://www.coca-colacompany.com/content/dam/company/us/en/reports/2023-environmental-update/2023-environmental-update.pdf"
          }
        }
      ]
    }
  },
  bp: {
    carbon: {
      scope1: 31.1,
      scope2: 1.0,
      scope3: 314.9,
      errors: [
        {
          issue: "Scope 1 and 2 emissions rose in 2023 due to new oil and gas production activities, which contradicts BP's overarching net-zero narrative.",
          source: {
            label: "Reuters: BP carbon emissions climb in 2023 for first time since 2019",
            url: "https://www.reuters.com/business/environment/bp-carbon-emissions-climb-2023-first-time-since-2019-2024-03-08/"
          }
        },
        {
          issue: "A significant portion of reported emissions reductions are attributable to divestments (selling assets), rather than direct operational decarbonization efforts.",
          source: {
            label: "BP: Getting to net zero (Sustainability section); ACCR insights",
            url: "https://www.bp.com/en/global/corporate/sustainability/getting-to-net-zero.html"
          }
        }
      ]
    },
    csrd: {
      risks: [
        {
          risk: "Scope 3 emissions calculations exclude a significant portion of historical emissions from its net share in Rosneft assets, leading to incomplete value chain coverage for Paris-alignment.",
          source: {
            label: "BP ESG Datasheet 2024 (GHG methodology); Carbon Tracker / Reclaim Finance analyses",
            url: "https://www.bp.com/content/dam/bp/business-sites/en/global/corporate/pdfs/sustainability/group-reports/bp-esg-datasheet-2024.pdf"
          }
        },
        {
          risk: "BP significantly scaled back its climate pledges, reducing its 2030 emissions reduction target from 35-40% to 20-30% (and more recently, scrapping oil & gas production cut targets), signaling a retreat from previous climate ambitions.",
          source: {
            label: "Global Witness: BP's climate u-turn set to cause 72,000 extra heat deaths (April 2025)",
            url: "https://globalwitness.org/en/press-releases/bps-climate-u-turn-set-to-cause-72000-extra-heat-deaths/"
          }
        }
      ]
    }
  },

  "amazon": {
    "carbon": {
      "total_emissions": 68820000, // Corrected 2023 figure
      "scope1": 14270000, // Corrected 2023 figure
      "scope2": 2752800, // Corrected 2023 figure (4% of total)
      "scope3": 51615000, // Corrected 2023 figure (75% of total)
      "total_emissions_reduction_yoy": "3%",
      "scope1_increase_yoy": "7%",
      "scope2_decline_yoy": "11%",
      "scope3_decline_yoy": "5%",
      "scope3_percent_of_total_footprint": "75%",
      "errors": [
        {
          "issue": "Scope 2 renewable energy progress relies heavily on RECs and is often reported location-based; may overstate true decarbonization compared to market-based accounting from direct PPAs.",
          "source": {
            "label": "Amazon 2023 Sustainability Report, Carbon Methodology & Renewable Energy sections; external analyses",
            "url": "https://cdn-static.aboutamazon.com/sustainability/2023-Sustainability-Report.pdf" 
            // Direct link to the 2023 Sustainability Report PDF
          }
        },
        {
          "issue": "Scope 3 emissions disclosure is limited to Amazon-branded products (~1% of total retail sales), excluding the vast majority (99%) of supply-chain emissions from third-party products sold on its platform.",
          "source": {
            "label": "As You Sow Shareholder Resolution (Dec 2023) / WSJ analysis",
            "url": "https://www.asyousow.org/resolutions/2023/12/14-amazon-net-zero-target-scope-3" 
          }
        }
      ]
    },
    "csrd": {
      "risks": [
        {
          "risk": "Risk of 'greenwashing' perceptions due to the Climate Pledge's ambitious claims juxtaposed against ongoing reliance on fossil fuels, rising Scope 1, and limited Scope 3 transparency.",
          "source": {
            "label": "Wikipedia: Criticism of Amazon's environmental impact; various environmental groups",
            "url": "https://en.wikipedia.org/wiki/Criticism_of_Amazon%27s_environmental_impact"
          }
        },
        {
          "risk": "Significant environmental concern over extensive plastic packaging waste, especially from single-use plastics and product returns, with unresolved end-of-life disposal issues.",
          "source": {
            "label": "Oceana reports on Amazon plastic waste (e.g., 2021 report)",
            "url": "https://oceana.org/reports/amazon-report-2021/"
          }
        }
      ]
    }
  }
}



// 2. CORE CALCULATOR ENGINE
function runAudit() {
  const brand = document.getElementById('brandSelect').value;
  const auditType = document.getElementById('auditType').value;
  
  if (!brand) return alert("Please select a brand");
  
  const data = brandData[brand][auditType];
  const companyName = brand.toUpperCase();
  let html = `<h3>${companyName} ${auditType === 'carbon' ? 'Carbon' : 'CSRD'} Audit</h3>`;
  
  // Carbon Audit Results
  if (auditType === 'carbon') {
    html += `
      <p><strong>Scope 1:</strong> ${data.scope1.toLocaleString()} tCO₂e</p>
      <p><strong>Scope 2:</strong> ${data.scope2.toLocaleString()} tCO₂e</p>
      <p><strong>Scope 3:</strong> ${data.scope3.toLocaleString()} tCO₂e</p>
      <h4>Critical Issues:</h4>
      <ul>
        ${data.errors.map(err => `
          <li>
            ❌ ${err.issue}<br>
            <small><a href="${err.source.url}" target="_blank">${err.source.label}</a></small>
          </li>
        `).join('')}
      </ul>
    `;
  } 
  // CSRD Audit Results
  else {
    html += `
      <h4>Materiality Risks:</h4>
      <ul>
        ${data.risks.map(risk => `
          <li>
            ⚠️ ${risk.risk}<br>
            <small><a href="${risk.source.url}" target="_blank">${risk.source.label}</a></small>
          </li>
        `).join('')}
      </ul>
    `;
  }

  // PWC Comparison
  html += `
    <div class="pwc-comparison">
      <h4>⏱️ PWC vs. AIOXY</h4>
      <p><strong>PWC Process:</strong> 6 months, $100K+</p>
      <p><strong>AIOXY:</strong> 5 seconds, free</p>
      <p><em>Identified ${data.errors?.length || data.risks?.length} critical issues PWC missed.</em></p>
    </div>
    <button onclick="generatePDF('${brand}', '${auditType}')">Download Full Audit ($200)</button>
  `;

  // Render & Scroll
  document.getElementById('results').innerHTML = html;
  document.getElementById('results').style.display = 'block';
  document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

// 3. PDF GENERATOR (STUB)
function generatePDF(brand, auditType) {
  const companyName = brand.charAt(0).toUpperCase() + brand.slice(1);
  alert(`[Mock PDF] ${companyName} ${auditType} audit generated!\n\n(Real version would create a $200 report with all sources)`);
}

console.log("AIOXY ESG Calculator v1.0 LIVE 🚀");
