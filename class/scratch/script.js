



$(document).ready(setNav);


function setNav() {
	$(".button").on("click", function() {
		var item = $(this).text();
		
		if (item == "1993") {
			$("#1993").fadeIn(500);
			$("#2000").fadeOut(500);
		} else if (item == "2000") {
			$("#2000").fadeIn(500);
			$("#1993").fadeOut(500);
		}
		
		$(".button").removeClass("navActive");
		$(this).addClass("navActive");
		
		
	});
}

