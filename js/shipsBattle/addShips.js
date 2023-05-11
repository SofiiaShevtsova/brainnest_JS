import { arrayOfField } from "./shipsBattle.js";

export const tryAddShipsInField = (startPlace, lang, pos, field) => {
  const start = startPlace;
  const indexElem = arrayOfField.indexOf(start.slice(1, 2));
  if (pos === "h") {
    if (
      (lang === 2 && ["10"].includes(start.slice(2))) ||
      (lang === 3 && ["9", "10"].includes(start.slice(2))) ||
      (lang === 4 && ["8", "9", "10"].includes(start.slice(2)))
    ) {
      return false;
    }

    const newArray = arrayOfField.slice(
      indexElem === 0 ? 0 : indexElem - 1,
      +indexElem + 2
    );
    newArray.map((item) => {
      for (let i = +start.slice(2) - 1; i < +start.slice(2) + lang + 1; i++) {
        document.querySelector(`#${field + item + i}`) &&
          document
            .querySelector(`#${field + item + i}`)
            .classList.add("ship-red-bor");
      }
    });
    if (document.querySelector(`.ship-green.ship-red-bor`)) {
      return false;
    }
    return true;
  } else {
    if (
      (lang === 2 && arrayOfField.slice(-1).includes(start.slice(1, 2))) ||
      (lang === 3 && arrayOfField.slice(-2).includes(start.slice(1, 2))) ||
      (lang === 4 && arrayOfField.slice(-3).includes(start.slice(1, 2)))
    ) {
      return false;
    }

    const newArray = arrayOfField.slice(
      +indexElem !== 0 ? indexElem - 1 : indexElem,
      +indexElem + lang + 1
    );
    for (const item of newArray) {
      for (let i = +start.slice(2) - 1; i < +start.slice(2) + 2; i++) {
        document.querySelector(`#${field + item + i}`) &&
          document
            .querySelector(`#${field}${item + i}`)
            .classList.add("ship-red-bor");
      }
    }
    if (document.querySelector(`.ship-green.ship-red-bor`)) {
      return false;
    }

    return true;
  }
};

export const addShipsInField = (startPlace, lang, pos, field) => {
  const start = startPlace;
  if (document.querySelector(`.ship-green.ship-red-bor`)) {
    return false;
  }
  if (pos === "h") {
    if (
      (lang === 2 && start.slice(2) === "10") ||
      (lang === 3 && ["9", "10"].includes(start.slice(2))) ||
      (lang === 4 && ["8", "9", "10"].includes(start.slice(2)))
    ) {
      return false;
    }
    for (let i = +start.slice(2); i < +start.slice(2) + lang; i++) {
      document.querySelector(`#${start.slice(0, 2) + i}`) &&
        document
          .querySelector(`#${start.slice(0, 2) + i}`)
          .classList.add("ship-green");
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
      document.querySelector(`#${field}${i + start.slice(2)}`) &&
        document
          .querySelector(`#${field}${i + start.slice(2)}`)
          .classList.add("ship-green");
    }
    return true;
  }
};
