const divBoard = document.getElementById("board");

class Game {
  constructor() {
    this.players = this.createPlayers();
    this.currentPlayer = this.players[1];
    this.start = false;
    this.board = new Board(divBoard, this);
  }

  init() {
    this.start = true;
  }

  createPlayers() {
    const p1 = new Player({ id: 1, name: "juan", pieceColor: "black" });
    const p2 = new Player({ id: 2, name: "pedro", pieceColor: "white" });
    return [p1, p2];
  }

  changeTurn() {
    const idPlayer = this.currentPlayer.data.id;
    const player1 = this.players[0];
    const player2 = this.players[1];

    if (idPlayer === 2) {
      this.currentPlayer = player1;
    } else {
      this.currentPlayer = player2;
    }
  }
}
