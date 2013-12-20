

$(document).ready(setNav);


function setNav() {
	
	$(".button").on("click", function() {
		
		var year = $(this).attr("id");
		
		if (year == "btn_1993") {
			$("#1993").fadeIn();
			$("#2000").fadeOut();
		} else {
			$("#2000").fadeIn();
			$("#1993").fadeOut();
		}
		
		$(".button").removeClass("buttonActive");
		$(this).addClass("buttonActive");
		
		
	});
	
}
