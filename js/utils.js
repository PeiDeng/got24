/* return a letter list for adding 3D letter CSS style
    Example: 
    createLetters("a","b","c");
    it will return a list of span elements
    each element will have the corresponding class which is used to associate with CSS style
*/
function createLetters(...letters) {
  var result = [];
  letters.forEach(function(letter, i) {
    result[i] = create3Dletter(letter, letter, "letter");
  });
  return result;
}

/* 
  Because the css hover can not be used on mobile device, 
  therefore, use this function to disable the hover style on mobile device
*/
function disableHoverOnMoble(element) {
  if (!detectMobileDevice()) {
    //if the device is desktop, add a "on-desktop" class to the elements
    //only have this class can apply hover style
    element.classList.add("on-desktop");
  }
}

/*
    this function can detect the current device is mobile or desktop
    if it is a mobile device, it will return ture
    URL: https://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system
 */
function detectMobileDevice() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))
    return true;
  else return false;
}

/*
    This function is to switch the pressed state of elements such as game card and opterator
    Once user click the gamecard or operator, this element will be displayed as a selected style by add a class to this element
    If user click this element again, this class will be remove and the element will back to the unselected style
*/
function pressedStyle(element) {
  // switch the pressed state
  element.pressed = !element.pressed;
  if (element.pressed) {
    element.classList.add("pressed"); // add a class to display different style
  } else {
    element.classList.remove("pressed");
  }
}

/*
    This function is to ensure only one opterator can be selected
    example:
        resetOperatorsPressed(0,operators);
        the parameter refers to the selected operator
        then traverse the list to change the other 3 operators to unpressed state
*/
function resetOperatorsPressed(index) {
  operators.forEach(function(o, i) {
    if (i !== index) {
      // if the index does not equal to the passed in index
      o.pressed = false;
      o.classList.remove("pressed");
    }
  });
}

/*
    This function will check the selecetion state of all operators
    if anyone is pressed, return true.
    if none is pressed return false.
*/
function checkOperatorSelection() {
  var checked = false;
  operators.forEach(function(item) {
    if (item.pressed) {
      checked = true;
    }
  });
  return checked;
}

/*
    This function will check the selecetion state of all gameCards
    if anyone is pressed, return true.
    if none is pressed return false.
*/
function checkCardSelection() {
  var checked = false;
  cards.forEach(function(item) {
    if (item.pressed) checked = true;
  });
  return checked;
}

/*
    this function is to hide the game card if the card number is -1.
    Because, after user selected 2 cards and performed the calculation,
    the second selected card should disapear
    it is also used in tutorial which may only have less than 4 number in total
*/
function hideGameCard(card) {
  if (card.children[0].innerHTML == "-1") {
    card.style.visibility = "hidden";
  }
}
