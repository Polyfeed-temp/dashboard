import React, { useEffect } from "react";
import * as d3 from "d3";

const data: any[] = [
  {
    label: "Good Team Management",
    actionPoints: [
      {
        action: "Schedule Weekly Team Meetings",
        category: "Ask Classmate",
        status: "Y",
      },
      {
        action: "Develop a Project Timeline",
        category: "Ask Classmate",
        status: "Y",
      },
      {
        action: "Assign Clear Roles and Responsibilities",
        category: "Ask Classmate",
        status: "Y",
      },
      {
        action: "Conduct Team Building Activities",
        category: "Contact Tutor",
        status: "N",
      },
      {
        action: "Implement a Collaborative Project Management Tool",
        category: "Refer Learning Resources",
        status: "N",
      },
    ],
    mainCategory: "Strength",
  },
  {
    label: "Bad Presentation Skills",
    actionPoints: [
      {
        action: "Attend a Workshop on Effective Communication",
        category: "Refer Learning Resources",
        status: "Y",
      },
      {
        action: "Seek Feedback from Peers",
        category: "Ask Classmate",
        status: "Y",
      },
      {
        action: "Seek Feedback from Mentors",
        category: "Contact Tutor",
        status: "N",
      },
      { action: "Improve Storytelling Skills", category: "Other", status: "N" },
      {
        action: "Enroll in an Online Course on Presentation Skills",
        category: "Explore Online",
        status: "N",
      },
      {
        action: "Focus on Audience Engagement Strategies",
        category: "Other",
        status: "N",
      },
    ],
    mainCategory: "Weakness",
  },
];

function createChart(data: any, container: string) {
  d3.select(container).select("svg").remove();
  const margin = { top: 20, right: 20, bottom: 30, left: 200 },
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

  // Create scales
  const y = d3
    .scaleBand()
    .domain(data.map((d: { label: any }) => d.label))
    .range([0, height])
    .padding(0.1);

  const x: d3.ScaleLinear<number, number> = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d: any) => d.actionPoints.length) || 0] as [
      number,
      number
    ])
    .range([0, width]);

  // Create a div for the tooltip
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("text-align", "left")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "5px");

  // Add the bars for total action points
  svg
    .selectAll<SVGRectElement, unknown>(".bar-action")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar-action")
    .attr("y", (d: any) => y(d.label) as number)
    .attr("height", y.bandwidth())
    .attr("x", 0)
    .attr("width", (d: any) => x(d.actionPoints.length))
    .attr("fill", "#a3a0a0")
    .on("mouseover", function (event: any, d: any) {
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html(
          "Yet to be completed:<br/>" +
            d.actionPoints
              .filter((ap: { status: string }) => ap.status === "N")
              .map((ap: { action: any }) => ap.action)
              .join("<br/>")
        )
        .style("left", event.pageX + "px")
        .style("top", event.pageY - 28 + "px");
    })
    .on("mouseout", function (d) {
      tooltip.transition().duration(500).style("opacity", 0);
    });

  // Add completed action points bars on top of total bars
  svg
    .selectAll(".bar-complete")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar-complete")
    .attr("y", (d: any) => y(d.label) as number)
    .attr("height", y.bandwidth())
    .attr("x", 0)
    .attr(
      "width",
      (d: any) =>
        x(
          d.actionPoints.filter((ap: { status: string }) => ap.status === "Y")
            .length
        ) as number
    )
    .attr("fill", (d: any) =>
      d.mainCategory === "Strength" ? "#3a70b7" : "#ef5975"
    )
    .on("mouseover", function (event, d: any) {
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html(
          "Completed:<br/>" +
            d.actionPoints
              .filter((ap: { status: string }) => ap.status === "Y")
              .map((ap: { action: any }) => ap.action)
              .join("<br/>")
        )
        .style("left", event.pageX + "px")
        .style("top", event.pageY - 28 + "px");
    })
    .on("mouseout", function (d) {
      tooltip.transition().duration(500).style("opacity", 0);
    });

  // Add the Y Axis
  svg.append("g").call(d3.axisLeft(y));

  // Add the X Axis
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(d3.max(data, (d: any) => d.actionPoints.length)) // Set the number of ticks based on the max value
        .tickFormat(d3.format("d"))
    );

  // Add X axis label
  svg
    .append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 10})`)
    .style("text-anchor", "middle")
    .text("Number of To-do list items");

  // Add Y axis label
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Strengths / Weaknesses");

  // Add legend
  const legend = svg
    .append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "start") // Change text-anchor to "start"
    .selectAll("g")
    .data([
      { color: "#f6f6f6", text: "Total to-do list items created" },
      { color: "#3a70b7", text: "Completed to-do list items of strengths" },
      { color: "#ef5975", text: "Completed to-do list items of weaknesses" },
    ])
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(10, ${i * 20})`);

  legend
    .append("rect")
    .attr("x", width - 210)
    .attr("width", 19)
    .attr("height", 19)
    .attr("fill", (d) => d.color);

  legend
    .append("text")
    .attr("x", width - 180)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .text((d) => d.text);
}

export function ActionItemBarChart() {
  useEffect(() => {
    createChart(data, "#chart0");
  }, []);

  return (
    <div>
      <div id="chart0"></div>
      <div id="tooltip0"></div>
    </div>
  );
}
