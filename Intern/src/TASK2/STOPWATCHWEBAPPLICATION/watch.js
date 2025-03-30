document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const millisecondsEl = document.getElementById('milliseconds');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const lapsList = document.getElementById('lapsList');

    // Stopwatch variables
    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let lapCount = 0;
    let lastLapTime = 0;

    // Format time functions
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    function updateDisplay() {
        const currentTime = Date.now() - startTime + elapsedTime;
        const minutes = Math.floor(currentTime / 60000);
        const seconds = Math.floor((currentTime % 60000) / 1000);
        const milliseconds = Math.floor((currentTime % 1000) / 10);

        minutesEl.textContent = formatTime(minutes);
        secondsEl.textContent = formatTime(seconds);
        millisecondsEl.textContent = formatTime(milliseconds);
    }

    // Stopwatch control functions
    function startStopwatch() {
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;

        startTime = Date.now();
        timerInterval = setInterval(updateDisplay, 10);
    }

    function pauseStopwatch() {
        startBtn.disabled = false;
        pauseBtn.disabled = true;

        clearInterval(timerInterval);
        elapsedTime += Date.now() - startTime;
    }

    function resetStopwatch() {
        clearInterval(timerInterval);

        startBtn.disabled = false;
        pauseBtn.disabled = true;
        lapBtn.disabled = true;

        elapsedTime = 0;
        lapCount = 0;
        lastLapTime = 0;

        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        millisecondsEl.textContent = '00';

        lapsList.innerHTML = '';
    }

    function addLap() {
        lapCount++;
        const currentTime = Date.now() - startTime + elapsedTime;
        const lapTime = currentTime - lastLapTime;
        lastLapTime = currentTime;

        // Format lap time
        const lapMinutes = Math.floor(lapTime / 60000);
        const lapSeconds = Math.floor((lapTime % 60000) / 1000);
        const lapMilliseconds = Math.floor((lapTime % 1000) / 10);

        // Format total time
        const totalMinutes = Math.floor(currentTime / 60000);
        const totalSeconds = Math.floor((currentTime % 60000) / 1000);
        const totalMilliseconds = Math.floor((currentTime % 1000) / 10);

        const lapItem = document.createElement('li');
        lapItem.innerHTML = `
            <span>Lap ${lapCount}</span>
            <span>
                ${formatTime(lapMinutes)}:${formatTime(lapSeconds)}:${formatTime(lapMilliseconds)}
                <small>(${formatTime(totalMinutes)}:${formatTime(totalSeconds)}:${formatTime(totalMilliseconds)})</small>
            </span>
        `;

        lapsList.prepend(lapItem);
    }

    // Event listeners
    startBtn.addEventListener('click', startStopwatch);
    pauseBtn.addEventListener('click', pauseStopwatch);
    resetBtn.addEventListener('click', resetStopwatch);
    lapBtn.addEventListener('click', addLap);
});