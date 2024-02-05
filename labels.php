<?php
require_once('../config/config.php');

if (isset($_GET['modalLabel'])) :
    $entry_id = $_GET['entry_id'];

    $find = joinTable('labels', [['evaluation', 'evaluation.evaluation_id', 'labels.evaluation_id']], ['evaluation.entry_id' => $entry_id]);

    foreach ($find as $row) { ?>
        <div class="form-group p-0">
            <label>Label</label>
            <div class="d-flex align-items-center position-relative">
                <input class="form-control" readonly value="<?= $row['label_value'] ?>">
                <i class="fa fa-trash text-danger position-absolute cursor-pointer deleteLabel" label-id="<?= $row['label_id'] ?>" style="right:0; margin-right:10px"></i>
            </div>
        </div>
<?php }
endif; ?>
<?php

if (isset($_POST['deleteLabel'])) :
    $label_id = $_POST['label_id'];

    $delete = delete('labels', ['label_id' => $label_id]);
    if ($delete) {
        http_response_code(200);
        echo json_encode(array("status" => "success", "Message" => "Deleted"));
    } else {
        http_response_code(400);
        echo json_encode(array("status" => "error", "message" => "Error."));
    }
endif;  ?>

<?php if (isset($_GET['captionLabel'])) :

    $entry_id = $_GET['entry_id'];
    $find = joinTable('labels', [['evaluation', 'evaluation.evaluation_id', 'labels.evaluation_id']], ['evaluation.entry_id' => $entry_id]);
    if (!empty($find)) :
        foreach ($find as $row) { ?>
            <div class="form-group p-0 mb-1">
                <div class="d-flex align-items-center position-relative text-success">
                    <i class="fa fa-tag"></i>
                    <p class="m-0 ms-1"><?= $row['label_value'] ?> </p>
                </div>
            </div>
<?php }
    endif;
endif; ?>