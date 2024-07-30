let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let shouldResetScreen = false;
// Создаем переменные для хранения чисел и оператора.
// firstNumber и secondNumber - числа, которые вводим.
// currentOperator - оператор (+, -, *, /).
// shouldResetScreen - флаг для очистки экрана при вводе нового числа.

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
// display - экран, где отображаются числа.
// buttons - все кнопки на калькуляторе.

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b === 0 ? 'Error' : a / b;
// Функции для выполнения основных арифметических операций.

const operate = (operator, a, b) => {
    a = parseFloat(a);
    b = parseFloat(b);
    // Преобразуем a и b в числа с плавающей точкой (например, 2.5 или 3.14).

    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
};
// Функция operate принимает оператор и два числа, затем вызывает соответствующую функцию
// для выполнения арифметической операции в зависимости от оператора.

const updateDisplay = (content) => {
    display.value = content;
};
// Функция обновления экрана для отображения нового числа.

const handleButtonClick = (e) => {
    const value = e.target.getAttribute('data-value');
    // Получаем значение кнопки, на которую нажали.

    if (!value) return;

    if (e.target.classList.contains('number')) {
        // Если нажата кнопка с числом:
        if (shouldResetScreen) {
            updateDisplay(value);
            shouldResetScreen = false;
        } else {
            updateDisplay(display.value === '0' ? value : display.value + value);
        }
        // Добавляем значение к первому или второму числу.
        if (currentOperator) {
            secondNumber += value;
        } else {
            firstNumber += value;
        }
    } else if (e.target.classList.contains('operator')) {
        // Если нажата кнопка с оператором:
        if (firstNumber && secondNumber) {
            firstNumber = operate(currentOperator, firstNumber, secondNumber);
            updateDisplay(firstNumber);
            secondNumber = '';
        }
        currentOperator = value;
        shouldResetScreen = true;
    } else if (value === '=') {
        // Если нажата кнопка "=":
        if (firstNumber && currentOperator && secondNumber) {
            firstNumber = operate(currentOperator, firstNumber, secondNumber);
            updateDisplay(firstNumber);
            currentOperator = '';
            secondNumber = '';
        }
    } else if (value === 'C') {
        // Если нажата кнопка "C":
        firstNumber = '';
        secondNumber = '';
        currentOperator = '';
        updateDisplay('0');
    }
};
// Обработка нажатий кнопок. В зависимости от типа кнопки (число, оператор, =, C) выполняются соответствующие действия.

buttons.forEach(button => button.addEventListener('click', handleButtonClick));
// Добавляем обработчик событий для каждой кнопки.

console.log (true)