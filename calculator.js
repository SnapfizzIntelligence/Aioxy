const companiesData = {
  "tesla": {
    "carbon": {
      "scope1": 211000,
      "scope2": 466000,
      "scope3": 49354000,
      "errors": [
        {
          "issue": "Scope 2 uses grid-average factors (location-based), potential under-/over-estimation compared to market-based method",
          "source": {
            "label": "Tesla 2023 Impact Report, GHG Emissions Disclosure (Methodology discussion, p.158)",
            "url": "https://googleusercontent.com/drive/folders/1tA1R9w-xP-kE-yB4Yq8X_L6Z8_B0_p3z"
          }
        }
      ],
      "big4": {
        "scope1": 211000,
        "scope2": 466000,
        "scope3": 49354000,
        "source": "https://googleusercontent.com/drive/folders/1tA1R9w-xP-kE-yB4Yq8X_L6Z8_B0_p3z",
        "assurance": "Official Company Asserted (No Independent External Assurance Disclosed)"
      }
    }
  },
  "bp": {
    "carbon": {
      "scope1": 31.1,
      "scope2": 1.0,
      "scope3": 314.9,
      "big4": {
        "scope1": 31.1,
        "scope2": 1.0,
        "scope3": null,
        "source": "https://www.bp.com/content/dam/bp/business-sites/en/global/corporate/pdfs/sustainability/group-reports/bp-esg-datasheet-2024.pdf",
        "assurance": "Deloitte (Limited Assurance for Scope 1 & 2 Operational Control)"
      }
    }
  },
  "samsung": {
    "carbon": {
      "scope1": 5.972,
      "scope2": 9.081,
      "scope3": 123.0,
      "big4": {
        "scope1": 5.972,
        "scope2": 9.081,
        "scope3": 123.0,
        "source": "https://googleusercontent.com/drive/folders/1tA1R9w-xP-kE-yB4Yq8X_L6Z8_B0_p3z",
        "assurance": "KFQ (Korean Foundation for Quality)"
      }
    }
  },
  "Apple": {
    "carbon": {
      "scope1": 55200,
      "scope2": 3400,
      "scope3": 15982800,
      "reduction_since_2015": ">55%",
      "errors": [
        {
          "issue": "Scope 3 uses industry-average data (potential uncertainty from methodology)",
          "source": {
            "label": "Apple Environmental Progress Report 2024, Appendix B: Apple's life cycle assessment methodology (p.94)",
            "url": "https://googleusercontent.com/drive/folders/1tA1R9w-xP-kE-yB4Yq8X_L6Z8_B0_p3z"
          }
        }
      ],
      "big4": {
        "scope1": 55200,
        "scope2": 3400,
        "scope3": null,
        "source": "https://googleusercontent.com/drive/folders/1tA1R9w-xP-kE-yB4Yq8X_L6Z8_B0_p3z",
        "assurance": "Apex Companies, LLC (Partial Scope 3, major parts by 'another third-party')"
      }
    }
  },
  "microsoft": {
    "carbon": {
      "scope1": 144960,
      "scope2": 393134,
      "scope3": 14819000,
      "scope1_2_reduction_since_2020": "6.3%",
      "scope3_increase_since_2020": "30.9%",
      "scope3_percent_of_total_footprint": ">96%",
      "big4": {
        "scope1": 144960,
        "scope2": 393134,
        "scope3": 14819000,
        "source": "https://googleusercontent.com/drive/folders/1tA1R9w-xP-kE-yB4Yq8X_L6Z8_B0_p3z",
        "assurance": "Official Company Verified (Signed by CSO & Board)"
      }
    }
  }
};

// Function to display data on the HTML page
function displayCompanyData() {
  const container = document.getElementById('companies-data');
  for (const companyName in companiesData) {
    if (companiesData.hasOwnProperty(companyName)) {
      const company = companiesData[companyName];
      const companyDiv = document.createElement('div');
      companyDiv.className = 'company-card';

      let htmlContent = `<h2>${companyName.toUpperCase()}</h2>`;
      htmlContent += `<h3>Carbon Data:</h3>`;
      htmlContent += `<ul>`;

      for (const key in company.carbon) {
        if (company.carbon.hasOwnProperty(key)) {
          if (key === 'big4') {
            htmlContent += `<li><strong>Assurance Details (Big 4 / Official):</strong><ul>`;
            for (const big4Key in company.carbon.big4) {
              if (company.carbon.big4.hasOwnProperty(big4Key)) {
                if (big4Key === 'source' && typeof company.carbon.big4[big4Key] === 'string' && company.carbon.big4[big4Key].startsWith('http')) {
                  htmlContent += `<li>${big4Key.replace(/_/g, ' ')}: <a href="${company.carbon.big4[big4Key]}" target="_blank">Link to Source</a></li>`;
                } else {
                  htmlContent += `<li>${big4Key.replace(/_/g, ' ')}: ${JSON.stringify(company.carbon.big4[big4Key])}</li>`;
                }
              }
            }
            htmlContent += `</ul></li>`;
          } else if (key === 'errors') {
            htmlContent += `<li><strong>Errors/Notes:</strong><ul>`;
            company.carbon.errors.forEach(error => {
              htmlContent += `<li>Issue: ${error.issue}`;
              if (error.source && error.source.url && typeof error.source.url === 'string' && error.source.url.startsWith('http')) {
                htmlContent += ` (Source: ${error.source.label} - <a href="${error.source.url}" target="_blank">Link</a>)`;
              } else if (error.source && error.source.label) {
                 htmlContent += ` (Source: ${error.source.label})`;
              }
              htmlContent += `</li>`;
            });
            htmlContent += `</ul></li>`;
          } else if (typeof company.carbon[key] !== 'object' || company.carbon[key] === null) { // Simple display for non-object, non-null values
            htmlContent += `<li><strong>${key.replace(/_/g, ' ')}:</strong> ${JSON.stringify(company.carbon[key])}</li>`;
          } else if (Array.isArray(company.carbon[key])) { // For arrays like errors, though already handled above
             htmlContent += `<li><strong>${key.replace(/_/g, ' ')}:</strong> ${JSON.stringify(company.carbon[key])}</li>`;
          }
        }
      }
      htmlContent += `</ul>`;
      companyDiv.innerHTML = htmlContent;
      container.appendChild(companyDiv);
    }
  }
}

document.addEventListener('DOMContentLoaded', displayCompanyData);
