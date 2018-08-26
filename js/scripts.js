var mainScores, currentScore, activePlayer, gamePlaying;

	startGame();
document.querySelector(".btn-roll").addEventListener("click", function() {
	if(gamePlaying) {


		var dice = Math.floor(Math.random() * 6) + 1;


		var diceDom = document.querySelector(".dice");
		diceDom.style.display = "block";
		diceDom.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/243004/dice-" + dice + ".png";


		if (dice !==1) {
			currentScore += dice;
			document.querySelector("#current-" + activePlayer).textContent = currentScore;
		} else {

			nextPlayer();
		}
	}
});
document.querySelector(".btn-hold").addEventListener("click", function () {
	if(gamePlaying) {
		mainScores[activePlayer] += currentScore;


		document.querySelector("#score-" + activePlayer).textContent = mainScores[activePlayer];


		if (mainScores[activePlayer] >= 100) {
			document.querySelector("#name-" + activePlayer).textContent = "Winner Winner Chicken Dinner!";
			document.querySelector(".dice").style.display = "none";
			document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
			document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
			gamePlaying = false;
		} else {

			nextPlayer();
		}
	}
});


function nextPlayer() {

	 	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		currentScore = 0;

		document.getElementById("current-0").textContent = 0;
		document.getElementById("current-1").textContent = 0;

		document.querySelector(".player-0-panel").classList.toggle("active");
		document.querySelector(".player-1-panel").classList.toggle("active");


		document.querySelector(".dice").style.display = "none";
}


document.querySelector(".btn-new").addEventListener("click", startGame);

function startGame() {
	mainScores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	document.querySelector(".dice").style.display = "none";

	document.getElementById("score-0").textContent = "0";
	document.getElementById("current-0").textContent = "0";
	document.getElementById("score-1").textContent = "0";
	document.getElementById("current-1").textContent = "0";
	document.getElementById("name-0").textContent = "Player 1";
	document.getElementById("name-1").textContent = "Player 2";
	document.querySelector(".player-0-panel").classList.remove("winner");
	document.querySelector(".player-1-panel").classList.remove("winner");
	document.querySelector(".player-0-panel").classList.remove("active");
	document.querySelector(".player-1-panel").classList.remove("active");
	document.querySelector(".player-0-panel").classList.add("active");
}
