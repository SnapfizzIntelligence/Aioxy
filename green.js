// ========================
// COMPLETE BRAND DATABASE
// ========================
const brands = {
  "Puma": {
    hq: "🇩🇪 Germany",
    claims: [
      {
        text: "Re:Suede sneakers are biodegradable",
        verification: "ACCURATE but lacks consumer-accessible lab certs",
        risks: [
          {
            country: "🇫🇷 France AGEC",
            level: "🔴 HIGH",
            reason: "Missing industrial composting certification (Art.13)",
            source: "https://circulareconomy.europa.eu/platform/en/strategies/french-act-law-against-waste-and-circular-economy"
          },
          {
            country: "🇬🇧 UK CMA",
            level: "🔴 HIGH", 
            reason: "Could trigger investigation like Boohoo/Asos case",
            source: "https://www.gov.uk/government/publications/green-claims-code"
          }
        ]
      },
      {
        text: "9/10 products use recycled/certified materials",
        verification: "ACCURATE (sustainability pages confirm)",
        risks: [
          {
            country: "🇦🇺 ASIC",
            level: "🟠 MODERATE",
            reason: "Forward-looking claims need disclosed methodology",
            source: "https://www.asic.gov.au/regulatory-resources/financial-services/how-to-avoid-greenwashing-when-offering-or-promoting-sustainability-related-products/"
          }
        ]
      }
    ],
    aioxyFix: {
      passport: "QR-linked biodegradability test reports + CO₂ lifecycle metrics",
      gratitudeTree: "One-tree-per-purchase with supplier stories"
    }
  },
  "Veja": {
    hq: "🇫🇷 France",
    claims: [
      {
        text: "Global 'eco-responsible' branding",
        verification: "ACCURATE but lacks product-level % data",
        risks: [
          {
            country: "🇫🇷 AGEC",
            level: "🔴 HIGH",
            reason: "Vague claims like 'eco-responsible' prohibited without % data",
            source: "https://cms.law/en/bgr/publication/cms-green-globe/france"
          },
          {
            country: "🇬🇧 CMA",
            level: "🔴 HIGH",
            reason: "Similar to actions against Boohoo/Asos",
            source: "https://www.reuters.com/world/uk/uks-cma-says-top-fashion-retailers-sign-green-claims-undertakings-2024-03-27/"
          }
        ]
      },
      {
        text: "70%+ reduction in Scope 1 & 2 emissions",
        verification: "ACCURATE (2021 emissions report)",
        risks: [
          {
            country: "🇦🇺 ASIC",
            level: "🟠 MODERATE",
            reason: "Future targets must show calculation methodology",
            source: "https://www.asic.gov.au/regulatory-resources/financial-services/how-to-avoid-greenwashing-when-offering-or-promoting-sustainability-related-products/"
          }
        ]
      }
    ],
    aioxyFix: {
      passport: "Per-product material % (organic cotton, rPET) + emissions calculator",
      gratitudeTree: "Tree planting with dashboard tracking"
    }
  },
  "Allbirds": {
    hq: "🇺🇸 USA",
    claims: [
      {
        text: "Carbon neutral across entire supply chain",
        verification: "ACCURATE (via offsets) but lacks product-level breakdown",
        risks: [
          {
            country: "🇬🇧 CMA",
            level: "🟠 MODERATE",
            reason: "'Carbon neutral' claims require detailed offset disclosures",
            source: "https://www.gov.uk/government/publications/green-claims-code"
          },
          {
            country: "🇫🇷 AGEC",
            level: "🟠 MODERATE",
            reason: "Must show % reduction vs offsetting per product",
            source: "https://circulareconomy.europa.eu/platform/en/strategies/french-act-law-against-waste-and-circular-economy"
          }
        ]
      }
    ],
    aioxyFix: {
      passport: "Real-time carbon tracking per shoe (+ offset sources)",
      gratitudeTree: "Regenerative wool funding tracker"
    }
  },
  "Vaude": {
    hq: "🇩🇪 Germany",
    claims: [
      {
        text: "Net Zero by 2040",
        verification: "SBTi-aligned but lacks interim targets",
        risks: [
          {
            country: "🇩🇪 LkSG",
            level: "🟠 MODERATE",
            reason: "Supply chain decarbonization must be proven annually",
            source: "https://www.csr-in-deutschland.de/EN/Business-Human-Rights/Supply-Chain-Act/supply-chain-act.html"
          }
        ]
      }
    ],
    aioxyFix: {
      passport: "Supplier-by-supplier CO₂ reduction dashboard",
      gratitudeTree: "Peatland restoration counter"
    }
  },
  "Armedangels": {
    hq: "🇩🇪 Germany",
    claims: [
      {
        text: "84% certified/recycled materials",
        verification: "ACCURATE (GOTS/GRS certified)",
        risks: [
          {
            country: "🇫🇷 AGEC",
            level: "🟠 MODERATE",
            reason: "Must show % per product, not just collection average",
            source: "https://cms.law/en/bgr/publication/cms-green-globe/france"
          }
        ]
      }
    ],
    aioxyFix: {
      passport: "Circularity.ID chip integration with LCA data",
      gratitudeTree: "Detox water savings calculator"
    }
  },
  "Sheep Inc": {
    hq: "🇬🇧 UK",
    claims: [
      {
        text: "Carbon-negative wool",
        verification: "ACCURATE but lacks consumer-facing proof",
        risks: [
          {
            country: "🇬🇧 CMA",
            level: "🔴 HIGH",
            reason: "Negative claims require third-party verification",
            source: "https://www.gov.uk/government/publications/green-claims-code"
          }
        ]
      }
    ],
    aioxyFix: {
      passport: "Farm-to-garment carbon ledger",
      gratitudeTree: "Sheep adoption certificates"
    }
  }
};

// ========================
// CORE FUNCTIONALITY
// ========================
function simulateLoading() {
  let dots = 0;
  const loadingText = document.getElementById("loadingDots");
  const interval = setInterval(() => {
    dots = (dots + 1) % 4;
    loadingText.textContent = ".".repeat(dots) + " ".repeat(3 - dots);
  }, 300);
  return interval;
}

function analyzeBrand() {
  const input = document.getElementById("brandInput").value.trim();
  const brand = brands[input];
  const loadingInterval = simulateLoading();
  
  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("results").innerHTML = "";
  
  setTimeout(() => {
    clearInterval(loadingInterval);
    document.getElementById("loading").classList.add("hidden");
    
    if (!brand) {
      document.getElementById("results").innerHTML = `
        <div class="brand-report">
          <h3>Brand not found</h3>
          <p>Try one of these:</p>
          <ul>
            ${Object.keys(brands).map(b => `<li>${b}</li>`).join("")}
          </ul>
        </div>`;
      return;
    }
    
    let html = `<div class="brand-report">
      <h2>${input} <small>${brand.hq}</small></h2>
      <div class="risk-summary">
        <h3>📊 Key Risks</h3>
        <ul>`;
    
    // Risk summary
    const highRiskCountries = new Set();
    brand.claims.forEach(claim => {
      claim.risks.forEach(risk => {
        if (risk.level.includes("HIGH")) highRiskCountries.add(risk.country);
      });
    });
    
    highRiskCountries.forEach(country => {
      html += `<li><span class="country-flag">${country}</span> <span class="risk-high">🔴 HIGH RISK</span></li>`;
    });
    
    html += `</ul></div><h3>🔍 Claim-by-Claim Analysis</h3>`;
    
    // Claims analysis
    brand.claims.forEach((claim, i) => {
      html += `<div class="claim">
        <h4>${i+1}. "${claim.text}"</h4>
        <p><strong>Verification:</strong> ${claim.verification}</p>
        <div class="risks">
          <h5>Regulatory Risks:</h5>
          <ul>`;
      
      claim.risks.forEach(risk => {
        html += `<li>
          <span class="country-flag">${risk.country}</span>
          <span class="risk-${risk.level.includes('HIGH') ? 'high' : 
                            risk.level.includes('MODERATE') ? 'moderate' : 'low'}">
            ${risk.level}
          </span> - ${risk.reason}
          <br><a href="${risk.source}" target="_blank"><span class="material-icons">open_in_new</span> Source</a>
        </li>`;
      });
      
      html += `</ul></div></div>`;
    });
    
    // AIOXY Solution
    html += `<div class="aioxy-fix">
      <h3>🚀 AIOXY Compliance Solution</h3>
      <p><strong>Digital Product Passport:</strong> ${brand.aioxyFix.passport}</p>
      <p><strong>Gratitude Tree:</strong> ${brand.aioxyFix.gratitudeTree}</p>
      <div class="fix">
        <strong>How this fixes risks:</strong> Automates compliance for ${highRiskCountries.size}+ regulations with consumer-facing proof.
      </div>
    </div>`;
    
    document.getElementById("results").innerHTML = html + "</div>";
  }, 1500);
}
