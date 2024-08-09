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
        if (!operators.includes(button) && button !== '=' && button !== 'AC' && button !== '←') {
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
    }
}

function handleZero() {
    if (firstnumber === '0' || secondnumber === '0'){
        document.getelementbyid('0').disabled = true;
    } else {
        document.getelementbyid('0').disabled = false;
    }

    if (firstnumber[0] === '0' && firstnumber.length > 1 && !firstnumber.includes('.')){
        firstnumber = firstnumber.substring(1);
        calcscreen.textcontent = firstnumber;
    } else if (secondnumber[0] === '0' && secondnumber.length > 1 && !secondnumber.includes('.')){
        secondnumber = secondnumber.substring(1);
        calcscreen.textcontent = secondnumber; 
    }    
}

function updatedot() {
    if ((!operator && firstnumber.includes('.')) || (operator && secondnumber.includes('.'))) {
        document.getelementbyid('.').disabled = true;
    } else {
        document.getelementbyid('.').disabled = false;
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
