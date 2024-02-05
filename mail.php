<?php
// Include the PHPMailer class
require_once '../vendor/autoload.php';

// Create a new PHPMailer object
$mail = new PHPMailer\PHPMailer\PHPMailer();

$mail->IsSMTP();
$mail->Mailer = "smtp";
$mail->SMTPDebug = 0;
$mail->SMTPAuth = true;
$mail->SMTPSecure = 'tls';
$mail->Port = 587;
$mail->Host = "smtp.gmail.com";
$mail->Username = 'alexandernovo84@gmail.com';
$mail->Password = 'ppifmucigtpvftsn';

// Set the sender and recipient email addresses
$mail->IsHTML(true);
$mail->SetFrom("ISATU@edu.ph", "Iloilo Science and Technology");
