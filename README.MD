##GOT24-Math Game

### Overview

Simple web game created with native javascript/html/css

Responsive CSS style for mobile phone/desktop/tablet

- Author

  Pei Deng

- Goal

  To improve basic math skills(addition/subtraction/multiplication/division)

###Features

- Game Mode

  Normal - 4 one-digit numbers

  Hard - 4 two-digit numbers

  Challenge - 9 one-digit numbers

  ![game-mode](demo_img\game-mode.PNG)

  Optional limited time

  ![limited-time](demo_img\limited-time.PNG)

- Game Rules

  Manipulate the numbers to get result 24.

![demo](demo_img\demo.gif)

### API

#### `validateGameNumbers()` in `js/algorithm.js `

- Usage

  To validate whether any combination of 4 numbers is able to obtain 24 by exhaustion method 

- Arguments 

  an array include 4 numbers

- Return Result

  True/False

- Example

  ```javascript
  var result = validateGameNumbers([3,8,1,1]);
  // will return ture, because 3*8*1*1=24
  var result = validateGameNumbers([1,1,1,1]);
  // will return false, because these 4 numbers cannot obtain the result 24
  ```


#### `data/credit.js`

- Usage

  Display the license information

- Data Structure

  ```javascript
  {
  title:"",
  author:"",
  attribution:"",
  url:""
  }
  ```

#### `data/gameLevel.js`

- Usage

  Set the game data of different game levels

- Modifiable Data

  ```javascript
  gameLevel[0].maxGameNumber;
  gameLevel[0].totalRound;
  gameLevel[0].hintChance;
  gameLevel[1].maxGameNumber;
  gameLevel[1].totalRound;
  gameLevel[1].hintChance;
  gameLevel[2].timeLimit;
  gameLevel[2].totalRound;
  gameLevel[2].gameNumbers;
  timeLevel[0].time;
  timeLevel[1].time;
  timeLevel[2].time;
  ```

#### `data/gameSound.js`

- Usage

  Set the sound effect and background music

- Modifiable Data

  ```javascript
  sounds.background;
  sounds.seleted;
  sounds.error;
  sounds.failed;
  sounds.win;
  ```

#### `data/gameSound.js`

- Usage

  Set the data of tutorial

- Data Structure

  ```javascript
  level1:{
      text:"",//The text displayed in current tutorial page
      gameNumbers:[],// the numbers, -1 means null, if only want to set 3 numbers, the 4th number should be -1. The combination of these numbers should be able to obtain the result 24
      steps:3,// equal to the gameNumbers.length-1
      nextLevel:"level2" // link to the next level, if set this property as "finish", this is the last level    
  }
  ```

#### `data/prompt.js`

- Usage
  All prompt text in game

- Modifiable Data

  All values can be modified as long as the structure has not been changed

