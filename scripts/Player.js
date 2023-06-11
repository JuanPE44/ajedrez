class Player {
  constructor(player, timer) {
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
