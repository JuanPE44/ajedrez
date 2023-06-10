class Square {
  constructor(x, y, color, board) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.board = board;
    this.move = false;
    this.element = document.createElement("div");
    this.handleScare();
  }

  handleScare() {
    this.element.classList.add("square", `square-${this.color}`);

    this.handleSquareClick();

    this.element.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    this.element.addEventListener("drop", (e) => {
      this.board.currentPiece.moveTo(this.x, this.y);
    });
  }

  handleSquareClick() {
    this.element.addEventListener("click", () => {
      if (this.board.currentPiece && this.move === true) {
        this.unpaintPossible();
        this.board.currentPiece.moveTo(this.x, this.y);
        this.board.soundMove.play();
      }
    });
  }

  select() {
    this.element.classList.add("selected");
  }

  deselect() {
    this.element.classList.remove("selected");
  }

  getArrayPossible(piece, x, y) {
    // peon negro
    if (piece === "p") {
      console.log(this.board.currentPiece.moves);
      if (this.board.currentPiece.moves > 1)
        return [
          [x, y + 1],
          [x + 1, y + 1],
          [x - 1, y + 1],
        ];
      return [
        [x, y + 1],
        [x, y + 2],
      ];
    }
    //peon blanco
    if (piece === "P") {
      if (this.board.currentPiece.moves > 1)
        return [
          [x, y - 1],
          [x + 1, y - 1],
          [x - 1, y - 1],
        ];
      return [
        [x, y - 1],
        [x, y - 2],
      ];
    }
    // torre
    if (piece === "r" || piece === "R") {
      const possible = [];
      const col1 = this.getPossible(x, y, "", "-");
      const col2 = this.getPossible(x, y, "", "+");
      const fil1 = this.getPossible(x, y, "+", "");
      const fil2 = this.getPossible(x, y, "-", "");
      possible.push(...col1, ...col2, ...fil1, ...fil2);
      return possible;
    }
    // caballo
    if (piece === "n" || piece === "N") {
      return [
        [x + 1, y - 2],
        [x + 2, y - 1],
        [x + 2, y + 1],
        [x + 1, y + 2],
        [x - 1, y - 2],
        [x - 2, y - 1],
        [x - 1, y + 2],
        [x - 2, y + 1],
      ];
    }
    // alfil
    if (piece === "b" || piece === "B") {
      const possible = [];
      const diag1 = this.getPossible(x, y, "-", "-");
      const diag2 = this.getPossible(x, y, "-", "+");
      const diag3 = this.getPossible(x, y, "+", "+");
      const diag4 = this.getPossible(x, y, "+", "+-");
      possible.push(...diag1, ...diag2, ...diag3, ...diag4);

      return possible;
    }
    // reina
    if (piece === "q" || piece === "Q") {
      const possible = [];
      const diag1 = this.getPossible(x, y, "-", "-");
      const diag2 = this.getPossible(x, y, "-", "+");
      const diag3 = this.getPossible(x, y, "+", "+");
      const diag4 = this.getPossible(x, y, "+", "+-");
      const col1 = this.getPossible(x, y, "", "-");
      const col2 = this.getPossible(x, y, "", "+");
      const fil1 = this.getPossible(x, y, "+", "");
      const fil2 = this.getPossible(x, y, "-", "");
      possible.push(
        ...diag1,
        ...diag2,
        ...diag3,
        ...diag4,
        ...col1,
        ...col2,
        ...fil1,
        ...fil2
      );
      return possible;
    }
    // rey
    if (piece === "k" || piece === "K") {
      return [
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x - 1, y],
        [x + 1, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1],
      ];
    }
  }

  getPossible(x, y, xOp, yOp) {
    // xOp es el operador de x y lo mismo con el y
    let coordinates = [];
    for (let i = 0; i < this.board.FILAS; i++) {
      if (i === 0) continue;

      coordinates.push([
        xOp === "" ? x : xOp === "+" ? x + i : x - i,
        yOp === "" ? y : yOp === "+" ? y + i : y - i,
      ]);
      if (
        this.haspiece(
          xOp === "" ? x : xOp === "+" ? x + i : x - i,
          yOp === "" ? y : yOp === "+" ? y + i : y - i
        )
      )
        break;
    }
    return coordinates;
  }

  paintPossible() {
    const currentPiece = this.board.currentPiece;
    const possible = this.getArrayPossible(
      currentPiece.id,
      currentPiece.x,
      currentPiece.y
    );

    possible.forEach((pos, index) => {
      const [x, y] = pos;
      const isPeon = currentPiece.id === "p" || currentPiece.id === "P";
      if (x > 7 || y > 7 || x < 0 || y < 0) return;
      const square = this.board.array[y][x].square;
      const piece = this.board.array[y][x].piece;
      if (isPeon && currentPiece.moves > 0) {
        if (index === 0 && piece === null) {
          square.element.classList.add("possible");
          square.move = true;
        }
        if (piece !== null && index !== 0) {
          square.element.classList.add("possible");
          square.move = true;
        }
        return;
      }
      square.element.classList.add("possible");
      square.move = true;
    });
  }

  haspiece(x, y) {
    if (x > 7 || y > 7 || x < 0 || y < 0) return;
    const piece = this.board.array[y][x]?.piece;
    return piece !== null;
  }

  unpaintPossible() {
    const currentPiece = this.board.currentPiece;
    console.log(currentPiece);
    const possible = this.getArrayPossible(
      currentPiece.id,
      currentPiece.x,
      currentPiece.y
    );

    possible.forEach((pos) => {
      const [x, y] = pos;
      if (x > 7 || y > 7 || x < 0 || y < 0) return;
      const square = this.board.array[y][x].square;
      square.element.classList.remove("possible");
      square.move = false;
    });
  }
}
