export default {
  name: "BMW",
  industry: "Automotive",
  score: 79,
  leaks: [
    {
      issue: "Scope 3 emissions (vehicle lifecycle) remain high: 74% of total footprint",
      impact: "Risk of non-alignment with EU Green Deal and tightening CO₂ fleet limits",
      solution: "Expand green steel partnerships + enforce battery circularity at supplier level",
      source: {
        label: "BMW Group Report 2023, p.78",
        url: "https://www.bmwgroup.com/content/dam/grpw/websites/bmwgroup_com/responsibility/downloads/en/2023/BMW-Group-Report-2023.pdf#page=78"
      }
    },
    {
      issue: "Only 5% of end-of-life vehicles fully recycled via certified take-back systems",
      impact: "Circularity compliance risk under EU Battery Regulation (2024)",
      solution: "Scale closed-loop vehicle recycling & digital ID tagging (VIN-based)",
      source: {
        label: "BMW Group Report 2023, p.81",
        url: "https://www.bmwgroup.com/content/dam/grpw/websites/bmwgroup_com/responsibility/downloads/en/2023/BMW-Group-Report-2023.pdf#page=81"
      }
    }
  ]
}
