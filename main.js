// $(document).ready(function () {
//     $("form").submit(function (event) {
//         var password = $("input[name='password']").val();
//         var confirmPassword = $("input[name='confirmpassword']").val();

//         if (password !== confirmPassword) {
//             $('.error').show();
//             event.preventDefault(); // Prevent form submission
//         }
//     });
// });



$(document).ready(function () {
    var activeLink = localStorage.getItem("activeLink");
    if (activeLink) {
        $("#" + activeLink).addClass("active");
    }
});

$(document).ready(function () {
    $(".nav-link").on("click", function (e) {
        e.preventDefault();
        const href = $(this).attr("href");
        var activeLink = $(this).attr("id");
        localStorage.setItem("activeLink", activeLink);
        document.location.href = href;
    });
});


$(document).ready(function () {
    var index = 2;
    $("#add").on('click', function () {

        var row = $("#row-of-form").clone();

        $(".category", row).attr("id", "category" + index);
        $(".max_participants", row).attr("id", "max_participants" + index);
        $(".payment", row).attr("id", "payment" + index);

        $(".remove", row)
            .attr("id", "remove" + index)
            .show();
        $("#row-cloned").append(row);
        index++;

        $("body").on("click", ".remove", function () {
            $(this).closest("#row-of-form").remove();
        });

    });
})



const $input = $('#image-upload');
const $preview = $('#preview-image');
const $container = $('#image-container');

$input.on('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            $preview.attr('src', reader.result);
        });
        reader.readAsDataURL(file);
    }
    else {
        $preview.attr('src', '#');
    }
});

$container.on('dragover', function (e) {
    e.preventDefault();
    $container.addClass('dragover');
});

$container.on('dragleave', function (e) {
    e.preventDefault();
    $container.removeClass('dragover');
});

$container.on('drop', function (e) {
    e.preventDefault();
    $container.removeClass('dragover');
    const file = e.originalEvent.dataTransfer.files[0];
    if (file.type.match(/^image\//)) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            $preview.attr('src', reader.result);
        });
        reader.readAsDataURL(file);
    }
});

