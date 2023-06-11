class Timer {
  constructor(element, paused) {
    this.element = element;
    this.timerInterval;
    this.startTime = 0;
    this.pausedTime = 0;
    this.isPaused = paused;
    this.minutes = 4;
    this.seconds = 59;
    this.startTimer();
  }

  startTimer() {
    this.startTime = Date.now() - this.pausedTime;
    this.timerInterval = setInterval(this.updateTimer.bind(this), 1000);
    console.log(this.startTime);
  }

  pauseTimer() {
    clearInterval(this.timerInterval);
    this.isPaused = true;
  }

  resumeTimer() {
    isPaused = false;
    this.startTimer();
  }

  updateTimer() {
    if (this.isPaused) return;

    const currentTime = Date.now();
    console.log({ currentTime: currentTime, startTime: this.startTime });
    const elapsedTime = currentTime - this.startTime;

    const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);

    const formattedTime =
      this.formatTime(this.minutes - minutes) +
      ":" +
      this.formatTime(this.seconds - seconds);
    this.element.innerHTML = formattedTime;
  }

  formatTime(time) {
    return time < 10 ? "0" + time : time;
  }
}
