<?php
$mysqli = new mysqli("db_host", "db_user", "db_password", "db_baseName");
$mysqli->set_charset("utf8");

/*
 * Rename 'db-dist.php' to 'db.php'
 * Execute SQL in your base:
 *
 * CREATE TABLE `rating` ( `id` INT NOT NULL AUTO_INCREMENT , `name` TEXT NOT NULL , `score` INT NOT NULL , PRIMARY KEY (`id`)) ENGINE = MyISAM CHARSET=utf8 COLLATE utf8_bin;
 *
 *
 * */