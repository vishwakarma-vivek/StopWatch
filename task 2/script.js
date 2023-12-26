let timer;
let isRunning = false;
let startTime;
let lapCounter = 1;

function startPause() {
    const startPauseButton = document.getElementById("startPause");

    if (!isRunning) {
        startPauseButton.textContent = "Pause";
        startTime = new Date().getTime() - (lapCounter === 1 ? 0 : lapCounter * 1000);
        timer = setInterval(updateDisplay, 1000);
    } else {
        startPauseButton.textContent = "Resume";
        clearInterval(timer);
    }

    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    document.getElementById("startPause").textContent = "Start";
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("lapList").innerHTML = "";
    isRunning = false;
    lapCounter = 1;
}

function updateDisplay() {
    const currentTime = new Date().getTime();
    const elapsedTime = new Date(currentTime - startTime);

    const hours = padTime(elapsedTime.getUTCHours());
    const minutes = padTime(elapsedTime.getUTCMinutes());
    const seconds = padTime(elapsedTime.getUTCSeconds());

    document.getElementById("display").textContent = `${hours}:${minutes}:${seconds}`;
}

function padTime(time) {
    return time.toString().padStart(2, "0");
}

function recordLap() {
    if (isRunning) {
        const lapTime = document.getElementById("display").textContent;
        const lapList = document.getElementById("lapList");

        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapList.appendChild(lapItem);

        lapCounter++;
    }
}

