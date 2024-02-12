import React, { useEffect } from "react";
import * as d3 from "d3";

export interface Action {
    action: string;
    status: string;
    deadline: string;
    annotationTag: string;
    assessmentName: string;
    unitId: string;
}

interface ActionData extends Omit<Action, 'deadline'> {
    apx: number;
    apy: number;
    fill: string;
    stroke: string;
    text: string;
    pattern_fill: string;
}

  
  interface DataItem {
    x: number;
    y: number;
    width: number;
    height: number;
    day: string;
    date: string;
    actions: ActionData[];
    apx?: number;
    apy?: number;
  }
  
  interface LegendItem {
    size: number;
    text: string;
    fill: string;
    stroke: string;
    pattern_fill: string;
    cx: number;
    cy: number;
  }

const testSet: Action[] = [
    {"action":"tes","status":"1","deadline":"2024-01-01","annotationTag":"Weakness","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"tes","status":"1","deadline":"2024-01-01","annotationTag":"Strength","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"tes","status":"1","deadline":"2024-01-01","annotationTag":"ActionPoint","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"tes","status":"1","deadline":"2024-01-01","annotationTag":"Confused","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"tes","status":"1","deadline":"2024-01-01","annotationTag":"Other","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"testse","status":"0","deadline":"2024-01-10","annotationTag":"Strength","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"testse","status":"1","deadline":"2024-01-10","annotationTag":"Weakness","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"testse","status":"0","deadline":"2024-01-11","annotationTag":"Strength","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"testse","status":"1","deadline":"2024-01-11","annotationTag":"ActionPoint","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"testse","status":"1","deadline":"2024-01-23","annotationTag":"Confused","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"testse","status":"0","deadline":"2024-01-23","annotationTag":"Strength","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"test","status":"0","deadline":"2024-01-30","annotationTag":"ActionPoint","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"tsetseset","status":"0","deadline":"2024-01-30","annotationTag":"Confused","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"testsetse","status":"1","deadline":"2024-01-24","annotationTag":"Weakness","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"fds","status":"0","deadline":"2024-01-25","annotationTag":"Strength","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"new items","status":"1","deadline":"2024-01-25","annotationTag":"Other","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"xcv","status":"0","deadline":"2024-01-24","annotationTag":"Strength","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"sdfds","status":"0","deadline":"2024-01-25","annotationTag":"Weakness","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"tes","status":"1","deadline":"2024-01-29","annotationTag":"Weakness","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"tes","status":"0","deadline":"2024-01-29","annotationTag":"Strength","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"tes","status":"1","deadline":"2024-01-29","annotationTag":"ActionPoint","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"tes","status":"0","deadline":"2024-01-29","annotationTag":"Confused","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"tes","status":"1","deadline":"2024-01-29","annotationTag":"Other","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"tes","status":"0","deadline":"2024-01-31","annotationTag":"Weakness","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"tes","status":"0","deadline":"2024-01-31","annotationTag":"Strength","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"tes","status":"0","deadline":"2024-01-31","annotationTag":"ActionPoint","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"tes","status":"0","deadline":"2024-01-31","annotationTag":"Confused","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"},
    {"action":"tes","status":"0","deadline":"2024-01-31","annotationTag":"Other","assessmentName":"Project 2","unitId":"BIO2011_2024_S1"}
  ];

//   const colours = {Strength: "#3a70b7",Weakness: "#ef5975", ActionPoint: "#23bfc6", Confused: "#f79633", Other: "#8960aa", Incomplete: "#ffffff"};
//   const diagonals = {Strength: 'url(#diagonalHatchS)',Weakness: 'url(#diagonalHatchW)', ActionPoint: 'url(#diagonalHatchAP)', Confused: 'url(#diagonalHatchC)', Other: 'url(#diagonalHatchO)'}

  type Colours = {
    [key: string]: string;
};

type Diagonals = {
    [key: string]: string;
};

const colours: Colours = {
    Strength: "#3a70b7",
    Weakness: "#ef5975",
    ActionPoint: "#23bfc6",
    Confused: "#f79633",
    Other: "#8960aa",
    Incomplete: "#ffffff",
};

const diagonals: Diagonals = {
    Strength: 'url(#diagonalHatchS)',
    Weakness: 'url(#diagonalHatchW)',
    ActionPoint: 'url(#diagonalHatchAP)',
    Confused: 'url(#diagonalHatchC)',
    Other: 'url(#diagonalHatchO)'
};


function createChart(actions: Action[]) {
    



function gridData() {
  const data: Array<Array<DataItem>> = [];
  let xpos = 50;
  let ypos = 50;
  const width = 150;
  const height = 150;
  const dates = d3.utcDays(new Date("2024-01-01"), new Date("2024-02-01"));
  let counter = 0;
  let d = "text";
  let date = "01";
  let apx = 0;
  let apy = 0;
  
  const today = new Date();


  for (let row = 0; row < 5; row++) {
    data.push(new Array<DataItem>());

    for (let column = 0; column < 7; column++) {
      if (dates[counter]) {
        const day = dates[counter].toUTCString().slice(0, 3);
        date = dates[counter].toUTCString().slice(5, 7);

        const d = new Date(dates[counter]);
        const iso_d = d.toISOString().slice(0, 10);

        const action_data = actions.filter((obj) => obj.deadline == iso_d);

        if (action_data.length != 0) {
          apx = xpos;
          apy = ypos + 50;
          data[row].push({
            x: xpos,
            y: ypos,
            width: width,
            height: height,
            day: day,
            date: date,
            actions: []
          });

          for (let i = 0; i < action_data.length; i++) {
            apx = apx + 35;
            apy = apy;

            let fill = "";
            let stroke = "";
            let status = "";
            let pattern_fill = "";

            if (action_data[i].status == "1") {
              fill = colours[action_data[i].annotationTag];
              stroke = colours[action_data[i].annotationTag];
              status = "Complete";
              pattern_fill = diagonals[action_data[i].annotationTag];
            } else if (action_data[i].status == "0" && today > d) {
              fill = "#ffffff";
              stroke = colours[action_data[i].annotationTag];
              status = "Incomplete";
              pattern_fill = "#ffffff";
            } else {
              fill = colours["Incomplete"];
              stroke = colours[action_data[i].annotationTag];
              status = "Incomplete";
              pattern_fill = diagonals[action_data[i].annotationTag];
            }

            data[row][column].actions.push({
              apx: apx,
              apy: apy,
              status: action_data[i].status,
              annotationTag: action_data[i].annotationTag,
              action: action_data[i].action,
              assessmentName: action_data[i].assessmentName,
              unitId: action_data[i].unitId,
              fill: fill,
              stroke: stroke,
              text: action_data[i].action,
              pattern_fill: pattern_fill
            });

            if ((i + 1) % 3 == 0) {
              apx = xpos;
              apy = apy + 35;
            } else {
              apy = apy;
            }
          }
        } else {
          data[row].push({
            x: xpos,
            y: ypos,
            width: width,
            height: height,
            day: day,
            date: date,
            apx: -15,
            apy: -15,
            actions: []
          });
        }
      } else {
        data[row].push({
          x: xpos,
          y: ypos,
          width: width,
          height: height,
          day: "",
          date: "",
          apx: -15,
          apy: -15,
          actions: []
        });
      }

      xpos += width;
      counter = counter + 1;
    }

    xpos = 50;
    ypos += height;
  }

  return data;
}

const finalGridData = gridData();

d3.select("#grid").selectAll("*").remove();

const svg = d3.select("#grid").append("svg")
  .attr("width", "2000px")
  .attr("height", "1500px");

const div = svg.append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// const div = d3.select("body").append("div")
//   .attr("class", "tooltip")
//   .style("opacity", 0);

// const svg = d3.select("body").append("svg");

svg.append('defs')
  .append('pattern')
  .attr('id', 'diagonalHatchS')
  .attr('patternUnits', 'userSpaceOnUse')
  .attr('width', 4)
  .attr('height', 4)
  .append('path')
  .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
  .attr('stroke', '#3a70b7')
  .attr('stroke-width', 1);

svg.append('defs')
  .append('pattern')
  .attr('id', 'diagonalHatchW')
  .attr('patternUnits', 'userSpaceOnUse')
  .attr('width', 4)
  .attr('height', 4)
  .append('path')
  .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
  .attr('stroke', '#ef5975')
  .attr('stroke-width', 1);

svg.append('defs')
  .append('pattern')
  .attr('id', 'diagonalHatchAP')
  .attr('patternUnits', 'userSpaceOnUse')
  .attr('width', 4)
  .attr('height', 4)
  .append('path')
  .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
  .attr('stroke', '#23bfc6')
  .attr('stroke-width', 1);

svg.append('defs')
  .append('pattern')
  .attr('id', 'diagonalHatchC')
  .attr('patternUnits', 'userSpaceOnUse')
  .attr('width', 4)
  .attr('height', 4)
  .append('path')
  .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
  .attr('stroke', '#f79633')
  .attr('stroke-width', 1);

svg.append('defs')
  .append('pattern')
  .attr('id', 'diagonalHatchO')
  .attr('patternUnits', 'userSpaceOnUse')
  .attr('width', 4)
  .attr('height', 4)
  .append('path')
  .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
  .attr('stroke', '#8960aa')
  .attr('stroke-width', 1);

const grid = svg.append("g").attr("transform", "translate(0,30)");

grid.append("text")
  .attr("class", "day")
  .attr("x", 30)
  .attr("y", 30)
  .style("font-size", 24)
  .text("January");

const row = grid.selectAll(".row")
  .data(gridData)
  .enter().append("g")
  .attr("class", "row");

const column = row.selectAll(".square")
  .data(function(d) { return d; })
  .enter().append("g");

column.append("rect")
  .attr("class", "square")
  .attr("x", function(d) { return d.x; })
  .attr("y", function(d) { return d.y; })
  .attr("width", function(d) { return d.width; })
  .attr("height", function(d) { return d.height; })
  .style("fill", "#fff")
  .style("stroke", "#222");

column.append("text")
  .attr("class", "date")
  .attr("x", function(d) { return d.x + 130; })
  .attr("y", function(d) { return d.y + 25; })
  .style("font-size", 16)
  .text(function(d) { return d.date; });

column.append("text")
  .attr("class", "day")
  .attr("x", function(d) { return d.x + 5; })
  .attr("y", function(d) { return d.y + 25; })
  .style("font-size", 16)
  .text(function(d) { return d.day; });

const circle = column.selectAll(".circle")
  .data(function(d) { return d.actions; })
  .enter().append("g");

circle.append("circle")
  .attr("class", "circle")
  .attr("cx", function(d) { return d.apx; })
  .attr("cy", function(d) { return d.apy; })
  .attr("r", 15)
  .attr("stroke", function(d) { return d.stroke; })
  .attr("fill", function(d) { return d.fill; });

circle.append("circle")
  .attr("class", "circle")
  .attr("cx", function(d) { return d.apx; })
  .attr("cy", function(d) { return d.apy; })
  .attr("r", 15)
  .attr("stroke", function(d) { return d.stroke; })
  .attr("fill", function(d) { return d.pattern_fill; });

column.selectAll("circle")
  .on("mouseover", function(event, d) {
    div.transition()
      .duration(200)
      .style("opacity", .9);
    div.html("Click for details")
      .style("left", (event.pageX) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mouseout", function(d) {
    div.transition()
      .duration(500)
      .style("opacity", 0);
  });

const legend_data: LegendItem[] = [
  {size: 15, text: "", fill: "#3a70b7", stroke: "#3a70b7", pattern_fill:'url(#diagonalHatchS)', cx:750, cy: 60},
  {size: 15, text: "", fill: "#ffffff", stroke: "#3a70b7", pattern_fill:'url(#diagonalHatchS)', cx:785, cy: 60},
  {size: 15, text: "Strength", fill: "#ffffff", stroke: "#3a70b7", pattern_fill:'#ffffff', cx:820, cy: 60},
  {size: 15, text: "", fill: "#ef5975", stroke: "#ef5975", pattern_fill:'url(#diagonalHatchW)', cx:750, cy: 100},
  {size: 15, text: "", fill: "#ffffff", stroke: "#ef5975",pattern_fill:'url(#diagonalHatchW)', cx:785, cy: 100},
  {size: 15, text: "Weakness", fill: "#ffffff", stroke: "#ef5975",pattern_fill:'#ffffff', cx:820, cy: 100},
  {size: 15, text: "", fill: "#23bfc6", stroke: "#23bfc6",pattern_fill:'url(#diagonalHatchAp)', cx:750, cy: 140},
  {size: 15, text: "", fill: "#ffffff", stroke: "#23bfc6", pattern_fill:'url(#diagonalHatchAP)', cx:785, cy: 140},
  {size: 15, text: "Action point", fill: "#ffffff", stroke: "#23bfc6", pattern_fill:'#ffffff', cx:820, cy: 140},
  {size: 15, text: "", fill: "#f79633", stroke: "#f79633", pattern_fill:'url(#diagonalHatchC)', cx:750, cy: 180},
  {size: 15, text: "", fill: "#ffffff", stroke: "#f79633", pattern_fill:'url(#diagonalHatchC)', cx:785, cy: 180},
  {size: 15, text: "Confused", fill: "#ffffff", stroke: "#f79633", pattern_fill:'#ffffff', cx:820, cy: 180},
  {size: 15, text: "", fill: "#8960aa", stroke: "#8960aa", pattern_fill:'url(#diagonalHatchO)', cx:750, cy: 220},
  {size: 15, text: "", fill: "#ffffff", stroke: "#8960aa", pattern_fill:'url(#diagonalHatchO)', cx:785, cy: 220},
  {size: 15, text: "Other", fill: "#ffffff", stroke: "#8960aa", pattern_fill:'#ffffff', cx:820, cy: 220}
];

const legend = svg.append("g")
  .attr("font-family", "sans-serif")
  .attr("font-size", 14)
  .attr("text-anchor", "start")
  .selectAll("g")
  .data(legend_data)
  .enter().append("g")
  .attr("transform", (d, i) => `translate(380,50)`);

legend.append("text")
  .attr("x", 740)
  .attr("y", 30)
  .attr("dy", "0.35em")
  .style("font-size", 18)
  .style("font-weight", 200)
  .text("To-do items created for:");

legend.append("circle")
  .attr("cx", function(d) { return d.cx; })
  .attr("cy", function(d) { return d.cy; })
  .attr("r", function(d) { return d.size; })
  .attr("stroke", function(d) { return d.stroke; })
  .attr("fill", function(d) { return d.fill; });

legend.append("circle")
  .attr("cx", function(d) { return d.cx; })
  .attr("cy", function(d) { return d.cy; })
  .attr("r", function(d) { return d.size; })
  .attr("stroke", function(d) { return d.stroke; })
  .attr("fill", function(d) { return d.pattern_fill; });

legend.append("text")
  .attr("x", function(d) { return d.cx+20; })
  .attr("y", function(d) { return d.cy; })
  .attr("dy", "0.35em")
  .text(function(d) { return d.text; });

legend.append("text")
  .attr("x", 740)
  .attr("y", 250)
  .attr("dy", "0.35em")
  .style("font-size", 12)
  .style("font-weight", 200)
  .text("Solid circles: Completed");

legend.append("text")
  .attr("x", 740)
  .attr("y", 270)
  .attr("dy", "0.35em")
  .style("font-size", 12)
  .style("font-weight", 200)
  .text("Stripped circles: Incompleted");

legend.append("text")
  .attr("x", 740)
  .attr("y", 290)
  .attr("dy", "0.35em")
  .style("font-size", 12)
  .style("font-weight", 200)
  .text("Hollow circles: Overdue to-do items");


};

export function CalendarView({data}: {data: Action[]}) {
  console.log("CalenderView here")
    useEffect(() => {
      console.log("useEffect called")
        createChart(data);
    }, []);

    return (
        <div id="grid"></div>
    );
}
