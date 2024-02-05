<?php
require_once('../config/config.php');
$participants = joinTable('participants', [['users', 'participants.user_id', 'users.user_id']], ['participants.event_id' => $_GET['event_id']]); ?>
<div class="form-group mt-2">
    <label>Participants</label>
    <?php
    if (empty($participants)) { ?>
        <input class="form-control" readonly value="No Participants Added">
    <?php }

    foreach ($participants as $participant) : ?>
        <input class="form-control mb-2" readonly value="<?= $participant['firstname'] . ' ' . $participant['lastname'] ?>">
    <?php endforeach; ?>

</div>