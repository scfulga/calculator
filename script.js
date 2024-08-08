const allButtons = document.querySelector('.buttons');
const calcScreen = document.querySelector('.screen');

const children = allButtons.children;

let firstNumber = '';
let secondNumber = '';
let operator = '';
let operators = ['+', '-', '*', '/'];

for (i = 0; i < children.length; i++) {
    let childNum = children[i].textContent;
    children[i].setAttribute("id", `${childNum}`);
    document.getElementById(`${childNum}`).onclick = function() {

        if (!operators.includes(childNum) && childNum !== '=' && childNum !== 'AC' && childNum !== '⌫') {
            handleDigitInput(childNum);
        }

        if (operators.includes(childNum)) {
            handleOperators(childNum);
        }
        if (childNum === '=' && firstNumber && secondNumber) {
            handleEqual();
        }
        handleOperatorsInput(childNum);
        handleDotInput();

        if (childNum === 'AC') {
            ACBtn();
        }
        if (childNum === '⌫') {
            backspaceBtn();
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

function handleDigitInput(childNum) {
    if (!operator) {
        firstNumber += childNum;
        calcScreen.textContent = firstNumber;
    } else {
        secondNumber += childNum;
        calcScreen.textContent = secondNumber;
    }
    updateDot();
}

function handleOperators(childNum) {
    if (operator && secondNumber) {
        let result = operate(parseFloat(firstNumber), operator, parseFloat(secondNumber));
        limitDecimalsToTwo(result);
        operator = '';
        secondNumber = '';
        updateDot();
    }
    operator = childNum;
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

function handleOperatorsInput(childNum) {
    if (!firstNumber && operators.includes(childNum)) {
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

function ACBtn() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    calcScreen.textContent = '';
    updateDot();
}

function backspaceBtn() {
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
