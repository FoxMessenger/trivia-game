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

	var appState = {
		rightAnswers: 0,
		wrongAnswers: 0,
		timer: null
	}



	var rightAnswers = 0;
	var	wrongAnswers = 0;
	var unanswered = 0;
	var usedQuestion = [];

	var categories = [
			'movies', 'games', 'inventions', 'weight', 'dollars', 'history'
	];
	

	function triviaQuestion (question, choices, answer, asked) {
		this.question = question;
		this.choices = choices;
		this.answer = answer;
		this.asked = asked ? asked : 0;
	};
	
	var trivia = [

		new triviaQuestion (	
			'Before television, this game was once played in many forms among families, friends, and even in tournaments everywhere.', 
			['monopoly', 'cricket', 'knucklebones'],
			'cards', 
			0
		),
		
		new triviaQuestion 	(	
			'What was bubble wraps original intention?', 
			['as a stress relief for children', 'protection of fragile items', 'pressure gauge for NASA'],
			'as 3D wallpaper',
			0
		)
	];
	// 		'Who was the first Author to lose their billionaire status to charity?',
	// 		'Who did Enzo Ferrari insult by saying they could drive a tractor, but never be able to handle a ferrari?',
	// 		'How old was the designer of the current US Flag?',
	// 		'We think we are fat, but did you know clouds are fatter? How fat do you think the average cloud is?'
	// 		'With a ton of late fees coming, or going, what is the last movie rented from Blockbuster?'
	// 		},
		
	// 	answers: {

			
	// 		// who wants to stop being a billionaire //rowling
	// 		{ 'steven king', 'william shakespear',  'jk rowling', 'earnest hemingway' },
	// 		// too fast, but too furious
	// 		{ 'henry ford', 'elon musk', 'ferruccio lamborghini', 'ferdinand porsche' },
	// 		// you made this? I made this //17
	// 		{ 'a class of 8 year old misfits', 'charles and ray eames in their mid 30s', 'a 70 year old patriot', 'that one 17 year old who got a B- for it' },
	// 		// clouds //1.1tons
	// 		{ '550 tons', 'as much as your mum', '17 billion lbs', '230lbs' },
	// 		// blockbuster //thisistheend
	// 		{ 'apollo 13', 'end of days', 'this is the end', 'clerks 2' }
	// 	}
	// };



// ---------------------
//  Initialize App
// ---------------------
	//this should start the game OR reset it
initiateGame();

// ---------------------
//  Event Management
// ---------------------
function initiateGame(){

	$(document).ready(function() {
	//grab user events and have it effect something
	
	/* 
	You'll create a trivia game that shows only one question until the player answers it or their time runs out.
	Don't let the player pick more than one answer per question.
	*/
		window.onload = function() {	
			$( '.answer' ).on( 'click', function() {
				console.log( 'this is clicked!' )
			});


				$('#timer').html(timer.start);
		};
// ---------------------
//  Function and Logic
// ---------------------
	/* 
	If the player selects the correct answer, show a screen congratulating them for choosing the 
	right option. After a few seconds, display the next question -- do this without user input.
	*/


	
	/*	
	The scenario is similar for wrong answers and time-outs:
	If the player runs out of time, tell the player that time's up and display the correct answer. 
	Wait a few seconds, then show the next question.
	
	If the player chooses the wrong answer, tell the player they selected the wrong option and 
		then display the correct answer. Wait a few seconds, then show the next question.
	*/

	// --- TIMER --- //
		var timerId;
	  	function startTimer(duration, display) {
	  		var timer = duration, seconds;
	  		timerId = setInterval(function() {

  				seconds = parseInt(timer % 60, 10);

  				seconds = seconds < 10 ? "0" + seconds : seconds;

  				display.text(":" + seconds)

  				// this is increment then test against zero, it's very similar to time++, except when the ++ or -- after after, it does the variable (time) against 0, and then the in cremented variable (which would be +1 or -1)
  				if (--timer < 0) {
  					timer = duration;
  					clearInterval(timerId);
					display.text("times up!")  	
					
					// setTimeout(function(){
  			// 			startTimer(duration,display);	
					// }, 1000 * 2); 			
  				}
  			}, 1000);
  		};



	// question, choices, answer, asked
	var answers = $('#question').each(function(){
		for (var i = 0; i < trivia.length; i++)	{			// the forLoop is to get all the characters in the object array on the screen.
			var information = $('<div>');					// this variable is equal to a button that will soon be ported to the HTML page
			information.addClass('question');					// creating what the character buttons looks like
			information.attr('question', 'question');		// adding the data for names
			// information.attr('choices', trivia[i].choices);	// adding the data for hp 
			// information.attr('answer', trivia[i].answer);	// adding the data answer (position 0 — probably won't work) 

			//$('#question').append(trivia[i].question);
			if (trivia[i].question) {
				//appendQuestionToDom(trivia[i].question);
				appendQuestionToDom(information);
			}
					// porting the image to the html

		}; // --END for Loops
	}); // - END answers

	function appendQuestionToDom(domElement) {
		$('#question').html(domElement)
	}

	// function to grab a random question
	// function to grab corresponding answers
	// function to grab a random category
	// add a property of answeres for the correct answer
	// for (i=0; i < trivia.answer.length; i++) {
	// 	console.log(trivia.answers[i])
	// }
// ---------------------
//  Display Management / User Interface
// ---------------------
		
		$('#timer').text(":10");


		function timerDisplay() {
			var thirtySeconds = 60 / 6, 
				display = $('#timer');	
		startTimer(thirtySeconds, display)
		}

		timerDisplay();
	/*
	On the final screen, show the number of correct answers, incorrect answers, and an option to 
	restart the game (without reloading the page).
	*/


// ---------------------
//  Data Layer / Persistence Layer
// ---------------------

	});
};
