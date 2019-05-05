function loadApplication() {
  configureContainer();
  configureHomePage();
}

function configureContainer() {
  //the app container
  window.container = createDIV("container");
  document.body.appendChild(container);

  //the icon bar for sound icon and home icon
  var iconBar = createIconBar();
  container.appendChild(iconBar);

  // add the layer mask which is used to lighten the background and highlight the prompt box
  var layerMask = createDIV("layer-mask");
  container.appendChild(layerMask);

  // the game container used to wrap all elements which need to clear when change page
  window.gameContainer = createDIV("game-container");
  container.appendChild(gameContainer);
}

function configureHomePage() {
  // create game title
  var gameTitle = createGametitle(); // in gameElements.js
  gameContainer.appendChild(gameTitle);

  // create menu div
  var homePageMenu = createDIV("menu-div");

  // create button
  var tutorialButton = createMenuButton("Tutorial");
  disableHoverOnMoble(tutorialButton); //in utils.js
  // add event to this button
  tutorialButton.onclick = loadTutorial; //in menu.js

  // create button
  var startGameButton = createMenuButton("Start");
  disableHoverOnMoble(startGameButton); //in utils.js
  // add event to this button
  startGameButton.onclick = loadStartGameMenu; // in menu.js

  var creditButton = createMenuButton("Credit");
  disableHoverOnMoble(creditButton); //in utils.js
  creditButton.onclick = loadCredit;

  // append menu to home page
  homePageMenu.appendChild(startGameButton);
  homePageMenu.appendChild(tutorialButton);
  homePageMenu.appendChild(creditButton);
  gameContainer.appendChild(homePageMenu);

  //hide home icon in home page
  hideHomeIcon(); //in menu.js
}

function configureGamePage() {
  displayHomeIcon(); //in menu.js
  // create dash board
  dashBoard = createDashBoard(); // in gameElements.js
  gameContainer.appendChild(dashBoard);

  // create game cards
  if (gameMode == "challenge") {
    gamecards = createGameCards(9, "challenge"); // in gameElements.js
  } else {
    gamecards = createGameCards(4, "random");
  }
  gameContainer.appendChild(gamecards);

  // create Operator Bar
  operatorBar = createOperatorBar(); // in gameElements.js
  gameContainer.appendChild(operatorBar);

  loadGame(); // in game.js
}

window.onload = loadApplication;
