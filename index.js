document.addEventListener('DOMContentLoaded', function() {
    const displayExpression = document.getElementById('expression');
    const displayResult = document.getElementById('result');
    const buttons = Array.from(document.getElementsByClassName('btn'));

    let currentInput = '';
    let expression = '';
    let memory = 0;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const btnValue = button.innerText;

            switch (btnValue) {
                case 'C':
                    currentInput = '';
                    expression = '';
                    displayExpression.innerText = '';
                    displayResult.innerText = '';
                    break;
                case '←':
                    currentInput = currentInput.slice(0, -1);
                    displayResult.innerText = currentInput;
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                case '^':
                    if (currentInput !== '') {
                        expression += currentInput + ' ' + btnValue + ' ';
                        currentInput = '';
                        displayExpression.innerText = expression;
                    }
                    break;
                case '%':
                    if (currentInput !== '') {
                        currentInput = (parseFloat(currentInput) / 100).toString();
                        displayResult.innerText = currentInput;
                    }
                    break;
                case '√':
                    if (currentInput !== '') {
                        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
                        displayResult.innerText = currentInput;
                    }
                    break;
                case '=':
                    if (currentInput !== '') {
                        expression += currentInput;
                        try {
                            const result = eval(expression.replace('^', '**'));
                            displayResult.innerText = result;
                            expression = '';
                            currentInput = result.toString();
                        } catch {
                            displayResult.innerText = 'Error';
                            expression = '';
                            currentInput = '';
                        }
                    }
                    break;
                case '.':
                    if (!currentInput.includes('.')) {
                        currentInput += '.';
                        displayResult.innerText = currentInput;
                    }
                    break;
                case 'MC':
                    memory = 0;
                    break;
                case 'MR':
                    currentInput = memory.toString();
                    displayResult.innerText = currentInput;
                    break;
                case 'M+':
                    if (currentInput !== '') {
                        memory += parseFloat(currentInput);
                        currentInput = '';
                        displayResult.innerText = '';
                    }
                    break;
                case 'M-':
                    if (currentInput !== '') {
                        memory -= parseFloat(currentInput);
                        currentInput = '';
                        displayResult.innerText = '';
                    }
                    break;
                default:
                    currentInput += btnValue;
                    displayResult.innerText = currentInput;
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;

        if (!isNaN(key) || key === '.') {
            currentInput += key;
            displayResult.innerText = currentInput;
        } else if (['+', '-', '*', '/', '^'].includes(key)) {
            if (currentInput !== '') {
                expression += currentInput + ' ' + key + ' ';
                currentInput = '';
                displayExpression.innerText = expression;
            }
        } else if (key === 'Enter') {
            if (currentInput !== '') {
                expression += currentInput;
                try {
                    const result = eval(expression.replace('^', '**'));
                    displayResult.innerText = result;
                    expression = '';
                    currentInput = result.toString();
                } catch {
                    displayResult.innerText = 'Error';
                    expression = '';
                    currentInput = '';
                }
            }
        } else if (key === 'Backspace') {
            currentInput = currentInput.slice(0, -1);
            displayResult.innerText = currentInput;
        } else if (key === 'Escape') {
            currentInput = '';
            expression = '';
            displayExpression.innerText = '';
            displayResult.innerText = '';
        }
    });
});

