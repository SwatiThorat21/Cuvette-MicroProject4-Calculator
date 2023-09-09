// Calculator object to handle calculations
const calculator = {
    displayValue: '0',
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false,
  };
  
  function updateDisplay() {
    const output = document.getElementById('output');
    output.textContent = calculator.displayValue;
  }
  
  updateDisplay();
  
  document.getElementById('btn-container').addEventListener('click', (event) => {
    const { target } = event;
  
    if (!target.classList.contains('btn')) {
      return;
    }
  
    const buttonValue = target.textContent;
  
    switch (buttonValue) {
      case '+':
      case '-':
      case 'x':
      case '÷':
        handleOperator(buttonValue);
        break;
      case '=':
        calculate();
        break;
      case 'C':
        clearCalculator();
        break;
      default:
        inputDigit(buttonValue);
    }
  
    updateDisplay();
  });
  
  function inputDigit(digit) {
    if (calculator.waitingForSecondOperand) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue =
        calculator.displayValue === '0' ? digit : calculator.displayValue + digit;
    }
  }
  
  function handleOperator(nextOperator) {
    const inputValue = parseFloat(calculator.displayValue);
  
    if (calculator.operator && calculator.waitingForSecondOperand) {
      calculator.operator = nextOperator;
      return;
    }
  
    if (calculator.firstOperand === null) {
      calculator.firstOperand = inputValue;
    } else if (calculator.operator) {
      const result = performCalculation();
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
    }
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
  }
  
  function performCalculation() {
    const { firstOperand, operator, displayValue } = calculator;
    const inputValue = parseFloat(displayValue);
  
    switch (operator) {
      case '+':
        return firstOperand + inputValue;
      case '-':
        return firstOperand - inputValue;
      case 'x':
        return firstOperand * inputValue;
      case '÷':
        if (inputValue === 0) {
          alert('Division by zero is not allowed');
          clearCalculator();
          return 0;
        }
        return firstOperand / inputValue;
      default:
        return inputValue;
    }
  }
  
  function calculate() {
    if (calculator.operator && !calculator.waitingForSecondOperand) {
      const result = performCalculation();
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
      calculator.operator = null;
      calculator.waitingForSecondOperand = true;
    }
  }
  
  function clearCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
  }
  