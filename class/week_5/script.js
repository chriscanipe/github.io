$(document).ready(function() {
	loadViz();
});

function loadViz(thePage) {
		google.load("visualization", "1", {packages:["corechart"], "callback" :loadJSONData});
		console.log("loadViz");
}

function loadJSONData() {
	$.get("gunLaws.json", gunDataLoaded, "json");
	console.log("loadJSONData");	
}

function gunDataLoaded(data) {

	console.log("gunDataLoaded");

	var guardianTable = new google.visualization.DataTable();
	guardianTable.addColumn("string", "State");
	guardianTable.addColumn("number", "Population");
	
	var stateData = data.stateData;
	var numStates = stateData.length;
	
	var rowData = [];
	
	
	
	for (i=0; i<numStates; i++) {
		var currState = stateData[i];
		
		var currRow = [currState.state, Number(currState.totalpop)];
	
		rowData.push(currRow);
	
	}
	
	guardianTable.addRows(rowData);
	
	rowData.sort(function(a,b){
		console.log(a);
		return a-b});
	
	console.log(rowData);
	
	var options = {
		title: 'Populations',
		vAxis: {title: 'State',  titleTextStyle: {color: 'red'}}
	};
	
	var chart = new google.visualization.BarChart(document.getElementById("chartGoesHere"));
	chart.draw(guardianTable, options);
	
	
	

}
