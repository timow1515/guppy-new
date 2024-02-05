$(document).ready(function () {

    function refreshContent() {
        $.ajax({
            url: 'http://localhost/Guppy/ajax/notification_number.php',
            method: 'GET',
            success: function (result) {
                var $container = $("#notif_side");
                $container.html(result);
            }
        });
    }

    setInterval(refreshContent, 500);
});