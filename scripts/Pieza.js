class Pieza {
  constructor(x, y, largo, id, tablero, tipo) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.largo = largo;
    this.tablero = tablero;
    this.tipo = tipo;
    this.casillaAct = tablero.array[y][x].casilla;
    this.select = false;
    this.elemento = document.createElement("div");
    this.contenedor = document.querySelector(".contenedor-piezas");
    this.crearPieza();
    this.mover(this.x, this.y);
  }

  crearPieza() {
    this.elemento.classList.add("pieza");
    this.elemento.style.width = `${this.largo}px`;
    this.elemento.style.height = `${this.largo}px`;
    this.elemento.draggable = true;
    this.contenedor.appendChild(this.elemento);
    const urlPieza = this.obtenenerUrlPieza(this.id);
    this.elemento.style.backgroundImage = `url(${urlPieza})`;

    this.elemento.addEventListener("click", (e) => {
      if (
        this.casillaAct.move === true &&
        this.tipo !== this.tablero.piezaActual.tipo
      ) {
        this.comerPieza();
        return;
      }
      this.tablero.piezaActual?.casillaAct.desSelect();
      this.tablero.piezaActual?.casillaAct.sacarPosibles();
      console.log({ tipo: this.tipo, turnoActual: this.tablero.turnoActual });
      if (this.tipo !== this.tablero.turnoActual) return;
      this.tablero.piezaActual = this;
      this.casillaAct.select();
      this.casillaAct.verPosibles();
    });

    this.elemento.addEventListener("dragstart", (e) => {
      console.log("drag start");
      this.elemento.style.transition = "0s";
    });

    this.elemento.addEventListener("dragend", () => {
      console.log("drag end");
      this.elemento.style.transition = "";
    });
  }

  comerPieza() {
    this.tablero.piezaActual?.casillaAct.desSelect();
    this.tablero.piezaActual?.casillaAct.sacarPosibles();
    this.tablero.piezaActual?.mover(this.x, this.y);
    this.tablero.sonidoMove.play();
    this.tablero.rondas++;
    setTimeout(() => {
      this.contenedor.removeChild(this.elemento);
    }, 500);
  }

  mover(x, y) {
    this.casillaAct.desSelect();
    this.tablero.array[this.y][this.x].pieza = null;
    this.x = x;
    this.y = y;
    this.elemento.style.transform = `translate(${this.x * this.largo}px, ${
      this.y * this.largo
    }px)`;
    this.casillaAct = this.tablero.array[y][x].casilla;
    this.tablero.array[y][x].pieza = this;
    this.tablero.cambiarTurno();
  }

  obtenenerUrlPieza(id) {
    if (id === "p")
      return "https://www.chess.com/chess-themes/pieces/neo/150/bp.png";
    if (id === "r")
      return "https://www.chess.com/chess-themes/pieces/neo/150/br.png";
    if (id === "n")
      return "https://www.chess.com/chess-themes/pieces/neo/150/bn.png";
    if (id === "b")
      return "https://www.chess.com/chess-themes/pieces/neo/150/bb.png";
    if (id === "q")
      return "https://www.chess.com/chess-themes/pieces/neo/150/bq.png";
    if (id === "k")
      return "https://www.chess.com/chess-themes/pieces/neo/150/bk.png";
    if (id === "P")
      return "https://www.chess.com/chess-themes/pieces/neo/150/wp.png";
    if (id === "R")
      return "	https://www.chess.com/chess-themes/pieces/neo/150/wr.png";
    if (id === "N")
      return "	https://www.chess.com/chess-themes/pieces/neo/150/wn.png";
    if (id === "B")
      return "https://www.chess.com/chess-themes/pieces/neo/150/wb.png";
    if (id === "Q")
      return "	https://www.chess.com/chess-themes/pieces/neo/150/wq.png";
    if (id === "K")
      return "https://www.chess.com/chess-themes/pieces/neo/150/wk.png";
  }
}
