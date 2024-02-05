<?php

require_once("../config/config.php");

if (isset($_POST['uploadvideos'])) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $video_files = $_FILES['entry_video'];
        $video_file_dest_dir = '../public/assets/images/entryVideos/'; // Directory to store the uploaded videos

        // Save the videos
        foreach ($video_files['name'] as $index => $video_file_name) {
            $video_file_temp = $video_files['tmp_name'][$index];
            $video_file_ext = pathinfo($video_file_name, PATHINFO_EXTENSION);
            $video_file_new_name = uniqid() . '.' . $video_file_ext;
            $video_file_dest = $video_file_dest_dir . $video_file_new_name;

            // Move the video file to the destination directory
            if (move_uploaded_file($video_file_temp, $video_file_dest)) {
                $video_data = [
                    'entry_id' => $_POST['entry_id'],
                    'entry_video_file' => $video_file_dest,
                ];
                $save_video = save('entries_video', $video_data);
            }
        }

        // Save the images
        $image_files = $_FILES['entry_image'];
        $image_file_dest_dir = '../public/assets/images/entryImages/'; // Directory to store the uploaded images
        $save_image = false;

        foreach ($image_files['name'] as $index => $image_file_name) {
            $image_file_temp = $image_files['tmp_name'][$index];
            $image_file_ext = pathinfo($image_file_name, PATHINFO_EXTENSION);
            $image_file_new_name = uniqid() . '.' . $image_file_ext;
            $image_file_dest = $image_file_dest_dir . $image_file_new_name;

            // Move the image file to the destination directory
            if (move_uploaded_file($image_file_temp, $image_file_dest)) {
                $image_data = [
                    'entry_id' => $_POST['entry_id'],
                    'entry_image_file' => $image_file_dest,
                ];
                $save_image = save('entries_image', $image_data);
            }
        }

        if ($save_video && $save_image) {
            setFlash('success', 'Entry Uploaded Successfully');
            redirect('events_now', ['event_id' => $_POST['event_id'], 'category_id' => $_POST['category_id']]);
        } else {
            redirect('uploadVideos', ['event_id' => $_POST['event_id'], 'category_id' => $_POST['category_id']]);
        }
    }
}
