let display = document.getElementById('display');
let currentNumber = '0';
let previousNumber = '';
let operation = null;
let waitingForNewNumber = false;

// Update Display Function
function updateDisplay() {
    display.textContent = currentNumber;
    
    // Add scale animation effect
    display.style.transform = 'scale(1.05)';
    setTimeout(() => {
        display.style.transform = 'scale(1)';
    }, 100);
}

// Input Number Function
function inputNumber(num) {
    if (waitingForNewNumber) {
        currentNumber = num;
        waitingForNewNumber = false;
    } else {
        currentNumber = currentNumber === '0' ? num : currentNumber + num;
    }
    updateDisplay();
}

// Input Decimal Function
function inputDecimal() {
    if (waitingForNewNumber) {
        currentNumber = '0.';
        waitingForNewNumber = false;
    } else if (currentNumber.indexOf('.') === -1) {
        currentNumber += '.';
    }
    updateDisplay();
}

// Input Operator Function
function inputOperator(nextOperation) {
    const inputValue = parseFloat(currentNumber);

    if (previousNumber === '') {
        previousNumber = inputValue;
    } else if (operation) {
        const result = performCalculation();
        currentNumber = String(result);
        previousNumber = result;
        updateDisplay();
    }

    waitingForNewNumber = true;
    operation = nextOperation;
}

// Perform Calculation Function
function performCalculation() {
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    if (isNaN(prev) || isNaN(current)) return 0;

    switch (operation) {
        case '+':
            return prev + current;
        case '-':
            return prev - current;
        case '*':
            return prev * current;
        case '/':
            return current !== 0 ? prev / current : 0;
        default:
            return current;
    }
}

// Calculate Function
function calculate() {
    if (operation && previousNumber !== '' && !waitingForNewNumber) {
        const result = performCalculation();
        currentNumber = String(result);
        previousNumber = '';
        operation = null;
        waitingForNewNumber = true;
        updateDisplay();
        
        // Add success animation
        display.style.background = '#27ae60';
        setTimeout(() => {
            display.style.background = '#2c3e50';
        }, 300);
    }
}

// Clear All Function
function clearAll() {
    currentNumber = '0';
    previousNumber = '';
    operation = null;
    waitingForNewNumber = false;
    updateDisplay();
    
    // Add clear animation
    display.style.background = '#e74c3c';
    setTimeout(() => {
        display.style.background = '#2c3e50';
    }, 200);
}

// Clear Entry Function
function clearEntry() {
    currentNumber = '0';
    updateDisplay();
}

// Keyboard Support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        inputNumber(key);
    } else if (key === '.') {
        inputDecimal();
    } else if (key === '+' || key === '-') {
        inputOperator(key);
    } else if (key === '*') {
        inputOperator('*');
    } else if (key === '/') {
        event.preventDefault();
        inputOperator('/');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clearAll();
    } else if (key === 'Backspace') {
        if (currentNumber.length > 1) {
            currentNumber = currentNumber.slice(0, -1);
        } else {
            currentNumber = '0';
        }
        updateDisplay();
    }
});

// Add button click animations
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

// Add loading animation
window.addEventListener('load', function() {
    const calculator = document.querySelector('.calculator');
    calculator.style.animation = 'none';
    calculator.offsetHeight; // Trigger reflow
    calculator.style.animation = 'zoomIn 0.8s ease-out';
});

// Console message for developers
console.log('🚀 Simple Calculator Loaded Successfully!');
console.log('📝 Created for LinkedIn Video Project');
console.log('🏷️ Tag @InternPe');
console.log('💡 Features: HTML, CSS, JavaScript');