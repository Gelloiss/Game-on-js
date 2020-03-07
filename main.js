document.addEventListener("DOMContentLoaded", main); //Загрузился DOM, запускаем main

function main() {
  let strGET = window.location.search.replace( '?', ''); //Получили данные с GET
  let side = 3;
  let colors = 3;

  if (strGET != '') { //Если не пустая строка
    strGET = strGET.split('&'); //Разделили на подстроки var=val
    let GET = []; //Создали пустой массив
    for (let i = 0; i < strGET.length; i++) {
      GET[strGET[i].split('=')[0]] = strGET[i].split('=')[1]; //Получили GET переменные
    }

    if (GET['side'] !== undefined && GET['colors'] !== undefined) { //Если есть нужные переменные
      side = GET['side'];
      colors = GET['colors'];
    }
  }

  createGameField(side, colors);
}



function createGameField(sideCount, colorsCount) { //Создаем игровое поле
  const allColors = ['itemRed', 'itemBlue', 'itemGreen', 'itemYellow', 'itemBlack']; //Все цвета

  if (colorsCount > allColors.length) { //Если передано больше цветов, чем есть
    colorsCount = allColors.length; //Ставим максимальное количество
  }

  let items = []; //Создали массив всех элементов

  for (let i = 0; i < sideCount; i++) { //Выводим квадрат элементов //строки
    items[i] = []; //Создали строку массива

    for (let j = 0; j < sideCount; j++) { //Столбы
      let color = allColors[getRandomInt(0, colorsCount - 1)]; //Срандомили цвет
      let itemConfigs = {
        class: 'gameItem ' + color,
        position: i + '|' + j,
      };
      items[i][j] = color; //Элемент строка, столб = цвет
      let div = document.createElement("div"); //Создаем div

      for (attribute in itemConfigs) { //Идем по всем аттрибутам
        div.setAttribute(attribute, itemConfigs[attribute]); //Просвоили аттрибут
      }

      document.getElementById('gameField').appendChild(div); //Добавили div в html
    }

    let div = document.createElement("div"); //Создаем div для переноса элементов на новую строку
    div.setAttribute('class', 'flexToNewString'); //Просвоили аттрибут
    document.getElementById('gameField').appendChild(div); //Добавили div в html
  }

  return items; //Возвращаем двумерный массив игрового поля

}



function getRandomInt(min, max) { //Рандом целого числа от до
  min = Math.ceil(min);
  max = Math.floor(max) + 1;
  return Math.floor(Math.random() * (max - min)) + min;
}