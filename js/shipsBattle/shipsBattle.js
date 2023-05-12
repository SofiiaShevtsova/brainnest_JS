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
  if (
    shotElement.classList.contains("ship-red") ||
    shotElement.classList.contains("water")
  ) {
    return "Bad shot";
  }
  if (shotElement.classList.contains("ship-green")) {
    shotElement.classList.remove("ship-green");
    shotElement.classList.add("ship-red");
    return "Good shot";
  } else {
    shotElement.classList.add("water");
  }
};

const onShipsClick = (e) => {
  if (e.target.id) {
    e.target.id =
      e.target.id[0] === "h" ? "v" + e.target.id[1] : "h" + e.target.id[1];
  }
};

const playAgain = () => {
  port.classList.remove("none");
  port.innerHTML = `<a  href="./pages/shipsBattle.html">Play again?</a>`;
};

const onFieldClick = (e) => {
  if (e.target.textContent !== "") {
    return;
  }
  if (arrayOfField.includes(e.target.id[1])) {
    const userShot = shot(e.target);
    if (userShot === "Bad shot" || userShot === "Good shot") {
      return;
    }
  }
  let compShot;
  do {
    let compChoice = "u" + compChoiceStart().slice(1);
    compShot = shot(document.getElementById(`${compChoice}`));
    if (compShot === "Good shot") {
      compChoice =
        compChoice.slice(0, 2) +
        `${+compChoice.slice(2) === 10 ? 9 : +compChoice.slice(2) + 1}`;
      compShot = shot(document.getElementById(`${compChoice}`));
    }

    if (battleFieldUser.querySelectorAll(".ship-red").length === 20) {
      alert("Computer win");
      battleFieldComp.removeEventListener("click", onFieldClick);
      playAgain();
      return;
    }
    if (battleFieldComp.querySelectorAll(".ship-red").length === 20) {
      alert("User win");
      battleFieldComp.removeEventListener("click", onFieldClick);
      playAgain();
      return;
    }
  } while (compShot === "Bad shot" || compShot === "Good shot");
};

const onStartClick = (e) => {
  const choiseItem = [...document.querySelectorAll(".ship-red-bor")];
  choiseItem.map((item) => {
    item.classList.remove("ship-red-bor");
  });

  compPlayed();
  startButton.classList.add("none");

  battleFieldComp.addEventListener("click", onFieldClick);
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
