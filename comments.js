//AJAX to Comment
$(document).ready(function () {
    $('.sendPost').on('click', function () {
        var $entry_id = $(this).attr('entry-id');
        var $user_id = $(this).attr('user-id');
        var $post_value = $(`#postValue${$entry_id}`).val();

        $.ajax({
            url: "http://localhost/Guppy/ajax/comment.php",
            type: "POST",
            data: {
                comments: true,
                entry_id: $entry_id,
                user_id: $user_id,
                post_value: $post_value
            },
            success: function (response) {
                response = JSON.parse(response);
                if (response.status == 'success') {
                    $(`#postValue${$entry_id}`).val('');
                    console.log(response.message);
                }
                else {
                    failed(response.message);
                }
            },
        });
    });
});

//AJAX to Retrieve Comment
$(document).ready(function () {
    $('.comment-container').each(function () {
        var $entry_id = $(this).attr('entries-id');
        var $category_id = $(this).attr('category-id');
        var previousContent = '';

        function refreshContent() {
            $.ajax({
                url: 'http://localhost/Guppy/ajax/comment_contents.php',
                method: 'GET',
                data: {
                    entry_id: $entry_id,
                    category_id: $category_id
                },
                success: function (result) {
                    if (result !== previousContent) {
                        var $container = $(`#comment-container${$entry_id}`);
                        $container.html(result);
                        $container.scrollTop($container.prop("scrollHeight"));
                        previousContent = result;
                    }
                }
            });
        }

        setInterval(refreshContent, 500);
    });
});

//AJAX to Retrieve Comment
$(document).ready(function () {
    $('.comment-containers').each(function () {
        var $entry_id = $(this).attr('entries-id');
        var $category_id = $(this).attr('category-id');

        var previousContent = '';

        function refreshContent() {
            $.ajax({
                url: 'http://localhost/Guppy/ajax/comment_contents.php',
                method: 'GET',
                data: {
                    entry_id: $entry_id,
                    category_id: $category_id
                },
                success: function (result) {
                    if (result !== previousContent) {
                        var $container = $(`#comment-container${$entry_id}`);
                        $container.html(result);
                        $container.scrollTop($container.prop("scrollHeight"));
                        previousContent = result;
                    }
                }
            });
        }

        setInterval(refreshContent, 500);
    });
});

$(document).ready(function () {
    $('.likebutton').on('click', function () {

        var $entry_id = $(this).attr('entrys-id');
        var $user_id = $(this).attr('userys-id');

        $.ajax({
            url: "http://localhost/Guppy/ajax/comment.php",
            type: "POST",
            data: {
                likes: true,
                entry_id: $entry_id,
                user_id: $user_id,
            },
            success: function (response) {
                response = JSON.parse(response);
                if (response.status == 'success') {
                    console.log(response.message);
                    $(`#like${$entry_id}`).addClass('text-primary');
                }
                else if (response.status == 'deleted') {
                    $(`#like${$entry_id}`).removeClass('text-primary');
                }
                else {
                    console.log(response.message);
                }
            },
        });

    });
})



$(document).ready(function () {
    $('.like-count').each(function () {

        var $entry_id = $(this).attr('entray-id');

        function refreshContent() {
            $.ajax({
                url: 'http://localhost/Guppy/ajax/likes.php',
                method: 'GET',
                data: {
                    entry_id: $entry_id
                },
                success: function (result) {
                    var $container = $(`#like-count${$entry_id}`);
                    $container.html(result);
                }
            });
        }

        setInterval(refreshContent, 500);
    });
});