<?php
require_once 'config.php';
if (isset($_SESSION['isLogin'])) {
    setFlash('success', 'Welcome Back ' . $_SESSION['firstname'] . ' ' . $_SESSION['lastname']);
    redirect('home_lobby');
}
