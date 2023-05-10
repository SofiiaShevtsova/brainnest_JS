import { compPlayed, compChoiceStart } from "./compChoice.js";
import {
  dragStart,
  dragEnd,
  dragEnter,
  dragOver,
  dragLeave,
  drop,
} from "./userChoice.js";

export const arrayOfField = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "k"];
const arrayOfShips = ["h1", "h2", "h3", "h4"];

const port = document.querySelector(".shipsBattle__port");
const battleFieldUser = document.querySelector(".shipsBattle__user-field");
const battleFieldComp = document.querySelector(".shipsBattle__comp-field");
const startButton = document.querySelector(".shipsBattle__button");

const addItem = (item) => {
  let element = "";
  for (let i = 0; i < arrayOfField.length + 1; i++) {
    element =
      element +
      `<li id="${i === 0 ? i : item + i}" class="shipsBattle__item">${
        i === 0 ? `${item[1]}` : ""
      }</li>`;
  }
  return element;
};

const addField = (isCompFields = false) => {
  const title = `<ul class="shipsBattle__row"><li class="shipsBattle__item"></li>${arrayOfField
    .map((item, i) => `<li class="shipsBattle__item">${i + 1}</li>`)
    .join(" ")}</ul>`;

  const field = arrayOfField
    .map((item) => {
      return `<li><ul class="shipsBattle__row" id="${item}">
    ${isCompFields ? addItem("c" + item) : addItem("u" + item)}
    </ul></li>`;
    })
    .join(" ");

  const allField = `<ul class="shipsBattle__all"><li> ${title}</li>${field}</ul>`;
  return allField;
};

const AddShips = () => {
  const ships = arrayOfShips
    .map((i) => `<div class="${i} ship" id="${i}"></div>`)
    .join(" ");
  return ships;
};

battleFieldUser.insertAdjacentHTML("beforeend", addField());
battleFieldComp.insertAdjacentHTML("beforeend", addField(true));
port.insertAdjacentHTML("beforeend", AddShips());

  const shot = (shotElement) => {
    if (shotElement.classList.contains("ship-green")) {
    shotElement.classList.remove("ship-green");
    shotElement.classList.add("ship-red");
    } else {
      shotElement.classList.add("water")
    }
  }

const onShipsClick = (e) => {
  if (e.target.id) {
    e.target.id =
      e.target.id[0] === "h" ? "v" + e.target.id[1] : "h" + e.target.id[1];
  }
};

const onStartClick = (e) => {
  port.classList.add("none");
  compPlayed()
  startButton.classList.add("none");

  battleFieldComp.addEventListener("click", (e) => {
    if (arrayOfField.includes(e.target.id[1])) {
       shot(e.target)
    }
    const compShot = "u" + compChoiceStart().slice(1)
    shot(document.getElementById(`${compShot}`))
  });
};

port.addEventListener("click", onShipsClick);
startButton.addEventListener("click", onStartClick);

const allShips = document.querySelectorAll(".ship");
allShips.forEach((ship) => {
  ship.addEventListener("dragstart", dragStart);
  ship.addEventListener("dragend", dragEnd);
});

battleFieldUser.addEventListener("dragover", dragOver);
battleFieldUser.addEventListener("dragenter", dragEnter);
battleFieldUser.addEventListener("dragleave", dragLeave);
battleFieldUser.addEventListener("drop", drop);

// --------------------------


