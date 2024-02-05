
$(document).ready(function () {
    $('#add_participants').on('click', function () {
        var $user_id = $('#user_id').val();
        var $event_id = $('#user_id').attr('event-id');
        if ($user_id != 0) {
            $.ajax({
                url: "http://localhost/Guppy/actions/event.php",
                type: "POST",
                data: {
                    add_participants: true,
                    user_id: $user_id,
                    event_id: $event_id
                },
                success: function (response) {
                    response = JSON.parse(response);
                    if (response.status == 'success') {
                        console.log(response.message);
                    }
                    else if (response.status == 'already') {
                        failed(response.message);
                    }
                    else if (response.status == 'max') {
                        failed(response.message);
                    }
                },
            });
        }
        else {
            failed('Please Select Participants');

        }
    });

    function success(message) {
        Swal.fire({
            title: 'Success',
            text: message,
            icon: 'success',
            confirmButtonText: 'Yes',
            cancelButtonText: false
        })
    }

    function failed(message) {
        Swal.fire({
            title: 'Failed',
            text: message,
            icon: 'warning',
            confirmButtonText: 'Okay',
            cancelButtonText: false
        })
    }
});

$(document).ready(function () {
    var $event_id = $('#user_id').attr('event-id');

    function updateParticipants() {
        $.ajax({
            url: `http://localhost/Guppy/ajax/participants.php?event_id=${$event_id}`,
            success: function (result) {
                $("#partici").html(result);
            }
        });
    }

    updateParticipants();

    setInterval(updateParticipants, 500);
});



$(document).ready(function () {
    $('.labels').each(function () {

        var $entry_id = $(this).attr('entry-id');

        function refreshContent() {
            $.ajax({
                url: 'http://localhost/Guppy/ajax/labels.php',
                method: 'GET',
                data: {
                    modalLabel: true,
                    entry_id: $entry_id
                },
                success: function (result) {
                    var $container = $(`#labels${$entry_id}`);
                    $container.html(result);

                    $(`#labels${$entry_id}`).on('click', '.deleteLabel', function () {
                        var $label_id = $(this).attr('label-id');
                        $.ajax({
                            url: 'http://localhost/Guppy/ajax/labels.php',
                            method: 'POST',
                            data: {
                                deleteLabel: true,
                                label_id: $label_id
                            },
                            success: function (response) {
                                response = JSON.parse(response);
                                if (response.status == 'success') {
                                    console.log(response.message);
                                }
                                else {
                                    failed(response.message);
                                }
                            }
                        });
                    });

                }
            });
        }

        setInterval(refreshContent, 500);
    });
});


$(document).ready(function () {
    $('.labelscaption').each(function () {

        var $entry_id = $(this).attr('entrayy-id');

        function refreshContent() {
            $.ajax({
                url: 'http://localhost/Guppy/ajax/labels.php',
                method: 'GET',
                data: {
                    captionLabel: true,
                    entry_id: $entry_id
                },
                success: function (result) {
                    var $container = $(`#labelscaption${$entry_id}`);
                    $container.html(result);
                }
            });
        }

        setInterval(refreshContent, 500);
    });
});