function displayHomeIcon() {
  document.getElementsByClassName("home-icon")[0].style.display = "";
}

function hideHomeIcon() {
  document.getElementsByClassName("home-icon")[0].style.display = "none";
}

/* 
  this function is to clear all elements within gameContainer
  once user click a button link to a new page, this function will clear current page
  then it can configure that next page
*/
function clearPage() {
  document.getElementsByClassName("game-container")[0].innerHTML = "";
}

function backHome() {
  playSoundEffect("selected");
  if (document.getElementsByClassName("game-title")[0]) {
    document.getElementsByClassName("game-title")[0].classList.remove("hide");
  }
  document.getElementsByClassName("layer-mask")[0].classList.remove("appear");
  clearInterval(cdTimer);
  clearPage();
  configureHomePage();
}

function playBackgroundSound() {
  var icon = document.getElementsByClassName("sound-icon")[0];

  if (icon.classList.contains("muted")) {
    //if the pressed icon is muted, play the sound
    mute = false;
    sounds.background.play();
    icon.classList.remove("muted");
  } else {
    // if the pressed icon is not muted, mute the sound
    mute = true;
    sounds.background.pause();
    sounds.background.currentTime = 0;
    icon.classList.add("muted");
  }
}

// play the corresponding sound effect if it's not muted
function playSoundEffect(sound) {
  if (!mute) {
    switch (sound) {
      case "selected":
        sounds.selected.play();
        break;
      case "error":
        sounds.error.play();
        break;
      case "failed":
        sounds.failed.play();
        break;
      case "win":
        sounds.win.play();
        break;
    }
  }
}

// load the prompt box which has a prompt text and buttons
function loadPromptBox(prompt, className, ...btnName) {
  box = createPromptBox(prompt, className, ...btnName);
  gameContainer.appendChild(box);
  document.getElementsByClassName("layer-mask")[0].classList.add("appear");
  return box;
}

function resetGame() {
  playSoundEffect("selected");
  clearPage();
  configureGamePage();
}

function loadTutorial() {
  playSoundEffect("selected");
  gameMode = "tutorial";
  gameData = gameTutorial.level1;
  clearPage();
  configureGamePage(); // in utils
}

function loadRandomGame() {
  playSoundEffect("selected");

  gameMode = "game";
  gameRound = 1;
  timeLeft = gameData.timeLimit;
  hintChance = gameData.hintChance;
  gameData.gameNumbers = generateGameNumbers(gameData.maxGameNumber); // in game.js
  clearPage();
  configureGamePage();
}

function loadChallengeGame() {
  playSoundEffect("selected");
  document.getElementsByClassName("layer-mask")[0].classList.remove("appear");

  gameMode = "challenge";
  gameRound = 1;
  gameData.timeLimit = 0;
  gameData = gameLevel[2];
  // Shuffle the game numbers
  gameData.gameNumbers = gameLevel[2].gameNumbers
    .sort(function() {
      return 0.5 - Math.random();
    })
    .slice(0, 10);
  clearPage();
  configureGamePage();
}

function loadStartGameMenu() {
  playSoundEffect("selected");
  gameData = {}; //reset gameData
  startGameMenu();
}

function loadTimeMenu() {
  playSoundEffect("selected");
  timeMenu();
}

function startGameMenu() {
  displayHomeIcon();

  var menu = document.getElementsByClassName("menu-div")[0];
  menu.innerHTML = ""; // clear the current menu

  gameLevel.forEach(function(item) {
    var btn = createMenuButton(item.levelName);
    disableHoverOnMoble(btn);
    menu.appendChild(btn);
    configureGameLevelButtonEvent(btn, item);
  });
}

function timeMenu() {
  var menu = document.getElementsByClassName("menu-div")[0];
  menu.innerHTML = ""; // clear the current menu
  timeLevel.forEach(function(item) {
    var btn = createMenuButton(item.text);
    disableHoverOnMoble(btn);
    menu.appendChild(btn);
    configureTimeButtonEvent(btn, item.time);
  });
}

function configureGameLevelButtonEvent(button, Data) {
  button.onclick = function() {
    gameData = JSON.parse(JSON.stringify(Data)); // clone the object
    if (Data.levelName == "Challenge") {
      loadChallengeGame();
    } else {
      loadTimeMenu();
    }
  };
}

function configureTimeButtonEvent(button, time) {
  button.onclick = function() {
    gameData.timeLimit = time;
    loadRandomGame();
    // to start game
  };
}

function showHint() {
  playSoundEffect("selected");
  // this is to ensure user can get the hint in one round without reducing hint chance.
  // when user go to next round, the hintInSameRounad will be reset to false;
  if (!hintInSameRounad) {
    hintChance--;
    hintInSameRounad = true;
  }
  var hintMsg;
  switch (hint[2]) {
    case 0:
      hintMsg = hint[0] + "+" + hint[1];
      break;
    case 1:
      hintMsg = hint[0] + "\u00d7" + hint[1];
      break;
    case 2:
      hintMsg = hint[0] + "-" + hint[1];
      break;
    case 3:
      hintMsg = hint[1] + "-" + hint[0];
      break;
    case 4:
      hintMsg = hint[0] + "\u00f7" + hint[1];
      break;
    case 5:
      hintMsg = hint[1] + "\u00f7" + hint[0];
      break;
  }
  document.getElementsByClassName("prompt-text")[0].innerHTML =
    "The last step is " +
    hintMsg +
    " (You have " +
    hintChance +
    " rounds left for hints)";
}

function loadCredit() {
  playSoundEffect("selected");
  createCreditPage(); //in gameElements.js
}

function createCreditPage() {
  displayHomeIcon();
  //add a class name to hide the game title element in credit page on mobile device
  document.getElementsByClassName("game-title")[0].classList.add("hide");

  var menu = document.getElementsByClassName("menu-div")[0];
  menu.innerHTML = ""; // clear the current menu

  var creditTable = createCreditTable();
  menu.appendChild(creditTable);
}
