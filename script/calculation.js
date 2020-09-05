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
let currSymbol = "";

buttonsArr.forEach(element => element.addEventListener("click", function (event) {
    let currSymbol = event.target.textContent;
    let currNumber = displayCurrent.textContent;
    displayCurrent.textContent += calc.appendCurrent(currSymbol, currNumber);
}));

operandsArr.forEach(element => element.addEventListener("click", function(event) {
    currSymbol = event.target.textContent;
    let currNumber = displayCurrent.textContent;

    if (displayCurrent.textContent.length > 0) {
        const result = calc.appendPrevious(currSymbol, currNumber);
        
        if (result.length > 0) {
            displayPrevious.textContent = result;
            displayCurrent.textContent = "";
        }
    }
}));


calculation.addEventListener("click", function(event) {
    let currNumber = displayCurrent.textContent;
    let previousNumber = displayPrevious.textContent;

    if (currNumber.length > 0 && previousNumber.length > 0) {
        displayPrevious.textContent += " " + displayCurrent.textContent + " =";
        displayCurrent.textContent = calc.calculation(currSymbol, currNumber, previousNumber);
    }
});

deleteLastDigit.addEventListener("click", function(event) {
    let currNumber = displayCurrent.textContent;

    if (currNumber.length > 0) {
        displayCurrent.textContent = calc.clear(currNumber);
    }
});

deleteAll.addEventListener("click", function() {
    displayCurrent.textContent = "";
    displayPrevious.textContent = "";
    calc.clearAll;

    while (historyDiv.lastChild) {
        historyDiv.removeChild(historyDiv.lastChild);
    }
});

historyButton.addEventListener("click", function(event) {
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