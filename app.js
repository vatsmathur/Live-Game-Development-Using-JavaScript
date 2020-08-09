/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls  dice as many times as he wishes. 
  Each result get added to his ROUND score.
- BUT, if the player rolls a 1, all his ROUND score gets lost. 
  After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score 
  gets added to his GLOBAL score. After that, it's the next player's 
  turn
- The first player to reach winning points on GLOBAL score wins 
  the game
*/
/*****************************************************
 *****************     ALGORITHM     ******************
 ******************************************************
 */
// Step1: Declaring all variables : Think of possible variables
// Step2: Calling and defining the init() function to
// initialize all values
// Step3: Handling the roll of the dice
// Step4: Handling the hold button
// Step5: The next Player (re-usable) logic
// DRY code : Don't Repeat Yourself

/*****************************************************
 ***************** LET'S START CODING ****************
 ******************************************************/

// Step1: Declaring all variables

var scores, roundScore, activePlayer, gamePlaying, winningScore;

//Step 2: Calling and defining the init() function

//2.1 Calling init()
init();

//2.2 initialize all the values:
//querySelector, getElementById , getElementByClassName

function init() {
  scores = [0, 0];
  activePlayer = 0; // will toggle from 0-1
  roundScore = 0;
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
  gamePlaying = true;
  console.log(document.getElementById("score-0"));
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

//2.3 event listener for button new
document.querySelector(".btn-new").addEventListener("click", init);

//3. Handling the Roll dice button
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //3.1 Generate random number
    var dice = Math.ceil(Math.random() * 6);
    console.log(dice);
    var dice2 = Math.ceil(Math.random() * 6);
    console.log(dice2);

    //3.2 display the result :
    //dice1:
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
    //dice2:
    var diceDOM2 = document.querySelector(".dice2");
    diceDOM2.style.display = "block";
    diceDOM2.src = "dice-" + dice2 + ".png";

    //3.3 Update the round score IF the rolled number != 1
    if (dice !== 1 && dice2 !== 1) {
      let totalDiceScore = dice + dice2;
      roundScore += totalDiceScore;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //3.4 next player
      nextPlayer();
      console.log("NEXT PLAYER PLEASE");
    }
  }
});

// 4. Handling the Hold button

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    //4.1 Add the current score to the global score
    console.log("round score after dice rolled is:", roundScore);
    scores[activePlayer] += roundScore;

    // 4.2 Update the UI with this score
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    //4.3 Update the logic for the winning score:

    let input = document.querySelector(".input-score").value;
    if (input) {
      winningScore = input;
      console.log(winningScore);
    } else {
      winningScore = 20;
    }
    //4.4 Check if the player has WON the game:
    if (scores[activePlayer] >= winningScore) {
      console.log("player" + (activePlayer + 1) + " has WON");
      document.querySelector("#name-" + activePlayer).textContent = "WINNER";
      document.querySelector(".dice").style.display = "none";
      document.querySelector(".dice2").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    }
    //4.5 Next player
    else {
      console.log("NEXT PLAYER AGAIN");
      nextPlayer();
    }
  }
});

//5. function nextPlayer() -> Reusable logic - DRY concept

function nextPlayer() {
  // 5.1 Check condition of the active player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  //5.2 nullify the round scores+ Toggle the active class
  roundScore = 0;
  document.querySelector("#current-0").textContent = roundScore;
  document.querySelector("#current-1").textContent = roundScore;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}
