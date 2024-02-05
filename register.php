<?php
require_once('../config/config.php');

if (isset($_POST['register'])) :
    if ($_SERVER['REQUEST_METHOD'] === 'POST') :

        $firstname = $_POST['firstname'];
        $lastname = $_POST['lastname'];
        $email = $_POST['email'];
        $address = $_POST['address'];
        $contact_number = $_POST['contact_number'];
        $password = $_POST['password'];


        $data = [
            'firstname'      => $_POST['firstname'],
            'lastname'       => $_POST['lastname'],
            'email'          => $_POST['email'],
            'address'        => $_POST['address'],
            'contact_number' => $_POST['contact_number'],
            'profile_picture' => null,
            'password'       => password_hash($_POST['password'], PASSWORD_DEFAULT)
        ];

        $save = save('users', $data);
        if ($save) {
            $data['user_id'] = $save;
            $data['isLogin'] = true;
            setSession($data);
            setFlash('success', 'Welcome ' . $data['firstname'] . ' ' . $data['lastname']);
            redirect('home_lobby');
        } else {
            setFlash('failed', 'Register Failed');
            redirect('register');
        }
    endif;
endif;
