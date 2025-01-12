// Constants
const aspect = 1.1576271186440679;
const HEIGHT_FACTOR = 1.8153846153846154;
var svgContainer = d3.select("#mainBubble")
var w = svgContainer.node().getBoundingClientRect().width;
var h = w / aspect;
// Create a color scale
const colorScale = d3.scaleOrdinal(d3.schemeTableau10);
   //var w = svgContainer.node().getBoundingClientRect().width;
   //var h = w / aspect;
      //.style("height", h+"px");
const data = {
  name: "",
  children: [
    { name: "JAVA", value: 50 },
    { name: "Python", value: 30 },
    { name: "JavaScript", value: 30 },
    { name: "SQL", value: 50 },
    { name: "Hive", value: 20 },
    { name: "BigQuery", value: 30 },
    { name: "MongoDB", value: 30 },
    { name: "Spring Boot", value: 50 },
    { name: "Spark", value: 40 },
    { name: "Airflow", value: 40 },
    { name: "Django", value: 20 },
    { name: "Meteor", value: 20 },
    { name: "HTML5", value: 20 },
    { name: "CSS3", value: 20 },
    { name: "jQuery", value: 20 },
    { name: "Jenkins", value: 20 },
    { name: "Kubernetes", value: 40 },
    { name: "Docker", value: 30 },
    { name: "JUnit", value: 30 },
    { name: "Kafka", value: 30 },
    { name: "Linux", value: 30 },
    { name: "Windows", value: 30 },
    { name: "MacOS", value: 30 },
    { name: "Git", value: 30 },
    { name: "Scala", value: 30 },
    { name: "R", value: 20 },
    { name: "Cucumber", value: 30 },
    { name: "Agile", value: 20 },
    { name: "Scrum", value: 20 },
    { name: "Waterfall", value: 20 },
    { name: "Cassandra", value: 40 },
    { name: "Cloud", value: 40 },
    { name: "PyTorch", value: 20 },
    { name: "TensorFlow", value: 40 },
    { name: "Langchain", value: 30 },
    { name: "AWS", value: 20 },
    { name: "Azure", value: 20 },
    { name: "GCP", value: 20 },
    { name: "RubyOnRails", value: 45 },
    { name: "BDD", value: 20 },
    { name: "TDD", value: 20 },
    { name: "Mockito", value: 30 },
    { name: "SVN", value: 10 },
    { name: "Spock", value: 20 },
    { name: "Groovy", value: 20 }
    // Add more child nodes as needed
  ]
};
const pack = data => d3.pack()
  .size([w - 20, h - 20])
  .padding(3)
  (d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value));
const fontSize = Math.min(w, h) / 40;
var svg = d3.select("#mainBubble").append("svg")
    .attr("class", "mainBubbleSVG")
    .attr("viewBox", [0, 0, w, h])
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "middle")
    .attr("font-size", fontSize);
// Update function to render the chart
const update = (data) => {
  const root = pack(data);

  // Join data to circles
  const circles = svg.selectAll("circle")
    .data(root.descendants(), d => d.data.name);

  // Enter new circles
  circles.enter().append("circle")
    .attr("r", d => d.r)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("fill", (d,i) => colorScale(i))
    .attr("opacity","0.7");
  // Update existing circles
  circles.transition()
    .duration(750)
    .attr("r", d => d.r)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);

  // Remove exiting circles
  circles.exit().remove();

  // Join data to text labels
  const labels = svg.selectAll("text")
    .data(root.descendants(), d => d.data.name);

  // Enter new labels
  labels.enter().append("text")
    .text(d => d.data.name)
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("fill", "white")
    .style("text-anchor", "middle")
    .style("dominant-baseline", "middle");

  // Update existing labels
  labels.transition()
    .duration(750)
    .attr("x", d => d.x)
    .attr("y", d => d.y);

  // Remove exiting labels
  labels.exit().remove();
  const fontSize = Math.min(w, h) / 40;
  svg.attr("font-size", fontSize);
};

// Initial rendering
update(data);
d3.select(window).on("resize", function() {
    svg.attr("viewBox", [0, 0, w, h]);
    update(data);
});
