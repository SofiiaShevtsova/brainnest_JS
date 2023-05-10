import { arrayOfField } from "./shipsBattle.js";
import { addShipsInField } from "./addShips.js";

const compChoiceShips = () => {
  const arrayShipLang = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
  const newArray = arrayShipLang.map((i) => {
    const position = Math.floor(Math.random() * 2) === 0 ? "h" : "v";
    return i === 1 ? "h1" : position + i;
  });
  return newArray;
};

export const compChoiceStart = () => {
  const arrayOfChoice = [];
  arrayOfField.map((i) => {
    for (let index = 1; index < arrayOfField.length + 1; index++) {
      arrayOfChoice.push(`c${i}${index}`);
    }
  });
  const choise =
    arrayOfChoice[Math.floor(Math.random() * arrayOfChoice.length)];
  return choise;
};

export const compPlayed = () => {
  const arrayComp = compChoiceShips();
  
  arrayComp.map((i) => {
    let result = true;
    do {
      const start = compChoiceStart();
      addShipsInField(start, +i.slice(1), i[0], "ship-red-bor", "c");
      result = addShipsInField(start, +i.slice(1), i[0], "ship-green", "c");
      const choiseItem = [...document.querySelectorAll(".ship-red-bor")];
      choiseItem.map((item) => {
        item.classList.remove("ship-red-bor");
      });
    } while (!result);
  });

}

