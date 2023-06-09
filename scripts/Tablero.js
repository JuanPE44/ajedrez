class Tablero {
  static FILAS = 8;
  static COLUMNAS = 8;
  static LARGO_CASILLA = 60;

  constructor(elemento) {
    this.elemento = elemento;
    this._array = [];
    this._piezaActual;
    this.crearTablero();
  }

  get piezaActual() {
    return this._piezaActual;
  }

  get array() {
    return this._array;
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
          const pieza = this.obtenerPieza(i, j);
          const p = new Pieza(j, i, Tablero.LARGO_CASILLA, pieza, this);
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
    if (i === 0) return piezasNegras[j];
    if (i === 1) return "p";
    if (i === 6) return "P";
    if (i === 7) return piezasBlancas[j];
  }
}
