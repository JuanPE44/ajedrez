const g = new Game();
const divTimer1 = document.querySelector(".timer-p1");
const divTimer2 = document.querySelector(".timer-p2");
new Timer(divTimer1, true);
new Timer(divTimer2, false);
g.init();
