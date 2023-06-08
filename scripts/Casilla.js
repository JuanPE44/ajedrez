class Casilla {
  constructor(x, y, color, tablero) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.tablero = tablero;
    this.elemento = document.createElement("div");
    this.crearCasilla();
  }

  crearCasilla() {
    this.elemento.classList.add("casilla", `casilla-${this.color}`);

    this.elemento.addEventListener("click", () => {
      this.tablero.piezaActual &&
        this.tablero.piezaActual.mover(this.x, this.y);
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
}
