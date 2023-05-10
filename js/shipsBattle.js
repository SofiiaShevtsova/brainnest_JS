const arrayOfField = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "k"];
const arrayOfShips = ["h1", "h2", "h3", "h4"];
const shipState = {
  h1: 4,
  h2: 3,
  h3: 2,
  h4: 1,
  setState(key) {
    shipState[key] = this[key] - 1;
  },
};

const port = document.querySelector(".shipsBattle__port");
const battleFieldUser = document.querySelector(".shipsBattle__user-field");
const battleFieldComp = document.querySelector(".shipsBattle__comp-field");
let draggedShip = null;

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
    .map((item, i) => {
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

const onShipsClick = (e) => {
  if (e.target.id) {
    e.target.id =
      e.target.id[0] === "h" ? "v" + e.target.id[1] : "h" + e.target.id[1];
  }
};

const addShip = (startPlace, lang, pos, classAdd, field) => {
  const start = startPlace;
  if (document.querySelector(`.ship-red.ship-red-bor`)) {
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

battleFieldUser.insertAdjacentHTML("beforeend", addField());
battleFieldComp.insertAdjacentHTML("beforeend", addField(true));
port.insertAdjacentHTML("beforeend", AddShips());

port.addEventListener("click", onShipsClick);

const allShips = document.querySelectorAll(".ship");
allShips.forEach((ship) => {
  ship.addEventListener("dragstart", dragStart);
  ship.addEventListener("dragend", dragEnd);
});

battleFieldUser.addEventListener("dragover", dragOver);
battleFieldUser.addEventListener("dragenter", dragEnter);
battleFieldUser.addEventListener("dragleave", dragLeave);
battleFieldUser.addEventListener("drop", drop);

function dragStart(e) {
  if (!e.target.id) return;
  if (e.target.id) {
    draggedShip = e.target.id;
  }
}

function dragEnd() {
  draggedShip = null;
}

function dragOver(e) {
  e.preventDefault();
  if (draggedShip) {
    if (e.target.id === "0") {
      return;
    }
    addShip(e.target.id, +draggedShip[1], draggedShip[0], "ship-red-bor", "u");
  }
}

function dragEnter(e) {
  if (!draggedShip) return;
  e.preventDefault();
}

function dragLeave() {
  if (!draggedShip) return;
  [...document.querySelectorAll(".shipsBattle__item")].map((i) =>
    i.classList.remove("ship-red-bor")
  );
}

function drop(e) {
  if (e.target) {
    const added = addShip(
      e.target.id,
      +draggedShip[1],
      draggedShip[0],
      "ship-red",
      "u"
    );
    added && shipState.setState("h" + draggedShip[1]);

    if (shipState[`h${draggedShip[1]}`] === 0) {
      document.querySelector(`.h${draggedShip[1]}`).classList.add("none");
    }
  }
}

const compChoiceStart = () => {
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

const compChoiceShip = () => {
  const arrayShipLang = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
  const newArray = arrayShipLang.map((i) => {
    const position = Math.floor(Math.random() * 2) === 0 ? "h" : "v";
    return i === 1 ? "h1" : position + i;
  });
  return newArray;
};
// -----------------------------------комп грає --------------------------------------------------------
const arrayComp = compChoiceShip();

arrayComp.map((i) => {
  let result = true;
  do {
    const start = compChoiceStart();
    addShip(start, +i.slice(1), i[0], "ship-red-bor", "c");
    result = addShip(start, +i.slice(1), i[0], "ship-red", "c");

    const choiseItem = [...document.querySelectorAll(".ship-red-bor")];
    choiseItem.map((item) => {
      item.classList.remove("ship-red-bor");
    });
  } while (!result);
});
