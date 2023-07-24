import { Timer } from "./Timer";
import { PlayerData } from "../types";

export class Player {
  timer;
  info;
  data;

  constructor(player: PlayerData, timer: Timer) {
    this.timer = timer;
    this.info = {
      isTurn: false,
      isWinner: false,
    };
    this.data = {
      ...player,
      total_moves: 0,
      timer: { m: null, s: null },
      currentPiece: null,
      eated: [],
    };
  }
}
