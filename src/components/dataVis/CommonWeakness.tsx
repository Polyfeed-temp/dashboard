import React, {useEffect} from "react";
import * as d3 from "d3";

export interface CommonThemeFromGPT {
  Unit: string;
  strengths: string[];
  weakness: string[];
}

const data = [
  {
    Unit: "FIT2099",
    strengths: [
      "Good use of OOP principles",
      "Good Team Management",
      "Clear Explanation of Design decisions",
    ],
    weakness: [
      "Lack of comments in code",
      "Unclear diagrams",
      "Unclear documents",
      "Unclear explanations",
    ],
  },
  {
    Unit: "FIT2094",
    strengths: ["Good comceptual design of database", "Good Team Management"],
    weakness: [
      "Errorness SQL queries",
      "Lack of understanding on JOIN functions",
      "Unclear explanations",
    ],
  },
  {
    Unit: "FIT2002",
    strengths: [
      "Good use of Ghantt chart",
      "Good Risk Analysis",
      "Good Team Management",
    ],
    weakness: [
      "Unclear presentations",
      "Unclear diagrams",
      "Unclear documents",
    ],
  },
  {
    Unit: "FIT2001",
    strengths: [
      "Good use of SDLC",
      "Good Understanding of agile method",
      "Good use of OOP principles",
    ],
    weakness: ["Unclear documentation", "Missing consultations"],
  },
];

function createChart(data: any, container: string) {
  d3.select(container).select("svg").remove();
  const margin = {top: 20, right: 20, bottom: 30, left: 200},
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // Append the svg object to the body of the page
  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  const units = data.map((d: {Unit: any}) => d.Unit);

  // Set up x-axis scale
  const x = d3.scaleBand().domain(units).range([0, width]).padding(0.01); // Adjust padding as needed

  // Create a map to count the frequency of each strength
  let weaknessFrequency = new Map();

  data.forEach((d: {weakness: any[]}) => {
    d.weakness.forEach((weakness: any) => {
      if (weaknessFrequency.has(weakness)) {
        weaknessFrequency.set(weakness, weaknessFrequency.get(weakness) + 1);
      } else {
        weaknessFrequency.set(weakness, 1);
      }
    });
  });
  // Set up y-axis scale
  const y = d3
    .scaleBand()
    .domain(Array.from(weaknessFrequency.keys()))
    .range([0, height])
    .padding(0.95);

  // Add circles for strengths
  data.forEach((d: {weakness: any[]; Unit: string}, index: any) => {
    d.weakness.forEach((weakness: string) => {
      const xValue = x(d.Unit);
      if (xValue !== undefined) {
        const yValue = y(weakness);
        if (typeof yValue === "number") {
          svg
            .append("circle")
            .attr("cx", xValue + x.bandwidth() / 2)
            .attr("cy", yValue)
            .attr("r", weaknessFrequency.get(weakness) * 5) // Radius based on frequency
            .attr("fill", "#ef5975");
        }
      }
    });
  });

  // Add legend for circle size
  const legend = svg
    .append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "start")
    .selectAll("g")
    .data([
      {size: 5, text: "Unique Weaknesses (shown only in a particular unit)"},
      {size: 10, text: "Common Wekanesses (shown across units)"},
    ])
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(0, ${i * 20})`);

  legend
    .append("circle")
    .attr("cx", width - 240)
    .attr("cy", 2)
    .attr("r", (d) => d.size)
    .attr("fill", "#ef5975");

  legend
    .append("text")
    .attr("x", width - 220)
    .attr("y", 2)
    .attr("dy", "0.35em")
    .text((d) => d.text);

  // Add X axis label
  svg
    .append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.bottom})`)
    .style("text-anchor", "middle")
    .text("Units");

  // Add Y axis label
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left - 2)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Common Weaknesses");

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg.append("g").call(d3.axisLeft(y));
}

export function CommonWeaknessChart({data}: {data: CommonThemeFromGPT[]}) {
  useEffect(() => {
    createChart(data, "#chart4");
  }, []);

  return (
    <>
      <div>
        <div id="chart4"></div>
        <div id="tooltip4"></div>
      </div>
    </>
  );
}
