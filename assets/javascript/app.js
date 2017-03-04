// ---------------------
//  Psuedo Code 
// ---------------------
	// reset button
	// state of the game
	// setTimeout
	// an array of questions
	// array of anwsers
	// rounds

// ---------------------
//  Application Pattern 
// ---------------------

	// SetUp/load the app phase (setting up the game and setting up the application: setting up the STATE)
	// Tracking user events — input data, clicks, etc.
	// Keeping track of Data/State/Scoring
	// Processing Stuff
	// Displaying Feedback to User
		// separate that click causes a visual effect. They should be separate.

// ---------------------
//  Application Pattern: Simplified 
// ---------------------
	// application state
	// event management
	// function and logic
		// create short function and then hand it off to the logic

	// display management
	// initialize/setup the app


// adding `return` at the end of the function stops the function from doing anything else

// appState = {
// firstNumber: ' ',
// phase: 'start'
// }

// ---------------------
// 	Psuedo Code
// ---------------------

	// create reset button $resetButton.onClick(( => { state = new gameState() }))
	// create array of questions and answers
	// create setTimeout for each question in the array
	// create onclick function that sets the answer choice to true
	// create a function that adds to rightAnswer and Wrong Answer
	// if statement that checks if selected answer is right
	// 

// ---------------------
// 	App State / Data
// ---------------------
	/* 
	You'll create a trivia form with multiple choice or true/false options (your choice).
	*/

	// var appState = {
	// 	rightAnswers: 0,
	// 	wrongAnswers: 0,
	// 	timer: null
	// }
	var state
	var questionOnScreen;
	var answerOnScreen;
	var timerId;
	var rightAnswers = 0;
	var	wrongAnswers = 0;
	var clicked = false;
	var unanswered;
	var asked = 0;

	var categories = [
	'Too fast and so furious.', 'Get off my porch.', 'Pop goes the ... bubbles?', 'Just going to lose a few stones.', 'dollars.', 'You made this? I made this.', 'Blockbuster and chill.'
	];


	var trivia = function ( question, correctAns, choices, asked ) {
		this.question = question;
		// add a property of answers for the correct answer
		this.correctAns = correctAns;
		this.choices = choices;
		this.asked = asked;

	};


	var triviaArr = [
	new trivia (
		'Before television, this game was once played in many forms among families, friends, and even in tournaments everywhere. What game is it?', 
		'Cards', 
		['Cards', 'Monopoly', 'Cricket', 'Knucklebones'],
		false
		),

	new trivia (
		'What was bubblewrap originally intended for?',
		'As 3D wallpaper', 
		['As a stress relief for children', 'Asylum padding alternative', 'As 3D wallpaper', 'Pressure gauge for NASA'],
		false
		),

	new trivia (
		'Who was the first Author to lose their billionaire status to charity?',	
		'J.K. Rowling',
		['Steven King', 'J.K. Rowling', 'William Shakespear', 'Earnest Hemingway'],
		false
		),
	
	new trivia (
		'Who did Enzo Ferrari insult by saying they could drive a tractor, but never be able to handle a ferrari?',
		'Ferruccio Lamborghini',
		['Henry Ford', 'Elon Musk', 'Ferdinand Porsche','Ferruccio Lamborghini',],
		false
		),

	new trivia (
		'How old was the designer of the current US Flag?',
		'That one 17 year old who got a B- for it', 
		['That one 17 year old who got a B- for it', 'A class of 8 year old misfits', 'Charles and ray eames in their mid 30s', 'A 70 year old unknown patriot'], 
		false
		),

	new trivia (
		'We think we are fat, but did you know clouds are fatter? How fat do you think the average cloud is?',
		'550 tons', 
		['550 tons', 'As fat as your mum', '17 billion grams', '230lbs'],
		false
		),

	new trivia (
		'With a ton of late fees coming, or going, what is the last movie rented from Blockbuster?',
		'This is the end', 
		['End of days', 'Apollo 13', 'This is the end', 'Clerks 2'],
		false
		)
	];



// ---------------------
//  Initialize App
// ---------------------
	//this should start the game OR reset it

// ---------------------
//  Event Management
// ---------------------


	// You'll create a trivia game that shows only one question until the player answers it or their time runs out.
	// Don't let the player pick more than one answer per question.

// ---------------------
//  Function and Logic
// ---------------------

	// function to grab a random question
	
	function randomOrder(){
		return ( Math.round( Math.random()) -0.5 ); 	
	}
	
	// --- TIMER --- //
	function startTimer( duration, display ) {
		var timer = duration, seconds;
		timerId = setInterval( function() {
			seconds = parseInt( timer % 60, 10 );
			seconds = seconds < 10 ? "0" + seconds : seconds;
			display.html( ":" + seconds );
  			// this is increment then test against zero, it's very similar to time++, except when the ++ or -- after after, it does the variable (time) against 0, and then the in cremented variable (which would be +1 or -1)
  			if ( clicked === true ) {
  				clearInterval( timerId );
  			}
  			if ( --timer < 0 ) {
  				timer = duration;
  				clearInterval( timerId );
  				display.text( "times up!" );
  				check();
  				showWrong();
  				clicked = true;
  				newQuestion();
  				hideBtns();
  			}

  		}, 1000 );

	};

	function renderQuestion() {
		if ( asked >= 5 ) {
			endGameScreen();
		} else {
			triviaArr.sort( randomOrder );
			questionOnScreen = triviaArr[0].question;
			$( '#question' ).append( '<div>' + questionOnScreen );
			asked += 1;
		}
	}


	function renderButtons(){
		console.log(triviaArr[0].asked)
		$( '.answer' ).empty();
		answerOnScreen = triviaArr[0].choices;
		showBtns();
		triviaArr[1].choices.sort( randomOrder );

		for ( i = 0; i < answerOnScreen.length; i++ ) {
			var Btn = $( '<button>' + '</br>' );
			Btn.addClass( 'choice' );
			Btn.attr( 'id', answerOnScreen[i] )
			Btn.text( answerOnScreen[i] )
			$( '.answer' ).append( Btn );
			if (triviaArr[0].asked === true) {	
				$('#question').empty();
				$('.answer').empty();
				renderQuestion();
				// renderGame(); ---> does not work.
			};
		}
	}

	// timer display function
	function timerDisplay() {
		var thirtySeconds = 60 / 4, 
		display = $( '#timer' );
		startTimer( thirtySeconds, display )
		$( '#timer' ).text( ':15' );
	};

	function check(){
		if ( this.id  === triviaArr.correctAns ) {
			showRight();
			triviaArr[0].asked = true;
			rightAnswers += 1;
		}
		else {
			showWrong();
			triviaArr[0].asked = true;
			wrongAnswers += 1;	
		}
	}

	// answer click event function
	function clickAnswer(){
		$( '.choice' ).on( 'click', function() {
			check()
			clicked = true;
			newQuestion();
			hideBtns();
		});
	};

	
	// If the player selects the correct answer, show a screen congratulating them for choosing the 
	// right option. After a few seconds, display the next question -- do this without user input.
	

	
	// The scenario is similar for wrong answers and time-outs:
	// If the player runs out of time, tell the player that time's up and display the correct answer. 
	// Wait a few seconds, then show the next question.
	
	// If the player chooses the wrong answer, tell the player they selected the wrong option and 
	// then display the correct answer. Wait a few seconds, then show the next question.

// ---------------------
//  Display Management / User Interface
// ---------------------

	// hide button
	function hideBtns(){
		$( '.answer' ).hide();
		$( '#timer' ).hide();
	};

	function showBtns(){
		$( '.answer' ).show();
		$( '#timer' ).show();
	};

	// render answer buttons
	

	// function renderDisplay();

	// render parts of the game
	function renderGame(){

	// questionOnScreen;
	// answerOnScreen;
	// timerId;
	rightAnswers = 0;
	wrongAnswers = 0;
	clicked = false;
		asked = 0;
	$( '#display' ).hide();
	randomOrder();
	timerDisplay();
	renderQuestion();
	renderButtons();
	clickAnswer();
	newQuestion();
};

function newQuestion(){
	if ( clicked === true ) {
		setTimeout( function(){ 
			clicked = false;
			$('#display').empty();
			$('#question').empty();
			$('#answer').empty();
			$('#timer').empty();
				// asked += 1;
				renderGame();
					// trivia();
					// randomOrder();
					// startTimer();
					// // renderButtons();
					// timerDisplay( randomOrder );
					// clickAnswer();
				}, 1000);	
	};
};

	// On the final screen, show the number of correct answers, incorrect answers, and an option to 
	// restart the game (without reloading the page).
	
	function showRight() {
		$( '#display' ).show();
		$( '#display' ).html('<h2>' + 'Good job!' )
	};

	function showWrong(){
		$( '#display' ).show();
		$( '#display' ).html( 'wrong answer!' )
		$( '#display' ).append( '</br>' + '<h2>' + 'It was ' + triviaArr[0].correctAns + '</h2>' )
	};

	function endGameScreen() {
		// $( '#display' ).hide();
		clearInterval( timerId );
		$('#timer').empty();
		$( '#display' ).text( 'right answers: ' + rightAnswers + ' wrong answers: ' + wrongAnswers );
		console.log("R: " + rightAnswers + " L: " + wrongAnswers);
		restart();
	};

	function restart() {
		$( '#display' ).show();
		// $('#display2').append('<button>' + 'Restart?' + '</button>');
		// $('#display2').on('click', function(){
			initiateGame();
		// });
	};

// ---------------------
//  Data Layer / Persistence Layer
// ---------------------
function initiateGame(){

	$( document ).ready( function() {
		
		$( '#display' ).html('<button>' + 'start' + '</button>');
		$( '#display' ).attr('start', 'start');
		$( '#display' ).on( 'click', function() {
			renderGame();
		})
		
	});
};

initiateGame();
