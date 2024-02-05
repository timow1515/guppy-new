<?php
require_once('../config/config.php');

$entry_id = $_GET['entry_id'];

$comments = joinTable('comments', [['users', 'users.user_id', 'comments.user_id']], ['comments.entry_id' => $entry_id]);

if (!empty($comments)) {
    foreach ($comments as $row) : ?>
        <div class="d-flex align-items-center mb-3">
            <div>
                <div class="post-profile me-1">
                    <img class="img-comments" src="<?php echo $row['profile_picture'] != null ? $row['profile_picture'] : '../public/assets/images/user.jpg' ?>">
                </div>
            </div>
            <div style="flex:1">
                <strong class="m-0"><?= $row['firstname'] . ' ' . $row['lastname'] ?></strong>
                <p class="commentsNow m-0"><?= $row['comment_value'] ?></p>
            </div>
        </div>
    <?php endforeach ?>
    <div class="row mx-auto p-0">
        <a href="individual_winner.php?entry_id=<?= $row['entry_id'] ?>&category_id=<?php echo $_GET['category_id'] ?>">Show all</a>
    </div>
<?php } else { ?>
    <div class="row mx-auto p-0">
        <p class="m-0 text-dark">No comments yet</p>
    </div>
<?php } ?>