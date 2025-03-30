document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const statusDisplay = document.getElementById('status');
    const gameBoard = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restartButton');
    const scoreX = document.getElementById('scoreX');
    const scoreO = document.getElementById('scoreO');
    const scoreTie = document.getElementById('scoreTie');
    const twoPlayerBtn = document.getElementById('twoPlayerBtn');
    const aiPlayerBtn = document.getElementById('aiPlayerBtn');
    
    // Game variables
    let gameActive = true;
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let scores = {
        X: 0,
        O: 0,
        tie: 0
    };
    let isAIMode = false;
    
    // Winning conditions
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    // Messages
    const winMessage = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;
    
    // Game mode toggle
    twoPlayerBtn.addEventListener('click', function() {
        if (isAIMode) {
            isAIMode = false;
            twoPlayerBtn.classList.add('active');
            aiPlayerBtn.classList.remove('active');
            resetGame();
        }
    });
    
    aiPlayerBtn.addEventListener('click', function() {
        if (!isAIMode) {
            isAIMode = true;
            aiPlayerBtn.classList.add('active');
            twoPlayerBtn.classList.remove('active');
            resetGame();
        }
    });
    
    // Handle cell click
    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
        
        // Check if cell is already played or game is inactive
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }
        
        // Update game state and UI
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
        
        // Check for win or draw
        if (checkWin()) {
            endGame(false);
        } else if (checkDraw()) {
            endGame(true);
        } else {
            // Switch player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDisplay.textContent = currentPlayerTurn();
            
            // If AI mode and it's O's turn
            if (isAIMode && currentPlayer === 'O') {
                setTimeout(makeAIMove, 700);
            }
        }
    }
    
    // Check for win
    function checkWin() {
        let roundWon = false;
        let winningPattern = null;
        
        for (let i = 0; i < winPatterns.length; i++) {
            const [a, b, c] = winPatterns[i];
            
            if (
                gameState[a] &&
                gameState[a] === gameState[b] &&
                gameState[a] === gameState[c]
            ) {
                roundWon = true;
                winningPattern = winPatterns[i];
                break;
            }
        }
        
        if (roundWon) {
            // Highlight winning cells
            if (winningPattern) {
                winningPattern.forEach(index => {
                    cells[index].classList.add('winner');
                });
            }
            return true;
        }
        
        return false;
    }
    
    // Check for draw
    function checkDraw() {
        return !gameState.includes('');
    }
    
    // End game
    function endGame(isDraw) {
        if (isDraw) {
            statusDisplay.textContent = drawMessage();
            scores.tie++;
            scoreTie.textContent = scores.tie;
        } else {
            statusDisplay.textContent = winMessage();
            scores[currentPlayer]++;
            if (currentPlayer === 'X') {
                scoreX.textContent = scores.X;
            } else {
                scoreO.textContent = scores.O;
            }
        }
        gameActive = false;
    }
    
    // AI move logic
    function makeAIMove() {
        if (!gameActive) return;
        
        // Check for winning move
        const moveIndex = findBestMove();
        
        // Make the move
        gameState[moveIndex] = currentPlayer;
        cells[moveIndex].textContent = currentPlayer;
        cells[moveIndex].classList.add(currentPlayer.toLowerCase());
        
        // Check for win or draw
        if (checkWin()) {
            endGame(false);
        } else if (checkDraw()) {
            endGame(true);
        } else {
            // Switch back to player
            currentPlayer = 'X';
            statusDisplay.textContent = currentPlayerTurn();
        }
    }
    
    // Simple AI to find the best move
    function findBestMove() {
        // First check if AI can win
        for (let i = 0; i < gameState.length; i++) {
            if (gameState[i] === '') {
                gameState[i] = 'O';
                if (checkWinWithoutUI()) {
                    gameState[i] = ''; // Reset
                    return i;
                }
                gameState[i] = ''; // Reset
            }
        }
        
        // Then check if player can win and block
        for (let i = 0; i < gameState.length; i++) {
            if (gameState[i] === '') {
                gameState[i] = 'X';
                if (checkWinWithoutUI()) {
                    gameState[i] = ''; // Reset
                    return i;
                }
                gameState[i] = ''; // Reset
            }
        }
        
        // Take the center if available
        if (gameState[4] === '') {
            return 4;
        }
        
        // Take corners if available
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(corner => gameState[corner] === '');
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }
        
        // Take any available edge
        const edges = [1, 3, 5, 7];
        const availableEdges = edges.filter(edge => gameState[edge] === '');
        if (availableEdges.length > 0) {
            return availableEdges[Math.floor(Math.random() * availableEdges.length)];
        }
        
        // Fallback to any empty cell (shouldn't get here)
        const emptyCells = gameState.map((val, idx) => val === '' ? idx : -1).filter(idx => idx !== -1);
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }
    
    // Check win without updating UI (for AI)
    function checkWinWithoutUI() {
        for (let i = 0; i < winPatterns.length; i++) {
            const [a, b, c] = winPatterns[i];
            if (
                gameState[a] &&
                gameState[a] === gameState[b] &&
                gameState[a] === gameState[c]
            ) {
                return true;
            }
        }
        return false;
    }
    
    // Reset game
    function resetGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusDisplay.textContent = currentPlayerTurn();
        
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x');
            cell.classList.remove('o');
            cell.classList.remove('winner');
        });
    }
    
    // Event listeners
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    restartButton.addEventListener('click', resetGame);
    
    // Initialize
    statusDisplay.textContent = currentPlayerTurn();
});