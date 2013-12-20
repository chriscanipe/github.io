/* Author:

*/

/*jslint white: false, debug: false, devel: true, onevar: false, plusplus: false, browser: true, bitwise: false, maxerr: 200 */
/*global jQuery: false, $: false, log: false, window: false, WSJNG: false, _: false */

// Just in case there's a console.log hanging around.... neutralize it on weak browsers
if(!window.console) {
	window.console = {
		"log" : function() {
		}
	};
}
PORTFOLIO = window.PORTFOLIO || {};

//---------------//
//--- GLOBALS ---//
//---------------//

var isIPAD = (navigator.userAgent.toLowerCase().indexOf("ipad") != -1);
var isIPHONE = (navigator.userAgent.toLowerCase().indexOf("iphone") != -1);
var isiOs = Boolean(navigator.userAgent.match(/(iPod|iPhone|iPad)/));

var $mainContent = $("#mainContent");
var $infoBox = $("#infoBox");
var $colOne = $(".colOne");
var $colTwo = $(".colTwo");

var highlightView = false;


var tabs = ["interactive", "graphics", "articles", "resume", "likes"];
PORTFOLIO.interactive = [];
PORTFOLIO.graphics = [];
PORTFOLIO.articles = [];
PORTFOLIO.likes = [];

var selected = tabs[0];
var dir = 0;

var $thumbs;
var $goTo;
var $last;


//---------------------------------------------//


$(document).ready(function() {
	$.getJSON("js/metadata.json", function(data) {

		$.each(data, function(i, item) {
			if (item.category == "interactive") {
				PORTFOLIO.interactive.push(item);
			} else if (item.category == "graphic") {
				PORTFOLIO.graphics.push(item);
			} else if (item.category == "article") {
				PORTFOLIO.articles.push(item);
			} else {
				PORTFOLIO.likes.push(item);
			}	
		});
		
		loadGraphics();
		setNav();
		
		//set first tab to active
		$(".navItem:first").addClass("navActive");

	});	
});


//Load graphics covers interactive and stative graphics categories//
function loadGraphics() {
	$mainContent.empty();
	
	//Load Interactive Graphics Markup
	if (selected == tabs[0]) {
		$.each(PORTFOLIO.interactive, function(i, item) {		
			$mainContent.append(
				"<div class='intx_item thumb item_"+i+"'>"+
					"<img class='intx_img_sm shadow' src='images/interactive/"+item.name+"_sm.jpg'/>"+
					"<div class='intx_label'>"+item.title+"</div>"+
				"</div>"
			);
			
		var preload = new Image();
		preload.src = "images/interactive/"+item.name+"_lg.jpg";
		
			
		});
	//Load Static Graphics Markup
	} else if (selected == tabs[1]) {
		$.each(PORTFOLIO.graphics, function(i, item) {
			$mainContent.append(
				"<div class='graphic_item thumb item_"+i+"'>"+
					"<img class='graphics_img_sm' src='images/graphics/"+item.name+"_sm.jpg'/>"+
				"</div>"
			);
			
			var preload = new Image();
			preload.src = "images/graphics/"+item.name+"_lg.jpg";
			
		});
	}
	
	$.each
	
	//Defite last item in order to hide nav arrow for last selection
	$last = $(".thumb:last").index();
	
	//Define thumbs as global variable	
	$thumbs = $(".thumb");
	
	//set first item to active
	$(".item_0").addClass("active");
	
}


//load likes items
function loadLikes() {
	$mainContent.empty();
	
	$.each(PORTFOLIO.likes, function(i, item) {
		$mainContent.append(	
		"<div class='likeItem'>"+
			"<div class='likeThumb' tooltip='"+title+"'>"+
			"<a href='"+item.url+"' target='_blank'><img src='images/likes/"+item.name+".jpg'/></a>"+
			"</div>"+
			"<div class='likeText'></div>"+
		"</div>"
		);
	
	});
	
	$(".likeItem").hover(
		function () {
			var index = $(this).index()
			
			$(this).find(".likeText").html(PORTFOLIO.likes[index].title);
		},
		function () {
			$(this).find(".likeText").empty()
		}
	);
}


function loadArticles() {
	$mainContent.empty();
	
	$.each(PORTFOLIO.articles, function(i, item) {
		
		$mainContent.append(
			"<div class='article'>"+
				"<div class='articleText'>"+
					"<div class='articleTitle'><a href='"+item.url+"' target='_blank'>"+item.title+"</a></div>"+
					"<div class='articlePub'>"+item.publication+"</div>"+
					"<div class='articleDate'>"+item.text+"</div>"+
				"</div>"+
			"</div>"
		);
	});
	
}

function loadResume() {
	$mainContent.empty();
	
	$mainContent.html(
		"<iframe src='resume.html' id='iframe' scrolling='no'></iframe>"
	);
}


function setNav() {
	$(".navItem").on("click", function() {
		
		var index = $(this).index();
		selected = tabs[index];
		
		$(".navItem").removeClass("navActive");
		$(this).addClass("navActive");
		
		if (index == 0 || index == 1) {
			loadGraphics();
		} else if (index == 2) {
			loadArticles();
		} else if (index == 3) {
			loadResume();
		} else if (index == 4) {
			loadLikes();
		}	
		
		highlightView = false;
		
	});
	
	$(document).on("click", ".thumb", function() {
		var $thisItem = $(this);
		
		$(".thumb").removeClass("active");
		$(this).addClass("active");
			
		loadHighlight($thisItem);
	});
	
	$(document).on("click", "#closeBtn", function() {
		$infoBox.slideUp(500);
		highlightView = false;	
	});
	
	$(document).on("click", ".arrows", function() {
		
		if ($(this).attr("id") == "leftArrow") {
			dir = -1;
		} else {
			dir = 1;
		}
		
		var index = parseInt($(".active").attr("class").split("_")[2], 10);
		
		$thisItem = $(".item_"+(index+dir));
		
		$(".thumb").removeClass("active");
		$thisItem.addClass("active");
		
		loadHighlight($thisItem);		
	});
	
	
	
	
	

	$(document).keydown(function(e) {
		if (e.keyCode == 37 && !$(".active").hasClass("item_0")) {
			dir = -1;
		} else if (e.keyCode == 39 && !$(".active").hasClass("item_"+$last)) {
			dir = 1;
		} else {
			dir = 0;
		}
		
		var index = parseInt($(".active").attr("class").split("_")[2], 10);
		
		$thisItem = $(".item_"+(index+dir));
		
		$(".thumb").removeClass("active");
		$thisItem.addClass("active");
		
		loadHighlight($thisItem);
		
	}); 

	
	

	
	
}


function scrollTo() {
	
	var newPos = $(".active").offset().top - 16;
	$("body").animate({scrollTop: newPos+"px"}, 500);
}



function loadHighlight($thisItem) {
	
	highlightView = true;
	
	//TOP POSITION OF ITEM JUST CLICKED (ACTIVE ITEM)	
	$thisTop = $thisItem.position().top;
	
	//SEND TOP POSITION TO getGoTo FUNCTION
	getGoTo($thisTop);


	var index = parseInt($thisItem.attr("class").split("_")[2], 10);
	
	var item = PORTFOLIO[String(selected)][index];
	
	var newDiv = $("<div>").attr({"class" : "state"});
	
	if ($(".active").hasClass("item_0")) {
		$("#leftArrow").hide();
	} else if ($(".active").hasClass("item_"+$last)) {
		$("#rightArrow").hide();
	} else {
		$(".arrows").show();
	}
	
	
	if (selected == "interactive") {
		$colOne.html(
			"<div class='descTitle'>"+item.title+"</div>"+
			"<div class='pubText'>"+item.publication+"</div>"+
			"<div class='descText'>"+item.text+"</div>"+
			"<div class='roleText'>Role: "+item.role+"</div>"+
			"<div class='link'><a href='"+item.url+"' target='_blank'>View project &raquo;</a></div>"
		);
	} else {	
		$colOne.html(
			"<div class='descTitle'>"+item.title+"</div>"+
			"<div class='pubText'>"+item.publication+"</div>"
		);
	}
	
	
	
	$colTwo.html(
		"<a href='"+item.url+"' target='_blank'><img class='mainImage' src='images/"+selected+"/"+item.name+"_lg.jpg'/></a>"
	);

	$infoBox.insertAfter($goTo).slideDown(500);	

	scrollTo();
	
	
	
	
	
}

function getGoTo($thisTop) {
	$.each($thumbs, function(i, item) {
		if ($(item).position().top > $thisTop) {
			return false;
		}		
		$goTo = $(item);
	});
}













