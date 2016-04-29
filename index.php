<!DOCTYPE HTML>
<html class="no-js" >
<head>
<meta charset="utf-8">
<title>Guess It!!</title>
<meta name="viewport" content="width=device-width, initial-scale=1">

<link href="styles/guess.css" rel="stylesheet" type="text/css">

<link href='http://fonts.googleapis.com/css?family=Cabin+Sketch:700' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Orbitron:900' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Playfair+Display:900italic' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>

<!--[if lte IE 8]>
    <script src="scripts/excanvas.js"></script>
<![endif]-->
<script src="scripts/modernizr.guess.js"></script>
<script>
Modernizr.load([{
	test: Modernizr.canvastext,
	nope: ['scripts/canvas.text.js', 'scripts/optimer-bold-normal.js']
},
{
	both: ['scripts/jquery-1.7.min.js', 'scripts/guess.js'],
	complete: function() {
		init();
	}
}]);
</script>
</head>

<body>
<!--
<h1>GUESS WHO!! </h1>
-->

<div id="topbar">
     <h1>GUESS It!!!</h1>
</div>
<!--
<p id="warning">JavaScript must be enabled to play this game.</p>
-->
<div id="help"></div>
<div id="helptext">
    <h2>How to Play</h2>
    <div id="close"></div>
    <p>Guess who is an interesting game. It consists of levels. There is an image in each level. For moving to next level you have to guess the image and select appropriate lettters from hints to be successful in guesing the image. Its simple !! E.N.J.O.Y. !!!</p>
</div>

<div id="game">
	<div id="level"></div> 
	<div id="types"></div>
	<canvas id="stage" width="250px" height="250px">Sorry, your browser needs to support canvas for this game.</canvas>
	<div id="word"></div>
	<div id="letters"></div>
</div>


<div id="play">New Game</div> 
<!--
<div id="clear">Clear Score</div> 

<div id="nextLvl">Next Level</div>
-->

</body>
</html>
