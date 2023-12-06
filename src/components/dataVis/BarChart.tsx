// import React, {useEffect} from "react";
// import * as d3 from "d3";

// interface ActionItem {
//   action: string;
//   actionpoint: string;
//   deadline: Date;
//   completed: boolean;
// }

// interface ActionItemData {
//   items: ActionItem[];
// }

// function createHorizontalStackedBarChart(
//   data: ActionItemData,
//   container: string
// ) {
//   d3.select(container).select("svg").remove();

//   // Set the dimensions and margins of the graph
//   const margin = {top: 10, right: 30, bottom: 20, left: 200},
//     width = 960 - margin.left - margin.right,
//     height = Math.max(500, data.items.length * 50) - margin.top - margin.bottom;

//   // Append the svg object to the specified container
//   const svg = d3
//     .select(container)
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", `translate(${margin.left},${margin.top})`);

//   // List of subgroups
//   const subgroups = ["completed", "incomplete"];

//   // List of groups
//   const groups = data.items.map((d) => d.action);
//   console.log(groups);
//   // Add Y axis
//   const y = d3.scaleBand().domain(groups).range([0, height]).padding([0.2]);
//   svg.append("g").call(d3.axisLeft(y));

//   // Add X axis
//   const x = d3.scaleLinear().domain([0, 10]).range([0, width]);
//   svg
//     .append("g")
//     .attr("transform", `translate(0,${height})`)
//     .call(d3.axisBottom(x));

//   // Color palette
//   const color = d3
//     .scaleOrdinal()
//     .domain(subgroups)
//     .range(["#C7EFCF", "#FE5F55"]);

//   // Stack the data
//   const stackedData = d3.stack<ActionItem>().keys(subgroups)(data.items);

//   // Create tooltip
//   const tooltip = d3
//     .select(container)
//     .append("div")
//     .style("opacity", 0)
//     .attr("class", "tooltip")
//     .style("background-color", "white")
//     .style("border", "solid")
//     .style("border-width", "1px")
//     .style("border-radius", "5px")
//     .style("padding", "10px");

//   console.log(stackedData);
//   // Show the bars
//   svg
//     .append("g")
//     .selectAll("g")
//     .data(stackedData)
//     .enter()
//     .append("g")
//     .attr("fill", (d) => color(d.key))
//     .selectAll("rect")
//     .data((d) => d)
//     .enter()
//     .append("rect")
//     .attr("x", (d) => (isNaN(d[0]) ? 0 : x(d[0])))
//     .attr("y", (d) => {
//       console.log(d);
//       y(d.data.action);
//     })
//     .attr("width", (d) => x(d[0]))
//     .attr("height", y.bandwidth())
//     .attr("stroke", "grey")
//     .on("mouseover", function (event, d) {
//       d3.select(this).attr("fill", "orange");
//       showTooltip(event, d);
//     })
//     .on("mouseout", function () {
//       d3.select(this).attr("fill", (d) => color(d.key));
//       hideTooltip();
//     });

//   // Add tooltip functions
//   function showTooltip(event: MouseEvent, d: d3.SeriesPoint<ActionItem>) {
//     const subgroupName = d.key;
//     const subgroupValue = d.data[subgroupName];
//     tooltip
//       .html(
//         `Action: ${d.data.action}<br>Action Point: ${d.data.actionpoint}<br>Deadline: ${d.data.deadline}<br>${subgroupName}: ${subgroupValue}`
//       )
//       .style("opacity", 1)
//       .style("left", `${event.pageX + 10}px`)
//       .style("top", `${event.pageY - 10}px`);
//   }

//   function hideTooltip() {
//     tooltip.style("opacity", 0);
//   }
// }

// export default function HorizontalStackedBarChart(props: {
//   data: ActionItemData;
// }) {
//   useEffect(() => {
//     createHorizontalStackedBarChart(props.data, "#chart");
//   }, [props.data]);

//   return (
//     <div>
//       <div id="chart"></div>
//       <div id="tooltip"></div>
//     </div>
//   );
// }
export default 1;
