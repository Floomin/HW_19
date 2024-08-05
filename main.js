function generateMatrix() {
    //     запросити у користувача довжину масива
    let arrayLength = +document.getElementById('arrayLength').value;
    //     запросити у користувача кутовий елемент квадрата верх праворуч
    let elementTopRight = +document.getElementById('elementTopRight').value;
    //     номер рядка для підрахунку суми
    let arrayRowSum = +document.getElementById('arrayRowSum').value - 1;
    //     номер стовпця для підрахунку суми
    let arrayColumnSum = +document.getElementById('arrayColumnSum').value - 1;

    let array = [];

    // Заповнення масиву випадковими числами
    for (let i = 0; i < arrayLength; i++) {
        array[i] = [];
        for (let j = 0; j < arrayLength; j++) {
            if (i === 0 && j === arrayLength - 1) {
                array[i][j] = elementTopRight;
            } else {
                array[i][j] = Math.floor(Math.random() * 10);
            }
        }
    }

    // Функція генерації таблиці с підсвічуванням
    function generateTable(highlightFunction) {
        let tableHTML = '<table>';
        for (let i = 0; i < arrayLength; i++) {
            tableHTML += '<tr>';
            for (let j = 0; j < arrayLength; j++) {
                let cellClass = highlightFunction(i, j) ? 'highlight' : '';
                tableHTML += `<td class="${cellClass}">${array[i][j]}</td>`;
            }
            tableHTML += '</tr>';
        }
        tableHTML += '</table>';
        return tableHTML;
    }
    // Вивід первинної матриці
    let matrixOutput = '<h2>Matrix</h2>';
    matrixOutput += generateTable(() => false);

    // Підрахунок головної діагоналі та вивід таблці
    let arrayMainSum = 0;
    for (let i = 0; i < arrayLength; i++) {
        arrayMainSum += array[i][i];
    }
    matrixOutput += `<h3>Сума головної діагоналі: ${arrayMainSum}</h3>`;
    matrixOutput += generateTable((i, j) => i === j);

    // Підрахунок побічної діагоналі та вивід таблці
    let arraySideSum = 0;
    for (let i = 0; i < arrayLength; i++) {
        arraySideSum += array[i][arrayLength - 1 - i];
    }
    matrixOutput += `<h3>Сума побочної діагоналі: ${arraySideSum}</h3>`;
    matrixOutput += generateTable((i, j) => i + j === arrayLength - 1);

    // Підрахунок частин матриці
    let arrayMainHalfSumRight = 0;
    let arrayMainHalfSumRightWith = 0;
    let arrayMainHalfSumLeft = 0;
    let arrayMainHalfSumLeftWith = 0;
    let arraySideHalfSumLeft = 0;
    let arraySideHalfSumLeftWith = 0;
    let arraySideHalfSumRight = 0;

    for (let i = 0; i < arrayLength; i++) {
        for (let j = 0; j < arrayLength; j++) {
            if (j > i) arrayMainHalfSumRight += array[i][j];
            if (j > i || i === j) arrayMainHalfSumRightWith += array[i][j];
            if (j < i) arrayMainHalfSumLeft += array[i][j];
            if (j < i || i === j) arrayMainHalfSumLeftWith += array[i][j];
            if ((i + j) < arrayLength - 1) arraySideHalfSumLeft += array[i][j];
            if ((i + j) < arrayLength - 1 || (i + j) === arrayLength - 1) arraySideHalfSumLeftWith += array[i][j];
            if ((i + j) > arrayLength - 1) arraySideHalfSumRight += array[i][j];
        }
    }

    matrixOutput += `<h3>Сума половини матриці без головної діагоналі зверху зправа: ${arrayMainHalfSumRight}</h3>`;
    matrixOutput += generateTable((i, j) => j > i);

    matrixOutput += `<h3>Сума половини матриці з головної діагоналі зверху зправа: ${arrayMainHalfSumRightWith}</h3>`;
    matrixOutput += generateTable((i, j) => j > i || i === j);

    matrixOutput += `<h3>Сума половини матриці без головної діагоналі знизу зліва: ${arrayMainHalfSumLeft}</h3>`;
    matrixOutput += generateTable((i, j) => j < i);

    matrixOutput += `<h3>Сума половини матриці з головної діагоналі знизу зліва: ${arrayMainHalfSumLeftWith}</h3>`;
    matrixOutput += generateTable((i, j) => j < i || i === j);

    matrixOutput += `<h3>Сума половини матриці без побічної діагоналі зверху зліва: ${arraySideHalfSumLeft}</h3>`;
    matrixOutput += generateTable((i, j) => (i + j) < arrayLength - 1);

    matrixOutput += `<h3>Сума половини матриці з побічної діагоналі зверху зліва: ${arraySideHalfSumLeftWith}</h3>`;
    matrixOutput += generateTable((i, j) => (i + j) < arrayLength - 1 || (i + j) === arrayLength - 1);

    matrixOutput += `<h3>Сума половини матриці без побічної діагоналі внизу зправа: ${arraySideHalfSumRight}</h3>`;
    matrixOutput += generateTable((i, j) => (i + j) > arrayLength - 1);
    // Підрахнок суми строки
    let arrayRowSumResult = 0;
    for (let j = 0; j < arrayLength; j++) {
        arrayRowSumResult += array[arrayRowSum][j];
    }
    matrixOutput += `<h3>Сума строки ${arrayRowSum + 1}: ${arrayRowSumResult}</h3>`;
    matrixOutput += generateTable((i, j) => i === arrayRowSum);
    // Підрахунок суми стовпця.
    let arrayColumnSumResult = 0;
    for (let i = 0; i < arrayLength; i++) {
        arrayColumnSumResult += array[i][arrayColumnSum];
    }
    matrixOutput += `<h3>Сума стовпця ${arrayColumnSum + 1}: ${arrayColumnSumResult}</h3>`;
    matrixOutput += generateTable((i, j) => j === arrayColumnSum);

    document.getElementById('matrixOutput').innerHTML = matrixOutput;
}
