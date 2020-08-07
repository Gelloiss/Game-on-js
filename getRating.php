<?php
$count = 10;
$result = [];
include 'db.php';
$rating = $mysqli->query("SELECT `name`, `score` FROM `rating` ORDER BY `score` DESC LIMIT {$count}");
while ($row = $rating->fetch_assoc()) {
  $result[] = [
    'name' => $row['name'],
    'score' => $row['score']
  ];
}

if (count($result) < $count) {
  $countResult = count($result);
  for ($i = 0; $i < $count - $countResult; $i++) {
    array_push($result, ['name' => getName(mt_rand(4, 10)), 'score' => mt_rand(4, 9) * -$i]);
  }
}

echo json_encode($result);

function getName($length = 4) { //Получаем символьный hash указанной длинны
  $name = '';
  for ($i = 0; $i < $length; $i++) {
    switch (mt_rand(1, 3)) { //Рандомим из какого диапазона символов будет выбран символ
      case 1:
        $name .= chr(mt_rand(65, 90)); //большие англ буквы
        break;

      case 2:
        $name .= chr(mt_rand(48, 57)); //цифры
        break;

      case 3:
        $name .= chr(mt_rand(97, 122)); //Маленькие англ буквы
        break;
    }
  }

  return $name;
}