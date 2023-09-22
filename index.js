let output = document.getElementById("output");
let buttons = document.getElementsByClassName("btn");
let btnContainer = document.getElementById("btn-container");
let plusBtn = document.getElementById("plusBtn");
let minusBtn = document.getElementById("minusBtn");
let divideBtn = document.getElementById("divideBtn");
let multiplyBtn = document.getElementById("multiplyBtn");

let calculator = {
  displayValue: 0,
  firstOperand: null,
  operator: undefined,
  waitingForSecondOperand: false,
};

function updateDisplay() {
  output.textContent = calculator.displayValue;
}
updateDisplay();

let btnArray = Array.from(buttons);
btnArray.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let buttonValue = e.target.textContent;

    if (buttonValue === "+") {
      handleOperator(buttonValue);
      plusBtn.classList.add("keyPressed");
      minusBtn.classList.remove("keyPressed");
      divideBtn.classList.remove("keyPressed");
      multiplyBtn.classList.remove("keyPressed");
    } else if (buttonValue === "-") {
      handleOperator(buttonValue);
      minusBtn.classList.add("keyPressed");
      plusBtn.classList.remove("keyPressed");
      divideBtn.classList.remove("keyPressed");
      multiplyBtn.classList.remove("keyPressed");
    } else if (buttonValue === "÷") {
      handleOperator(buttonValue);
      divideBtn.classList.add("keyPressed");
      plusBtn.classList.remove("keyPressed");
      minusBtn.classList.remove("keyPressed");
      multiplyBtn.classList.remove("keyPressed");
    } else if (buttonValue === "x") {
      handleOperator(buttonValue);
      multiplyBtn.classList.add("keyPressed");
      plusBtn.classList.remove("keyPressed");
      minusBtn.classList.remove("keyPressed");
      divideBtn.classList.remove("keyPressed");
    } else if (buttonValue === "=") {
      plusBtn.classList.remove("keyPressed");
      minusBtn.classList.remove("keyPressed");
      divideBtn.classList.remove("keyPressed");
      multiplyBtn.classList.remove("keyPressed");
      calculate();
    } else if (buttonValue === "RESET") {
      plusBtn.classList.remove("keyPressed");
      minusBtn.classList.remove("keyPressed");
      divideBtn.classList.remove("keyPressed");
      multiplyBtn.classList.remove("keyPressed");
      clearCalculator();
    } else if (buttonValue === "DEL") {
      plusBtn.classList.remove("keyPressed");
      minusBtn.classList.remove("keyPressed");
      divideBtn.classList.remove("keyPressed");
      multiplyBtn.classList.remove("keyPressed");
      deleteValue();
    } else {
      inputDigit(buttonValue);
    }
    updateDisplay();
  });
});

function inputDigit(digit) {
  if (String(calculator.displayValue).includes(".")) {
    if (digit === ".") return;
  }
  if (calculator.waitingForSecondOperand) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      calculator.displayValue === 0 ? digit : calculator.displayValue + digit;
  }
}

function handleOperator(nextOperator) {
  let inputValue = parseFloat(calculator.displayValue);
  calculator.operator = nextOperator;
  if (calculator.firstOperand === null) {
    calculator.firstOperand = inputValue;
  } else if (calculator.operator) {
    let result = performCalculation();
    calculator.displayValue = result;
    calculator.firstOperand = result;
  }
  calculator.operator = nextOperator;
  // calculator.displayValue = calculator.firstOperand + calculator.operator;
  calculator.waitingForSecondOperand = true;
}

function performCalculation() {
  let { firstOperand, operator, displayValue } = calculator;
  let inputValue = parseFloat(displayValue);
  if (operator === "+") {
    return firstOperand + inputValue;
  } else if (operator === "-") {
    return firstOperand - inputValue;
  } else if (operator === "x") {
    return firstOperand * inputValue;
  } else {
    return firstOperand / inputValue;
  }
}

function calculate() {
  if (calculator.operator && !calculator.waitingForSecondOperand) {
    let result = performCalculation();
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
    calculator.operator = null;
    calculator.waitingForSecondOperand = true;
  }
}

function clearCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.operator = null;
  calculator.waitingForSecondOperand = false;
}
function deleteValue() {
  if (calculator.displayValue.length > 1) {
    calculator.displayValue = calculator.displayValue.slice(0, -1);
  } else {
    calculator.displayValue = "0";
  }
}
