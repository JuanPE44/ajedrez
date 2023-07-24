export class Timer {
  container;
  element;
  timerInterval;
  startTime;
  pausedTime;
  isPaused;
  minutes;
  seconds;
  constructor(container: Element, element: Element) {
    this.container = container;
    this.element = element;
    this.timerInterval = 0;
    this.startTime = 0;
    this.pausedTime = 0;
    this.isPaused = false;
    this.minutes = 4;
    this.seconds = 59;
    this.element.innerHTML = `${this.formatTime(this.minutes + 1)}:00`;
    this.startTimer();
    this.pauseTimer();
  }

  startTimer() {
    this.startTime = Date.now() - this.pausedTime;
    this.timerInterval = setInterval(this.updateTimer.bind(this), 1000);
  }

  pauseTimer() {
    this.container.classList.remove("container-timer-paused");
    this.pausedTime = Date.now() - this.startTime;
    clearInterval(this.timerInterval);
    this.isPaused = true;
  }

  resumeTimer() {
    this.container.classList.add("container-timer-paused");
    this.isPaused = false;
    this.startTimer();
  }

  resetTimer() {
    clearInterval(this.timerInterval);
    this.pausedTime = 0;
    this.isPaused = false;
    this.element.innerHTML = "00:00";
  }

  updateTimer() {
    if (this.isPaused) return;
    const currentTime = Date.now();
    const elapsedTime = currentTime - this.startTime;

    const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    if (this.minutes - minutes < 0) {
      this.pauseTimer();
      return;
    }
    const formattedTime =
      this.formatTime(this.minutes - minutes) +
      ":" +
      this.formatTime(this.seconds - seconds);
    this.element.innerHTML = formattedTime;
  }

  formatTime(time: number) {
    return time < 10 ? "0" + time : time;
  }
}
