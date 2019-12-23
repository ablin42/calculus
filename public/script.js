class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        let currOperandString = this.currentOperand.toString();

        if (number === "." && currOperandString.includes('.')) return;
        this.currentOperand = currOperandString + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") this.compute();

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '÷':
                computation = prev / curr;
                break;   
            default:
                return;     
        }
        this.currentOperand = computation;
        this.previousOperand = "";
        this.operation = undefined;
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if (isNaN(integerDigits))
            integerDisplay = "";
        else 
            integerDisplay = integerDigits.toLocaleString('fr', {maximumFractionDigits: 0});
        if (decimalDigits != null) 
            return `${integerDisplay}.${decimalDigits}`;
        else 
            return integerDisplay;
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) 
            this.previousOperandText.innerText = `${this.previousOperand} ${this.operation}`;
        else 
            this.previousOperandText.innerText = "";
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector('[data-previous]');
const currentOperandText = document.querySelector('[data-current]');

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})


window.addEventListener("keyup", function(event) {
    let keyPressed = event.keyCode;
    let key = event.key;

    if ((keyPressed >= 96 && keyPressed <= 105) || keyPressed === 110) {
        calculator.appendNumber(key);
        calculator.updateDisplay();
    }
    if (keyPressed === 106 || keyPressed === 107 || keyPressed === 109 || keyPressed === 111) {
        if (keyPressed === 111)
            key = "÷";
        calculator.chooseOperation(key);
        calculator.updateDisplay();
    }
    if (keyPressed === 46) {
        calculator.clear();
        calculator.updateDisplay();
    }
    if (keyPressed === 13) {
        calculator.compute();
        calculator.updateDisplay();
    }
    if (keyPressed === 8 || keyPressed === 187) {
        calculator.delete();
        calculator.updateDisplay(); 
    }
})

$('button').on('click', function() {
    let target = this;
    $(this).toggleClass('clicked');
    setTimeout(function(){ $(target).toggleClass('clicked') }, 250);
});