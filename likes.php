<?php
require_once('../config/config.php');

$entry_id = $_GET['entry_id'];
$count = countResult('likes', ['entry_id' => $entry_id]);

if ($count != 0) { ?>
    <div class="d-flex align-items-center py-1 text-primary">
        <i class="fa fa-thumbs-up" style="transform: scaleX(-1);"></i>
        <p class="m-0 ms-1"><?= $count ?></p>
    </div>
<?php } ?>