const allButtons = document.querySelector('.buttons');
const calcScreen = document.querySelector('.screen');

const children = allButtons.children;

let firstNumber = '';
let secondNumber = '';
let operator = '';
let operators = ['+', '-', '*', '/'];

for (i = 0; i < children.length; i++) {
    let button = children[i].textContent;
    children[i].setAttribute("id", `${button}`);
    document.getElementById(`${button}`).onclick = function() {

        if (!operators.includes(button) && button !== '=' && button !== 'AC' && button !== '⌫') {
            handleDigitInput(button);
        }

        if (operators.includes(button)) {
            handleOperators(button);
        }
        if (button === '=' && firstNumber && secondNumber) {
            handleEqual();
        }
        handleOperatorsInput(button);
        handleDotInput();

        if (button === 'AC') {
            ACbutton();
        }
        if (button === '⌫') {
            backspaceButton();
        }
    }
}

function updateDot() {
    if ((!operator && firstNumber.includes('.')) || (operator && secondNumber.includes('.'))) {
        document.getElementById('.').disabled = true;
    } else {
        document.getElementById('.').disabled = false;
    }
}

function handleDigitInput(button) {
    if (!operator) {
        firstNumber += button;
        calcScreen.textContent = firstNumber;
    } else {
        secondNumber += button;
        calcScreen.textContent = secondNumber;
    }
    updateDot();
}

function handleOperators(button) {
    if (operator && secondNumber) {
        let result = operate(parseFloat(firstNumber), operator, parseFloat(secondNumber));
        limitDecimalsToTwo(result);
        operator = '';
        secondNumber = '';
        updateDot();
    }
    operator = button;
    calcScreen.textContent = firstNumber + ' ' + operator;
    updateDot();
}

function handleEqual() {
    let result = operate(parseFloat(firstNumber), operator, parseFloat(secondNumber));
    limitDecimalsToTwo(result);
    secondNumber = '';
    operator = '';
    updateDot();
}

function limitDecimalsToTwo(result) {
    if (operator !== '/') {
        calcScreen.textContent = result.toString();
        firstNumber = result.toString();
    } else {
        calcScreen.textContent = result.toFixed(2).toString();
        firstNumber = result.toFixed(2).toString();
    }
}

function handleOperatorsInput(button) {
    if (!firstNumber && operators.includes(button)) {
        operator = '';
        calcScreen.textContent = '';
    }
}

function handleDotInput() {
    if (firstNumber === '.') {
        firstNumber = ''
        calcScreen.textContent = '';
    } else if (secondNumber === '.') {
        secondNumber = '';
        calcScreen.textContent = '';
    }
}

function ACbutton() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    calcScreen.textContent = '';
    updateDot();
}

function backspaceButton() {
    if (!operator && firstNumber) {
        firstNumber = firstNumber.slice(0, -1);
        calcScreen.textContent = firstNumber;
    } else if (secondNumber) {
        secondNumber = secondNumber.slice(0, -1);
        calcScreen.textContent = secondNumber;
    } else if (operator) {
        operator = operator.slice(0, -1);
        calcScreen.textContent = firstNumber;
    }
    updateDot();
}

function operate(a, op, b) {
    switch (op) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
