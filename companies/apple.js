export default {
  name: "Apple",
  industry: "Technology",
  score: 81,
  revenueRisk: "$1.2B (Scope 3 emission misalignment + EU green compliance fines)",

  leaks: [
    {
      issue: "Scope 3 emissions make up 95% of Apple's total footprint — estimation-based",
      impact: "Potential SEC/EU non-compliance risk and supplier audit gaps",
      solution: "Scale 'Supplier Clean Energy Program' and integrate blockchain audit trails",
      source: {
        label: "Apple Environmental Progress Report 2023 (pp.30–31)",
        url: "https://www.apple.com/environment/pdf/Apple_Environmental_Progress_Report_2023.pdf#page=30"
      }
    },
    {
      issue: "App Store restrictions flagged under Digital Markets Act",
      impact: "€1.8B fine",
      solution: "Increase developer transparency and compliance with EU DMA",
      source: {
        label: "European Commission, March 2025",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_25_1085"
      }
    },
    {
      issue: "Low trade-in recovery rate for rare metals like cobalt (~12%)",
      impact: "$1.8M/year in lost material value and brand perception gap",
      solution: "Gamify 'GiveBack+' and scale recycling partnerships",
      source: {
        label: "Apple Environmental Progress Report 2023 (p.33)",
        url: "https://www.apple.com/environment/pdf/Apple_Environmental_Progress_Report_2023.pdf#page=33"
      }
    }
  ],

  strengths: [
    {
      item: "300+ suppliers committed to 100% renewable energy use by 2030",
      source: {
        label: "Apple Environmental Progress Report 2023 (p.6)",
        url: "https://www.apple.com/environment/pdf/Apple_Environmental_Progress_Report_2023.pdf#page=6"
      }
    }
  ]
};
