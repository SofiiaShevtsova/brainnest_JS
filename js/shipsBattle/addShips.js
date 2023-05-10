import { arrayOfField } from "./shipsBattle.js";

export const addShipsInField = (startPlace, lang, pos, classAdd, field) => {
  const start = startPlace;
  if (document.querySelector(`.ship-green.ship-red-bor`)||document.querySelector(`.ship-green.ship-red-bor`)) {
    return false;
  }
  if (pos === "h") {
    if (
      (lang === 2 && start.slice(1) === "10") ||
      (lang === 3 && ["9", "10"].includes(start.slice(1))) ||
      (lang === 4 && ["8", "9", "10"].includes(start.slice(1)))
    ) {
      return false;
    }
    for (let i = +start.slice(2); i < +start.slice(2) + lang; i++) {
      start &&
        document.querySelector(`#${start.slice(0, 2) + i}`) &&
        document
          .querySelector(`#${start.slice(0, 2) + i}`)
          .classList.add(classAdd);
    }
    return true;
  } else {
    if (
      (lang === 2 && start.slice(1, 2) === arrayOfField[-1]) ||
      (lang === 3 && arrayOfField.slice(-2).includes(start.slice(1, 2))) ||
      (lang === 4 && arrayOfField.slice(-3).includes(start.slice(1, 2)))
    ) {
      return false;
    }

    const newArray = arrayOfField.slice(
      arrayOfField.indexOf(start.slice(1, 2)),
      +arrayOfField.indexOf(start.slice(1, 2)) + lang
    );
    for (const i of newArray) {
      document
        .querySelector(`#${field}${i + start.slice(2)}`)
        .classList.add(classAdd);
    }
    return true;
  }
};
