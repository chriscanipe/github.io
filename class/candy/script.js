


var candy = [{
	"name" : "crackle",
	"color" : "red",
	"chocolate" : "milk"
}, {
	"name" : "goodbar",
	"color" : "yellow",
	"chocolate" : "milk"
}, {
	"name" : "hersheys",
	"color" : "red",
	"chocolate" : "milk"
}, {
	"name" : "crackle",
	"color" : "red",
	"chocolate" : "milk"
}];



var crackles = new Array;
var other = new Array;

window.onload = sortCandy();

function sortCandy() {
	
	for (var i=0; i < candy.length; i++) {
		
		console.log(candy[i].name);
		
		if (candy[i].name == "crackle") {
			crackles.push(candy[i]);
		} else {
			other.push(candy[i]);
		}
	}
}


function eatCandy() {
	
	for (var i=0; i < candy.length; i++) {
		
		console.log(candy[i]);
		
	}
	
}
