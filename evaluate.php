
<?php

require_once("../config/config.php");

if (isset($_POST['evaluate'])) :
    if ($_SERVER['REQUEST_METHOD'] === 'POST') :

        $entry_id = $_POST['entry_id'];
        $event_id = $_POST['event_id'];
        $category_id = $_POST['category_id'];
        $placement = $_POST['placement'];

        $check = first('evaluation', ['entry_id' => $entry_id]);
        if (empty($check)) {
            $data = [
                'entry_id' => $entry_id,
                'evaluation_badge' => $placement
            ];
            $save1 = save('evaluation', $data);
            $label = $_POST['label'];

            if ($save1) {
                if ($label[0] != '') {
                    foreach ($label as $key => $value) {
                        if ($value != null) {
                            $data2 = [
                                'evaluation_id' => $save1,
                                'label_value' => $label[$key],
                            ];
                            $save = save('labels', $data2);
                        }
                    }
                } else {
                    $okay = true;
                }
            }
        } else {
            $save1 = update('evaluation', ['entry_id' => $entry_id], ['evaluation_badge' => $placement]);
            if ($save1) {
                $label = $_POST['label'];
                if ($label[0] != '') {
                    foreach ($label as $key => $value) {
                        $data2 = [
                            'evaluation_id' => $check['evaluation_id'],
                            'label_value' => $label[$key],
                        ];
                        $save = save('labels', $data2);
                    }
                } else {
                    $okay = true;
                }
            }
        }

        if ($save || $okay) {
            redirect('entry_evaluate', ['event_id' => $event_id, 'category_id' => $category_id, 'entry_id' => $entry_id]);
        }

    endif;
endif;
