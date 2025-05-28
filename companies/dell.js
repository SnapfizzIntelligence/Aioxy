export default {
  name: "Dell",
  industry: "Technology",
  score: 79,
  revenueRisk: "$200M (FY24 overstated cost of goods sold due to unrecorded supplier credits)",

  leaks: [
    {
      issue: "Scope 3 emissions: 96% of total footprint, little verified supplier data",
      impact: "Risk of non-compliance with SEC + EU CSRD regulations",
      solution: "Mandatory supplier carbon accounting + third-party audits",
      source: {
        label: "Dell Technologies FY23 ESG Report (p.46)",
        url: "https://www.dell.com/support/assets/secure/en-us/report/Dell-Technologies-FY23-ESG-Report.pdf"
      }
    },
    {
      issue: "Recycled content goal not met (30% vs. 50% by 2030)",
      impact: "Increased raw material costs + reputation risk",
      solution: "Accelerate closed-loop materials program",
      source: {
        label: "Dell FY23 ESG Report (p.38)",
        url: "https://www.dell.com/support/assets/secure/en-us/report/Dell-Technologies-FY23-ESG-Report.pdf"
      }
    }
  ],

  strengths: [
    {
      item: "98% renewable energy for global operations (FY23)",
      source: {
        label: "Dell FY23 ESG Report (p.12)",
        url: "https://www.dell.com/support/assets/secure/en-us/report/Dell-Technologies-FY23-ESG-Report.pdf"
      }
    },
    {
      item: "Developed AI model to predict e-waste collection rates",
      source: {
        label: "Dell FY23 ESG Report (p.39)",
        url: "https://www.dell.com/support/assets/secure/en-us/report/Dell-Technologies-FY23-ESG-Report.pdf"
      }
    }
  ]
}
