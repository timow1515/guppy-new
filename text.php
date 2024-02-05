<?php

require_once '../vendor/autoload.php';

use Twilio\Rest\Client;

$accountSid = 'ACf3aec12d1eedc5e0e98bbda01c5b1c53';
$authToken = '3471fb0b459010a2a33915c4dd8d57a4';

$twilio = new Client($accountSid, $authToken);

function sendMessage($number, $text_message)
{
    global $twilio;

    $message = $twilio->messages->create(
        $number,
        [
            'from' => '+13203178740',
            'body' => $text_message
        ]
    );
    if ($message) {
        return true;
        // print($message->sid);
    }
}
