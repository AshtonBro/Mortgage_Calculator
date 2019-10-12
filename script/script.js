'use strict';
const inputsOfCals = document.querySelectorAll('input'),
    button = document.querySelector('button'),
    form = document.querySelector('.calculator__form');

const mortgageCalc = () => {
    let reuslt = 0,
        creditAmount = 0,
        procentI = 0,
        creditPeriod = 0,
        total = {};

    let statusMsg = document.createElement('div');
    statusMsg.style.cssText = 'font-size: 2rem';
    
    const calcSum = (amount, i, period, coef) => {
        i = (i / 12) / 100;
        period = period * 12;
        coef = (i * Math.pow(1 + i, period)) / (Math.pow(1 + i, period) - 1);
        return Math.ceil(amount * coef);
    };

    inputsOfCals.forEach((item) => {
        item.addEventListener('input', () => {
            creditAmount = inputsOfCals[0].value;
            procentI = inputsOfCals[1].value;
            creditPeriod = inputsOfCals[2].value;
            reuslt = calcSum(creditAmount, procentI, creditPeriod);
        });
        item = item.value.replace(/[^0-9+]/, '');
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.appendChild(statusMsg);
        statusMsg.textContent = 'Расчёт...';

        total["Сумма кредита"] = creditAmount + ' руб.';
        total["Процентная ставка"] = inputsOfCals[1].value + '%';
        total["Срок кредита"] = inputsOfCals[2].value + ' лет';
        total["Сумма платежа"] = reuslt + ' руб.';

        // const formData = new FormData(form);
        // formData.forEach((val, key) => {
        //     total[key] = val;
        // });

        postData(total)
            .then((response) => {
                if (response.status !== 201) {
                    throw new Error('Status network is not 200');
                }
                statusMsg.textContent = `Ваш ежемесячный платёж составит ${reuslt} руб.`;
            })
            .catch((error) => {
                console.log(error);
                statusMsg.textContent = 'Что-то пошло не так...';
            });
    });
    
    const postData = (body) => {
        return fetch('http://localhost:5000/api/posts', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };
};

mortgageCalc();