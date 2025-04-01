const displayMain = document.querySelector("#display #main");
let operator = null;
let operand1 = null;
let operand2 = null;
let expectOperand1 = true;
let divisionByZero = false;

document.querySelector("#calculator").addEventListener("click", event => {
    if (divisionByZero) {
        divisionByZero = false;
        clearAll();
    }

    if (event.target.classList.contains("digit")) {
        populateMainDisplay(event.target.textContent);
    } else if (event.target.id === "clear") {
        clearAll();
    } else if (event.target.id === "backspace") {
        removeLastDigit();
    } else if (event.target.classList.contains("operator")) {
        if (expectOperand1) {
            operand1 = parseFloat(displayMain.textContent);
            operand2 = null;
        } else if (operand2 !== null) {
            showResult(operate(operator, operand1, operand2));
            operand2 = null;
        }

        expectOperand1 = false;
        operator = event.target.id;
    } else if (event.target.id === "equals") {
        if (operator !== null) {
            if (operand1 === null) {
                operand1 = parseFloat(displayMain.textContent);
            }

            if (operand2 === null) {
                operand2 = operand1;
            }

            showResult(operate(operator, operand1, operand2));
            operand1 = null;
            expectOperand1 = true;
        }
    }
});

function showResult(result) {
    if (operator === "divide" && operand2 === 0) {
        displayMain.textContent = "oh no";
        divisionByZero = true;
    } else {
        operand1 = result;
        displayMain.textContent = result;
    }
}

function populateMainDisplay(digit) {
    if (displayMain.textContent === "0" ||
        operand1 === null ||
        operator !== null && operand2 === null) {
        displayMain.textContent = digit;
    } else if (displayMain.textContent.length < 13) {
        displayMain.textContent += digit;
    }

    if (expectOperand1) {
        operand1 = parseFloat(displayMain.textContent);
    } else {
        operand2 = parseFloat(displayMain.textContent);
    }
}

function clearAll() {
    displayMain.textContent = "0";
    operator = null;
    operand1 = null;
    operand2 = null;
    expectOperand1 = true;
}

function removeLastDigit() {
    displayMain.textContent = displayMain.textContent.slice(0, -1);

    if (displayMain.textContent === "") {
        displayMain.textContent = "0";
    }
}

function operate(operator, operand1, operand2) {
    let result;

    switch (operator) {
        case "add":
            result = add(operand1, operand2);
            break;
        case "subtract":
            result = subtract(operand1, operand2);
            break;
        case "multiply":
            result = multiply(operand1, operand2);
            break;
        case "divide":
            result = divide(operand1, operand2);
            break;
        default:
            result = `Wrong operator: ${operator}`;
    }

    return result;
}

function add(operand1, operand2) {
    return operand1 + operand2;
}

function subtract(operand1, operand2) {
    return operand1 - operand2;
}

function multiply(operand1, operand2) {
    return operand1 * operand2;
}

function divide(operand1, operand2) {
    return operand1 / operand2;
}