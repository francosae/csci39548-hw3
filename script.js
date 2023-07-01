let currentInput = '0';
let previousInput = '0';
let operation = null;
let shouldResetScreen = false;

const screen = document.querySelector('.screen');

const updateScreen = (content) => {
  screen.textContent = content;
};

const appendToScreen = (content) => {
  if (screen.textContent === '0' || shouldResetScreen) resetScreen();
  screen.textContent += content;
};

const resetScreen = () => {
  shouldResetScreen = false;
  screen.textContent = '';
};

document.querySelector('.buttons').addEventListener('click', (event) => {
  if (event.target.className === 'btn-number') {
    appendToScreen(event.target.textContent);
    return;
  }
  switch (event.target.id) {
    case 'clear':
      currentInput = '0';
      previousInput = '0';
      operation = null;
      updateScreen('0');
      break;
    case 'negate':
      currentInput = `${parseFloat(screen.textContent) * -1}`;
      updateScreen(currentInput);
      break;
    case 'percent':
      currentInput = `${parseFloat(screen.textContent) / 100}`;
      updateScreen(currentInput);
      break;
    case 'equals':
      calculate();
      break;
    default:
      handleOperation(event.target.id);
      break;
  }
});

const operate = (operation, a, b) => {
  switch (operation) {
    case 'add':
      return a + b;
    case 'subtract':
      return a - b;
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) {
        alert("You can't divide by 0!");
        return a;
      }
      return a / b;
    default:
      return b;
  }
};


const handleOperation = (operationType) => {
    if (operation !== null) calculate();
    operation = operationType;
    previousInput = screen.textContent;
    shouldResetScreen = true;
  };
  
  const calculate = () => {
    if (operation === null || shouldResetScreen) return;
    const a = parseFloat(previousInput);
    const b = parseFloat(screen.textContent);
    let result;
    switch (operation) {
      case 'factorial':
        result = factorial(a);
        break;
      case 'sin':
        result = Math.sin(a);
        break;
      case 'cos':
        result = Math.cos(a);
        break;
      case 'tan':
        result = Math.tan(a);
        break;
      case 'log':
        result = Math.log10(a);
        break;
      case 'ln':
        result = Math.log(a);
        break;
      case 'exp':
        result = Math.exp(a);
        break;
      case 'power':
        result = Math.pow(a, b);
        break;
      case 'sqrt':
        result = Math.sqrt(a);
        break;
      default:
        result = operate(operation, a, b);
        break;
    }
    updateScreen(result);
    currentInput = result;
    operation = null;
  };
  
  function factorial(num) {
    let result = 1;
    for (let i = 2; i <= num; i++)
      result *= i;
    return result;
  }
  

  