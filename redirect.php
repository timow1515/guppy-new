<?php require_once('../config/config.php');

$notification_id = $_GET['notification_id'];
$category_id = $_GET['category_id'];
$category_id = $_GET['category_id'];
$event_id = $_GET['event_id'];


$update = update('notification', ['notification_id' => $notification_id], ['is_read' => 0]);

if ($update) {
    redirect('events_now', ['event_id' => $event_id, 'category_id' => $category_id]);
}
