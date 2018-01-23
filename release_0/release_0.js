const fs = require('fs');

function reduceRow(arr, row, numList) {
    var numList = numList.filter((e) => {
        return arr[row].indexOf(e) === -1
    });
    return numList;
}

function reduceCol(arr, col, numList) {
    for (let row = 0; row < arr.length; row++) {
        if (numList.includes(arr[row][col])) {
            numList.splice(numList.indexOf(arr[row][col]), 1)
        }
    }
    return numList;
}

function reduceBox(arr, row, col, numList) {
    row = Math.floor(row / 3) * 3;
    col = Math.floor(col / 3) * 3;
    for (let i = row; i < row + 3; i++) {
        for (let j = col; j < col + 3; j++) {
            if (numList.includes(arr[i][j])) {
                numList.splice(numList.indexOf(arr[i][j]), 1)
            }
        }
    }
    return numList;
}

function partialSolve(arr, row, col) {
    var numList = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    numList = reduceRow(arr, row, numList);
    numList = reduceCol(arr, col, numList);
    numList = reduceBox(arr, row, col, numList);
    return numList;
}

function solveSudoku(arr) {
    var pVal = null;
    var memStore = {};
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i][j] === '-') {
                pVal = partialSolve(arr, i, j);
                if (pVal.length === 1) {
                    arr[i][j] = pVal[0];
                } else {
                    memStore['' + i + j] = pVal;
                }
            }
        }
    }
    // Uncomment the following lines to log and visualize 
    // the decreasing memStore inside each recursion:
    // 
    // console.log("memStore: ", memStore);
    // console.log("memStore length: ", Object.keys(memStore).length);
    // console.log('');

    if (Object.keys(memStore).length) {
        return solveSudoku(arr)
    } else {
        return arr;
    }
}

function create2Darray(line) {
    var array1D = line.split('');
    var array2D = [], chunk = 9;

    for (let i = 0; i < array1D.length; i += chunk) {
        array2D.push(array1D.slice(i, i + chunk));
    }
    return array2D;
}

function prettyBoard(arr) {
    arr.forEach((line) => {
        console.log(line.join(' '));
    });
}

fs.readFileSync('sudoku_puzzles_1-5.txt').toString().split('\n').forEach((line) => {

    // Read line, and convert it to a 2D array
    var qArray = create2Darray(line);
    console.log("\nQuestion: \n");
    prettyBoard(qArray);

    console.log("\nSolution: \n");
    var sArray = solveSudoku(qArray);
    prettyBoard(sArray);

    console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");

});