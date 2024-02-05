<?php
require_once 'session.php';
function getValue($fieldName)
{
    if (isset($_SESSION['inputs'][$fieldName])) {
        return htmlspecialchars($_SESSION['inputs'][$fieldName]);
    }
    return isset($_POST[$fieldName]) ? htmlspecialchars($_POST[$fieldName]) : '';
}
function redirect($location, $data = [])
{
    $url = "../views/" . $location . ".php";
    if (!empty($data)) {
        $url .= "?" . http_build_query($data);
    }
    header("Location: " . $url);
    exit;
}
function removeValue()
{
    if (isset($_SESSION['inputs'])) {
        unset($_SESSION['inputs']);
    }
}
function retainValue()
{
    $_SESSION['inputs'] = $_POST;
}
function setFlash($type, $message)
{
    $_SESSION['flash'] = [
        'type' => $type,
        'message' => $message
    ];
}

function getFlash($type)
{
    if (isset($_SESSION['flash']['type']) && $_SESSION['flash']['type'] == $type) {
        $message = $_SESSION['flash']['message'];
        unset($_SESSION['flash']);
        return $message;
    }
    return false;
}

function session()
{
    if (isset($_SESSION['isLogin'])) {
        redirect('login');
        exit;
    }
}

//return error
function returnError($error)
{
    // Store the error in the session
    if (!isset($_SESSION['errors'])) {
        $_SESSION['errors'] = array();
    }
    $_SESSION['errors'] = $error;
}

function showError($error_key)
{
    if (isset($_SESSION['errors'][$error_key])) {
        $error = $_SESSION['errors'][$error_key];
        unset($_SESSION['errors'][$error_key]);
        echo '<p class="text-danger errors text-start m-0 p-0" style="font-size:12px !important;">' . $error . '</p>';
    }
    return false;
}

function generateRandomString($length = 6)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';

    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }

    return $randomString;
}


function getPage()
{
    if (isset($_GET['pages'])) {
        echo $_GET['pages'];
    }
}
// $randomString = generateRandomString();
// echo $randomString;


// function showError($error_key)
// {
//     if (isset($_SESSION['errors'][$error_key])) {
//         return $_SESSION['errors'][$error_key];
//     }
//     return false;
// }



// if (isset($_SESSION['isLogin']) && $_SESSION['isLogin'] == true) {
//     header("Location: home.php");
//     exit;
// } else {
//     header("Location: login.php");
//     exit;
// }