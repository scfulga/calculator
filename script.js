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
        if (!operators.includes(button) && button !== '=' && button !== 'AC' && button !== '←' && button !== '±') {
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
        if (button === '←') {
            backspaceButton();
        }
        if(firstNumber && operator === '/' && secondNumber === '0'){
            alert("Can't divide to 0")
            ACbutton();
        }
        handleZero();
        handleNegOrPosBtn(button); 
    }
}

function handleNegOrPosBtn(button){
    if (button === '±'){
        if (!operator){
            firstNumber = toggleNegOrPosBtn(firstNumber);
            calcScreen.textContent = firstNumber + ' ' + operator;
        } else {
            secondNumber  = toggleNegOrPosBtn(secondNumber);
            calcScreen.textContent = secondNumber;
        }
        if(firstNumber === '-'){
            firstNumber = firstNumber.substring(1);
            calcScreen.textContent = firstNumber;
        } else if(secondNumber === '-'){
            secondNumber = secondNumber.substring(1);
            calcScreen.textContent = secondNumber;
        }
        if (firstNumber && operator && !secondNumber){
            firstNumber = toggleNegOrPosBtn(firstNumber);
            calcScreen.textContent = firstNumber + ' ' + operator;
        }
    }
}

function toggleNegOrPosBtn(num) {
    if(num[0] !== '-'){
        return num = '-' + num;
    } else {
        return num = num.substring(1);
    }
}

function handleZero() {
    if (firstNumber === '0' || secondNumber === '0'){
        document.getElementById('0').disabled = true;
    } else {
        document.getElementById('0').disabled = false;
    }

    if (firstNumber[0] === '0' && firstNumber.length > 1 && !firstNumber.includes('.')){
        firstNumber = firstNumber.substring(1);
        calcScreen.textContent = firstNumber;
    } else if (secondNumber[0] === '0' && secondNumber.length > 1 && !secondNumber.includes('.')){
        secondNumber = secondNumber.substring(1);
        calcScreen.textContent = secondNumber; 
    }

    if (firstNumber[1] === '0' && firstNumber[0] === '-' && firstNumber.length > 2 && !firstNumber.includes('.')){
        firstNumber = firstNumber.slice(0, 1) + firstNumber.slice(2);
        calcScreen.textContent = firstNumber;       
    } else if (secondNumber[1] === '0' && secondNumber[0] === '-' && secondNumber.length > 2 && !secondNumber.includes('.')){
        secondNumber = secondNumber.slice(0, 1) + secondNumber.slice(2);
        calcScreen.textContent = secondNumber
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
        limitDecimalsToThree(result);
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
    limitDecimalsToThree(result);
    secondNumber = '';
    operator = '';
    updateDot();
}

function limitDecimalsToThree(result) {
    if(result % 1 === 0){
        calcScreen.textContent = result.toString();
    } else{
        calcScreen.textContent = parseFloat(result.toFixed(3));
    }
    firstNumber = calcScreen.textContent;
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
    document.getElementById('0').disabled = false;
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
