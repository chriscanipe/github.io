/**
 * @author: Chris Canipe
 */

//Boom! Page load. Now what? loadGVizPackage. That's what.
$(document).ready(loadGVizPackage);


//Load up our Google Charts library and call our first function: getGunData
function loadGVizPackage(doc){
	google.load("visualization", "1", {packages:["corechart"], "callback": getGunData});
}

//get the gun data, then creat a chart with it.
function getGunData(){
	$.get("gunLaws.json", createChart, "json");		
}

//Sort state names.
function sortByState(a,b){
	if(a[0]<b[0]) { 
		return -1;
	}
	if(a[0]>b[0]){ 
		return 1;
	}
	return 0;
}

//Let's create our chart using our state data object (data),
//which we got from our ajax call in getGunData(). Thanks, ajax!
function createChart(data){
	
	//set up our Chart object
	var statePopBarChart = new google.visualization.DataTable();
	
	//Add three columns to our chart object: State name, Population number and tooltip.
	statePopBarChart.addColumn('string','State');
	statePopBarChart.addColumn('number','Population');
	statePopBarChart.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});
	
	//set up stateData Array
	var stateInfoArray = data.stateData;
	
	//establish number of items in set for our for loop. 
	var numberOfStates = stateInfoArray.length; 
	
	//New array to hold our list of state data.
	var statePopulationData = []; 
	
	//for loop gets individual attributes of each state in the stateInfoArray object.
	for(i=0; i<numberOfStates; i++){ 
		
		//individual state data
		var state = stateInfoArray[i]; 
		
		//population of said state
		var population = Number(state.totalpop)
		
		//american flag url, converted to html content
		var flagUrl = createCustomHTMLContent("http://upload.wikimedia.org/wikipedia/commons/2/28/Flag_of_the_USA.svg");

		//state data object	
		var stateData = [state.state, population, flagUrl]; 
		
		//push the state data object to our array, defined above
		statePopulationData.push(stateData); 
	}
	
	//sort these guys by population
	statePopulationData.sort(sortByPopulation);
	
	//make our state population array the data object for our chart
	//by adding it to the statePopBarChart
	statePopBarChart.addRows(statePopulationData);
	
	
	//this is the function that turns our flag url into useable html for the tooltip
	function createCustomHTMLContent(stateFlag) {
 		return '<img src="' + stateFlag + '" style="width:75px;height:50px">';
 	}
 	
 	//chart customization
 	//we added tooltip: {isHtml:true} so our tooltip will reconize the data as html
	var chartCustomization = {
		title: 'State Population',
		titleTextStyle: {fontSize: 18},
		vAxis: {title: 'State',  titleTextStyle: {color: 'red', fontSize: 18}},
		hAxis: {fontsize: 16},
		backgroundColor: 'transparent',
    	fontSize: 12,
    	legend: {textStyle: {fontSize: 14}},
    	tooltip: {isHtml:true}	
    
    };
	
    //set up our bar chart and define the div we'll send it to    
	var barChart = new google.visualization.BarChart(document.getElementById('chartGoesHere'));
    
    //send our data and customization objects to the chart.
    barChart.draw(statePopBarChart, chartCustomization); 
    
}





