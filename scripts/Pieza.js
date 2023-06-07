class Pieza {
  constructor(x, y, largo, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.largo = largo;
    this.tablero = tablero;
    this.elemento = document.createElement("div");
    this.contenedor = document.querySelector(".contenedor-piezas");
    this.crearPieza();
    this.mover();
  }

  crearPieza() {
    this.elemento.classList.add("pieza");
    this.elemento.style.width = `${this.largo}px`;
    this.elemento.style.height = `${this.largo}px`;
    this.contenedor.appendChild(this.elemento);
  }

  mover() {
    this.elemento.style.transform = `translate(${this.x * this.largo}px, ${
      this.y * this.largo
    }px)`;
  }
}
