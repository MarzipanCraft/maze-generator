'use strict';
const colors = require('colors');
const readlineSync = require('readline-sync');
const gridSize = 11;
console.log('hi');
genMaze(gridSize)





function genMaze(size) {
    let grid = createGrid(gridSize);
    let startCell = rndOddCell(gridSize);
    let currentCell = startCell;
    var key;
    let moves = [];
    while (key != ' ') {

        console.log(currentCell);
        console.log(moves);
        displayBoard(grid, startCell, currentCell, moves);
        key = readlineSync.keyIn('...', { hideEchoBack: true, mask: '' });
        let move;
        let invalid = true;
        do {
            move = rndDirection()
            console.log
            let newCell = currentCell.map((x, n) => {
                return x += move[n];
            })
            let visited = moves.filter(z => z[0] == newCell[0] && z[1] == newCell[1]).length > 0
            if (newCell[0] < 0 || newCell[0] > size - 1 || newCell[1] < 0 || newCell[1] > size - 1 || visited) {
                invalid = true;
            } else {
                invalid = false;
                moves.unshift(currentCell)
                let wall = currentCell.map((x, n) => {
                    return x += move.map(x => x/2)[n];
                })
                console.log(`wall: ${wall}`);
                grid[wall[1]][wall[0]] = 1;
                currentCell = newCell;
            }

        } while (invalid)


    }
}

function rndOddCell(size) {
    return [randomInt(0, Math.floor((size - 1) / 2)), randomInt(0, Math.floor((size - 1) / 2))].map(x => (2 * x) + 1)
}

function rndDirection() {
    const dirs = [
        [-2, 0],
        [0, 2],
        [2, 0],
        [0, -2]
    ];
    return dirs[randomInt(0, 4)];
}

function createGrid(size) {
    let grid = [];
    let row = [];
    for (var y = 0; y < size; y++) {
        for (var x = 0; x < size; x++) {
            row.push('0');
        }
        grid.push(row);
        row = [];
    }
    return (grid);
}

function displayBoard(board, startCell, currentCell, moves) {
    for (var y = 0; y < board.length; y++) {
        for (var x = 0; x < board.length; x++) {
            var cell = board[y][x].toString();
            if (y == currentCell[1] && x == currentCell[0]) {
                cell = cell.bgRed.red;
            } else if (y == startCell[1] && x == startCell[0]) {
                cell = cell.bgBlue.blue;
            } else if (moves.filter(z => z[0] == x && z[1]==y).length > 0) {
                cell = cell.bgWhite.white;
            } else {
                cell = (cell == 1) ? cell.bgWhite.white : cell.bgBlack.black;
            }
            process.stdout.write(cell);
        }
        console.log(y)
    }
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low)
}
