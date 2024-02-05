
$(document).ready(function () {
    $("#profile").change(function () {
        var input = this;
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $(".profilepicture img").attr("src", e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    });
})

$(document).ready(function () {
    var index = 2;

    $(".addlabel").on('click', function () {
        var $entry_id = $(this).attr('entroy-id');

        var row = $(`#row-of-form${$entry_id}`).clone();

        $(".category", row).attr("id", `label${$entry_id}` + index);

        $(".remove", row)
            .attr("id", `remove${$entry_id}` + index)
            .show();
        $(`#row-cloned${$entry_id}`).append(row);
        index++;
        $("body").on("click", ".remove", function () {
            $(this).closest(`#row-of-form${$entry_id}`).remove();
        });
    });

})
