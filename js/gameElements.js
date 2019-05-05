function createGametitle() {
  var gameTitle = createDIV("game-title");
  var letters = createLetters("G", "O", "T", "2", "4");
  letters.forEach(function(letter) {
    gameTitle.appendChild(letter);
  });
  return gameTitle;
}

function createMenuButton(text) {
  var buttonDiv = createDIV("button-div");
  var buttonText = createHeading1(text, "button-text");
  disableHoverOnMoble(buttonText);//in utils.js
  buttonDiv.appendChild(buttonText);
  return buttonDiv;
}

function createIconBar() {
  var iconBar = createDIV("icon-bar");
  soundIcon = createDIV("sound-icon", "muted");
  homeIcon = createDIV("home-icon");
  disableHoverOnMoble(soundIcon);
  disableHoverOnMoble(homeIcon);

  // add the onclick event
  homeIcon.onclick = backHome; // in menu.js
  soundIcon.onclick = playBackgroundSound; // in menu.js

  // to disable the hover style on mobile device
  disableHoverOnMoble(homeIcon); //in utils.js
  disableHoverOnMoble(soundIcon);

  iconBar.appendChild(soundIcon);
  iconBar.appendChild(homeIcon);
  return iconBar;
}

/* 
  the dash board above the gamecard has several functions such as
  display game round, display prompt, reset button, display the recording time 
*/
function createDashBoard() {
  var dashBoard = createDIV("dash-board");
  var dashRow1 = createDIV("dash-row-one");
  var dashRow2 = createDIV("dash-row-two");
  var dashCell1 = createDIV("dash-cell-one");
  var dashCell2 = createDIV("dash-cell-two");
  dashRow2.appendChild(dashCell1);
  dashRow2.appendChild(dashCell2);
  dashBoard.appendChild(dashRow1);
  dashBoard.appendChild(dashRow2);

  var resetButton = createDIV("reset");
  disableHoverOnMoble(resetButton);

  dashCell2.appendChild(resetButton);
  //create a text field to display the prompt when user did wrong operation
  var prompt = createHeading1("", "prompt-text");
  dashBoard.appendChild(prompt);
  return dashBoard;
}

function createGameCards(num, mode) {
  // the create GameCard which is to display the game number
  var gameCards = createDIV("game-card-container");
  var cards = [];
  for (var i = 0; i < num; i++) {
    cards.push(createGamecard(mode));
  }
  cards.forEach(function(item) {
    gameCards.appendChild(item);
  });
  return gameCards;
}

function createGamecard(mode) {
  var card = createDIV("game-card");
  var text = createHeading1("", "game-card-num");
  card.appendChild(text);
  // to disable the hover style on mobile device
  disableHoverOnMoble(card); // in utils.js

  if (mode == "challenge") {
    card.classList.add("challenge");
    text.classList.add("challenge");
  }
  return card;
}

function createOperatorBar() {
  var operators = createOperators();
  var operatorBar = createDIV("operator-bar");

  operators.forEach(function(item) {
    operatorBar.appendChild(item);
  });
  return operatorBar;
}

function createOperators() {
  var addition = createDIV("operator-div", "addition");
  var text = createHeading1("+", "operator");
  addition.appendChild(text);

  var subtraction = createDIV("operator-div", "subtraction");
  var text = createHeading1("-", "operator");
  subtraction.appendChild(text);

  var multiplication = createDIV("operator-div", "multiplication");
  var text = createHeading1("\u00d7", "operator");
  multiplication.appendChild(text);

  var division = createDIV("operator-div", "division");
  var text = createHeading1("\u00f7", "operator");
  division.appendChild(text);

  return [addition, subtraction, multiplication, division];
}

function createPromptBox(prompt, className, ...btnName) {
  var box = createDIV("prompt-box", className);
  var header = createHeading1(prompt.header, "prompt-box-header", className);
  var content = createHeading1(prompt.content, "prompt-box-text", className);
  box.appendChild(header);
  box.appendChild(content);
  [...btnName].forEach(function(item) {
    var btn = createHeading1(item, "prompt-box-button", className);
    box.appendChild(btn);
  });
  return box;
}

function createHintButton() {
  var dashCell3 = createDIV("dash-cell-three");
  document.getElementsByClassName("dash-row-two")[0].appendChild(dashCell3);

  var hintButton = createDIV("hint");
  disableHoverOnMoble(hintButton);
  dashCell3.appendChild(hintButton);
}

function createCreditTable() {

  var creditContainer = createDIV("credit-container");

  credit.forEach(function(item) {
    var creditDiv = createDIV("credit-div");
    var title = createHeading1(item.title, "credit-title");
    creditDiv.appendChild(title);
    var table = document.createElement("TABLE");
    table.classList.add("credit-table");
    var tr = document.createElement("TR");
    tr.classList.add("credit-tr");
    var td = document.createElement("TD");
    td.classList.add("credit-td1");
    td.innerHTML = "Author";
    tr.appendChild(td);
    var td = document.createElement("TD");
    td.classList.add("credit-td2");
    td.innerHTML = item.author;
    tr.appendChild(td);
    table.appendChild(tr);
    var tr = document.createElement("TR");
    tr.classList.add("credit-tr");
    var td = document.createElement("TD");
    td.classList.add("credit-td1");
    td.innerHTML = "Attribution";
    tr.appendChild(td);
    var td = document.createElement("TD");
    td.classList.add("credit-td2");
    var a = document.createElement("A");
    a.innerHTML = item.attribution;
    a.setAttribute("href", item.url);
    a.setAttribute("target", "_blank");
    td.appendChild(a);
    tr.appendChild(td);
    table.appendChild(tr);
    creditDiv.appendChild(table);
    creditContainer.appendChild(creditDiv);
  });
  return creditContainer;
}
