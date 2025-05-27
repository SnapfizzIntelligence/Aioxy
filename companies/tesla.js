export default {
  name: "Tesla",
  industry: "Automotive & Energy",
  score: 88, // Based on alignment with TCFD/SASB
  leaks: [
    {
      issue: "Cobalt sourcing from DRC (despite audits)",
      impact: "Reputational risk due to DRC artisanal mining links",
      solution: "Expand Fair Cobalt Alliance funding + blockchain traceability",
      source: "[Tesla 2023 Impact Report, p.117-120](https://www.tesla.com/ns_videos/2023-tesla-impact-report.pdf#page=117)"
    },
    {
      issue: "Battery recycling efficiency (90% claimed vs. 95% industry leaders)",
      impact: "Lagging Redwood Materials/benchmarks by 5%",
      solution: "Scale in-house hydrometallurgy (p.110-112)",
      source: "[Tesla 2023 Impact Report, p.50](https://www.tesla.com/ns_videos/2023-tesla-impact-report.pdf#page=50)"
    },
    {
      issue: "Scope 3 emissions up 24% YoY (p.147)",
      impact: "Potential EU carbon tariff liabilities by 2027",
      solution: "Supplier decarbonization pacts (p.107-109)",
      source: "[Tesla 2023 Impact Report, p.147](https://www.tesla.com/ns_videos/2023-tesla-impact-report.pdf#page=147)"
    },
    {
      issue: "Water use in drought-prone Texas (p.47-49)",
      impact: "Local opposition to Giga Texas expansion",
      solution: "Onsite wastewater recycling (100% target by 2024)",
      source: "[Tesla 2023 Impact Report, p.47](https://www.tesla.com/ns_videos/2023-tesla-impact-report.pdf#page=47)"
    }
  ],
  strengths: [
    {
      item: "Supercharger network: 100% renewable energy (p.40)",
      source: "[Tesla 2023 Impact Report, p.40](https://www.tesla.com/ns_videos/2023-tesla-impact-report.pdf#page=40)"
    },
    {
      item: "EVs avoided 20M metric tons CO₂e in 2023 (p.19)",
      source: "[Tesla 2023 Impact Report, p.19](https://www.tesla.com/ns_videos/2023-tesla-impact-report.pdf#page=19)"
    }
  ]
}
