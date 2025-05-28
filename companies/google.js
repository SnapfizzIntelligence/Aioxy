export default {
  name: "Google",
  industry: "Technology",
  score: 88, // Based on analysis of sustainability leadership and SBTi alignment
  leaks: [
    {
      issue: "Scope 3 emissions exceed operational footprint (13.5 Mt CO₂e)",
      impact: "Risk of non-alignment with EU CSRD & SEC disclosure rules",
      solution: "Expand supplier engagement for renewable energy sourcing",
      source: {
        label: "Google Environmental Report 2023, p.17",
        url: "https://www.gstatic.com/gumdrop/sustainability/google-2023-environmental-report.pdf#page=17"
      }
    },
    {
      issue: "Data center water usage grew by 20% YoY (for AI expansion)",
      impact: "Public scrutiny in drought-prone regions (Arizona, Chile)",
      solution: "Adopt Microsoft-style circular water systems",
      source: {
        label: "Google Environmental Report 2023, p.25",
        url: "https://www.gstatic.com/gumdrop/sustainability/google-2023-environmental-report.pdf#page=25"
      }
    }
  ],
  strengths: [
    {
      item: "Maintains 100% renewable energy matching since 2017",
      source: {
        label: "Google Environmental Report 2023, p.11",
        url: "https://www.gstatic.com/gumdrop/sustainability/google-2023-environmental-report.pdf#page=11"
      }
    },
    {
      item: "Achieved 64% waste diversion rate across global operations",
      source: {
        label: "Google Environmental Report 2023, p.27",
        url: "https://www.gstatic.com/gumdrop/sustainability/google-2023-environmental-report.pdf#page=27"
      }
    }
  ]
}
