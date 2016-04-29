// Global variables
var canvas = document.getElementById('stage'),
	word = document.getElementById('word'),
	letters = document.getElementById('letters'),
	game = document.getElementById('game'),
	level = document.getElementById('level'),
	types = document.getElementById('types'),
	type,
	image_name,
	wordToGuess,
	wordLength,
	badGuesses,
	correctGuesses,
	typed,
	hint,
	shuffled,
	currentLevel,
	index,
	setblink,
	placeholders;
	
 
 var myList = new Array(30);
 for (var z = 0; z < 50; z++) {
	myList[z] = new Array(2);
 }

 

function init() {
	$('#game').hide();
	$('#word').hide();
	$('#letters').hide();
	$('#stage').hide();
	$('#nextLvl').hide();

	var helptext = $('#helptext'),
		w = screen.availWidth <= 800 ? screen.availWidth : 800;
	
	currentLevel = 1;
	
	//$('#loading').hide();
	$('#play').css('display', 'inline-block').click(newGame);
	
	$('#help').click(function(e) {
		$('body').append('<div id="mask"></div>');
        helptext.show().css('margin-left', (w-300)/2 + 'px');
    });
	$('#close').click(function(e) {
		$('#mask').remove();
        helptext.hide();
    });
	
	// Rescale the canvas if the screen is wider than 700px
	if (screen.innerWidth >= 700) {
		canvas.getContext('2d').scale(1.5, 1.5);
	}

	
	iconList();
}




// Start new game
function newGame() {
	
	$('#play').hide();
	$('#clear').hide();
	
	$('#game').show();
	$('#word').show();
	$('#letters').show();
	$('#stage').show();
	$('#level').show();
	$('#types').show();
	
	var extraChar,
		randomnumber,
		failed,
		abc = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	
	badGuesses = 0;
	correctGuesses = 0;
	typed = 0;
	setblink=0;
	placeholders = '',
	
	index = currentLevel-1;
	
	type = myList[index][0];
	image_name = myList[index][1];	
	
	level.innerHTML = "LEVEL: " + currentLevel;
	types.innerHTML = type;
	
	wordToGuess = myList[index][1];;
	wordLength = wordToGuess.length;
	hint = wordToGuess;
	extraChar=0;
	
	while(extraChar < 10){
		failed = false;
		randomnumber=Math.floor(Math.random()*26);
	
		for (var i = 0; i < hint.length; i++) {
			if (abc[randomnumber].toLowerCase() == hint.charAt(i)){	
				failed = true;
				break;
			}
		}
		if (failed == false){
			hint = hint + abc[randomnumber].toLowerCase();
			extraChar++;
		}
	}
		
	shuffled = hint.split('').sort(function(){return 0.5-Math.random()}).join('');
	shuffled = shuffled.toUpperCase();
	hint = shuffled;
	
	
	
	for ( i = 0; i < wordLength; i++) {
		placeholders += '?';
	}
	
	DrawGuessed();
	DrawHints();
	drawCanvas();
}



function DrawGuessed(){
	var guess_frag = document.createDocumentFragment();
	word.innerHTML = '';
	for (var i = 0; i < wordLength; i++) {
		var div = document.createElement('div');
		var div_id = "guessed";
		div_id = div_id + i;
		div.id = div_id;
		div.style.cursor = 'pointer';
		div.innerHTML = placeholders.charAt(i);
		div.onclick = getLetterWord;
		if (placeholders.charAt(i) == '?'){
			div.style.cursor = 'default';
			div.onclick = null;
		}
		guess_frag.appendChild(div);
	}
	word.appendChild(guess_frag);	
}

function DrawHints(){
	var frag = document.createDocumentFragment();
	letters.innerHTML = '';
	for (var i = 0; i < hint.length; i++) {
		var div = document.createElement('div');
		var div_id = "hints";
		div_id = div_id + i;
		div.id = div_id;
		div.style.cursor = 'pointer';
		div.innerHTML = hint.charAt(i);
		div.onclick = getLetter;
		if (hint.charAt(i) == '?'){
			div.style.visibility = 'hidden'; 
			div.style.cursor = 'default';
			div.onclick = null;
		}
		
		frag.appendChild(div);
	}
	//alert(hint);
	letters.appendChild(frag);	
}


function getLetterWord() {
		typed--;
		//alert(shuffled);
		//alert(hint);
		checkLetterWord(this.innerHTML);
		//alert(parseInt(this.id));
		var str_divid = this.id;
		str_divid = str_divid.split('');
		for (var i = 0; i < 7; i++) {
			str_divid[i] = '0';
		}
		str_divid = str_divid.join('');
		//var str_id = str_divid[7];
		var id = parseInt(str_divid,10);
		//alert(id);
		
		
		placeholders = placeholders.split('');
		placeholders[id] = '?';
		placeholders = placeholders.join('');
		DrawGuessed();
	
}

function checkLetterWord(letter) {
	
	shuffled = shuffled.split('');
	hint = hint.split('');
	for (var i = 0; i < hint.length; i++) {
		if(shuffled[i] == letter && hint[i] == '?'){
			hint[i] = letter;
			break;
		}
	}
		
	shuffled = shuffled.join('');
	hint = hint.join('');
	DrawHints();
	//alert(hint);
}




function getLetter() {
	typed++;
	//alert(hint);
	if(typed > wordLength)
		drawCanvas();
	else{	
		checkLetter(this.innerHTML);
		var str_divid = this.id;
		//alert(str_divid);
		str_divid = str_divid.split('');
		
		for (var i = 0; i < 5; i++) {
			str_divid[i] = '0';
		}
		//var str_id = str_divid[5];
		str_divid = str_divid.join('');
		//alert(str_divid);
		var id = parseInt(str_divid,10);
		//alert(id);
		
		
		hint = hint.split('');
		hint[id] = '?';
		hint = hint.join('');
		//alert(hint);
		DrawHints();
		//alert(hint);
	
	}
}


function checkLetter(letter) {
	
	 var   wrongGuess = true;
	placeholders = placeholders.split('');
	for (var i = 0; i < wordLength; i++) {
		if(placeholders[i] == '?'){
			placeholders[i] = letter;
			break;
		}
	}
	placeholders = placeholders.join('');
	DrawGuessed();

	
	if (typed == wordLength ){
		if(placeholders.toLowerCase() == wordToGuess.toLowerCase()){
			//alert (placeholders);
			correctGuesses = 1;
			}
		else
			badGuesses = 1;
			
		drawCanvas();	
	}
}




function drawCanvas() {
	var c = canvas.getContext('2d');
	canvas.width = canvas.width;
	
	var img = new Image();
	var dw = canvas.width;
	var dh = canvas.height;
	img.selectable = false
	img.onload = function () {
		c.drawImage(img, 0, 0,dw,dh);
	}
	var image_src = "images/" + image_name + ".jpg";
	//alert(image_src);
	img.src = image_src;
	
	if (badGuesses == 1){
		setTimeout(wrongGuess, 200);
		
	}

	if (correctGuesses == 1) {
		setTimeout(correctGuess, 200);
		}
	
}

function wrongGuess() {
	
	var c = canvas.getContext('2d');
	canvas.width = canvas.width;
	
	var img = new Image();
	var dw = canvas.width;
	var dh = canvas.height;
	img.onload = function () {
		c.drawImage(img, 0, 0,dw,dh);
	}
	var image_src = "images/wrong.gif";
	var test = "test";
	
	for (var i = 0; i < wordLength; i++) {
		//
		var div_id = "guessed";
		div_id = div_id + i;
		//alert(div_id);
		//div.id = div_id;
		var div = document.getElementById(div_id);
		//alert(div.id);
		div.style.cursor = 'default';
		div.onclick = null;
		
	}
	
	//alert(image_src);
	img.src = image_src;
	setblink=1;
	blinkColor();
	setTimeout(tryAgain, 3000);
}

function blinkFont()
{
  document.getElementById("blink1").style.color="red";
  setTimeout("setblinkFont()",500);
}

function setblinkFont()
{
  document.getElementById("blink1").style.color="";
  setTimeout("blinkFont()",500);
}

function blinkColor()
{
	if(setblink ==1){
	  document.getElementById("word").style.background="red";
	  setTimeout("setblinkColor()",500);
	  }
}

function setblinkColor()
{
	if(setblink ==1){
		  document.getElementById("word").style.background="";
		  setTimeout("blinkColor()",500);
		  }
}

function tryAgain(){
	document.getElementById("word").style.background="";
	setblink=0;
	badGuesses = 0;
	drawCanvas();
	for (var i = 0; i < wordLength; i++) {
		//
		var div_id = "guessed";
		div_id = div_id + i;
		//div.id = div_id;
		var div = document.getElementById(div_id);
		div.style.cursor = 'pointer';
		div.onclick = getLetterWord;
		
	}
	
	
	
	

}

function correctGuess() {

	$('#word').hide();
	$('#letters').hide();
	$('#level').hide();
	$('#types').hide();
	
	var c = canvas.getContext('2d');
	canvas.width = canvas.width;
	
	var img = new Image();
	var dw = canvas.width;
	var dh = canvas.height;
	img.onload = function () {
		c.drawImage(img, 0, 0,dw,dh);
	}
	
	if(currentLevel == 40){
		var image_src = "images/finish.gif";
	//alert(image_src);
	img.src = image_src;
	}
	else{
	var image_src = "images/congrats2.gif";
	//alert(image_src);
	img.src = image_src;
	
	setTimeout(nextLevel, 3000);
	
	}
}

function nextLevel(){
	currentLevel +=1;
	newGame();
}



function iconList(){	//0-type, 1-name, 2-image
	myList[0][0] = 'Character';
	myList[0][1] = 'Casper';
	
	
	myList[1][0] = 'Character';
	myList[1][1] = 'Joker';
	
	
	myList[2][0] = 'City';
	myList[2][1] = 'Paris';
	
	
	myList[3][0] = 'Brand';
	myList[3][1] = 'Facebook';
	
	
	myList[4][0] = 'Event';
	myList[4][1] = 'Olympic';
	
	
	myList[5][0] = 'City';
	myList[5][1] = 'Newyork';
	
	
	myList[6][0] = 'Famous';
	myList[6][1] = 'Einstein';
	
	
	myList[7][0] = 'Brand';
	myList[7][1] = 'Pixar';
	
	
	myList[8][0] = 'Famous';
	myList[8][1] = 'Obama';
	
	
	myList[9][0] = 'Character';
	myList[9][1] = 'Peterpan';
	
	
	
	myList[10][0] = 'Famous';
	myList[10][1] = 'Ali';
	
	
	myList[11][0] = 'Character';
	myList[11][1] = 'Bean';
	
	
	myList[12][0] = 'City';
	myList[12][1] = 'London';
	
	
	myList[13][0] = 'Famous';
	myList[13][1] = 'Hawking';
	
	
	myList[14][0] = 'City';
	myList[14][1] = 'Cairo';
	
	
	myList[15][0] = 'City';
	myList[15][1] = 'Dubai';
	
	
	myList[16][0] = 'Character';
	myList[16][1] = 'Simpson';
	
	
	myList[17][0] = 'Brand';
	myList[17][1] = 'Android';
	
	
	myList[18][0] = 'Character';
	myList[18][1] = 'Tarzan';
	
	
	myList[19][0] = 'Character';
	myList[19][1] = 'Chaplin';
	
	
	
	myList[20][0] = 'Character';
	myList[20][1] = 'Elvis';
	
	
	myList[21][0] = 'Character';
	myList[21][1] = 'Nemo';
	
	
	myList[22][0] = 'City';
	myList[22][1] = 'Athens';
	
	
	myList[23][0] = 'Brand';
	myList[23][1] = 'Linux';
	
	
	myList[24][0] = 'Character';
	myList[24][1] = 'Ted';
	
	
	myList[25][0] = 'Brand';
	myList[25][1] = 'Nike';
	
	
	myList[26][0] = 'Character';
	myList[26][1] = 'Superman';
	
	
	myList[27][0] = 'Brand';
	myList[27][1] = 'Toyota';
	
	
	myList[28][0] = 'Brand';
	myList[28][1] = 'worldbank';
	
	
	myList[29][0] = 'Character';
	myList[29][1] = 'Packman';
	
	
	
	myList[30][0] = 'Brand';
	myList[30][1] = 'Youtube';
	
	
	myList[31][0] = 'Character';
	myList[31][1] = 'Batman';
	
	
	myList[32][0] = 'Character';
	myList[32][1] = 'Popeye';
	
	
	myList[33][0] = 'Brand';
	myList[33][1] = 'Twitter';
	
	
	myList[34][0] = 'Brand';
	myList[34][1] = 'MGM';
	
	
	myList[35][0] = 'Character';
	myList[35][1] = 'Spiderman';
	
	
	myList[36][0] = 'Character';
	myList[36][1] = 'Bugsbunny';
	
	
	myList[37][0] = 'Brand';
	myList[37][1] = 'Mercedes';
	
	
	myList[38][0] = 'Famous';
	myList[38][1] = 'Messi';
	
	
	myList[39][0] = 'Brand';
	myList[39][1] = 'DHL';
	
	
	
	

}