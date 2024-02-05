
<?php

require_once("../config/config.php");

if (isset($_POST['updateprofile'])) :
    if ($_SERVER['REQUEST_METHOD'] === 'POST') :

        $firstname = $_POST['firstname'];
        $lastname = $_POST['lastname'];
        $email = $_POST['email'];
        $address = $_POST['address'];
        $contact_number = $_POST['contact_number'];
        $password = $_POST['password'];
        $user_id = $_POST['user_id'];

        if (empty($password)) {
            $data = [
                'firstname' => $firstname,
                'lastname' => $lastname,
                'email' => $email,
                'address' => $address,
                'contact_number' => $contact_number
            ];
        } else {
            $data = [
                'firstname' => $firstname,
                'lastname' => $lastname,
                'email' => $email,
                'address' => $address,
                'contact_number' => $contact_number,
                'password' => password_hash($password, PASSWORD_DEFAULT),
            ];
        }

        $update = update('users', ['user_id' => $user_id], $data);

        if ($update) {
            setSession($data);
            setFlash('success', 'Profile Updated Sucessfully');
            redirect('profile');
        }
    endif;
endif;


if (isset($_POST['profilepic'])) :
    if ($_SERVER['REQUEST_METHOD'] === 'POST') :

        $file_name = $_FILES['profile']['name'];
        $file_temp = $_FILES['profile']['tmp_name'];
        $file_ext = pathinfo($file_name, PATHINFO_EXTENSION);
        $file_new_name = uniqid() . '.' . $file_ext;
        $file_dest = '../public/assets/images/profiles/' . $file_new_name;

        if (move_uploaded_file($file_temp, $file_dest)) {
            $user_id = $_POST['user_id'];
            $update = update('users', ['user_id' => $user_id], ['profile_picture' => $file_dest]);
            if ($update) {
                setSession(['profile_picture' => $file_dest]);
                setFlash('success', 'Profile Picture Uploaded Successfully');
                redirect('profile');
            } else {
                setFlash('failed', 'Profile Picture  Uploading Failed');
                redirect('profile');
            }
        } else {
            setFlash('failed', 'Profile Uploading Failed');
            redirect('profile');
        }

    endif;
endif;
