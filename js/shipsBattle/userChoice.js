import { addShipsInField, tryAddShipsInField } from "./addShips.js";

const startButton = document.querySelector(".shipsBattle__button");
const port = document.querySelector(".shipsBattle__port");

const shipState = {
  h1: 4,
  h2: 3,
  h3: 2,
  h4: 1,
  setState(key) {
    shipState[key] = this[key] - 1;
  },
};

let draggedShip = null;

export function dragStart(e) {
  e.dataTransfer.setDragImage(this, 10, 10);
  if (!e.target.id) return;
  if (e.target.id) {
    draggedShip = e.target.id;
  }
}

export function dragEnd() {
  draggedShip = null;
}

export function dragOver(e) {
  e.preventDefault();
  if (draggedShip) {
    if (e.target.id === "0") {
      return;
    }
    tryAddShipsInField(e.target.id, +draggedShip[1], draggedShip[0], "u");
  }
}

export function dragEnter(e) {
  if (!draggedShip) return;
  e.preventDefault();
}

export function dragLeave() {
  if (!draggedShip) return;
  [...document.querySelectorAll(".shipsBattle__item")].map((i) =>
    i.classList.remove("ship-red-bor")
  );
}

export function drop(e) {
  if (e.target) {
    const added = addShipsInField(
      e.target.id,
      +draggedShip[1],
      draggedShip[0],
      "u"
    );
    added && shipState.setState("h" + draggedShip[1]);

    if (shipState[`h${draggedShip[1]}`] === 0) {
      document.querySelector(`.h${draggedShip[1]}`).classList.add("none");
    }
    if (
      shipState.h1 === 0 &&
      shipState.h2 === 0 &&
      shipState.h3 === 0 &&
      shipState.h4 === 0
    ) {
      startButton.classList.remove("none");
      port.classList.add("none");
    }
  }
}
