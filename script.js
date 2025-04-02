const MAX_DECIMAL_LENGTH = 10;
const displayMain = document.querySelector("#display #main");
const displayMini = document.querySelector("#display #mini");
let operatorSymbol = null;
let operator = null;
let operand1 = null;
let operand2 = null;
let expectOperand1 = true;
let divisionByZero = false;

document.querySelector("#calculator").addEventListener("click", event => {
    if (divisionByZero) {
        clearAll();
    }

    if (event.target.classList.contains("digit")) {
        populateMainDisplay(event.target.textContent);
    } else if (event.target.id === "clear") {
        clearAll();
    } else if (event.target.id === "backspace") {
        removeLastDigit();
    } else if (event.target.classList.contains("operator")) {
        onOperator(event.target);
    } else if (event.target.id === "equals") {
        if (operator !== null) {
            onEquals();
        }
    } else if (event.target.id === "negate") {
        negate(parseFloat(displayMain.textContent));
    } else if (event.target.id === "percentage") {
        percentage();
    } else if (event.target.id === "decimal") {
        populateMainDisplay(".");
    }
});

function percentage() {
    if (!expectOperand1) {
        operand2 = parseFloat((operand1 / 100 * parseFloat(displayMain.textContent)).toFixed(MAX_DECIMAL_LENGTH));
        displayMain.textContent = operand2;
    } else if (operand2 !== null) {
        operand1 = parseFloat((parseFloat(displayMain.textContent) / 100 * parseFloat(displayMain.textContent)).toFixed(MAX_DECIMAL_LENGTH));
        displayMain.textContent = operand1;
    }
}

function negate(number) {
    displayMain.textContent = -number;

    if (expectOperand1) {
        operand1 = -number;
    } else {
        operand2 = -number;
    }
}

function onEquals() {
    if (operand1 === null) {
        operand1 = parseFloat(displayMain.textContent);
    }

    if (operand2 === null) {
        operand2 = operand1;
    }

    populateMiniDisplay(operatorSymbol, operand1, operand2);
    showResult(operate(operator, operand1, operand2));
    operand1 = null;
    expectOperand1 = true;
}

function onOperator(button) {
    if (displayMain.textContent.slice(-1) === ".") {
        displayMain.textContent = displayMain.textContent.slice(0, -1);
    }

    if (expectOperand1) {
        operand1 = parseFloat(displayMain.textContent);
        operand2 = null;
    } else if (operand2 !== null) {
        showResult(operate(operator, operand1, operand2));
        operand2 = null;
    }

    expectOperand1 = false;
    operator = button.id;
    operatorSymbol = button.textContent;
    populateMiniDisplay(operatorSymbol, operand1);
}

function populateMiniDisplay(operator, operand1, operand2 = null) {
    displayMini.textContent = `${operand1} ${operator}`;

    if (operand2 !== null) {
        operand2 = operand2 < 0 ? `(${operand2})` : operand2;
        displayMini.textContent += ` ${operand2} =`;
    }
}

function showResult(result) {
    if (operator === "divide" && operand2 === 0) {
        displayMain.textContent = "oh no";
        divisionByZero = true;
    } else {
        operand1 = parseFloat(result.toFixed(MAX_DECIMAL_LENGTH));
        displayMain.textContent = operand1;
    }
}

function populateMainDisplay(digit) {
    if (displayMain.textContent === "0" ||
        operand1 === null ||
        operator !== null && operand2 === null) {
        if (digit === ".") {
            displayMain.textContent = "0.";
        } else {
            displayMain.textContent = digit;
        }
    } else if (displayMain.textContent.length < 13) {
        if (digit !== "." || digit === "." && !displayMain.textContent.includes(".")) {
            displayMain.textContent += digit;
        }
    }

    if (expectOperand1) {
        displayMini.textContent = "";
        operand1 = parseFloat(displayMain.textContent);
    } else {
        operand2 = parseFloat(displayMain.textContent);
    }
}

function clearAll() {
    displayMain.textContent = "0";
    displayMini.textContent = "";
    operatorSymbol = null;
    operator = null;
    operand1 = null;
    operand2 = null;
    expectOperand1 = true;
    divisionByZero = false;
}

function removeLastDigit() {
    displayMain.textContent = displayMain.textContent.slice(0, -1);

    if (displayMain.textContent === "") {
        displayMain.textContent = "0";
    }

    if (expectOperand1) {
        operand1 = parseFloat(displayMain.textContent);
    } else {
        operand2 = parseFloat(displayMain.textContent)
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