let output = document.getElementById("output");
let buttons = document.getElementsByClassName("btn");
let btnContainer = document.getElementById("btn-container");

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
    if (
      buttonValue === "+" ||
      buttonValue === "-" ||
      buttonValue === "÷" ||
      buttonValue === "x"
    ) {
      handleOperator(buttonValue);
    } else if (buttonValue === "=") {
      calculate();
    } else if (buttonValue === "RESET") {
      clearCalculator();
    } else {
      inputDigit(buttonValue);
    }

    updateDisplay();
  });
});

function inputDigit(digit) {
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
