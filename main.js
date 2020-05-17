const main = () => {  
  let level = 0;
  let score = 0;
  let side = allLevels[level].side;
  let colors = allLevels[level].colors; //Получаем настройки уровня
  let colorSelected = allColors[getRandomInt(1, colors) - 1]; //Сгенирировали изначальный выбранный цвет
  
  let gameItems = createGameField(side, colors, allColors); //Создали поле
  let stepsCount = getStepsCount(gameItems); //Получили кол-во ходов

  paintGameField(gameItems); //Нарисовали поле

  paintColorSelection(allColors, colors); //Русием панель для выбора цвета
  changeColorSelected(colorSelected); //Отмечаем выбранный цвет

  document.getElementById('htmlLevelNumber').innerHTML = level + 1; //Вывели в span номер уровня
  document.getElementById('htmlStepsCount').innerHTML = stepsCount; //Вывели в span кол-во ходов
  document.getElementById('htmlScoresCount').innerHTML = score; //Вывели в span кол-во очков

  let timeStart = new Date(); //Время старта уровня
  let levelTimerId = setInterval(levelTimer, 1000, timeStart);

  document.getElementById('gameField').addEventListener('click', event => { //Словили клик по игровому полю
    const target = event.target;
    if (target.getAttribute('class')) { //Если есть класс
      const row = target.getAttribute('position').split('|')[0]; //Строка элемента по которому был клик
      const column = target.getAttribute('position').split('|')[1]; //Столбец элемента по которому был клик
      const color = target.getAttribute('class').split(' ')[1]; //Цвет элемента по которому был клик
      const tryStep = step(gameItems, row, column, color, colorSelected); //Делаем шаг
      if (tryStep) {
        //gameItems = tryStep;
        stepsCount--;
        document.getElementById('htmlStepsCount').innerHTML = stepsCount; //Вывели в span кол-во ходов
        score += (level + 1) * tryStep.countReplace; //Пересчитали кол-во очков
        document.getElementById('htmlScoresCount').innerHTML = score; //Вывели кол-во очков
        paintGameField(tryStep.items); //Нарисовали поле
      }
    }
  }); //Клик по игровому полю

  document.getElementById('colorSelection').addEventListener('click', event => { //Словили клик по элементу переключения цвета
    const target = event.target;
    if (target.getAttribute('class')) { //Если это переключатель
      colorSelected = target.getAttribute('class').split(' ')[1];
      changeColorSelected(colorSelected); //Передаем элемент по которому нажали
    }
  }); //Клик по полю с выбором цвета

  document.getElementById('noAnimationCheckbox').addEventListener('change', event => { //Клик по чекбоксу переключения анимаций
    const paintedGameItems = document.getElementsByClassName('gameItem'); //Получили нарисованные элементы
    const colorSelectors = document.getElementsByClassName('colorSelector'); //Получили элементы выбора цвета
    if (event.target.checked) { //Если активировали
      for (let i = 0; i < paintedGameItems.length; i++) { //Добавили всем элементам игрового поля класс
        paintedGameItems[i].setAttribute('class', paintedGameItems[i].getAttribute('class') + ' itemNoAnimation');
      }
      for (let i =0; i< colorSelectors.length; i++) { //Добавили элементам выбора цвета класс без анимации
        colorSelectors[i].setAttribute('class', colorSelectors[i].getAttribute('class') + ' itemNoAnimation');
      }
    }

    else { //Если сняли галочку
      for (let i = 0; i < paintedGameItems.length; i++) { //Убрали у всех элементов класс
        paintedGameItems[i].setAttribute('class', paintedGameItems[i].getAttribute('class').split(' ')[0] + ' ' + paintedGameItems[i].getAttribute('class').split(' ')[1]);
      }
      for (let i = 0; i < colorSelectors.length; i++) { //Убираем класс "без анимации" у элементов выбора цвета
        const colorSelectorsClass = colorSelectors[i].getAttribute('class').split(' '); //Получили все классы элемента
        let attribute = ''; //Классы которые будем добавлять элементу
        for (j = 0; j < colorSelectorsClass.length; j++) { //Проходим по всем классам
          if (colorSelectorsClass[j] != 'itemNoAnimation') { //Если это не класс, который убирает анимацию
            attribute += ' ' + colorSelectorsClass[j]; //Добавляем этот класс
          }
        }
        attribute = attribute.substr(1);
        colorSelectors[i].setAttribute('class', attribute); //Добавили классы элементу
      }
    }
  });
}



const createGameField = (sideCount, colorsCount, allColors) => { //Создаем игровое поле
  if (colorsCount > allColors.length) { //Если передано больше цветов, чем есть
    colorsCount = allColors.length; //Ставим максимальное количество
  }

  let items = []; //Создали массив всех элементов

  for (let i = 0; i < sideCount; i++) { //Генирируем строку
    items[i] = []; //Создали строку массива

    for (let j = 0; j < sideCount; j++) { //столбец
      let color = allColors[getRandomInt(0, colorsCount - 1)]; //Срандомили цвет
      items[i][j] = color; //Элемент [строка] [столбец] = цвет
    }
  }

  return items; //Возвращаем двумерный массив игрового поля
}



const paintGameField = items => { //Функция для рисования поля
  //let hr = document.createElement("hr"); //Создаем hr
  document.getElementById('gameField').innerHTML = ''; //Очищаем поле
  for (let i = 0; i < items.length; i++) { //Выводим квадрат элементов //строки

    for (let j = 0; j < items.length; j++) { //Столбы
      let itemConfigs = { //Аттрибуты для дивов
        class: 'gameItem ' + items[i][j],
        position: i + '|' + j,
      };
      if (document.getElementById('noAnimationCheckbox').checked) { //Если режим без анимаций
        itemConfigs.class += ' itemNoAnimation'; //Добавили класс без анимации 
      }
      let div = document.createElement("div"); //Создаем div
      for (attribute in itemConfigs) { //Идем по всем аттрибутам
        div.setAttribute(attribute, itemConfigs[attribute]); //Просвоили аттрибут
      }

      document.getElementById('gameField').appendChild(div); //Добавили div в html
    }
    div = document.createElement("div"); //Обнуляем div
    div.setAttribute('class', 'flexToNewString'); //Просвоили аттрибут
    document.getElementById('gameField').appendChild(div); //Добавили div в html
  }
  //document.getElementById('gameField').appendChild(hr); //Добавили hr в html
}


const paintColorSelection = (colors, count) => { //Рисуем панель выбора цвета
  let div = document.createElement("div"); //Создаем div
  for (let i = 0; i < count; i++) {
    if (document.getElementById('noAnimationCheckbox').checked) { //Если режим без анимации
      div.setAttribute('class', 'colorSelector ' + colors[i] + ' itemNoAnimation'); //Просвоили классы
    }
    else {
      div.setAttribute('class', 'colorSelector ' + colors[i]); //Просвоили классы
    }
    document.getElementById('colorSelection').appendChild(div); //Добавили div в html
    div = document.createElement("div"); //Обнуляем div
  }
}


const getStepsCount = items => {
  /*Временное (или нет) решение для подсчета кол-ва ходов
  Закрашиваем все поле в тот цвет, ячеек которого больше всего
  Находим другой цвет и закрашиваем в наш
  Пока не закрасим все поле, кол-во итераций будет кол-вом шагов (возможно +1)*/

  let newItems = items.slice(); //Копируем массив, чтобы не сохранились изменения
  const count = items.length; //Кол-во ячеек
  let colorsCount = {}; //Объект цвет = его кол-во
  for (let i = 0; i < count; i++) { //Идем по всему массиву
    newItems[i] = items[i].slice(); //Копируем элементы массива
    for (let j = 0; j < count; j++) {
      if (colorsCount.hasOwnProperty(items[i][j])) { //Если уже был такой цвет, увеличиваем его кол-во
        colorsCount[items[i][j]]++;
      }
      else { //Иначе, создаем
        colorsCount[items[i][j]] = 1;
      }
    }
  }
  const mainColor = Object.keys(colorsCount).reduce((result, item) => colorsCount[item] > colorsCount[result] ? item : result); //Цвет которого больше всего
  let stepsCount = 0;
  for (let i = 0; i < count; i++) { //Идем по всем ячейкам
    for (let j = 0; j < count; j++) {
      if (newItems[i][j] != mainColor) { //Если ячейка не основного цвета, заменяем и считаем шаги
        newItems = step(newItems, i, j, newItems[i][j], mainColor).items;
        stepsCount++;
      }
    }
  }
  delete newItems; //Очищаем
  return stepsCount;
}



const step = (items, row, column, colorOriginal, color, stack = [], countReplace = 0) => {
  /*
  Идем от стартовой ячейки во все стороны заменяя все возможные ячейки. 
  Все замененные ячейки сохраняем в массив.
  Достаем последний элемент массива и кидаем в эту функцию в качестве главного элемента, из массива удаляем 
  Продолжаем пока массив не будет пуст
  Записываем кол-во заемененных клеток
  */

  row = parseInt(row, 10);
  column = parseInt(column, 10); //Минус баг о_0

  if (color == colorOriginal) { //Если заменяем цвет на такой же, возвращаем undefined
    return undefined;
  }

  items[row][column] = color;
  let check = true;
  let i = 0;

  while (check) { //Идем "вверх"
    i++;
    if ((row - i + 1 > 0) && (items[row - i][column] === colorOriginal)) { //Если не верхняя ячейка и нужный цвет        
      items[row - i][column] = color; //Заменяем цвет
      countReplace++; //Увеличиваем количество замененных полей
      stack.push({'column': column, 'row': row - i}); //Добавляем ячейку в стек для дальнейшних проверок
    }
    else { //Иначе выходим с цикла
      check = false;
      i = 0;
    }
  }

  while (!check) { //Идем "вниз"
    i++;
    if ((row + i < items.length) && (items[i + row][column] === colorOriginal)) { //Если есть ячейки ниже //Если ее цвет как у заменяемой
      items[row + i][column] = color; //Заменяем цвет
      countReplace++; //Увеличиваем количество замененных полей
      stack.push({'column': column, 'row': row + i}); //Добавляем ячейку в стек для дальнейшних проверок
    }
    else { //Иначе выходим с цикла
      check = true;
      i = 0;
    }
  }

  while (check) { //Идем "влево"
    i++;
    if ((column - i + 1 > 0) && (items[row][column - i] === colorOriginal)) { //Если не левая ячейка и нужный цвет
      items[row][column - i] = color; //Заменяем цвет
      countReplace++; //Увеличиваем количество замененных полей
      stack.push({'column': column - i, 'row': row}); //Добавляем ячейку в стек для дальнейшних проверок
    }
    else { //Иначе выходим с цикла
      check = false;
      i = 0;
    }
  }

  while (!check) { //Идем "вправо"
    i++;
    if ((column + i < items.length) && (items[row][column + i] === colorOriginal)) { //Если есть ячейки справа
       //Нужного цвета
      items[row][column + i] = color; //Заменяем цвет
      countReplace++; //Увеличиваем количество замененных полей
      stack.push({'column': column + i, 'row': row}); //Добавляем ячейку в стек для дальнейшних проверок
    }
    else { //Иначе выходим с цикла
      check = true;
      i = 0;
    }
  }

  if (stack.length != 0) { //Если массив не пустой
    const temp = stack.pop(); //Берем последний элемент
    return step(items, temp.row, temp.column, colorOriginal, color, stack, countReplace); //Заменяем от "последнего" элемента
  }

  else {
    //score += countReplace * level; //Добавили очки
    //document.getElementById("htmlScoresCount").innerHTML = score; //Перезаписали кол-во очков
    const stepResult = { //Возвращаем объект с новым полем и кол-вом замен за этот ход
      'items': items,
      'countReplace': countReplace
    };
    return stepResult; //Когда стек пуст, возвращаем новый массив
  }
}



const changeColorSelected = item => {
  const colorSelected = document.getElementsByClassName("colorSelected"); //Получили выбранный цвет
  if (colorSelected.length > 0) { //Если такой есть
    colorSelected[0].setAttribute('class', colorSelected[0].getAttribute('class').replace('colorSelected', '')); //Убрали старый выбранный цвет
  }
  let attribute = 'colorSelector ' + item + ' colorSelected';
  if (document.getElementById('noAnimationCheckbox').checked) { //Если режим без анимации
    attribute = 'colorSelector ' + item + ' itemNoAnimation colorSelected';
  }
  document.getElementsByClassName("colorSelector " + item)[0].setAttribute('class', attribute); //Пометили цвет выбранным
}



const levelTimer = timeStart => { //Функция для подсчета и вывода времени нахождения на уровне
  const diffDate = Math.floor((new Date() - timeStart) / 1000); //Получили разницу времени сейчас и от старта уровня в секундках
  let minutes = 0;
  let seconds = 0; //Кол-во минут и секунд которые прошли
  minutes = Math.floor(diffDate / 60); //Получаем кол-во минут, беря целую чать от деления секунды/60
  seconds = diffDate % 60; //Остаток от деления - секунды
  document.getElementById('htmlLevelTimer').innerHTML = minutes + ':' + seconds; //Вывели таймер на странциу
}



const getRandomInt = (min, max) => { //Рандом целого числа от до
  min = Math.ceil(min);
  max = Math.floor(max) + 1;
  return Math.floor(Math.random() * (max - min)) + min;
}



const getGET = () => { //Возвращает GET переменные
  let strGET = window.location.search.replace( '?', ''); //Получили данные с адресной строки, убрали ?
  let GET = []; //Создали пустой массив
  
  if (strGET != '') { //Если есть данные в адресной строке
    strGET = strGET.split('&'); //Разделили на подстроки var=val
    for (let i = 0; i < strGET.length; i++) {
      GET[strGET[i].split('=')[0]] = strGET[i].split('=')[1]; //Получили GET переменные
    }
  }

  return GET;
}



document.addEventListener("DOMContentLoaded", main); //Загрузился DOM, запускаем main