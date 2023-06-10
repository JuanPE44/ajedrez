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
        this.tablero.sonidoMove.play();
        this.tablero.rondas++;
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
      if (this.tablero.rondas >= 2)
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
    if (pieza === "P") {
      if (this.tablero.rondas >= 2)
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
    if (pieza === "r" || pieza === "R") {
      const posibles = [];
      const col1 = this.obtenerPosibles(x, y, "", "-");
      const col2 = this.obtenerPosibles(x, y, "", "+");
      const fil1 = this.obtenerPosibles(x, y, "+", "");
      const fil2 = this.obtenerPosibles(x, y, "-", "");
      posibles.push(...col1, ...col2, ...fil1, ...fil2);
      return posibles;
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
    // alfil
    if (pieza === "b" || pieza === "B") {
      const posibles = [];
      const diag1 = this.obtenerPosibles(x, y, "-", "-");
      const diag2 = this.obtenerPosibles(x, y, "-", "+");
      const diag3 = this.obtenerPosibles(x, y, "+", "+");
      const diag4 = this.obtenerPosibles(x, y, "+", "+-");
      posibles.push(...diag1, ...diag2, ...diag3, ...diag4);

      return posibles;
    }
    // reina
    if (pieza === "q" || pieza === "Q") {
      const posibles = [];
      const diag1 = this.obtenerPosibles(x, y, "-", "-");
      const diag2 = this.obtenerPosibles(x, y, "-", "+");
      const diag3 = this.obtenerPosibles(x, y, "+", "+");
      const diag4 = this.obtenerPosibles(x, y, "+", "+-");
      const col1 = this.obtenerPosibles(x, y, "", "-");
      const col2 = this.obtenerPosibles(x, y, "", "+");
      const fil1 = this.obtenerPosibles(x, y, "+", "");
      const fil2 = this.obtenerPosibles(x, y, "-", "");
      posibles.push(
        ...diag1,
        ...diag2,
        ...diag3,
        ...diag4,
        ...col1,
        ...col2,
        ...fil1,
        ...fil2
      );
      return posibles;
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

  obtenerPosibles(x, y, xOp, yOp) {
    // xOp es el operador de x y lo mismo con el y
    let cordenadas = [];
    for (let i = 0; i < this.tablero.FILAS; i++) {
      if (i === 0) continue;

      cordenadas.push([
        xOp === "" ? x : xOp === "+" ? x + i : x - i,
        yOp === "" ? y : yOp === "+" ? y + i : y - i,
      ]);
      if (
        this.hasPieza(
          xOp === "" ? x : xOp === "+" ? x + i : x - i,
          yOp === "" ? y : yOp === "+" ? y + i : y - i
        )
      )
        break;
    }
    return cordenadas;
  }

  verPosibles() {
    const piezaActual = this.tablero.piezaActual;
    const posibles = this.movePosibles(
      piezaActual.id,
      piezaActual.x,
      piezaActual.y
    );

    posibles.forEach((pos, index) => {
      const [x, y] = pos;
      if (x > 7 || y > 7 || x < 0 || y < 0) return;
      const casilla = this.tablero.array[y][x].casilla;
      const pieza = this.tablero.array[y][x].pieza;
      if (
        (piezaActual.id === "p" || piezaActual.id === "P") &&
        this.tablero.rondas >= 2
      ) {
        if (index === 0 && pieza === null) {
          casilla.elemento.classList.add("posibles");
          casilla.move = true;
        }
        if (pieza !== null && index !== 0) {
          casilla.elemento.classList.add("posibles");
          casilla.move = true;
        }
        return;
      }
      casilla.elemento.classList.add("posibles");
      casilla.move = true;
    });
  }

  hasPieza(x, y) {
    if (x > 7 || y > 7 || x < 0 || y < 0) return;
    const pieza = this.tablero.array[y][x]?.pieza;
    return pieza !== null;
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
      const casilla = this.tablero.array[y][x].casilla;
      casilla.elemento.classList.remove("posibles");
      casilla.move = false;
    });
  }
}
