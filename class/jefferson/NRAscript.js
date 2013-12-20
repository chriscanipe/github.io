/**
 * @author Jefferson Mok
 */
function makeAnnotations() {

	console.log("in make annotations saved");

// Under this function, we defined separate behaviors for each of the rollover triggers to either display the Note or hide it. For each line, corresponding to each box, we need to define two functions below, one for showing the note and one for hiding it.
// The function makeAnnotations is called when the document is ready. We check with the console.log.

	$("#box1").mouseover(showNote1);
	$("#box1").mouseout(hideNote1);
	$("#box2").mouseover(showNote2);
	$("#box2").mouseout(hideNote2);	
	$("#box3").mouseover(showNote3);
	$("#box3").mouseout(hideNote3);
	$("#box4").mouseover(showNote4);
	$("#box4").mouseout(hideNote4);

}

// The set of showNote functions take the input e (convention) and translates as "Use jquery ($) to show the elements with ID box1_note." We repeate for each of the boxes and we also create a similar set of functions to hide our rollover notes.
// The reason we define separate functions and only one function for make Annotations is because if we put the show/hide functions together, all the notes will trigger together when we roll over the boxes. Separating them out here will make each note match up to their respective boxes (rollover triggers).

function showNote1(e) {
	console.log("shownote");
	$("#box1_note").show();
}

function showNote2(e) {
	$("#box2_note").show();
}

function showNote3(e) {	
	$("#box3_note").show();
}

function showNote4(e) {	
	$("#box4_note").show();
}

function hideNote1(e) {//event handler --> "e" is convention
	console.log("hidenote");
	$("#box1_note").hide();
}

function hideNote2(e) {
	$("#box2_note").hide();
}

function hideNote3(e) {	
	$("#box3_note").hide();
}

function hideNote4(e) {	
	$("#box4_note").hide();
}

$(document).ready(makeAnnotations); 




var diameter = 1000;

var tree = d3.layout.tree()
    .size([360, diameter / 2 - 120])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

var svg = d3.select("body").append("svg")
    .attr("width", diameter - 60)
    .attr("height", diameter - 60)
    .append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

d3.json("NRA_TreeJSON.json", function(error, root) {
  
  var nodes = tree.nodes(root),
      links = tree.links(nodes);

  var link = svg.selectAll(".link")
      .data(links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);

  var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

  node.append("circle")
      .attr("r", 4.5);

  node.append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
      .text(function(d) { return d.name; });
});

d3.select(self.frameElement).style("height", diameter - 120 + "px");
