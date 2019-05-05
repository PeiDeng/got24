/*
  The follow functions are to validate whether the combination of random numbers is able to obtain 24 by exhaustion method 

  Algorithm:
  
  Step 1:
  First step is to list all possible permutations of these numbers
  For example, say 4 numbers, the number of possible permutations of the 4 numbers is 4*3*2*1
  
  Step 2:
  Then, list the possible operation structure 
  Assume the 4 number as A,B,C,D and operator as $
  the all possible operations are
  (A$B)$(C$D), ((A$B)$C)$D, (A$(B$C))$D, A$(B$(C$D)), A$((B$C)$D) 
  The last four combination have the same structure, only the sequence is differencet, so we treat them as the same
  Therefore, we got two possible structure:  
  a. 
     1. calculate the result of 2 numbers 
     2. calculate the result of other two numbers    
     3. calculate the result of two previous results
  b. 
     1. calculate the result of 2 numbers   
     2. calculate the result of the fisrt result and another number   
     3. calculate the result of second result and last number

  Step 3:
  At last, list all possible of operator for each position in A$B$C$D
  In the second step, we did not consider the sequence of the two numbers in per calculation,
  which means, if the operator is division or subtraction, A$B and B$A will got different result
  Therefore, we consider the division and subtraction have a sub branch, inverse division and inverse subtraction
  which means there are 6 possible operaters in per calculation

  We have 3 calculation for 4 numbers so the number of all possbile operators is 6*6*6

  To sum up, the number of all possible operations is 6*6*6*4*3*2*1*2

  the first function validateGameNumbers is for the step 1
  the function operationStructureA and operationStructureB is for the step 2
  the function caculateTwoNumbers is for step 3
*/

function validateGameNumbers(numbers) {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      for (var k = 0; k < 4; k++) {
        for (var h = 0; h < 4; h++) {
          if (i != j && i != k && i != h && j != k && j != h && k != h) {
            if (
              operationStructureA(
                numbers[i],
                numbers[j],
                numbers[k],
                numbers[h]
              )
            ) {
              return true; // if the first operationStructure get the result 24, return true
            } else if (
              operationStructureB(
                numbers[i],
                numbers[j],
                numbers[k],
                numbers[h]
              )
            ) {
              return true; // if the second operationStructure get the result 24, return true
            } else {
              return false; // did not get the result 24 return false
            }
          }
        }
      }
    }
  }
}

function operationStructureA(num1, num2, num3, num4) {
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
      for (var k = 0; k < 6; k++) {
        var result1 = caculateTwoNumbers(num1, num2, i);
        if (result1 != -1) {
          // if the fisrt calculation is valid
          var result2 = caculateTwoNumbers(num3, num4, j);
          if (result2 != -1) {
            // if the second calculation is valid
            var result = caculateTwoNumbers(result1, result2, k);
            if (result == 24) {
              hint = []; // clear the hint
              hint.push(result1); // used for hint
              hint.push(result2);
              hint.push(k);
              return true;
            }
          }
        }
      }
    }
  }
  return false;
}

function operationStructureB(num1, num2, num3, num4) {
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
      for (var k = 0; k < 6; k++) {
        var result1 = caculateTwoNumbers(num1, num2, i);
        if (result1 != -1) {
          // if the fisrt calculation is valid
          var result2 = caculateTwoNumbers(result1, num3, j);
          if (result2 != -1) {
            // if the second calculation is valid
            var result = caculateTwoNumbers(result2, num4, k);
            if (result == 24) {
              hint = []; // clear the hint
              hint.push(result2); // used for hint
              hint.push(num4);
              hint.push(k);
              return true;
            }
          }
        }
      }
    }
  }
  return false;
}

// calculate two number and a operator, return the result
// if the operation is invalid, return -1
function caculateTwoNumbers(num1, num2, operator) {
  var result;
  switch (operator) {
    case 0:
      result = num1 + num2;
      break;
    case 1:
      result = num1 * num2;
      break;
    case 2:
      result = num1 - num2;
      if (result < 0) {
        return -1;
      }
      break;
    case 3:
      result = num2 - num1;
      if (result < 0) {
        return -1;
      }
      break;
    case 4:
      if (num2 == 0) {
        return -1;
      }
      result = num1 / num2;
      if (Math.floor(result) != result) {
        return -1;
      }
      break;
    case 5:
      if (num1 == 0) {
        return -1;
      }
      result = num2 / num1;
      if (Math.floor(result) != result) {
        return -1;
      }
      break;
  }
  return result;
}
