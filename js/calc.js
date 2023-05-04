const arrayForCalculator = [
  1,
  2,
  3,
  "+",
  4,
  5,
  6,
  "-",
  7,
  8,
  9,
  "*",
  "=",
  0,
  ".",
  "/",
  "C",
  "CA",
];
const calcTable = document.querySelector(".calcutor__list-btn");
const calkOutput = document.querySelector(".calculator__output");

const countState = {
  result: 0,
  num: 0,
  operator: "",
  setResult(res) {
    this.result = res;
  },
  setNum(num) {
    this.num = num;
  },
  setOperator(oper) {
    this.operator = oper;
  },
  setState() {
    this.result = 0;
    this.num = 0;
    this.operator = "";
  },
};

const addNumder = (num1, num2) =>
  (+num1 + +num2).toFixed((+num1 + +num2) % 1 === 0 ? 0 : 2);
const subtractNumber = (num1, num2) =>
  (num1 - num2).toFixed((num1 - num2) % 1 === 0 ? 0 : 2);
const multiplyNumder = (num1, num2) =>
  (num1 * num2).toFixed((num1 * num2) % 1 === 0 ? 0 : 2);
const divideNumber = (num1, num2) => {
  return +num2 === 0
    ? "Сannot be divided by zero"
    : (num1 / num2).toFixed((num1 / num2) % 1 === 0 ? 0 : 2);
};

const count = (num1, num2, operator) => {
  switch (operator) {
    case "+":
      return addNumder(num1, num2);
    case "-":
      return subtractNumber(num1, num2);
    case "*":
      return multiplyNumder(num1, num2);
    case "/":
      return divideNumber(num1, num2);
    default:
      return null;
  }
};

const addPoint = () => {
  if (
    !calkOutput.textContent ||
    isNaN(+calkOutput.textContent[calkOutput.textContent.length - 1])
  ) {
    document.querySelector("#point").setAttribute("disabled", "");
    calkOutput.textContent = `${calkOutput.textContent}0.`;
  } else {
    document.querySelector("#point").setAttribute("disabled", "");
    calkOutput.textContent = `${calkOutput.textContent}.`;
  }
};

const clearAll = () => {
  countState.setState();
  calkOutput.textContent = ``;
};

const backspace = () => {
  if (
    calkOutput.textContent[calkOutput.textContent.length - 1] ===
    countState.operator
  ) {
    document.querySelector("#C").setAttribute("disabled", "");
  } else {
    calkOutput.textContent = `${calkOutput.textContent.slice(
      0,
      calkOutput.textContent.length - 1
    )}`;
  }
};

const showResult = () => {
  const array = calkOutput.textContent.split(`${countState.operator}`);
  const num = array.length === 2 ? array[1] : array[2];
  countState.setNum(num);
  countState.setResult(
    count(countState.result, countState.num, countState.operator)
  );
  calkOutput.textContent = `${countState.result}`;
  removeDisabled("point");
};

const removeDisabled = (id) => {
  document.querySelector(`#${id}`).removeAttribute("disabled", "");
};

const showOutput = (value) => {
  calkOutput.textContent = `${calkOutput.textContent}${value}`;
};

const createCalcOutput = (e) => {
  if (e.target.type === "button" || e.key) {
    const value = e.key || e.target.id;
    removeDisabled("C");

    if (isNaN(+value)) {
      switch (value) {
        case "point":
          addPoint();
          break;
        case "CA":
          clearAll();
          break;
        case "C":
          backspace();
          break;
        case "Backspace":
          backspace();
          break;
        case "=":
          showResult();
          countState.setState();
          break;

        default:
          if (arrayForCalculator.includes(value)) {
            if (countState.result !== 0) {
              showResult();
              removeDisabled("point");
            } else {
              countState.setResult(+calkOutput.textContent);
              removeDisabled("point");
            }
            countState.setOperator(value);
            showOutput(value);
            break;
          }
      }
    } else {
      showOutput(value);
    }
  }
};

const addCalcBtn = () => {
  const calcBtn = arrayForCalculator
    .map(
      (item) => `<li><button type="button" id="${
        item === "." ? "point" : item
      }" class="calcutor__btn">${item}</button></li>
`
    )
    .join(" ");
  calcTable.innerHTML = calcBtn;
};

addCalcBtn();

calcTable.addEventListener("click", createCalcOutput);
document.addEventListener("keydown", createCalcOutput);
