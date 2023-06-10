class Tablero {
  static FILAS = 8;
  static COLUMNAS = 8;
  static LARGO_CASILLA = 70;

  constructor(elemento) {
    this.elemento = elemento;
    this._array = [];
    this._piezaActual;
    this._rondas = 0;
    this._turnoActual = "blancas";
    this._sonidoMove = new Audio("../audio/move-pieza.mp3");
    this.crearTablero();
  }

  get sonidoMove() {
    return this._sonidoMove;
  }

  get turnoActual() {
    return this._turnoActual;
  }

  get FILAS() {
    return Tablero.FILAS;
  }

  get COLUMNAS() {
    return Tablero.COLUMNAS;
  }

  get piezaActual() {
    return this._piezaActual;
  }

  get array() {
    return this._array;
  }

  get rondas() {
    return this._rondas;
  }

  set rondas(value) {
    this._rondas = value;
    console.log(this.rondas);
  }

  set piezaActual(value) {
    console.log("setter pieza actual");
    this._piezaActual = value;
    console.log(this._piezaActual);
  }

  set array(value) {
    console.log("setter array");
    this._array = value;
  }

  set turnoActual(value) {
    this.turnoActual = value;
  }

  crearTablero() {
    const fragmento = document.createDocumentFragment();
    for (let i = 0; i < Tablero.FILAS; i++) {
      this._array[i] = [];
      for (let j = 0; j < Tablero.COLUMNAS; j++) {
        const colorCasilla = this.obtenerColorCasilla(i, j);
        const c = new Casilla(j, i, colorCasilla, this);
        this._array[i][j] = { casilla: c, pieza: null };
        fragmento.appendChild(c.elemento);
      }
    }
    this.elemento.appendChild(fragmento);
    this.elemento.style.gridTemplateColumns = `repeat(${Tablero.FILAS}, ${Tablero.LARGO_CASILLA}px)`;
    this.elemento.style.gridTemplateRows = `repeat(${Tablero.FILAS}, ${Tablero.LARGO_CASILLA}px)`;
    this.agregarPiezas();
  }

  agregarPiezas() {
    for (let i = 0; i < Tablero.FILAS; i++) {
      for (let j = 0; j < Tablero.COLUMNAS; j++) {
        if (i === 0 || i === 1 || i === 6 || i === 7) {
          const { pieza, tipo } = this.obtenerPieza(i, j);
          const p = new Pieza(j, i, Tablero.LARGO_CASILLA, pieza, this, tipo);
          this._array[i][j].pieza = p;
        }
      }
    }
  }
  obtenerColorCasilla(i, j) {
    if (i % 2 === 0) {
      if (j % 2 === 0) return "green";
      return "white";
    } else {
      if (j % 2 === 0) return "white";
      return "green";
    }
  }

  obtenerPieza(i, j) {
    const piezasNegras = ["r", "n", "b", "q", "k", "b", "n", "r"];
    const piezasBlancas = ["R", "N", "B", "Q", "K", "B", "N", "R"];
    if (i === 0) return { pieza: piezasNegras[j], tipo: "negra" };
    if (i === 1) return { pieza: "p", tipo: "negras" };
    if (i === 6) return { pieza: "P", tipo: "blancas" };
    if (i === 7) return { pieza: piezasBlancas[j], tipo: "blanca" };
  }

  cambiarTurno() {
    this._turnoActual === "blancas"
      ? (this._turnoActual = "negras")
      : (this._turnoActual = "blancas");
    console.log(this._turnoActual);
  }
}
