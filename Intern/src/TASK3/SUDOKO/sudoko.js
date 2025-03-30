function getGrid() {
    let grid = [];
    let inputs = document.querySelectorAll(".sudoku-grid input");
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            let val = inputs[i * 9 + j].value;
            row.push(val ? parseInt(val) : 0);
        }
        grid.push(row);
    }
    return grid;
}

function setGrid(grid) {
    let inputs = document.querySelectorAll(".sudoku-grid input");
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            inputs[i * 9 + j].value = grid[i][j] !== 0 ? grid[i][j] : "";
        }
    }
}

function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }
    return true;
}

function solveSudokuHelper(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudokuHelper(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function solveSudoku() {
    let grid = getGrid();
    if (solveSudokuHelper(grid)) {
        setGrid(grid);
    } else {
        alert("No solution exists!");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let gridContainer = document.getElementById("sudokuGrid");
    for (let i = 0; i < 81; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.oninput = (e) => {
            e.target.value = e.target.value.replace(/[^1-9]/g, "");
        };
        gridContainer.appendChild(input);
    }
});
