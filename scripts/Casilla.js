class Casilla {
  constructor(x, y, color, tablero) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.tablero = tablero;
    this.move = false;
    this.elemento = document.createElement("div");
    this.crearCasilla();
  }

  crearCasilla() {
    this.elemento.classList.add("casilla", `casilla-${this.color}`);

    this.elemento.addEventListener("click", () => {
      if (this.tablero.piezaActual && this.move === true) {
        this.sacarPosibles();
        this.tablero.piezaActual.mover(this.x, this.y);
      }
    });

    this.elemento.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    this.elemento.addEventListener("drop", (e) => {
      this.tablero.piezaActual.mover(this.x, this.y);
    });
  }

  select() {
    this.elemento.classList.add("selected");
  }

  desSelect() {
    this.elemento.classList.remove("selected");
  }

  movePosibles(pieza, x, y) {
    // peon negro
    if (pieza === "p") {
      return [
        [x, y + 1],
        [x, y + 2],
      ];
    }
    //peon blanco
    if (pieza === "P") {
      return [
        [x, y - 1],
        [x, y - 2],
      ];
    }
    // caballo
    if (pieza === "n" || pieza === "N") {
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
    // rey
    if (pieza === "k" || pieza === "K") {
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

  verPosibles() {
    const piezaActual = this.tablero.piezaActual;
    const posibles = this.movePosibles(
      piezaActual.id,
      piezaActual.x,
      piezaActual.y
    );

    posibles.forEach((pos) => {
      const [x, y] = pos;
      if (x > 7 || y > 7 || x < 0 || y < 0) return;
      if (this.tablero.array[y][x].pieza !== null) return;
      this.tablero.array[y][x].casilla.elemento.classList.add("posibles");
      this.tablero.array[y][x].casilla.move = true;
    });
  }

  sacarPosibles() {
    const piezaActual = this.tablero.piezaActual;
    const posibles = this.movePosibles(
      piezaActual.id,
      piezaActual.x,
      piezaActual.y
    );

    posibles.forEach((pos) => {
      const [x, y] = pos;
      if (x > 7 || y > 7 || x < 0 || y < 0) return;
      this.tablero.array[y][x].casilla.elemento.classList.remove("posibles");
      this.tablero.array[y][x].casilla.move = false;
    });
  }
}
