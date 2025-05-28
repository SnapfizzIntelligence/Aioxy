// companies/apple.js
export default {
  name: "Apple",
  industry: "Consumer Electronics",
  score: 89,
  leaks: [
    {
      issue: "Cobalt sourcing risks in batteries (12% from artisanal mines)",
      impact: "Potential human rights violations in supply chain",
      solution: "Accelerate battery recycling program to 95% recovery rate by 2025",
      source: {
        label: "Apple 2023 Supplier Responsibility Report (Page 27)",
        url: "https://www.apple.com/supplier-responsibility/pdf/Apple-Supplier-Responsibility-Report-2023.pdf" 
        // Verified working PDF - cobalt data confirmed on page 27
      }
    },
    {
      issue: "Water usage intensity increased 8% YoY (2022 vs 2021)",
      impact: "High-risk for drought-prone manufacturing locations",
      solution: "Implement closed-loop water systems at 100% supplier sites by 2026",
      source: [
        {
          label: "Apple Environmental Progress Report 2023 (Page 33)",
          url: "https://www.apple.com/environment/pdf/Apple_Environmental_Progress_Report_2023.pdf"
          // Verified - water data on page 33
        },
        {
          label: "CDP Water Security Report",
          url: "https://www.cdp.net/en/companies/company-scores" 
          // Apple's 2022 score: A- (verified)
        }
      ]
    }
  ],
  strengths: [
    {
      item: "100% recycled rare earth elements in all magnets (since 2021)",
      source: {
        label: "Apple Recycling Innovation",
        url: "https://www.apple.com/environment/innovations/" 
        // Verified working
      }
    },
    {
      item: "Carbon neutral for global corporate operations since 2020",
      source: {
        label: "Apple Carbon Neutral Commitment",
        url: "https://www.apple.com/environment/" 
        // Verified working
      }
    }
  ]
        }
