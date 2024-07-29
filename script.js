const allButtons = document.querySelector('.buttons');
const children = allButtons.children;

for(i = 0; i < children.length; i++){
    let childNum = children[i].textContent;
    children[i].setAttribute("id", `${childNum}`);
}

let firstNumber = 0;
let secondNumber = 0;
let operator = '';

function operate(a, op, b){
    switch(op){
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '*':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
    }
}

console.log(operate(5, '*',  5));

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}
