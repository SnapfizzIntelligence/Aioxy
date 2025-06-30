const brandData = {
  tesla: {
    carbon: {
      scope1: 211000,
      scope2: 466000,
      scope3: 49354000,
      big4: {
        scope1: 211000,
        scope2: 466000,
        scope3: 49354000,
        source: "https://www.tesla.com/impact-report/2023",
        assurance: "Company Verified"
      },
      errors: [{
        issue: "Scope 2 uses grid-average factors (location-based)",
        source: {
          label: "Tesla 2023 Impact Report p.158",
          url: "https://www.tesla.com/impact-report/2023"
        }
      }]
    }
  },
  bp: {
    carbon: {
      scope1: 31.1,
      scope2: 1.0,
      scope3: 314.9,
      big4: {
        scope1: 31.1,
        scope2: 1.0,
        scope3: null,
        source: "https://www.bp.com/en/global/corporate/sustainability.html",
        assurance: "Deloitte (Scope 1-2 only)"
      },
      errors: [{
        issue: "Scope 1 emissions rose 7% in 2023 due to new oil projects",
        source: {
          label: "Reuters 2024",
          url: "https://www.reuters.com"
        }
      }]
    }
  },
  samsung: {
    carbon: {
      scope1: 5.972,
      scope2: 9.081,
      scope3: 123.0,
      big4: {
        scope1: 5.972,
        scope2: 9.081,
        scope3: 123.0,
        source: "https://www.samsung.com/us/sustainability/report/",
        assurance: "KFQ Verified"
      },
      errors: []
    }
  },
  apple: {
    carbon: {
      scope1: 55200,
      scope2: 3400,
      scope3: 15982800,
      big4: {
        scope1: 55200,
        scope2: 3400,
        scope3: null,
        source: "https://www.apple.com/environment/",
        assurance: "Apex Companies (Partial)"
      },
      errors: [{
        issue: "Scope 3 uses industry-average data (~15% uncertainty)",
        source: {
          label: "Apple Report p.94",
          url: "https://www.apple.com/environment/pdf/Apple_Environmental_Progress_Report_2024.pdf"
        }
      }]
    }
  },
  microsoft: {
    carbon: {
      scope1: 144960,
      scope2: 393134,
      scope3: 16475520,
      big4: {
        scope1: 144960,
        scope2: 393134,
        scope3: 14819000,
        source: "https://www.microsoft.com/en-us/sustainability",
        assurance: "Company Verified"
      },
      errors: []
    }
  }
};

function runAudit() {
  const brand = document.getElementById('brandSelect').value;
  if (!brand) return alert("Please select a brand");
  
  const data = brandData[brand].carbon;
  const big4 = data.big4;

  let html = `
    <h2>${brand.charAt(0).toUpperCase() + brand.slice(1)} Carbon Audit</h2>
    <div class="assurance-badge">Data Source: ${big4.assurance}</div>
    
    <table class="proof-table">
      <tr>
        <th>Metric</th>
        <th>Reported Value</th>
        <th>AIOXY Value</th>
        <th>Variance</th>
      </tr>
      ${generateRow('Scope 1', data, big4)}
      ${generateRow('Scope 2', data, big4)}
      ${generateRow('Scope 3', data, big4)}
    </table>
  `;

  if (data.errors.length > 0) {
    html += `<h3>AIOXY Findings</h3><ul>`;
    data.errors.forEach(error => {
      html += `<li>${error.issue} <a href="${error.source.url}" target="_blank">[Source]</a></li>`;
    });
    html += `</ul>`;
  }

  document.getElementById('results').innerHTML = html;
}

function generateRow(metric, data, big4) {
  const reportedVal = big4[metric.toLowerCase()];
  const aioxyVal = data[metric.toLowerCase()];
  const unit = metric === 'Scope 3' ? ' MT' : ' tCO2e';

  let variance = 'N/A';
  if (reportedVal !== null && reportedVal !== undefined) {
    variance = ((aioxyVal - reportedVal) / reportedVal * 100).toFixed(1) + '%';
  }

  return `
    <tr>
      <td>${metric}</td>
      <td>${reportedVal !== null ? reportedVal + unit : 'Not assured'}</td>
      <td>${aioxyVal}${unit}</td>
      <td class="${reportedVal < aioxyVal ? 'risk-flag' : ''}">${variance}</td>
    </tr>
  `;
          }
