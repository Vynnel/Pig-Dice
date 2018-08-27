function Names(Player1, Player2) {
  this.Player1 = Player1;
  this.Player2 = Player2;
}

var pigGame = {
  player1Score: 0,
  player2Score: 0,
  playerUp: 1,
  turnScore: 0,
};

function diceRoll () {
  die1 = Math.floor(Math.random()*6) +1;
  return dice1;
}

var playerRoll = function() {
  var roll = diceRoll();
  if(roll === 1){
    pigGame.turnScore = 0;
    alertEndTurn();
    switchPlayer();
  } else {
    pigGame.turnScore +=roll;
    if (pigGame.playerUp === 1) {
      if (pigGame.turnScore + pigGame.player1Score >= 21) {
        alertWinner(1);
      }
    } else if (pigGame.turnScore + pigGame.player2Score >= 21) {
      alertWinner(2);
  }
  }
  return roll;
}

function hold() {
  var currentPlayer = pigGame.playerUp;
  if (currentPlayer ===1) {
    pigGame.player1Score += pigGame.turnScore;
  } else {
    pigGame.player2Score += pigGame.turnScore;
  }
  pigGame.turnScore = 0;
  switchPlayer();
}


function switchPlayer () {
  if (pigGame.playerUp === 1) {
    $("#player1Button").hide();
    $("#player2Button").show();
    pigGame.playerUp = 2;

  } else {
    $("#player2Button").hide();
    $("#player1Button").show();
    pigGame.playerUp = 1;

  }
}

function resetGame() {
  pigGame.player1Score = 0;
  pigGame.player2Score = 0;
  pigGame.playerUp = 1;
  pigGame.turnScore = 0;
}

function alertEndTurn(){
  alert("Next player up");
  $(".playerStatus").text(pigGame.playerUp);
}

function alertWinner(playerNumber) {
  alert("Player " + playerNumber + " has ");
  resetGame();
  $(".gameStatusDisplay").text(0);
}

$(document).ready(function() {

  $("form#pigForm").submit(function(event){
    var playerName1 = $("input#playerName1").val();
    var playerName2 = $("input#playerName2").val();
      $("span#playerName1").text(playerName1);
      $("span#playerName2").text(playerName2);
      $("#player2Button").hide();
      $("#player1Button").show();
      $(".playerStatus").text(pigGame.playerUp);
      event.preventDefault();

    var nameHolder = new Names(playerName1, playerName2);
  })


  $(".roll").click(function() {
    pigResult = playerRoll();
    $(".rollResult").text(pigResult);
    $(".turnScore").text(pigGame.turnScore);

  });

  $(".hold").click(function(){
    hold();
    $("rollResult").text("");
    $(".player1Score").text(pigGame.player1Score);
    $(".player2Score").text(pigGame.player2Score);
    $(".playerStatus").text(pigGame.playerUp);
  });
});
