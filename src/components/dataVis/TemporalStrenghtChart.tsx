import React, { useEffect } from "react";
import * as d3 from "d3";

export interface CommonThemeFromGPTAssessment {
  assessmentName: string;
  strengths: string[];
  weakness: string[];
}

function createChart(data: any, container: string) {
  d3.select(container).select("svg").remove();
  const margin = { top: 20, right: 20, bottom: 50, left: 150 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // Append the svg object to the body of the page
  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const units = data.map((d: { assessmentName: any }) => d.assessmentName);

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

  // Add faces for strengths
  data.forEach((d: any, index: any) => {
    d.strengths.forEach((strength: any) => {
      const xValue = x(d.assessmentName);
      const yValue = y(strength);
      if (xValue !== undefined && yValue !== undefined) {
        const group = svg
          .append("g")
          .attr(
            "transform",
            `translate(${xValue + x.bandwidth() / 2}, ${yValue})`
          );

        // Configuration for the smaller face with blinking eyes
        const faceRadiusX = 25;
        const faceRadiusY = 25;
        const eyeRadius = 4; // Original eye radius
        const eyeOffsetX = 7.5;
        const eyeOffsetY = -5;
        const blinkDuration = 3000; // Duration in milliseconds for one blink cycle

        // Add the main circle (face)
        group
          .append("ellipse")
          .attr("cx", 0)
          .attr("cy", 0)
          .attr("rx", faceRadiusX)
          .attr("ry", faceRadiusY)
          .attr("fill", "none")
          .attr("stroke", "#3a70b7")
          .attr("stroke-width", 2);

        // Adding blinking eyes
        const addEyeWithBlink = (eyeXOffset: any) => {
          const eye = group
            .append("circle")
            .attr("cx", eyeXOffset)
            .attr("cy", eyeOffsetY)
            .attr("r", eyeRadius)
            .attr("fill", "#3a70b7");

          eye
            .append("animate")
            .attr("attributeName", "r")
            .attr("values", `${eyeRadius};0;${eyeRadius}`) // From full size to 0 to full size
            .attr("dur", `${blinkDuration}ms`)
            .attr("repeatCount", "indefinite");
        };

        // Create both eyes with blink animation
        addEyeWithBlink(-eyeOffsetX);
        addEyeWithBlink(eyeOffsetX);

        // Adding the mouth
        group
          .append("path")
          .attr("d", "M -12.5,10 Q 0,17.5 12.5,10")
          .attr("fill", "#3a70b7")
          .attr("stroke", "#3a70b7")
          .attr("stroke-width", 1.5);
      }
    });
  });

  // Add X axis label
  svg
    .append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 5})`)
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

export function TemporalStrengthChart({
  data,
}: {
  data: CommonThemeFromGPTAssessment[];
}) {
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
