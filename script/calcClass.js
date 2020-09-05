export class Calculator {
    constructor() {
        this.history = [];
    }

    appendCurrent(symbol, currentNumb) {
        if (String(symbol) === "." && currentNumb.includes(".")) {
            return "";
        } else if (String(symbol) === "." && currentNumb.length === 0) {
            return "0.";
        }
        return String(symbol);
    }

    appendPrevious(symbol, currentNumb) {
        if (currentNumb.length > 0) {
            return `${currentNumb} ${symbol}`;
        }
    }

    calculation(symbol, currentNumb, previousNumb) {
        let result = 0;
        currentNumb = parseFloat(currentNumb);
        previousNumb = parseFloat(previousNumb);

        switch (symbol) {
            case "+":
                result = previousNumb + currentNumb;
                break;
            case "-":
                result = previousNumb - currentNumb;
                break;
            case "/":
                if (currentNumb !== 0) {
                    result = previousNumb / currentNumb;
                } else {
                    result = "N/A"
                }
                break;
            case "*":
                result = previousNumb * currentNumb;
                break;
        }

        this.history.push(previousNumb);
        this.history.push(symbol);
        this.history.push(currentNumb);
        this.history.push("=");
        this.history.push(result);
        return result;
    }

    clear(currentNumb) {
        let index = currentNumb.length - 1;
        currentNumb = currentNumb.substring(0, index);
        return currentNumb;
    }

    clearAll() {
        this.history = [];
    }

    history() {
        return this.history;
    }
}