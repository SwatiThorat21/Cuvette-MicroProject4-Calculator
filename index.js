let output = document.getElementById("output");
let buttons = document.getElementsByClassName("btn");
let btnContainer = document.getElementById("btn-container");

let calculator = {
  displayValue: 0,
  firstOprand: null,
  operator: undefined,
  waitingForSecondOperator: false,
};

function updateDisplay() {
  output.innerHTML = calculator.displayValue;
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
  if (calculator.waitingForSecondOperator) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperator = false;
  } else {
    calculator.displayValue =
      calculator.displayValue === 0 ? digit : calculator.displayValue + digit;
  }
}

