$(document).ready(getData);

var stateData;

function getData() {
	$.get("gunLaws.json", function(data) {
		stateData = data.stateData;
		showMyJSON(data);
		
		//listStates();
	});
}
function showMyJSON(data) {
	
	for(var i=0; i < data.stateData.length; i++) {
		
		var currentState = data.stateData[i].state;
		
		var newDiv = $("<div>").attr({"class" : "state"});
		
		$("#content").append(newDiv);
		
	}
	
}

function listStates() {
	$.each(stateData, function(i, item) {
		$("#content").append(
			"<div class='state'>"+item.state + " Population: " + item.totalpop+"</div>");
	});
}
