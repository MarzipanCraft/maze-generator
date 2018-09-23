'use strict';
const colors = require('colors');
const readlineSync = require('readline-sync');
const gridSize = 31;
const grid = createGrid(gridSize);
const dirs = [
    [-2, 0],
    [0, 2],
    [2, 0],
    [0, -2]
];
console.log(inRange(2, 1, 3));
console.log(inRect([3,3], [[1,1], [5,5]]));
let key = readlineSync.keyIn('...', { hideEchoBack: true, mask: '' });
console.log('hey');

console.log(grid);
genMaze(grid)

function inRect(point, rect) {
    const tLeft = rect[0];
    const bRight = rect[1];
    const inX = inRange(point[0], tLeft[0], bRight[0])
    const inY = inRange(point[1], tLeft[1], bRight[1])
    return inX && inY; 
}

function inRange(num, min, max) {
    console.log(num)
    console.log(min)
    console.log(max)
    return (num >= min && num <= max)
}

function genMaze(grid) {
    //let grid = createGrid(gridSize);
    let gridSize = grid.length;
    let startCell = rndOddCell(gridSize);
    let startMaze = [];
    for (var y = 0; y < gridSize; y++) {
        for (var x = 0; x < gridSize; x++) {
            if (inRect([x,y], [[13,13],[17,17]])) {
                
                //startMaze.unshift([x,y]);
            }
    
        }
    }
    //console.log(startCell);
    //let maze = move(grid, startCell, [startCell], [startCell], 1).maze;
    //console.log(maze);
    //mazes.map(x => displayBoard(grid, startCell, x.maze));
    displayBoard(grid, startCell, move(grid, startCell, [startCell], startMaze, 1).maze)
    /*
    let mazeDepths = [];
    for (let i = 5; i <= 79; i+=2) {
        var start = rndOddCell(i);
        var maze = move(createGrid(i),start,[start],[start], 0)
        mazeDepths.push([i, maze.depth])
    }
    mazeDepths.map(x => console.log(`${x[0]}, ${x[1]}`));*/
    //console.log('Done');
}

function move(grid, currentCell, path, maze, depth, step, backtracking) {
    if (path.length == 1 && backtracking) {
        return {path, maze, depth};
    }
    console.log(`Current cell: ${currentCell} Depth: ${depth} `)
    //displayBoard(grid, currentCell, maze);
    const size = grid.length;
    let canMove = true;
    let newCell;

    let shuffledDirs = shuffle(dirs)
    //console.log(dirs);
    let dir;
    for (var i = 0; i < 4; i++) { //Check if the point is within the grid
        var testDir = shuffledDirs[i];
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
    let maxDepth = (0.25*(size*size)-0.5*size-0.75)
    /*console.log(maxDepth);
    if (randomInt(0, (maxDepth*size-depth)/15)==0) {
        console.log('Randomly backtraking'.bgMagenta);
        canMove = false;
    }*/
    let key = step?readlineSync.keyIn('...', { hideEchoBack: true, mask: '' }):'h';
    if (step) {
        displayBoard(grid, currentCell, maze)
    }
    if (canMove && key != ' ') {
        console.log('Going down'.bgGreen)
        maze.unshift([currentCell[0] + dir[0] / 2, currentCell[1] + dir[1] / 2])
        path.unshift(newCell);
        maze.unshift(newCell);
        return move(grid, newCell, path, maze, ++depth, step);
    } else if (key != ' ' && !canMove) {
        console.log('Backtracking'.bgBlue)
        let lastMove = path.shift();
        return move(grid, lastMove, path, maze, --depth, step, true);
    } else {
        console.log('Going up'.bgYellow)
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
