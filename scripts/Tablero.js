class Tablero {
  static FILAS = 8;
  static COLUMNAS = 8;
  static LARGO_CASILLA = 50;

  constructor(elemento) {
    this.elemento = elemento;
    this.tablero = [];
    this.crearTablero();
  }

  crearTablero() {
    const fragmento = document.createDocumentFragment();
    for (let i = 0; i < Tablero.FILAS; i++) {
      this.tablero[i] = [];
      for (let j = 0; j < Tablero.COLUMNAS; j++) {
        const c = new Casilla(i, j, "#222");
        this.tablero[i][j] = { casilla: c.elemento, pieza: 0 };
        fragmento.appendChild(c.elemento);
      }
    }
    this.elemento.appendChild(fragmento);
    this.elemento.style.gridTemplateColumns = `repeat(${Tablero.FILAS}, ${Tablero.LARGO_CASILLA}px)`;
    this.elemento.style.gridTemplateRows = `repeat(${Tablero.FILAS}, ${Tablero.LARGO_CASILLA}px)`;
    console.log(this.tablero);
  }
}
