<?php
require_once('../config/config.php');

$count = countResult('notification', ['user_id' => $_SESSION['user_id'], 'is_read' => 1]);

echo $count;
