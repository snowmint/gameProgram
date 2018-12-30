// threemain.js
var scene;

function initThree() {
	scene = new THREE.Scene();	
}

function updateScoreBoard(whichAgent1, whichAgent2) {
  $('#message').text (whichAgent1.name + ' : [' + whichAgent1.score.toFixed(1) + "] ...... vs ...... " + whichAgent2.name + ' : [' + whichAgent2.score.toFixed(1) + ']');
//	setTimeout (function () {$('#message').text ('')}, 2000);
}

function postMessage (whichAgent, msg) {
	$('#message').text (whichAgent.name + ': ' + msg);
	setTimeout (function () {$('#message').text ('')}, 2000);
}
