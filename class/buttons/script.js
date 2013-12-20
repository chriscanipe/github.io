



$(document).ready(setNav);


function setNav() {

	$("#2000").hide();
	
	$(".button")
	
	$(".button").on("click", function() {
		var item = $(this).text();
		
		if (item == "1993") {
			$("#1993").fadeIn("slow");
			$("#2000").fadeOut("slow");
		} else {
			$("#2000").fadeIn("slow");
			$("#1993").fadeOut("slow");
		}
		
		$(".button").removeClass("navActive");
		$(this).addClass("navActive");
		
	});
}
