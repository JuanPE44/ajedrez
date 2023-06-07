class Tablero {
  static FILAS = 8;
  static COLUMNAS = 8;
  static LARGO_CASILLA = 60;

  constructor(elemento) {
    this.elemento = elemento;
    this.tablero = [];
    this._piezaActual;
    this.crearTablero();
  }

  get piezaActual() {
    return this._piezaActual;
  }

  set piezaActual(value) {
    console.log("entro al setter");
    this._piezaActual = value;
    console.log(this._piezaActual);
  }

  crearTablero() {
    const fragmento = document.createDocumentFragment();
    for (let i = 0; i < Tablero.FILAS; i++) {
      this.tablero[i] = [];
      for (let j = 0; j < Tablero.COLUMNAS; j++) {
        const colorCasilla = this.obtenerColorCasilla(i, j);
        const c = new Casilla(j, i, colorCasilla, this);
        this.tablero[i][j] = { casilla: c.elemento, pieza: 0 };
        fragmento.appendChild(c.elemento);
      }
    }
    this.elemento.appendChild(fragmento);
    this.elemento.style.gridTemplateColumns = `repeat(${Tablero.FILAS}, ${Tablero.LARGO_CASILLA}px)`;
    this.elemento.style.gridTemplateRows = `repeat(${Tablero.FILAS}, ${Tablero.LARGO_CASILLA}px)`;
    console.log(this.tablero);
    this.agregarPiezas();
  }

  agregarPiezas() {
    for (let i = 0; i < Tablero.FILAS; i++) {
      for (let j = 0; j < Tablero.COLUMNAS; j++) {
        if (i === 0 || i === 1 || i === 6 || i === 7) {
          const pieza = this.obtenerPieza(i, j);
          const p = new Pieza(j, i, Tablero.LARGO_CASILLA, pieza, this);
          this.tablero[i][j].pieza = p;
        }
      }
    }
  }
  obtenerColorCasilla(i, j) {
    if (i % 2 === 0) {
      if (j % 2 === 0) return "#769656";
      return "#eeeed2";
    } else {
      if (j % 2 === 0) return "#eeeed2";
      return "#769656";
    }
  }

  obtenerPieza(i, j) {
    const piezasNegras = ["r", "n", "b", "q", "k", "b", "n", "r"];
    const piezasBlancas = ["R", "N", "B", "Q", "K", "B", "N", "R"];
    if (i === 0) return "p";
    if (i === 1) return piezasNegras[j];
    if (i === 6) return "P";
    if (i === 7) return piezasBlancas[j];
  }
}
