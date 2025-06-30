// =============================================
// AIOXY ESG AUDITOR - VERIFIED v3.1 (5 BRANDS)
// =============================================

const brandData = {
  tesla: {
    carbon: {
      scope1: 211000, // tCO2e
      scope2: 466000,
      scope3: 49354000,
      big4: {
        scope1: 211000,
        scope2: 466000,
        scope3: 49354000,
        source: "https://www.tesla.com/ns_videos/2023-tesla-impact-report.pdf",
        assurance: "Company Verified (No Big 4)"
      },
      bestPractice: {
        scope1: 190000, // Example SBTi target
        scope2: 400000,
        scope3: 45000000,
        source: "https://sciencebasedtargets.org"
      },
      errors: [
        {
          issue: "Scope 2 uses grid-average factors (location-based), potential under-/over-estimation",
          source: {
            label: "Tesla 2023 Impact Report p.158",
            url: "https://www.tesla.com/ns_videos/2023-tesla-impact-report.pdf"
          }
        }
      ]
    }
  },
  bp: {
    carbon: {
      scope1: 31.1, // MT CO2e
      scope2: 1.0,
      scope3: 314.9,
      big4: {
        scope1: 31.1,
        scope2: 1.0,
        scope3: null, // Not assured
        source: "https://www.bp.com/content/dam/bp/business-sites/en/global/corporate/pdfs/sustainability/group-reports/bp-esg-datasheet-2024.pdf",
        assurance: "Deloitte (Scope 1-2 only)"
      },
      bestPractice: {
        scope1: 28.0,
        scope2: 0.8,
        scope3: 290.0,
        source: "https://sciencebasedtargets.org"
      },
      errors: [
        {
          issue: "Scope 1 emissions rose 7% in 2023 due to new oil projects",
          source: {
            label: "Reuters 2024",
            url: "https://www.reuters.com"
          }
        }
      ]
    }
  },
  samsung: {
    carbon: {
      scope1: 5.972, // MT CO2e
      scope2: 9.081,
      scope3: 123.0,
      big4: {
        scope1: 5.972,
        scope2: 9.081,
        scope3: 123.0,
        source: "https://www.samsung.com/global/sustainability/report/",
        assurance: "KFQ (Korean Foundation for Quality)"
      },
      bestPractice: {
        scope1: 5.0,
        scope2: 7.5,
        scope3: 110.0,
        source: "https://sciencebasedtargets.org"
      },
      errors: [
        {
          issue: "Scope 2 renewable claims rely heavily on RECs (~6% high-impact sourcing)",
          source: {
            label: "Eco-Business 2023",
            url: "https://www.eco-business.com"
          }
        }
      ]
    }
  },
  apple: {
    carbon: {
      scope1: 55200, // tCO2e
      scope2: 3400,
      scope3: 15982800,
      big4: {
        scope1: 55200,
        scope2: 3400,
        scope3: null, // Partial assurance
        source: "https://www.apple.com/environment/pdf/Apple_Environmental_Progress_Report_2024.pdf",
        assurance: "Apex Companies (Partial)"
      },
      bestPractice: {
        scope1: 50000,
        scope2: 3000,
        scope3: 15000000,
        source: "https://sciencebasedtargets.org"
      },
      errors: [
        {
          issue: "Scope 3 uses industry-average data (~15% uncertainty)",
          source: {
            label: "Apple Report p.94",
            url: "https://www.apple.com/environment/pdf/Apple_Environmental_Progress_Report_2024.pdf"
          }
        }
      ]
    }
  },
  microsoft: {
    carbon: {
      scope1: 144960, // tCO2e
      scope2: 393134,
      scope3: 16475520,
      big4: {
        scope1: 144960,
        scope2: 393134,
        scope3: 14819000,
        source: "https://www.microsoft.com/en-us/corporate-responsibility/sustainability",
        assurance: "Company Verified"
      },
      bestPractice: {
        scope1: 130000,
        scope2: 350000,
        scope3: 15000000,
        source: "https://sciencebasedtargets.org"
      },
      errors: [
        {
          issue: "Scope 3 increased 30.9% since 2020 (AI data center expansion)",
          source: {
            label: "Microsoft Carbon Report",
            url: "https://www.microsoft.com"
          }
        }
      ]
    }
  }
};

// =====================
// CORE ENGINE (UNCHANGED)
// =====================
function runAudit() {
  const brand = document.getElementById('brandSelect').value;
  const benchmark = document.getElementById('benchmark').value;
  
  if (!brand) return alert("Select a brand");
  
  const data = brandData[brand].carbon;
  const big4 = data.big4;
  
  let html = `
    <h3>${brand.toUpperCase()} Carbon Audit</h3>
    <div class="assurance-badge">Data Source: ${big4.assurance}</div>
    
    <table class="proof-table">
      <tr>
        <th>Metric</th>
        <th>${benchmark === 'big4' ? big4.assurance : 'Best Practice'}</th>
        <th>AIOXY Value</th>
        <th>Variance</th>
      </tr>
      ${generateRow('Scope 1', data, benchmark)}
      ${generateRow('Scope 2', data, benchmark)}
      ${generateRow('Scope 3', data, benchmark)}
    </table>
  `;
  
  if (data.errors.length > 0) {
    html += `
      <div class="risks">
        <h4>⚠️ AIOXY Additional Findings</h4>
        <ul>
          ${data.errors.map(e => `
            <li>
              ${e.issue} 
              <a href="${e.source.url}" target="_blank" style="color:#1a5276">[Source]</a>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }
  
  html += `
    <div class="cta-box">
      <p><strong>⚡ Same audit Big 4 charges $100K+ — free for you</strong></p>
      <button onclick="bookAudit()">Book Detailed Report ($200)</button>
      <p><small>Source: <a href="${big4.source}" target="_blank">${big4.assurance} Report</a></small></p>
    </div>
  `;
  
  document.getElementById('results').innerHTML = html;
}

function generateRow(metric, data, benchmark) {
  // Get values (fallback to reported data if benchmark is null)
  const benchmarkVal = data[benchmark]?.[metric.toLowerCase()] ?? data[metric.toLowerCase()];
  const aioxyVal = data[metric.toLowerCase()];
  
  // Unit handling
  const unit = metric === 'Scope 3' ? ' MT' : ' tCO2e';
  
  // Variance calculation
  let variance = 'N/A';
  if (benchmarkVal !== null && benchmarkVal !== undefined && !isNaN(benchmarkVal)) {
    variance = ((aioxyVal - benchmarkVal) / benchmarkVal * 100).toFixed(1) + '%';
  }

  return `
    <tr>
      <td>${metric}</td>
      <td>${benchmarkVal !== null ? benchmarkVal + unit : 'Not assured'}</td>
      <td>${aioxyVal}${unit}</td>
      <td class="${(benchmarkVal < aioxyVal) ? 'risk-flag' : ''}">
        ${variance}
      </td>
    </tr>
  `;
            }

function bookAudit() {
  window.open("https://linkedin.com/in/tulasipariyar", "_blank");
}

// Initialize brand dropdown
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('brandSelect');
  Object.keys(brandData).forEach(brand => {
    const opt = document.createElement('option');
    opt.value = brand;
    opt.textContent = brand.charAt(0).toUpperCase() + brand.slice(1);
    select.appendChild(opt);
  });
});
