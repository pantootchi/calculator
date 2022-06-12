const mainDisplay = document.querySelector('.main-display');
const prevDisplay = document.querySelector('.prev-display');
const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const equalBtn = document.querySelector('[data-equals]');
const clearBtn = document.querySelector('[data-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const allBtns = document.querySelectorAll('.row > div');
const clickAudio = document.getElementById('click-audio');

let currentOp = '';
let previousOp = '';
let operatorMode = undefined;
const ERROR_MSG = "can't divide by 0";

// ALL BUTTONS

allBtns.forEach((btn) => {
    btn.addEventListener('click', onClick)
})

function onClick() {
    clickAudio.currentTime = 0;
    clickAudio.play();

    this.classList.add('selected');
    setTimeout(() => {
        this.classList.remove('selected');
    }, 500);
}

// NUMBER BUTTONS

numberBtns.forEach((number) => {
    number.addEventListener('click', appendNumber);
})

function appendNumber() {
    if (this.textContent == '.') {
        if(currentOp.includes('.')) return;
    };

    if (mainDisplay.textContent.length < 15) {
        mainDisplay.textContent += this.textContent;
        currentOp = mainDisplay.textContent;
    };
};

// OPERATE BUTTONS

operatorBtns.forEach((operator) => {
    operator.addEventListener('click', operate)
})

function operate() {
    if (currentOp == ERROR_MSG || (!currentOp && !previousOp)) return;

    if (currentOp) {
        evalOperands();
        if (currentOp == ERROR_MSG) return;
        previousOp = currentOp;
        currentOp = mainDisplay.textContent = '';
    } 

    prevDisplay.textContent = `${previousOp} ${this.textContent}`;
    operatorMode = this.textContent;
}

// EQUAL BUTTON

equalBtn.addEventListener('click', evalOperands);

function evalOperands() {
    if(previousOp && currentOp) {
        let answer = 0;

        switch (operatorMode) {
            case '×':
                answer = previousOp * currentOp;
                break;
            case '+':
                answer = +previousOp + +currentOp;
                break;
            case '-':
                answer = previousOp - currentOp;
                break;
            case '÷':
                answer = (currentOp == 0) ? ERROR_MSG : previousOp / currentOp;
                break;
        }
        clearScreen();

        if (answer != ERROR_MSG) {
            answer = answer.toString().substring(0,15);
        }

        currentOp = mainDisplay.textContent = answer;
    }
}

// DELETE BUTTON

deleteBtn.addEventListener('click', deleteNumber);

function deleteNumber() {
    if (currentOp == ERROR_MSG) return;

    if(mainDisplay.textContent) {
        newStr = mainDisplay.textContent.slice(0, - 1);
        currentOp = mainDisplay.textContent = newStr;
    } else {
        clearScreen();
    }
}

// CLEAR BUTTON

clearBtn.addEventListener('click', clearScreen);

function clearScreen() {
    currentOp = mainDisplay.textContent = '';
    previousOp = prevDisplay.textContent = '';
    operatorMode = undefined;
}