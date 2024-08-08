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
        if(!operators.includes(childNum) && childNum !== '=' && childNum !== 'AC' && childNum !== '⌫'){
            if(!operator){
                firstNumber += childNum;
                calcScreen.textContent = firstNumber;
            }
            else{
                secondNumber += childNum;
                calcScreen.textContent = secondNumber;
            }
          updateDot();
        } 

        if (operators.includes(childNum)){
            if(operator && operator != '/' && secondNumber){
                let result = operate(parseFloat(firstNumber), operator, parseFloat(secondNumber));
                calcScreen.textContent = result;
                firstNumber = result.toString();
                operator = '';
                secondNumber = '';
                updateDot();
            }
            if(operator === '/' && secondNumber){
                let result = operate(parseFloat(firstNumber), operator, parseFloat(secondNumber));
                calcScreen.textContent = result.toFixed(2);
                firstNumber = result.toFixed(2);
                operator = '';
                secondNumber = '';
                updateDot();

            }
            operator = childNum;
            calcScreen.textContent = firstNumber + ' ' + operator;
            updateDot(); 
        }
        if (childNum === '=' && firstNumber && secondNumber){
            let result = operate(parseFloat(firstNumber), operator, parseFloat(secondNumber));
            calcScreen.textContent = result;
            firstNumber = result.toString();
            secondNumber = '';
            operator = '';    
            updateDot();
        }
        else{
            childNum.disabled;
        }

        if(!firstNumber && operators.includes(childNum)){
            operator = '';
            calcScreen.textContent = '';
        }
        if(firstNumber === '.'){
            firstNumber = ''
            calcScreen.textContent = '';
        }
        else if(secondNumber === '.'){
            secondNumber = '';
            calcScreen.textContent = '';
        }

        if(childNum === 'AC'){
            firstNumber = '';
            secondNumber = '';
            operator = '';
            calcScreen.textContent = '';
            updateDot();
        }
        if (childNum === '⌫'){
            if (!operator && firstNumber){
                firstNumber = firstNumber.slice(0, -1);
                calcScreen.textContent = firstNumber;
            }
            else if (secondNumber){
                secondNumber = secondNumber.slice(0, -1);
                calcScreen.textContent = secondNumber; 
            }
            else if (operator){
                operator = operator.slice(0, -1);
                calcScreen.textContent = firstNumber;
            }
            updateDot();
        }
    }
}
    function updateDot(){
        if ((!operator && firstNumber.includes('.')) || (operator && secondNumber.includes('.'))) {
            document.getElementById('.').disabled = true;
        }
        else {
            document.getElementById('.').disabled = false;
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
