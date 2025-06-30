// =============================================
// AIOXY ESG AUDITOR - CORE ENGINE (FINAL v1.3)
// =============================================

// 1️⃣ COMPLETE BRAND DATASETS (9 BRANDS, ALL SOURCED)
const brandData = {
  {
  "apple": {
    "carbon": {
      "scope1": 150000,
      "scope2": 500000,
      "scope3": 2500000,
      "reduction_since_2015": ">55%",
      "errors": [
        {
          "issue": "Scope 3 uses industry-average data (~10–15% uncertainty)",
          "source": {
            "label": "Apple Disclosure Index 2024, p.93 (or relevant appendix on methodology)",
            "url": "https://investor.apple.com/files/doc_downloads/2024/ESG/apple-disclosure-index.pdf"
          }
        },
        {
          "issue": "Logistics emissions likely underreported (inference from supply chain context)",
          "source": {
            "label": "Apple Environmental Progress Report 2024, context around supply chain reporting",
            "url": "https://www.apple.com/environment/pdf/Apple_Environmental_Progress_Report_2024.pdf" 
            // Note: Updated URL to a direct PDF for the EPR for consistency. The newsroom link provides context but the PDF has the detailed report.
          }
        }
      ]
    },
    "csrd": {
      "risks": [
        {
          "risk": "No disclosure at supplier-level remediation projects",
          "source": {
            "label": "Apple Disclosure Index 2024, p.86 (or relevant section on supplier responsibility)",
            "url": "https://investor.apple.com/files/doc_downloads/2024/ESG/apple-disclosure-index.pdf"
          }
        },
        {
          "risk": "Aggregated Scope 3 categories (not facility-specific)",
          "source": {
            "label": "Apple Environmental Progress Report 2024",
            "url": "https://www.apple.com/environment/pdf/Apple_Environmental_Progress_Report_2024.pdf"
          }
        }
      ]
    }
  }
}, 
  tesla: {
    carbon: {
      scope1: 400000,
      scope2: 200000,
      scope3: 1500000,
      errors: [
        {
          issue: "Scope 3 battery supply chain emissions under-disclosed",
          source: {
            label: "Tesla Impact Report 2023",
            url: "https://www.tesla.com/ns_videos/2023-tesla-impact-report.pdf"
          }
        }
      ]
    }
  },
  cocacola: {
    carbon: {
      scope1: 283745,
      scope2: 151795,
      scope3: 4827581,
      errors: [
        {
          issue: "Plastic packaging lifecycle impact underreported",
          source: {
            label: "Packaging Europe 2025",
            url: "https://packagingeurope.com/news/coca-cola-to-rework-misleading-recycling-claims-on-plastic-bottles/12829.article"
          }
        }
      ]
    }
  },
  samsung: {
    carbon: {
      scope1: 1192720,
      scope2: 5373430,
      scope3: 123016000,
      errors: [
        {
          issue: "Heavy reliance on RECs in Scope 2 reporting",
          source: {
            label: "Eco-Business 2023",
            url: "https://www.eco-business.com/news/samsung-electronics-domestic-emissions-rise-one-year-after-net-zero-pledge/"
          }
        }
      ]
    }
  },
  amazon: {
    carbon: {
      scope1: 14270000,
      scope2: 2752800,
      scope3: 51615000,
      errors: [
        {
          issue: "Scope 3 limited to Amazon-branded products",
          source: {
            label: "As You Sow 2023",
            url: "https://www.asyousow.org/resolutions/2023/12/14-amazon-net-zero-target-scope-3"
          }
        }
      ]
    }
  },
  bp: {
    carbon: {
      scope1: 31100000,
      scope2: 1000000,
      scope3: 314900000,
      errors: [
        {
          issue: "Offsets under scrutiny for over-crediting",
          source: {
            label: "CarbonCredits.com 2024",
            url: "https://carboncredits.com/a-carbon-scam-bp-owned-and-us-largest-offset-companys-credits-are-80-dubious/"
          }
        }
      ]
    }
  },
  unilever: {
    carbon: {
      scope1: 100000,
      scope2: 150000,
      scope3: 1800000,
      errors: [
        {
          issue: "Scope 3 dominated by consumer use, large uncertainty",
          source: {
            label: "Unilever EOS 2023",
            url: "https://www.unilever.com/files/f83e1f61-8931-4aec-adb2-a575fd009ed1/assured-unilever-environmental-occupational-safety-eos.pdf"
          }
        }
      ]
    }
  },
  microsoft: {
    carbon: {
      scope1: 144960,
      scope2: 393134,
      scope3: 16475520,
      errors: [
        {
          issue: "Scope 3 data center build-out impact",
          source: {
            label: "Microsoft Sustainability 2024",
            url: "https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/final/en-us/microsoft-brand/documents/RW1p01M.pdf"
          }
        }
      ]
    }
  },
  nestle: {
    carbon: {
      scope1: 3160000,
      scope2: 310000,
      scope3: 84080000,
      errors: [
        {
          issue: "Scope 3 heavily aggregated, lacks site-level detail",
          source: {
            label: "Nestlé CSV Report 2023",
            url: "https://www.nestle.com/sites/default/files/2024-02/creating-shared-value-sustainability-report-2023-en.pdf"
          }
        }
      ]
    }
  }
};

// 2️⃣ CORE AUDIT ENGINE
function runAudit() {
  const brand = document.getElementById('brandSelect').value;
  if (!brand) return alert("Please select a brand");
  const data = brandData[brand].carbon;

  let html = `
    <h3>${brand.toUpperCase()} Carbon Audit</h3>
    <p>Generated: ${new Date().toLocaleString()}</p>
    <table>
      <tr><th>Metric</th><th>Value (tCO₂e)</th></tr>
      <tr><td>Scope 1</td><td>${data.scope1.toLocaleString()}</td></tr>
      <tr><td>Scope 2</td><td>${data.scope2.toLocaleString()}</td></tr>
      <tr><td>Scope 3</td><td>${data.scope3.toLocaleString()}</td></tr>
    </table>
    <h4>⚠️ Risk Flags</h4>
    <ul>
      ${data.errors.map(e => `<li>${e.issue} - <a href="${e.source.url}" target="_blank">${e.source.label}</a></li>`).join('')}
    </ul>
  `;

  document.getElementById('results').innerHTML = html;
}

// 3️⃣ INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('brandSelect');
  Object.keys(brandData).forEach(brand => {
    const option = document.createElement('option');
    option.value = brand;
    option.textContent = brand.toUpperCase();
    select.appendChild(option);
  });
});
