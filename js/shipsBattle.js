const arrayOfField = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "k"];
const arrayOfShips = ['h1', 'h2', 'h3', 'h4']
const shipState = {
  h1: 4,
  h2: 3,
  h3: 2,
  h4: 1,
  setState(key) {
    console.log(this[key] - 1);
    shipState[key] = this[key] - 1
  }
}

const port = document.querySelector(".shipsBattle__port");
const battleField = document.querySelector(".shipsBattle__field");

let draggedShip = null;

const addItem = (item, text=false) => {
  let element = "";
  for (let i = 1; i < arrayOfField.length + 1; i++) {
    element =
      element + `<li id="${item + i}" class="shipsBattle__item">${text?item:''}</li>`;
  }
  return element;
};

const addField = () => {
  const title = `<ul class="shipsBattle__row">${arrayOfField.map(i=>`<li class="shipsBattle__item">${i}</li>`).join(" ")}</ul>`
  const field = arrayOfField
    .map(
      (item, i) => {
       return `<ul class="shipsBattle__row" id="${item}">
    ${addItem(item)}
    </ul>`}
    )
    .join(" ");
  return title+field;
};

const AddShips = () => {
  const ships = arrayOfShips.map(i => `<div class="${i} ship" id="${i}"></div>`).join(' ')
  return ships
}

const onShipsClick = (e) => {
  if (e.target.id) {
  e.target.id = e.target.id[0]==='h'? 'v' + e.target.id[1]: 'h'+ e.target.id[1]
  console.log(e.target.id);
  }
}

const addShip = (startPlace, lang, pos, classAdd) => {
  const start = startPlace;
  if (pos === "h") {
    for (let i = start[1]; i < +start[1] + lang; i++) {
      document.querySelector(`#${start[0] + i}`) &&
        document.querySelector(`#${start[0] + i}`).classList.add(classAdd);
    }
  } else {
    const newArray = arrayOfField.slice(
      arrayOfField.indexOf(start[0]),
      arrayOfField.indexOf(start[0]) + lang
    );
    for (const i of newArray) {
      document.querySelector(`#${i + start[1]}`).classList.add(classAdd);
    }
  }
};

battleField.innerHTML = addField();
port.innerHTML = AddShips()

port.addEventListener("click", onShipsClick)

const allShips = document.querySelectorAll(".ship")
allShips.forEach((ship) => {
  ship.addEventListener("dragstart", dragStart);
  ship.addEventListener("dragend", dragEnd);
});

battleField.addEventListener("dragover", dragOver);
battleField.addEventListener("dragenter", dragEnter);
battleField.addEventListener("dragleave", dragLeave);
battleField.addEventListener("drop", drop);


function dragStart(e) {
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
  addShip(e.target.id, +draggedShip[1], draggedShip[0], "ship-red-bor");
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
    addShip(e.target.id, +draggedShip[1], draggedShip[0], "ship-red");
    shipState.setState(draggedShip)
          console.log(shipState[draggedShip]);

    if (shipState[draggedShip] === 0) {
      document.querySelector(`.${draggedShip}`).classList.add("none")
    }
  }
}
