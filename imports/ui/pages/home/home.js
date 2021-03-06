import './home.html';

var jobsdata = "https://docs.google.com/spreadsheets/d/1PwVUTayb0QSmSOveXcOwjxnwRxA4irUEG9CGERNAGAw/pub?gid=752556491&single=true&output=csv"

var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

var pie = d3.layouts.pie()
  .sort(null)
  .value(function(d) { return d.start; });

var svg = d3.select("#glennchart").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.csv(jobsdata, function(error, data){

  data.forEach(function(d) {
    d.start = +d.start;
  });

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.age); });

  g.append("text")
       .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
       .attr("dy", ".35em")
       .style("text-anchor", "middle")
       .text(function(d) { return d.data.age; });

});
