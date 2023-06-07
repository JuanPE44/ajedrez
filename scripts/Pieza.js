class Pieza {
  constructor(x, y, largo, id, tablero) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.largo = largo;
    this.tablero = tablero;
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

    this.elemento.addEventListener("click", () => {
      this.tablero.piezaActual = this;
    });

    this.elemento.addEventListener("dragstart", (e) => {
      console.log("drag start");
      this.elemento.style.transition = "0s";

      let dragImage = document.createElement("img");
      dragImage.src = this.obtenenerUrlPieza(this.id);
      dragImage.classList.add("drag-image");
      console.log(dragImage);
      e.dataTransfer.setDragImage(dragImage, 0, 0);
    });

    this.elemento.addEventListener("dragend", () => {
      console.log("drag end");

      this.elemento.style.transition = "";
    });
  }

  mover(x, y) {
    this.x = x;
    this.y = y;
    this.elemento.style.transform = `translate(${this.x * this.largo}px, ${
      this.y * this.largo
    }px)`;
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
