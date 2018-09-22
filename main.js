'use strict';
const colors = require('colors');
const readlineSync = require('readline-sync');
const gridSize = 75;
console.log('hi');
genMaze(gridSize)

function genMaze(gridSize) {
    let grid = createGrid(gridSize);
    let startCell = rndOddCell(gridSize);
    let currentCell = startCell;
    var key;
    console.log(currentCell);
    //displayBoard(grid, currentCell, maze);
    const size = gridSize;
    let maze = move(grid, currentCell, [startCell], [startCell], 1);
    displayBoard(grid, startCell, maze.maze) 
    console.log('Done');
    /*while (key != ' ') {

        key = readlineSync.keyIn('...', { hideEchoBack: true, mask: '' });
        let move;
        let invalid = true;
        do {
            move = rndDirection()
            console.log
            let newCell = currentCell.map((x, n) => {
                return x += move[n];
            })
            let visited = maze.filter(z => z[0] == newCell[0] && z[1] == newCell[1]).length > 0
            if (newCell[0] < 0 || newCell[0] > size - 1 || newCell[1] < 0 || newCell[1] > size - 1 || visited) {
                invalid = true;
            } else {
                invalid = false;
                maze.unshift(currentCell)
                let wall = currentCell.map((x, n) => {
                    return x += move.map(x => x/2)[n];
                })
                console.log(`wall: ${wall}`);
                grid[wall[1]][wall[0]] = 1;
                currentCell = newCell;
            }

        } while (invalid)


    }*/
}

function move(grid, currentCell, path, maze, depth, step = false, backtracking = false) {
    if (path.length == 1 && backtracking) {
        return {path, maze, depth};
    }
    console.log(`Current cell: ${currentCell} Depth: ${depth} `)
    //displayBoard(grid, currentCell, maze);
    const size = grid.length;
    let canMove = true;
    let newCell;
    let dirs = [
        [-2, 0],
        [0, 2],
        [2, 0],
        [0, -2]
    ];
    dirs = shuffle(dirs)
    //console.log(dirs);
    let dir;
    for (var i = 0; i < 4; i++) { //Check if the point is within the grid
        var testDir = dirs[i];
        newCell = [currentCell[0] + testDir[0], currentCell[1] + testDir[1]]
        var outOfBounds = (newCell[0] < 1 || newCell[0] > size - 1) || (newCell[1] < 1 || newCell[1] > size - 1)
        var visited = maze.filter(x => x[0] == newCell[0] && x[1] == newCell[1]).length > 0;
        if (!(outOfBounds || visited)) {
            dir = testDir;
            canMove = true;
            break;
        } else {
            canMove = false;
        }
    }
    let key = step?readlineSync.keyIn('...', { hideEchoBack: true, mask: '' }):'h';
    if (canMove && key != ' ') {
        console.log('Going down')
        maze.unshift([currentCell[0] + dir[0] / 2, currentCell[1] + dir[1] / 2])
        path.unshift(newCell);
        maze.unshift(newCell);
        return move(grid, newCell, path, maze, ++depth, step);
    } else if (key != ' ' && !canMove) {
        console.log('Backtracking')
        let lastMove = path.shift();
        return move(grid, lastMove, path, maze, ++depth, step, true);
    } else {
        console.log('Going up')
        return {path, maze};
    }
}

function rndOddCell(size) {
    return [randomInt(0, Math.floor((size - 1) / 2)), randomInt(0, Math.floor((size - 1) / 2))].map(x => (2 * x) + 1)
}

function shuffle(array, iterations = 25) {
    for (let i = 0; i < iterations; i++) {
        let n = randomInt(0, array.length)
        let item = array.splice(n, 1)[0]
        array.push(item)
    }
    return array;
}

function rndDirection(dirs) {

    return dirs[randomInt(0, dirs.length)];
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

function displayBoard(board, currentCell, maze) {
    for (var y = 0; y < board.length; y++) {
        for (var x = 0; x < board.length; x++) {
            var cell = board[y][x].toString();
            if (y == currentCell[1] && x == currentCell[0]) {
                cell = cell.bgRed.red;
            } else if (maze.filter(z => z[0] == x && z[1] == y).length > 0) {
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
