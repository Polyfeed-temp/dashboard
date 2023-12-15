import React, {useEffect} from "react";
import * as d3 from "d3";

const data: any[] = [
  {
    assessmentName: "Assignment 1",
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
    assessmentName: "Assignment 2",
    strengths: ["Good use of OOP principles", "Good Team Management"],
    weakness: [
      "Lack of comments in code",
      "Unclear diagrams",
      "Unclear explanations",
    ],
  },
  {
    assessmentName: "Assignment 3",
    strengths: ["Good Team Management", "Clear Explanation demonstrations"],
    weakness: ["Lack of comments in code", "Unmerged branches in Git"],
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

  const units = data.map((d: {assessmentName: any}) => d.assessmentName);

  // Set up x-axis scale
  const x = d3.scaleBand().domain(units).range([0, width]).padding(0.01); // Adjust padding as needed

  // Create a map to count the frequency of each strength
  let strengthFrequency = new Map();

  data.forEach((d: any) => {
    d.strengths.forEach((strength: any) => {
      if (strengthFrequency.has(strength)) {
        strengthFrequency.set(strength, strengthFrequency.get(strength) + 1);
      } else {
        strengthFrequency.set(strength, 1);
      }
    });
  });
  // Set up y-axis scale
  const y = d3
    .scaleBand()
    .domain(Array.from(strengthFrequency.keys()))
    .range([0, height])
    .padding(0.95);

  // Add circles for strengths
  data.forEach((d: {strengths: any[]; assessmentName: string}, index: any) => {
    d.strengths.forEach((strength: string) => {
      const xValue = x(d.assessmentName);
      if (xValue !== undefined) {
        svg
          .append("circle")
          .attr("cx", xValue + x.bandwidth() / 2)
          .attr("cy", y(strength) || 0) // Fixed the issue by providing a default value of 0
          .attr("r", strengthFrequency.get(strength) * 5) // Radius based on frequency
          .attr("fill", "#3a70b7");
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
      {
        size: 5,
        text: "Unique Strength (shown only in a particular assignment)",
      },
      {size: 10, text: "Common Strength (shown across assignments)"},
    ])
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(0, ${i * 20})`);

  legend
    .append("circle")
    .attr("cx", width - 220)
    .attr("cy", 2)
    .attr("r", (d) => d.size)
    .attr("fill", "#3a70b7");

  legend
    .append("text")
    .attr("x", width - 200)
    .attr("y", 2)
    .attr("dy", "0.35em")
    .text((d) => d.text);

  // Add X axis label
  svg
    .append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 3})`)
    .style("text-anchor", "middle")
    .text("Assignment");

  // Add Y axis label
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Strengths");
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg.append("g").call(d3.axisLeft(y));
}

export function TemporalStrengthChart() {
  useEffect(() => {
    createChart(data, "#chart1");
  }, []);

  return (
    <div>
      <div id="chart1"></div>
      <div id="tooltip1"></div>
    </div>
  );
}
