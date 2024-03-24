/*
Sudoku is a game played on a 9x9 grid.

The goal of the game is to fill all cells of the grid with digits from 1 to 9, 
so that each column, each row, and each of the nine 3x3 sub-grids 
(also known as blocks) contain all of the digits from 1 to 9.

Write a function that accepts a Sudoku board, 
and returns true if it is a valid Sudoku solution, or false otherwise. 

The cells of the input Sudoku board may also contain 0's, which will represent empty cells. 
Boards containing one or more zeroes are considered to be invalid solutions.

Examples:
  Valid board:
    5 3 4|6 7 8|9 1 2
    6 7 2|1 9 5|3 4 8
    1 9 8|3 4 2|5 6 7
    -----+-----+-----
    8 5 9|7 6 1|4 2 3
    4 2 6|8 5 3|7 9 1
    7 1 3|9 2 4|8 5 6
    -----+-----+-----
    9 6 1|5 3 7|2 8 4
    2 8 7|4 1 9|6 3 5
    3 4 5|2 8 6|1 7 9

  Invalid board:
        This column has two 3's
                            v
    This cell has a 0 > 0 3 4|6 7 8|9 1 2
                        6 7 2|1 9 5|3 4 8
                        1 9 8|3 4 2|5 6 7
                        -----+-----+-----
                        8 5 9|7 6 1|4 2 3
                        4 2 6|8 5 3|7 9 1
                        7 1 3|9 2 4|8 5 6
                        -----+-----+-----
          This box has /9 6 1|5 3 7|2 8 4
              two 3's>| 2 8 3|4 1 9|6 3 5 < This row has two 3's
                       \3 4 5|2 8 6|1 7 9

Details:
  All inputs are guaranteed to be 2D boards of size 9x9 with possible values in range 0-9.
  Rows, columns and blocks (3x3 small squares) must contain each number from range 1-9 exactly once.
  User solution must not modify input boards.
*/


// Solution

function validateSudoku(board) {
  let set = new Set() 
  let zeroSet = new Set()
  //number of rows
  for(let i=0; i<board.length; i++) {
    //number of columns 
    for(let j=0; j<board[0].length; j++) {
      let value = board[i][j]
      //String - value of the element and the row number. eg: '5 row-1'
      let row = value + ' row-' + i 
      //vice-versa
      let col = value + ' col-' + j
      //String - Value of the element and the box number it is present in (Total 9 boxes numbered from 0-8)
      let box = value + ' box-' + Math.floor(i/3) + "," + Math.floor(j/3) 
      
      //Checking if each row, column or box has same elements
      //For instance, lets say we have encountered 5 in row 1, so variable row becomes '5 row-1' and we add it to variable set
      //Now, if we encounter another 5 in row 1, variable row again becomes '5 row-1' 
      //ATQ, there should be unique elements in each row, col or box,
      //So, if we get the same string in the set again, this means the board is not valid

      //Also have zeroSet to check for multiple zeroes in which case the board is again invalid
      
      if(set.has(row) || set.has(col) || set.has(box) || zeroSet.has(0)) {
        return false
      }
      else {
        set.add(row)
        set.add(col)
        set.add(box)
        if(value === 0)
          zeroSet.add(value)
      }
    }
  }
  return true
}

// or

function validateSudoku(board) {
  for (let i = 0; i < 9; i++) {
    let row = new Set(), col = new Set(), sq = new Set();
    for (let j = 0; j < 9; j++) {
      let rowIndex = 3 * Math.floor(i / 3) + Math.floor(j / 3);
      let colIndex = 3 * (i % 3) + (j % 3);
      if (board[i][j] === 0 || row.has(board[i][j]) ||
          board[j][i] === 0 || col.has(board[j][i]) ||
          board[rowIndex][colIndex] === 0 || sq.has(board[rowIndex][colIndex])) return false;
      row.add(board[i][j]);
      col.add(board[j][i]);
      sq.add(board[rowIndex][colIndex]);
    }
  }
  return true;
}