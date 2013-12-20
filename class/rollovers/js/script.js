



$("#boxOne").mouseover(showNote);
$("#boxOne").mouseout(hideNote);

$(".rollNote").hide();


function showNote(e) {
	$("#boxOne_note").show();
}


function hideNote(e) {
	$("#boxOne_note").hide();
}
