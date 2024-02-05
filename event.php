
<?php

require_once("../config/config.php");

if (isset($_POST['create_event'])) :
    if ($_SERVER['REQUEST_METHOD'] === 'POST') :

        $file_name = $_FILES['banner']['name'];
        $file_temp = $_FILES['banner']['tmp_name'];
        $file_ext = pathinfo($file_name, PATHINFO_EXTENSION);
        $file_new_name = uniqid() . '.' . $file_ext;
        $file_dest = '../public/assets/banner/' . $file_new_name;

        if (move_uploaded_file($file_temp, $file_dest)) {
            $data = [
                'user_id'   => $_SESSION['user_id'],
                'banner' =>  $file_dest,
                'title' => $_POST['title'],
                'description' => $_POST['description'],
                'event_status' => 0,
                'date' => $_POST['date'],
            ];

            $save = save('events', $data);

            $category = $_POST['category'];
            $max_participants = $_POST['max_participants'];
            $payment = $_POST['payment'];

            foreach ($category as $key => $value) {
                $data2 = [
                    'event_id' => $save,
                    'category_name' => $category[$key],
                    'max_participants' => $max_participants[$key],
                    'payment_amount' => $payment[$key],
                    'category_status' => 0
                ];
                $save2 = save('event_category', $data2);
            }

            if ($save2) {
                // redirect('modify_event', ['event_id' => $save]);
                setFlash('success', 'Event Created Successfully');
                redirect('home_lobby');
            } else {
                redirect('create_event');
            }
        }

    endif;
endif;

if (isset($_POST['add_participants'])) :

    $count = countResult('participants', ['event_id', $_POST['event_id']]);

    $get = first('events', ['event_id' => $_POST['event_id']]);

    if ($count >= $get['max_participants']) {
        $check = first('participants', ['event_id' => $_POST['event_id'], 'user_id' => $_POST['user_id']]);
        if (empty($check)) {
            $save = save('participants', ['event_id' => $_POST['event_id'], 'user_id' => $_POST['user_id']]);
            if ($save) {
                http_response_code(200);
                echo json_encode(["status" => "success", "message" => 'Success']);
            } else {
                http_response_code(404);
                echo json_encode(["status" => "error", "message" => "Data not found"]);
            }
        } else {
            http_response_code(200);
            echo json_encode(["status" => "already", "message" => 'Participants is already Added']);
        }
    } else {
        http_response_code(200);
        echo json_encode(["status" => "max", "message" => 'Participants is already at Max']);
    }
endif;



if (isset($_POST['modify'])) :
    if ($_SERVER['REQUEST_METHOD'] === 'POST') :
        $update = update('events', ['event_id' => $_POST['event_id']], ['title' => $_POST['title'], 'description' => $_POST['event_description']]);
        if ($update) {
            setFlash('success', 'Event Created Successfully');
            redirect('home_lobby');
        }
    endif;
endif;

if (isset($_GET['PostResult'])) :
    $event_id = $_GET['event_id'];
    $category_id = $_GET['category_id'];
    $count = countResult('event_category', ['event_id' => $event_id, 'category_status' => 0]);

    if ($count == 1) {
        $event_status = 2;
    } else {
        $event_status = 1;
    }

    $update1 = update('events', ['event_id' => $event_id], ['event_status' => $event_status]);
    $update2 = update('event_category', ['category_id' => $category_id], ['category_status' => 1]);

    if ($update1) {
        setFlash('success', 'Result Posted');
        redirect('events_now', ['event_id' => $event_id, 'category_id' => $category_id]);
    }
endif;
