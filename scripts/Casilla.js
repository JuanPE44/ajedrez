class Casilla {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.elemento = document.createElement("div");
    this.crearCasilla();
  }

  crearCasilla() {
    this.elemento.classList.add("casilla");
  }
}
