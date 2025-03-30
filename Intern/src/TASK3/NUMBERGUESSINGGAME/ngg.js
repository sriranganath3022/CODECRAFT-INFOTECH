document.addEventListener('DOMContentLoaded', function() {
    // Game variables
    let randomNumber;
    let attempts = 0;
    let minRange = 1;
    let maxRange = 100;
    let gameOver = false;

    // DOM elements
    const guessInput = document.getElementById('guess');
    const submitBtn = document.getElementById('submit-btn');
    const message = document.getElementById('message');
    const attemptsSpan = document.getElementById('attempts');
    const resultMessage = document.getElementById('result-message');
    const restartBtn = document.getElementById('restart-btn');
    const progressFill = document.querySelector('.progress-fill');

    // Initialize game
    function initGame() {
        randomNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        minRange = 1;
        maxRange = 100;
        gameOver = false;

        attemptsSpan.textContent = attempts;
        message.textContent = '';
        resultMessage.style.display = 'none';
        restartBtn.style.display = 'none';
        guessInput.disabled = false;
        submitBtn.disabled = false;

        updateProgressBar();

        console.log("Secret number:", randomNumber); // For debugging
    }

    // Update progress bar based on current range
    function updateProgressBar() {
        const totalRange = 100;
        const barStart = ((minRange - 1) / totalRange) * 100;
        const barWidth = ((maxRange - minRange + 1) / totalRange) * 100;

        progressFill.style.width = barWidth + '%';
        progressFill.style.marginLeft = barStart + '%';
    }

    // Check the guess
    function checkGuess() {
        if (gameOver) return;

        const userGuess = parseInt(guessInput.value);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            message.textContent = 'Please enter a valid number between 1 and 100.';
            message.style.color = 'red';
            return;
        }

        attempts++;
        attemptsSpan.textContent = attempts;

        if (userGuess === randomNumber) {
            message.textContent = `Congratulations! ${randomNumber} is correct!`;
            message.style.color = '#4CAF50';
            resultMessage.textContent = `You won in ${attempts} attempt${attempts === 1 ? '' : 's'}!`;
            resultMessage.style.display = 'block';
            restartBtn.style.display = 'inline-block';
            gameOver = true;
            guessInput.disabled = true;
            submitBtn.disabled = true;
        } else if (userGuess < randomNumber) {
            message.textContent = 'Too low! Try a higher number.';
            message.style.color = '#FF9800';
            minRange = Math.max(minRange, userGuess + 1);
        } else {
            message.textContent = 'Too high! Try a lower number.';
            message.style.color = '#FF9800';
            maxRange = Math.min(maxRange, userGuess - 1);
        }

        updateProgressBar();
        guessInput.value = '';
        guessInput.focus();
    }

    // Event listeners
    submitBtn.addEventListener('click', checkGuess);
    guessInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkGuess();
        }
    });

    restartBtn.addEventListener('click', initGame);

    // Start the game
    initGame();
});