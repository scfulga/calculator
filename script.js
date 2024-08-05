const allButtons = document.querySelector('.buttons');
const calcScreen = document.querySelector('.screen');

const children = allButtons.children;

let firstNumber = '';
let secondNumber = '';
let operator = '';
let operators = ['+', '-', '*', '/'];

for(i = 0; i < children.length; i++){
    let childNum = children[i].textContent;
    children[i].setAttribute("id", `${childNum}`);
    document.getElementById(`${childNum}`).onclick = function() {
        if(!operators.includes(childNum) && childNum !== '=' && childNum !== 'AC'){
            if(!operator){
                firstNumber += childNum;
                calcScreen.textContent = firstNumber;
            }
            else{
                secondNumber += childNum;
                calcScreen.textContent = secondNumber;
            }
        } 
        
        if (operators.includes(childNum)){
            if(operator && secondNumber){
                firstNumber = operate(parseFloat(firstNumber), operator, parseFloat(secondNumber));
                operator = '';
                secondNumber = '';
                calcScreen.textContent = firstNumber;
            }
            operator = childNum;
            calcScreen.textContent = firstNumber + ' ' + operator;
        }
        if (childNum === '='){
            let result = operate(parseFloat(firstNumber), operator, parseFloat(secondNumber));
            calcScreen.textContent = result;
            firstNumber = result;
            secondNumber = '';
            operator = '';    
        }
        if(childNum === 'AC'){
            firstNumber = '';
            secondNumber = '';
            operator = '';
            calcScreen.textContent = '';
        }
    }
}


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
