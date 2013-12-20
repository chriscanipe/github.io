/**
 * @author: Chris Canipe
 */

var DATA;

//Boom! Page load. Now what? loadGVizPackage. That's what.
$(document).ready(loadGVizPackage);

//Load up our Google Charts library and call our first function: getGunData
function loadGVizPackage(doc) {
	google.load("visualization", "1", {
		packages : ["corechart"],
		"callback" : getGunData
	});
}

//get the gun data with an ajax call, then creat a chart with it.
function getGunData() {
	$.get("gunLaws.json", createChart, "json");
}

//Let's create our chart using our state data object (data),
//which we got from our ajax call in getGunData(). Thanks, ajax!
function createChart(data) {

	DATA = data;

	//set up our Chart object
	var statePopBarChart = new google.visualization.DataTable();

	//Add three columns to our chart object: State name, Population number and tooltip.
	statePopBarChart.addColumn('string', 'State');
	statePopBarChart.addColumn('number', 'Population');
	statePopBarChart.addColumn({
		'type' : 'string',
		'role' : 'tooltip',
		'p': {'html': true}
		
		// the 'p' tag above lets the chart know to treat this value as html
	});

	//set up a variable called stateData
	//stateData contains all of our states
	var stateData = data.stateData;

	//establish number of items in set for our for loop
	var numberOfStates = stateData.length;

	//New array to hold our list of state data.
	var statePopulationData = [];

	//for loop.
	//This is where we loop through the individual attributes of each state in the stateData object.
	for ( i = 0; i < numberOfStates; i++) {

		//name our individual state data object
		var state = stateData[i];

		//We'll use this to access our flag image files in the "flags" folder
		//This is really just the state name
		var stateFileName = state.state;

	

		//This is where we replace any spaces in the state names with a hyphen
		//Because our file names don't have spaces in them. They have hyphens.
		//The replace() method takes the value we want to replace in the first argument,
		//and what we'd like to replace it with in the second.
		// replace(" ", "-") would replace the first space only.
		// replace(/ /g, "-") replaces all instances of the space.
		//documentation on the replace() method can be found here: http://www.w3schools.com/jsref/jsref_replace.asp
		stateFileName = stateFileName.replace(/ /g, "-");

		//the next three items will make up the current state's data row in our chart table
		//We will be passing the state name, it's population, and some html we'll use for the tooltip

		// 1. State Name
		var stateName = state.state

		// 2. population of said state
		// must be formatted as a number to work in our chart
		var population = Number(state.totalpop)

		// 3. html for the tooltip
		// We will get this html from a function we invoke called createCustomHTMLContent()
		// We'll pass it two arguments: the population number and the stateFileName
		// The function will *return* the html string we define in the function
		// and that html string will become the value of "tooltip"
		var tooltip = createCustomHTMLContent(population, stateFileName);

		//state data object, or row, we will be passing into our data table.
		//remember, our table has three columns, so we have to pass three things
		var stateDataRow = [state.state, population, tooltip];

		//push the state's data row to our data table
		statePopulationData.push(stateDataRow);
	
	} //end of for loop


	// This is where we format our tooltip html
	// We are passing two arguments, population number and stateFileName
	// (THUNK!! THUNK!!)
	function createCustomHTMLContent(population, stateFileName) {
		
		return 	"<img class='flag' src='flags/" + stateFileName + ".png'/>" +
				"<div class='toolTipText'>Population: " + population + "</div>"

		// the return value is the string we've constructed above.
		// the html markup will be the same each time
		// but the population number and state file name will be unique
		// because we're calling this function for each state via our for loop
	}
	
	
	statePopulationData.sort(function(a,b){
		
		return a[1]-b[1]});

	//make our state population array the data object for our chart
	//by adding it to the statePopBarChart
	statePopBarChart.addRows(statePopulationData);

	//chart customization
	var chartCustomization = {
		title : 'State Population',
		titleTextStyle : {
			fontSize : 18
		},
		vAxis : {
			title : 'State'
		},
		//TOOLTIP paramater lets the chart know to treat our tooltip value as HTML
		//if you don't include this, we'll see our html as markup
		tooltip : {
			isHtml : true
		}
	};

	//set up our bar chart and define the div we'll send it to
	var barChart = new google.visualization.BarChart(document.getElementById('chartGoesHere'));

	//send our data and customization objects to the chart.
	barChart.draw(statePopBarChart, chartCustomization);

}
