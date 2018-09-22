'use strict';
const colors = require('colors');
const readlineSync = require('readline-sync');
const gridSize = 21;
console.log('hi');
genMaze(gridSize)






function genMaze(gridSize) {
    let grid = createGrid(gridSize);
    let startCell = rndOddCell(gridSize);
    let currentCell = startCell;
    var key;
    let moves = [];
    console.log(currentCell);
    console.log(moves);
    //displayBoard(grid, currentCell, moves);
    const size =  gridSize;
    move(grid, currentCell, moves, moves, 1);
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


    }*/
}

function move(grid, currentCell, path, maze, depth)
{
    console.log(`Current cell: ${currentCell} Depth: ${depth} `)
    console.log(path)
    displayBoard(grid, currentCell, path);
    console.log(`depth: ${depth}`)
    const size = grid.length;
    let invalid;
    let dirs = [
        [-2, 0],
        [0, 2],
        [2, 0],
        [0, -2]
    ];
    do {
        let moveVector = rndDirection(dirs);
        let newCell = currentCell.map((x, n) => {
            return x += moveVector[n];
        })
        let visited = maze.filter(z => z[0] == newCell[0] && z[1] == newCell[1]).length > 0
        if (newCell[0] < 0 || newCell[0] > size - 1 || newCell[1] < 0 || newCell[1] > size - 1 || visited) {
            invalid = true;
            dirs = dirs.filter(x => x != moveVector)
            console.log(dirs);
            if (dirs.length == 0) {
                console.log("No possible moves");
                console.log('Going up')
                const lastMove = path.shift();
                if (visited) {
                    let wall = currentCell.map((x, n) => {
                        return x += moveVector.map(x => x/2)[n];
                    })
                    maze.unshift(wall);
                    maze.unshift(currentCell);
                }
                move(grid, path[1], path, maze, --depth)
            }
        } else {
            console.log(`${currentCell} => ${newCell}`)
            invalid = false;
            maze.unshift(currentCell);
            path.unshift(currentCell);
            let wall = currentCell.map((x, n) => {
                return x += moveVector.map(x => x/2)[n];
            })
            console.log(`wall: ${wall}`);
            maze.unshift(wall);
            currentCell = newCell;
        }
    } while (invalid)
    let key = readlineSync.keyIn('...', { hideEchoBack: true, mask: '' });
    if (key == ' ') {
        console.log('Going up')
        return true;
    } else {
        console.log('Going down')
        console.log(move(grid, currentCell, path, maze, ++depth));
    }

}

function rndOddCell(size) {
    return [randomInt(0, Math.floor((size - 1) / 2)), randomInt(0, Math.floor((size - 1) / 2))].map(x => (2 * x) + 1)
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

function displayBoard(board, currentCell, moves) {
    for (var y = 0; y < board.length; y++) {
        for (var x = 0; x < board.length; x++) {
            var cell = board[y][x].toString();
            if (y == currentCell[1] && x == currentCell[0]) {
                cell = cell.bgRed.red;
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
