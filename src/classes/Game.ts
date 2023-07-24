import { Timer } from "./Timer";
import { Player } from "./Player";
import { Board } from "./Board";
import soundCheck from "../assets/audio/check-piece.mp3";
import soundMove from "../assets/audio/move-piece.mp3";
import soundEat from "../assets/audio/eat-piece.mp3";

export class Game {
  players;
  currentPlayer;
  start;
  board;
  containerPieces;
  soundMove;
  soundCheck;
  soundEat;
  constructor() {
    this.containerPieces = document.getElementById("container-pieces");
    this.players = this.createPlayers();
    this.currentPlayer = this.players[1];
    this.start = false;
    this.board = new Board(document.getElementById("board"), this);
    this.soundMove = new Audio(soundMove);
    this.soundCheck = new Audio(soundCheck);
    this.soundEat = new Audio(soundEat);
  }

  init() {
    this.start = true;
    this.currentPlayer.timer.resumeTimer();
  }

  createPlayers() {
    const containerTimerP1 = document.querySelector(".container-timer-p1");
    const containerTimerP2 = document.querySelector(".container-timer-p2");
    const timerP1 = document.querySelector(".container-timer-p1 .timer");
    const timerP2 = document.querySelector(".container-timer-p2 .timer");
    const t1 = new Timer(containerTimerP1!, timerP1!);
    const t2 = new Timer(containerTimerP2!, timerP2!);
    const p1 = new Player({ id: 1, name: "juan", pieceType: "black" }, t1);
    const p2 = new Player({ id: 2, name: "pedro", pieceType: "white" }, t2);
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
