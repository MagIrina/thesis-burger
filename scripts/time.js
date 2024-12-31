document.addEventListener('DOMContentLoaded', () => {
    const timerLimit = 30 * 60 * 1000;
    const minutes1 = document.querySelector('.minutes-1');
    const minutes2 = document.querySelector('.minutes-2');
    const seconds1 = document.querySelector('.seconds-1');
    const seconds2 = document.querySelector('.seconds-2');
    let interval;
    function updateTimerDisplay(remainingTime) {
        const minutes = Math.floor(remainingTime / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);

        const minutesString = String(minutes).padStart(2, '0');
        const secondsString = String(seconds).padStart(2, '0');

        minutes1.textContent = minutesString[0];
        minutes2.textContent = minutesString[1];
        seconds1.textContent = secondsString[0];
        seconds2.textContent = secondsString[1];
    }

    function startTimer(remainingTime) {
        clearInterval(interval);
        updateTimerDisplay(remainingTime);
        interval = setInterval(() => {
            remainingTime -= 1000;
            if (remainingTime <= 0) {
                clearInterval(interval);
                updateTimerDisplay(0);
                return;
            }
            updateTimerDisplay(remainingTime);
            localStorage.setItem('remainingTime', remainingTime);
        }, 1000);
    }

    function resetTimer() {
        const now = new Date().toISOString().split('T')[0];
        localStorage.setItem('lastResetDate', now);
        localStorage.setItem('remainingTime', timerLimit);
        startTimer(timerLimit);
    }

    function initializeTimer() {
        const now = new Date().toISOString().split('T')[0];
        const lastResetDate = localStorage.getItem('lastResetDate');
        const savedTime = parseInt(localStorage.getItem('remainingTime'), 10);

        if (lastResetDate !== now || isNaN(savedTime)) {
            resetTimer();
        } else {
            startTimer(savedTime);
        }
    }

    initializeTimer();
});
