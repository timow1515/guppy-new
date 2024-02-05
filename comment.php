<?php
require_once('../config/config.php');

if (isset($_POST['comments'])) :
    if ($_SERVER['REQUEST_METHOD'] === 'POST') :
        $entry_id = $_POST['entry_id'];
        $user_id = $_POST['user_id'];
        $post_value = $_POST['post_value'];

        $data = [
            'entry_id' => $entry_id,
            'user_id' => $user_id,
            'comment_value' => $post_value
        ];
        $comment = save('comments', $data);

        if ($comment) {
            http_response_code(200);
            echo json_encode(array("status" => "success", "message" => "Comment Successfull"));
        } else {
            http_response_code(400);
            echo json_encode(array("status" => "error", "message" => "Error."));
        }

    endif;
endif;


if (isset($_POST['likes'])) :
    if ($_SERVER['REQUEST_METHOD'] === 'POST') :

        $user_id = $_POST['user_id'];
        $entry_id = $_POST['entry_id'];

        $check = first('likes', ['user_id' => $user_id, 'entry_id' => $entry_id]);
        if (empty($check)) {
            $data = [
                'user_id' => $user_id,
                'entry_id' => $entry_id
            ];

            $save = save('likes', $data);

            if ($save) {
                http_response_code(200);
                echo json_encode(array("status" => "success", "message" => "Like Successfull"));
            } else {
                http_response_code(400);
                echo json_encode(array("status" => "error", "message" => "Error."));
            }
        } else {
            $delete = delete('likes', ['user_id' => $user_id, 'entry_id' => $entry_id]);
            if ($delete) {
                http_response_code(200);
                echo json_encode(array("status" => "deleted", "message" => "Unlike"));
            } else {
                http_response_code(400);
                echo json_encode(array("status" => "error", "message" => "Error."));
            }
        }
    endif;
endif;
