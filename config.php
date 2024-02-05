<?php
//include the config.php at the top of your views
require_once 'routes.php';
require_once 'session.php';
require_once 'functions.php';
require_once 'database.php';
require_once 'validate.php';
require_once 'mail.php';
require_once 'text.php';

$starting_date = date('Y-m-d', strtotime('monday this week'));
$end_date = date('Y-m-d', strtotime('+6 days', strtotime('monday this week')));
$next_week_start = strtotime('next monday');
$next_week_end = strtotime('+6 days', $next_week_start);
//one week

if (isset($_GET['start'])) {
    $start = $_GET['start'];
} else {
    $start = date('Y-m-d', $next_week_start);
}

if (isset($_GET['end'])) {
    $end = $_GET['end'];
} else {
    $end  = date('Y-m-d', $next_week_end);
}

//include your new query files here
