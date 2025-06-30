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

// Helper function to format keys nicely (e.g., 'scope1_2_total_market_based_2023' -> 'Scope 1 2 Total Market Based 2023')
function formatKey(key) {
    // Replace underscores with spaces, then capitalize the first letter of each word
    return key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}

// Recursive function to build HTML list for nested objects and arrays
function buildList(data) {
    let listHtml = '<ul>';
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = data[key];
            listHtml += `<li><strong>${formatKey(key)}:</strong> `;

            if (typeof value === 'string' && value.startsWith('http')) {
                // Handle URLs
                listHtml += `<a href="${value}" target="_blank">Link to Source</a>`;
            } else if (typeof value === 'object' && value !== null) {
                if (Array.isArray(value)) {
                    // Handle arrays, specifically for 'errors'
                    listHtml += '<ul>';
                    value.forEach(item => {
                        listHtml += `<li>`;
                        if (item.issue) { // For error objects
                            listHtml += `Issue: ${item.issue}`;
                            if (item.source && item.source.url && typeof item.source.url === 'string' && item.source.url.startsWith('http')) {
                                listHtml += ` (Source: ${item.source.label} - <a href="${item.source.url}" target="_blank">Link</a>)`;
                            } else if (item.source && item.source.label) {
                                listHtml += ` (Source: ${item.source.label})`;
                            }
                        } else { // Generic array item
                            listHtml += JSON.stringify(item); // Fallback for other array items
                        }
                        listHtml += `</li>`;
                    });
                    listHtml += '</ul>';
                } else {
                    // Handle nested objects
                    listHtml += buildList(value);
                }
            } else {
                // Handle primitive values (numbers, strings, booleans, null)
                listHtml += (value === null || value === undefined) ? 'N/A' : value;
            }
            listHtml += '</li>';
        }
    }
    listHtml += '</ul>';
    return listHtml;
}

// Main function to display all company data
function displayCompanyData() {
  const container = document.getElementById('companies-data');
  if (!container) {
      console.error("Error: HTML element with ID 'companies-data' not found. Make sure it exists in calculator.html.");
      return; // Stop execution if container is not found
  }

  for (const companyName in companiesData) {
    if (companiesData.hasOwnProperty(companyName)) {
      const company = companiesData[companyName];
      const companyDiv = document.createElement('div');
      companyDiv.className = 'company-card';

      let htmlContent = `<h2>${companyName.toUpperCase()}</h2>`;
      htmlContent += `<h3>Carbon Data:</h3>`;
      htmlContent += `<ul>`;

      for (const carbonKey in company.carbon) {
        if (company.carbon.hasOwnProperty(carbonKey)) {
          const carbonValue = company.carbon[carbonKey];

          // Special handling for 'big4' and 'errors' objects
          if (carbonKey === 'big4') {
            htmlContent += `<li><strong>Assurance Details (Big 4 / Official):</strong>${buildList(carbonValue)}</li>`;
          } else if (carbonKey === 'errors') {
            htmlContent += `<li><strong>Errors/Notes:</strong>${buildList(carbonValue)}</li>`;
          }
          // For all other top-level carbon properties (scope1, scope2, scope3, etc.)
          else if (typeof carbonValue !== 'object' || carbonValue === null) {
            htmlContent += `<li><strong>${formatKey(carbonKey)}:</strong> ${carbonValue !== null ? carbonValue : 'N/A'}</li>`;
          } else {
              // Fallback for any unexpected nested objects directly under carbon (shouldn't happen with current data, but for robustness)
              htmlContent += `<li><strong>${formatKey(carbonKey)}:</strong> ${buildList(carbonValue)}</li>`;
          }
        }
      }
      htmlContent += `</ul>`;
      companyDiv.innerHTML = htmlContent;
      container.appendChild(companyDiv);
    }
  }
}

// Ensure the function runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', displayCompanyData);
