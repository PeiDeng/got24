var firstSelection;
var secondSelection;
var selectedOperater;
var steps;
var totalSteps;
var gameData;
var cards;
var operators;
var gameMode;
var gameRound;
var cdTimer;
var timeLeft;
var mute = true;
var hintChance;
var hint = [];
var hintInSameRounad = false;

//this function is to load the onclick events to the buttons
function loadGame() {
  cards = [...document.getElementsByClassName("game-card")];
  operators = [...document.getElementsByClassName("operator-div")];

  setGameData();
  // add onclick event to gamecards
  for (var i = 0; i < cards.length; i++) {
    configureGameCardEvent(i);
  }

  // add onclick event to operators
  for (var i = 0; i < 4; i++) {
    configureOperaterEvent(i);
  }

  // add onclick event to reset button
  var resetButton = document.getElementsByClassName("reset")[0];
  resetButton.onclick = function() {
    resetGame(); // in menu.js
  };

  if (gameMode == "game") {
    createHintButton();
    // add onclick event to hint button
    var HintButton = document.getElementsByClassName("hint")[0];
    HintButton.onclick = function() {
      showHint(); // in menu.js
    };
  }
}

//This function is to calcute the result based on user selection
function calucator(firstSelection, operater, secondSelection) {
  var result;
  var num1 = parseInt(firstSelection.children[0].innerHTML); //get the number from the first selection
  var num2 = parseInt(secondSelection.children[0].innerHTML); //get the number from the first selection
  switch (operater.classList.item(1)) {
    case "addition":
      result = num1 + num2;
      break;
    case "subtraction":
      result = num1 - num2;
      break;
    case "multiplication":
      result = num1 * num2;
      break;
    case "division":
      result = num1 / num2;
      break;
  }

  /*
 in the caculation process, only postive integer is valid, which means the result of each setp
 cannot be fraction or negative number
*/
  if (Number.isInteger(result) && result >= 0) {
    playSoundEffect("selected");
    reLoadGameCards(firstSelection, operater, secondSelection, result); // if the result is a valid number, reload the game cards
  } else {
    playSoundEffect("error");
    document.getElementsByClassName("prompt-text")[0].innerHTML =
      prompt.invalidNumber; // if the result is not a valid number, prompt user
    // set the selected cards to unpressed
    pressedStyle(firstSelection); // in utils.js
    pressedStyle(secondSelection);
    pressedStyle(operater);
  }
}

function reLoadGameCards(firstSelection, operater, secondSelection, result) {
  firstSelection.children[0].innerHTML = result; // set the result to the first card
  secondSelection.children[0].innerHTML = "-1"; // set the value of second card to -1

  hideGameCard(secondSelection); // hide the second card
  pressedStyle(firstSelection); // set the fisrt card to unpressed
  pressedStyle(operater); // set the operator to unpressed
  pressedStyle(secondSelection); // set the second card to unpressed
  validateResult(result); // after calculation, validate the result
}

function validateResult(result) {
  steps++; // record the steps
  if (steps == totalSteps) {
    // check if the current operation is the last step
    if (result == 24) {
      // check if this is tutorial
      if (gameMode == "tutorial") {
        // check if this tutorial if finished
        if (gameData.nextLevel != "finish") {
          gameData = gameTutorial[gameData.nextLevel]; //set game data to next tutorial level
          clearPage();
          configureGamePage();
        } else {
          var promptBox = loadPromptBox(
            prompt.finishTutorial,
            "success",
            "Back"
          );
          promptBox.children[2].onclick = backHome; // add the link to the button in prompt box
        }
      } // this is not a tutorial
      else {
        // check if this is the last round
        if (gameRound != gameData.totalRound) {
          // go to next round
          if (gameMode == "game") {
            gameRound++;
            hintInSameRounad = false;
            gameData.gameNumbers = generateGameNumbers(gameData.maxGameNumber); // generate new game numbers
            clearTimeout(cdTimer);
            timeLeft = gameData.timeLimit; // reset timer
            clearPage();
            configureGamePage();
          } else {
            gameRound++;
            clearPage();
            configureGamePage();
          }
        } else {
          if (!mute) {
            sounds.background.pause();
          }
          playSoundEffect("win");
          if ((gameMode = "challenge")) {
            var promptBox = loadPromptBox(
              prompt.finishChallenge,
              "success",
              "Back"
            );
          } else {
            var promptBox = loadPromptBox(prompt.finishGame, "success", "Back");
          }
          clearTimeout(cdTimer);
          promptBox.children[2].onclick = function() {
            if (!mute) {
              sounds.background.play();
            }
            backHome();
          };
        }
      }
      //wrong result, prompt user
    } else {
      // set and last card to red and all button to unclickable
      [...document.getElementsByClassName("game-card")].forEach(function(item) {
        item.classList.add("wrong");
      });
      [...document.getElementsByClassName("operator-div")].forEach(function(
        item
      ) {
        item.classList.add("wrong");
      });
      // propmt user
      playSoundEffect("error");
      document.getElementsByClassName("prompt-text")[0].innerHTML =
        prompt.wrongResult;
      // highlight the reset button
      document.getElementsByClassName("reset")[0].classList.add("wrong");
    }
  }
}

function setGameData() {
  if (gameMode == "tutorial") {
    // check if this is tutorial or not, only tutorial has the property "text"
    //set tutorial text
    var tutorial = createHeading1(gameData.text, "tutorial-text");
    document.getElementsByClassName("dash-row-one")[0].appendChild(tutorial);
  } else {
    var rountText = "ROUND " + gameRound + "/10"; //display the current round
    var round = createHeading1(rountText, "game-round");
    document.getElementsByClassName("dash-row-one")[0].appendChild(round);

    // if the time limit is set
    if (gameData.timeLimit != 0) {
      var timer = createHeading1("", "time-limit");
      document.getElementsByClassName("dash-cell-one")[0].appendChild(timer);
      setTimer(); // display the left time per second
    }
  }

  //set game numbers
  var gameCards = [...document.getElementsByClassName("game-card")];

  gameCards.forEach(function(card, i) {
    if (gameMode == "challenge") {
      card.firstChild.innerHTML = gameData.gameNumbers[gameRound - 1][i];
    } else {
      card.firstChild.innerHTML = gameData.gameNumbers[i];
    }
    hideGameCard(card); // hide empty cards
  });

  //set the steps
  totalSteps = gameData.steps;
  steps = 0;
}

function configureGameCardEvent(i) {
  cards[i].onclick = function() {
    if (steps != totalSteps)
      // if this is not the final step
      document.getElementsByClassName("prompt-text")[0].innerHTML = ""; // clear the prompt
    /* first, check if the current selected card is pressed or not
                this is to get the user's intent is to select this card or cancel selection*/
    if (!cards[i].pressed) {
      /* if the current card is unpressed, it means the user is intent to select this cards
                    then check if the other cards is selected or not */
      if (checkCardSelection()) {
        // in utils.js
        /*if there is already a card is selected, this is the second card to be selected.
                        then, to check if an operator is selected. 
                        this process is to ensure the user input order is correct.
                        for example, user need to select a number 1 first, then select a operater +, after that, user
                        can select the second number 2. Only in this sequence, the game can calucate the result
                         */
        if (checkOperatorSelection()) {
          // in utils.js
          // this is second selection
          pressedStyle(cards[i]);
          secondSelection = cards[i]; // assign the user second selection to the global variable to calculate
          calucator(firstSelection, selectedOperater, secondSelection); // do the calculation
        } else {
          playSoundEffect("error");
          document.getElementsByClassName("prompt-text")[0].innerHTML =
            prompt.wrongOperation; // if user did not select a operater, prompt user to select
        }
      } else {
        // this is first selection
        playSoundEffect("selected");
        pressedStyle(cards[i]); // if this is the first selected card to user. select it.
        firstSelection = cards[i]; // assign the user first selection to the global variable to calculate
      }
    } else {
      // this is to cancel fisrt selection
      playSoundEffect("selected");
      pressedStyle(cards[i]); // if the current selected card is pressed, cancel the selection state of this card
    }
  };
}

function configureOperaterEvent(i) {
  operators[i].onclick = function() {
    playSoundEffect("selected");
    resetOperatorsPressed(i); // in utils.js
    pressedStyle(operators[i]);
    if (steps != totalSteps)
      // if this is not the final step
      document.getElementsByClassName("prompt-text")[0].innerHTML = ""; // clear the prompt
    selectedOperater = operators[i]; // assign the user selected operator to the global variable to calculate
  };
}

function generateGameNumbers(max) {
  var valid = false;
  while (!valid) {
    var numbers = [];
    for (var i = 0; i < 4; i++) {
      numbers.push(Math.floor(Math.random() * max) + 1);
    }
    if (max > 9) {
      // if it is two digit level, ensure at list one two digit number in the list
      if (
        numbers[0] > 9 ||
        numbers[1] > 9 ||
        numbers[2] > 9 ||
        numbers[3] > 9
      ) {
        valid = validateGameNumbers(numbers);
      }
    } else {
      valid = validateGameNumbers(numbers);
    }
  }
  return numbers;
}

/*
  This function is to set a countdown timer
  Note that the reset game number function will not reset the timer, 
  therefore, if the timer is still running, will not generate a new timer
 */
function setTimer() {
  displayTime();

  // if no timer is runninig
  if (timeLeft == gameData.timeLimit) {
    cdTimer = setInterval(function() {
      if (timeLeft == 0) {
        // if time is up, finish this game
        if (!mute) {
          sounds.background.pause();
        }
        playSoundEffect("failed");
        clearInterval(cdTimer);
        var promptBox = loadPromptBox(
          prompt.gameFail,
          "warning",
          "Restart",
          "Back"
        );
        promptBox.children[3].onclick = function() {
          if (!mute) {
            sounds.background.play();
          }
          backHome();
        };

        //restart the game
        promptBox.children[2].onclick = function() {
          if (!mute) {
            sounds.background.play();
          }
          playSoundEffect("selected");
          gameRound = 1;
          gameData.gameNumbers = generateGameNumbers(gameData.maxGameNumber);
          timeLeft = gameData.timeLimit;
          document
            .getElementsByClassName("layer-mask")[0]
            .classList.remove("appear");
          clearPage();
          configureGamePage();
        };
      } else {
        timeLeft--;
      }
      displayTime();
    }, 1000);
  }
}

// display the left time on dashboard
function displayTime() {
  if (timeLeft < 10) {
    document.getElementsByClassName("time-limit")[0].classList.add("warning");
    document.getElementsByClassName("time-limit")[0].innerHTML =
      "00:0" + timeLeft;
  } else {
    document.getElementsByClassName("time-limit")[0].innerHTML =
      "00:" + timeLeft;
  }
}
