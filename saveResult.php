<?php
$query = json_decode(file_get_contents('php://input'), true); //Получили данные с формы
if (isset($query['captcha'])) { //Проверили передана ли капча
  $result = [
    'ok' => false
  ];
  $secretGoogleCaptachaKey = '6LeMMbcZAAAAAFg4FSULNsbSxpuSLnyu5eo9RCzF'; //Секретный ключ от капчи
  $url = "https://www.google.com/recaptcha/api/siteverify?secret={$secretGoogleCaptachaKey}&response={$query['captcha']}&remoteip={$_SERVER['REMOTE_ADDR']}";
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  $response = curl_exec($ch); //Запрос гуглу
  curl_close($ch);
  $response = json_decode($response, true);
  if ($response['success']) { //Капча пройдена
    $result['ok'] = true;
    include 'db.php';
    $query['name'] = mysqli_real_escape_string($mysqli, $query['name']);
    $query['score'] = mysqli_real_escape_string($mysqli, $query['score']);
    $mysqli->query("INSERT INTO `rating`(`name`, `score`) VALUES ('{$query['name']}', '{$query['score']}')");
  }
  echo json_encode($result);
}
