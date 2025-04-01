const displayMain = document.querySelector("#display #main");

document.querySelector("#calculator").addEventListener("click", event => {
    if (event.target.classList.contains("digit")) {
        populateMainDisplay(event.target.textContent);
    } else if (event.target.id === "clear") {
        clearMainDisplay();
    } else if (event.target.id === "backspace") {
        removeLastDigit();
    }
});

function populateMainDisplay(digit) {
    if (displayMain.textContent === "0") {
        displayMain.textContent = "";
    }

    if (displayMain.textContent.length < 13) {
        displayMain.textContent += digit;
    }
}

function clearMainDisplay() {
    displayMain.textContent = "0";
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
        case "+":
            result = add(operand1, operand2);
            break;
        case "-":
            result = subtract(operand1, operand2);
            break;
        case "*":
            result = multiply(operand1, operand2);
            break;
        case "/":
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