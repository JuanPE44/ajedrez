const divBoard = document.getElementById("board");
const containerTimerP1 = document.querySelector(".container-timer-p1");
const containerTimerP2 = document.querySelector(".container-timer-p2");
const timerP1 = document.querySelector(".container-timer-p1 .timer");
const timerP2 = document.querySelector(".container-timer-p2 .timer");

class Game {
  constructor() {
    this.players = this.createPlayers();
    this.currentPlayer = this.players[1];
    this.start = false;
    this.board = new Board(divBoard, this);
  }

  init() {
    this.start = true;
    this.currentPlayer.timer.resumeTimer();
  }

  createPlayers() {
    const t1 = new Timer(containerTimerP1, timerP1, true);
    const t2 = new Timer(containerTimerP2, timerP2, true);

    const p1 = new Player({ id: 1, name: "juan", pieceColor: "black" }, t1);
    const p2 = new Player({ id: 2, name: "pedro", pieceColor: "white" }, t2);
    return [p1, p2];
  }

  changeTurn() {
    const idPlayer = this.currentPlayer.data.id;
    const player1 = this.players[0];
    const player2 = this.players[1];
    this.currentPlayer.timer.pauseTimer();

    if (idPlayer === 2) {
      player1.timer.resumeTimer();
      this.currentPlayer = player1;
    } else {
      player2.timer.resumeTimer();
      this.currentPlayer = player2;
    }
  }
}
