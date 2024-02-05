<?php

require_once("../config/config.php");

if (isset($_POST['login'])) :
    if ($_SERVER['REQUEST_METHOD'] === 'POST') :
        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $password = mysqli_real_escape_string($conn, $_POST['password']);

        if ($users = first('users', ['email' => $email])) {
            if (password_verify($password, $users['password'])) {
                $users['isLogin'] = true;
                setSession($users);
                setFlash('success', 'Welcome ' . $users['firstname'] . ' ' . $users['lastname']); //set message
                redirect('home_lobby');
            } else {
                retainValue();
                returnError(['password' => 'Incorrect password']);
                redirect('login');
            }
        } else {
            returnError(['email' => 'Email does not exist']);
            redirect('login');
        }
    endif;
endif;
