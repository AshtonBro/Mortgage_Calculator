'use strict';
const inputsOfCals = document.querySelectorAll('input'),
    button = document.querySelector('button'),
    form = document.querySelector('.calculator__form');
let statusMsg = '';
statusMsg = document.createElement('div');
statusMsg.style.cssText = 'font-size: 2rem';

const mortgageCalc = () => {
    let reuslt = 0,
        creditAmount = 0,
        procentI = 0,
        creditPeriod = 0,
        total = {};

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
        statusMsg.textContent = `Ваш ежемесячный платёж составит ${reuslt} руб.`;

        total["Сумма кредита"] = creditAmount + ' руб.';
        total["Процентная ставка"] = inputsOfCals[1].value + '%';
        total["Срок кредита"] = inputsOfCals[2].value + ' лет';
        total["Сумма платежа"] = reuslt + ' руб.';

        const formData = new FormData(form);
        formData.forEach((val, key) => {
            total[key] = val;
        });

        postData(total)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Status network is not 200');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    });

    const postData = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };
};

mortgageCalc();