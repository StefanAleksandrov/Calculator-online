import { Calculator } from './calcClass.js'
let calc = new Calculator();

const buttonsList = document.getElementsByClassName("number");
const buttonsArr = Array.from(buttonsList);
const operandsList = document.getElementsByClassName("operation");
const operandsArr = Array.from(operandsList);
const calculation = document.getElementById("calculation");
const deleteLastDigit = document.getElementById("delete");
const deleteAll = document.getElementById("clearAll");
const historyButton = document.getElementById("historyButton");
const historyDiv = document.getElementById("history");
const buttonsShowHide = document.getElementById("show/hide");
const displayCurrent = document.getElementById("current");
const displayPrevious = document.getElementById("previous");
const bodyDiv = document.getElementById("body");
let currSymbol = "";

buttonsArr.forEach(element => element.addEventListener("click", function (event) {
    currSymbol = event.target.textContent;
    let currNumber = displayCurrent.textContent;
    displayCurrent.textContent += calc.appendCurrent(currSymbol, currNumber);
}));

operandsArr.forEach(element => element.addEventListener("click", function (event) {
    currSymbol = event.target.textContent;
    let currNumber = displayCurrent.textContent;

    if (displayCurrent.textContent.length > 0) {
        const result = calc.appendPrevious(currSymbol, currNumber);

        if (result.length > 0) {
            displayPrevious.textContent = result;
            displayCurrent.textContent = "";
        }
    } else {
        let tempDisplay = displayPrevious.textContent;
        displayPrevious.textContent = tempDisplay.substring(0, tempDisplay.length - 2) + " " + currSymbol;
    }
}));

calculation.addEventListener("click", function (event) {
    currSymbol = String(displayPrevious.textContent).substring(displayPrevious.textContent.length - 1);
    let currNumber = displayCurrent.textContent;
    let previousNumber = displayPrevious.textContent;

    if (displayPrevious.textContent.includes("=")) {
        return;
    }
    if (currNumber.length > 0 && previousNumber.length > 0) {
        displayPrevious.textContent += " " + displayCurrent.textContent + " =";
        displayCurrent.textContent = calc.calculation(currSymbol, currNumber, previousNumber);
    }
});

deleteLastDigit.addEventListener("click", function (event) {
    let currNumber = displayCurrent.textContent;

    if (currNumber.length > 0) {
        displayCurrent.textContent = calc.clear(currNumber);
    }
});

deleteAll.addEventListener("click", function () {
    displayCurrent.textContent = "";
    displayPrevious.textContent = "";
    calc.clearAll;

    while (historyDiv.lastChild) {
        historyDiv.removeChild(historyDiv.lastChild);
    }
});

historyButton.addEventListener("click", function (event) {
    const historyArr = calc.history;
    let length = historyArr.length - 1;

    if (historyDiv.classList.contains("hide")) {
        while (length > 0) {
            let tempArr = historyArr.splice(0, 5);
            let newDiv = document.createElement("div");
            newDiv.textContent = tempArr.join(" ");
            historyDiv.appendChild(newDiv);
            length -= 5;
        }

        historyDiv.classList.remove("hide");
        buttonsShowHide.classList.add("hide");
    } else {
        historyDiv.classList.add("hide");
        buttonsShowHide.classList.remove("hide");
    }
});

bodyDiv.addEventListener("keydown", function (event) {
    const symbolCodes = ['Numpad0', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4', 'Numpad5', 'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9', 'NumpadDecimal',
        'Digit0', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Comma', 'Period'];
    const operandsCodes = ['NumpadAdd', 'NumpadSubstract', 'NumpadMultiply', 'NumpadDivide'];
    const calculationStart = ['NumpadEnter', 'Enter', 'Space'];

    if (symbolCodes.includes(event.code)) {
        switch (event.code) {
            case 'Comma':
                currSymbol = ".";
                break;
            case 'Period':
                currSymbol = ".";
                break;
            case 'NumpadDecimal':
                currSymbol = ".";
                break;
            default:
                let temp = String(event.code);
                currSymbol = temp.substring(temp.length - 1);
                break;
        }
        let currNumber = displayCurrent.textContent;
        displayCurrent.textContent += calc.appendCurrent(currSymbol, currNumber);
    } else if (operandsCodes.includes(event.code) && displayCurrent.textContent.length > 0) {
        switch (event.code) {
            case 'NumpadAdd':
                currSymbol = '+';
                break;
            case 'NumpadSubstract':
                currSymbol = '-';
                break;
            case 'NumpadMultiply':
                currSymbol = '*';
                break;
            case 'NumpadDivide':
                currSymbol = '/';
                break;
        }

        let currNumber = displayCurrent.textContent;

        if (displayCurrent.textContent.length > 0) {
            const result = calc.appendPrevious(currSymbol, currNumber);

            if (result.length > 0) {
                displayPrevious.textContent = result;
                displayCurrent.textContent = "";
            }
        } else {
            let tempDisplay = displayPrevious.textContent;
            displayPrevious.textContent = tempDisplay.substring(0, tempDisplay.length - 2) + " " + currSymbol;
        }
    } else if (calculationStart.includes(event.code)) {
        currSymbol = String(displayPrevious.textContent).substring(displayPrevious.textContent.length - 1);
        let currNumber = displayCurrent.textContent;
        let previousNumber = displayPrevious.textContent;
    
        if (displayPrevious.textContent.includes("=")) {
            return;
        }
        if (currNumber.length > 0 && previousNumber.length > 0) {
            displayPrevious.textContent += " " + displayCurrent.textContent + " =";
            displayCurrent.textContent = calc.calculation(currSymbol, currNumber, previousNumber);
        }
    }
})