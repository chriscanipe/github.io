/**
 * @author: Chris Canipe
 */

var DATA;

//Boom! Page load. Now what? loadGVizPackage. That's what.
$(document).ready(loadGVizPackage);

function loadGVizPackage(doc) {
	google.load("visualization", "1", {
		packages : ["corechart"],
		"callback" : getFredData
	});
}

function getFredData() {
	$.get("https://www.googleapis.com/fusiontables/v1/query?sql=SELECT%20*%20FROM%201mEIULGqJoaxd0H8I3kxbsayaXD7XaT8Hphdgq6c&key=AIzaSyAWiyDlKOT_MOg1GQZGZvvSFcdCGGbBJz0", createChart, "json");
}

function createChart(data) {

	console.log(data);

	var fredDataTable = new google.visualization.DataTable();

	fredDataTable.addColumn('string', 'State');
	fredDataTable.addColumn('number', 'Population');
	fredDataTable.addColumn({
		'type' : 'string',
		'role' : 'annotation',
		'p': {'html': true}
	});

	var fredData = data.rows;

	var fredLength = fredData.length;

	for (var i = 0; i<fredLength; i++) {
		
		var currRow = fredData[i];
		
		var toolTipText = "";
		
		if (i == (fredLength-1) ) {
			toolTipText = fredData[i][1].toString();
		} else {
			toolTipText = "";
		}
		
		currRow.push(toolTipText);
		
	}




	fredDataTable.addRows(fredData);

	var chartCustomization = {
		title : 'Fred',
		titleTextStyle : {
			fontSize : 18
		},
		vAxis : {
			title : 'Value'
		},
		tooltip : {
			isHtml : true
		}
	};


	var lineChart = new google.visualization.LineChart(document.getElementById('chartGoesHere'));

	lineChart.draw(fredDataTable, chartCustomization);

}
