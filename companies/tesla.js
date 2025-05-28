export default {
  name: "Tesla",
  industry: "Automotive",
  score: 75,
  revenueRisk: "$1.3B (Lithium sourcing gaps and battery reuse inefficiencies impacting regulatory compliance and customer retention)",

  leaks: [
    {
      issue: "Limited traceability in cobalt and lithium supply chains",
      impact: "Risk of ESG rating downgrades and investor pressure",
      solution: "Expand blockchain tracking with IRMA + Fair Cobalt Alliance",
      source: {
        label: "Tesla Impact Report 2023 (pp.117–120)",
        url: "https://www.tesla.com/ns_videos/2023-tesla-impact-report.pdf#page=117"
      }
    },
    {
      issue: "Lack of transparent consumer-facing battery recycling progress",
      impact: "Potential ~$300M/year in unrecovered mineral value",
      solution: "Enhance Redwood Materials partnership + incentive-based recovery",
      source: {
        label: "Tesla Impact Report 2023 (p.112)",
        url: "https://www.tesla.com/ns_videos/2023-tesla-impact-report.pdf#page=112"
      }
    }
  ],

  strengths: [
    {
      item: "90% recycling rate of battery materials from production scrap",
      source: {
        label: "Tesla Impact Report 2023 (p.110)",
        url: "https://www.tesla.com/ns_videos/2023-tesla-impact-report.pdf#page=110"
      }
    }
  ]
};
