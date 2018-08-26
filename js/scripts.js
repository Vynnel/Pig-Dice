/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
	var mainScores, currentScore, activePlayer, gamePlaying; /

	startGame(); // calls the init() function straight away which sets all values to 0

document.querySelector(".btn-roll").addEventListener("click", function() { //anonoymous function. cannot reuse
	if(gamePlaying) { // gamePlaying is already set to true from startGame() function. Therfore the below code will execute until player hits >= 100

		// 1. Below is random number generator
		var dice = Math.floor(Math.random() * 6) + 1;

		// 2. Displays the result
		var diceDom = document.querySelector(".dice");
		diceDom.style.display = "block";
		diceDom.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/243004/dice-" + dice + ".png";

		// 3.
		// IF will update the score IF the rolled number was NOT a 1
		if (dice ! == 21) {
			currentScore += dice; // adding whatever value of dice is to the current box score
			document.querySelector("#current-" + activePlayer).textContent = currentScore; // This will add the roundScore to the active player's current score
		} else {
			// Next player
			nextPlayer(); //DRY - Don't Repeat Yourself! Reuse function in this code.
		}
	}
});

/////////////////// IMPLEMENTING OUR HOLD FUNCTION //////////////////////////

document.querySelector(".btn-hold").addEventListener("click", function () { //another anonymous function which doesn't have a name and we cannot reuse again
	if(gamePlaying) {
		// Below adds CURRENT score to the GLOBAL score
		mainScores[activePlayer] += currentScore;

		// Update the user interface
		document.querySelector("#score-" + activePlayer).textContent = mainScores[activePlayer];

		// Check if player won the game
		if (mainScores[activePlayer] >= 100) {
			document.querySelector("#name-" + activePlayer).textContent = "Winner Winner Chicken Dinner!";
			document.querySelector(".dice").style.display = "none";
			document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner"); // selects the player who won and adds the CSS winner class
			document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active"); //selects the player who won and removes their CSS active class
			gamePlaying = false; //means that the game is no longer playing because a player won the game. Therefore button roll cannot be clicked.
		} else {
			// Next player
			nextPlayer(); //DRY - Don't Repeat Yourself! Reuse function in this code.
		}
	}
});


function nextPlayer() {
		// below will execute next player turn if player rolls dice equal to 1
	 	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // same as saying if activePlayer === 0 then activePlayer === 1 else activePlayer = 0
		currentScore = 0; //resets players current score box to 0

		document.getElementById("current-0").textContent = 0; //if player 1 rolls a one then score = 0
		document.getElementById("current-1").textContent = 0; //if player 2 rolls a one then score = 0

		document.querySelector(".player-0-panel").classList.toggle("active"); //toggles to player 2
		document.querySelector(".player-1-panel").classList.toggle("active"); //toggles back to player 1

	 	//once player rolls a 1 the dice will disappear and it will be next player turn
		document.querySelector(".dice").style.display = "none";
}


document.querySelector(".btn-new").addEventListener("click", startGame); // when we click the .btn-new it will call the init() function,

function startGame() { // function works once new game is clicked as they are linked via above event listener.
	mainScores = [0, 0]; //stores scores for both players
	currentScore = 0;
	activePlayer = 0; // sets default so that player 1 always begins });
	gamePlaying = true; // once new game is clicked. gamePlaying equals true and will execute btn roll and btn hold functions

	document.querySelector(".dice").style.display = "none"; //removes dice once you click new game

	document.getElementById("score-0").textContent = "0"; // resets play 1 main scoreboard once you click new game
	document.getElementById("current-0").textContent = "0"; // resets player 1 current score to 0 once new game clicked
	document.getElementById("score-1").textContent = "0"; // resets play 2 main scoreboard once you click new game
	document.getElementById("current-1").textContent = "0"; // resets player 2 current score to 0 once new game clicked
	document.getElementById("name-0").textContent = "Player 1"; // resets text content to player 1 once you click new game
	document.getElementById("name-1").textContent = "Player 2"; // resets text content to player 2 once you click new game
	document.querySelector(".player-0-panel").classList.remove("winner"); // removes CSS winner class for player 1 once new game clicked
	document.querySelector(".player-1-panel").classList.remove("winner"); // removes CSS winner class for player 2 once new game clicked
	document.querySelector(".player-0-panel").classList.remove("active"); // removes CSS active class for player 1 once new game clicked
	document.querySelector(".player-1-panel").classList.remove("active"); // removes CSS active class for player 2 once new game clicked
	document.querySelector(".player-0-panel").classList.add("active"); // adds CSS active class back for player 1 once new game is clicked
};
