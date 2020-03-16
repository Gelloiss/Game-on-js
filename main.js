const main = () => {
  let side = 3;
  let colors = 3;
  let GET = getGET(); //Получили GET переменные

  if (GET['side'] && GET['colors']) { //Если есть нужные переменные
    side = GET['side'];
    colors = GET['colors'];
  }

  let gameItems = createGameField(side, colors); //Создали поле
  paintGameField(gameItems); //Нарисовали поле

  getStepsCount(gameItems);
}



const createGameField = (sideCount, colorsCount) => { //Создаем игровое поле
  const allColors = ['itemRed', 'itemBlue', 'itemGreen', 'itemYellow', 'itemBlack']; //Все цвета

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
  let hr = document.createElement("hr"); //Создаем hr
  for (let i = 0; i < items.length; i++) { //Выводим квадрат элементов //строки

    for (let j = 0; j < items.length; j++) { //Столбы
      let itemConfigs = {
        class: 'gameItem ' + items[i][j],
        position: i + '|' + j,
      };
      let div = document.createElement("div"); //Создаем div

      for (attribute in itemConfigs) { //Идем по всем аттрибутам
        div.setAttribute(attribute, itemConfigs[attribute]); //Просвоили аттрибут
      }

      document.getElementById('gameField').appendChild(div); //Добавили div в html
    }

    div = document.createElement("div"); //Создаем div для переноса элементов на новую строку
    div.setAttribute('class', 'flexToNewString'); //Просвоили аттрибут
    document.getElementById('gameField').appendChild(div); //Добавили div в html
  }
  document.getElementById('gameField').appendChild(hr); //Добавили hr в html
}


const getStepsCount = items => {
  /*Временное (или нет) решение для подсчета кол-ва ходов
  Закрашиваем все поле в тот цвет, ячеек которого больше всего
  Находим другой цвет и закрашиваем в наш
  Пока не закрасим все поле, кол-во итераций будет кол-вом шагов (возможно +1)*/

  const count = items.length; //Кол-во ячеек
  console.log('count = ' + count);
  let colorsCount = {}; //Объект цвет = его кол-во
  for (let i = 0; i < count; i++) { //Идем по всему массиву
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
  console.log(mainColor);
  let stepsCount = 0;
  for (let i = 0; i < count; i++) { //Идем по всем ячейкам
    for (let j = 0; j < count; j++) {
      if (items[i][j] != mainColor) { //Если ячейка не основного цвета, заменяем и счиатем шаги
        items = step(items, i, j, items[i][j], mainColor);
        stepsCount++;
        paintGameField(items);
      }
    }
  }

  console.log(stepsCount);
}



const step = (items, row, column, colorOriginal, color, stack = []) => {
  /*
  Идем от стартовой ячейки во все стороны заменяя все возможные ячейки. 
  Все замененные ячейки сохраняем в массив.
  Достаем последний элемент массива и кидаем в эту функцию в качестве главного элемента, из массива удаляем 
  Продолжаем пока массив не будет пуст
  */

  if (color == colorOriginal) { //Если заменяем цвет на такой же, возвращаем 0
    return 0;
  }

  items[row][column] = color;
  let check = true;
  let i = 0;

  while (check) { //Идем "вверх"
    i++;
    if (row - i + 1 > 0 && items[row - i][column] == colorOriginal) { //Если не верхняя ячейка и нужный цвет        
      items[row - i][column] = color; //Заменяем цвет
      stack.push({'column': column, 'row': row - i}); //Добавляем ячейку в стек для дальнейшних проверок
    }
    else { //Иначе выходим с цикла
      check = false;
      i = 0;
    }
  }

  while (!check) { //Идем "вниз"
    i++;
    if (row + i < items.length && items[row + i][column] == colorOriginal) { //Если есть ячейки ниже //Если ее цвет как у заменяемой
      items[row + i][column] = color; //Заменяем цвет
      stack.push({'column': column, 'row': row + i}); //Добавляем ячейку в стек для дальнейшних проверок
    }
    else { //Иначе выходим с цикла
      check = true;
      i = 0;
    }
  }

  while (check) { //Идем "влево"
    i++;
    if (column - i + 1 > 0 && items[row][column - i] == colorOriginal) { //Если не левая ячейка и нужный цвет
      items[row][column - i] = color; //Заменяем цвет
      stack.push({'column': column - i, 'row': row}); //Добавляем ячейку в стек для дальнейшних проверок
    }
    else { //Иначе выходим с цикла
      check = false;
      i = 0;
    }
  }

  while (!check) { //Идем "вправо"
    i++;
    if (column + i < items.length && items[row][column + i] == colorOriginal) { //Если есть ячейки справа
       //Нужного цвета
      items[row][column + i] = color; //Заменяем цвет
      stack.push({'column': column + i, 'row': row}); //Добавляем ячейку в стек для дальнейшних проверок
    }
    else { //Иначе выходим с цикла
      check = true;
      i = 0;
    }
  }

  if (stack.length > 0) { //Если массив не пустой
    const temp = stack.pop(); //Берем последний элемент
    return step(items, temp.row, temp.column, colorOriginal, color, stack); //Заменяем от "последнего" элемента
  }

  else {
    return items; //Когда стек пуст, возвращаем новый массив
  }
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