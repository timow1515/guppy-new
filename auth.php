<?php
require_once 'config.php';
if (!isset($_SESSION['isLogin'])) {
    setFlash('failed', 'Login First');
    redirect('login');
}
