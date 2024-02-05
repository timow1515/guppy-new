<?php
require_once('../config/config.php');
if (isset($_POST['payments'])) :
    if ($_SERVER['REQUEST_METHOD'] === 'POST') :

        $random = generateRandomString(8);
        // $text_message = "Dear " . $_SESSION['firstname'] . " " . $_SESSION['lastname'] . ",\n\nYour Entries has been saved.\nThis is the entry code that you need to show in your Video \n$random\nPlease Do not share this entry code with others\n\nDo not reply,\n This is computer generated";

        // $send = sendMessage($_SESSION['contact_number'], $text_message);
        // if ($send) :

        $price = $_POST['price'];
        $category_id = $_POST['category_id'];

        $data3 = [
            'category_id' =>  $category_id,
            'user_id'   => $_SESSION['user_id'],
        ];

        $save3 = save('participants', $data3);

        $data = [
            'category_id' => $category_id,
            'user_id' => $_SESSION['user_id'],
            'entry_code' => $random
        ];

        $save = save('entries', $data);

        if ($save) {
            $data2 = [
                'entry_id' => $save,
                'user_id' => $_SESSION['user_id'],
                'payment_amount' => $price,
                'payment_status' => 1
            ];

            if (save('payment', $data2)) {
                http_response_code(200);
                echo json_encode(array("status" => "success", "entry_id" => $save, 'entry_code' => $random));
            } else {
                http_response_code(400);
                echo json_encode(array("status" => "error", "message" => "Error."));
            }
        }

    // endif;

    endif;
endif;
