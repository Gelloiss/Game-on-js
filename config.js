const allColors = [
'itemRed',
'itemBlue',
'itemGreen',
'itemYellow',
'itemPurple',
'itemOrange',
'itemLime',
'itemBrown',
'itemTransparent'
]; //Все цвета

const allLevels = [
  {
    'side': 5,
    'colors': 3,
  },
  {
    'side': 6,
    'colors': 4,
  },
  {
    'side': 7,
    'colors': 4,
  },
  {
    'side': 7,
    'colors': 5,
  },
  {
    'side': 8,
    'colors': 5,
  },
  {
    'side': 9,
    'colors': 5,
  },
  {
    'side': 9,
    'colors': 6,
  },
  {
    'side': 10,
    'colors': 7,
  },
  {
    'side': 11,
    'colors': 7,
  },
  {
    'side': 12,
    'colors': 8,
  },
  {
    'side': 12,
    'colors': 9,
  },
]; //Все уровни


const audioEffects = {
  winLevel: new Audio('sound/WinBattle.mp3'),
  loseLevel: new Audio('sound/LoseCombat.mp3')
}; //Загружаем аудио в фоне


var onloadCallback = function() {
  grecaptcha.render('google_captcha', {
    'sitekey' : '6LeMMbcZAAAAAIgppEqZO0GVVB6PRs7g4TxHfMgX'
  });
}; //Google captacha