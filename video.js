// $(document).ready(function () {
//     // Function to update the progress bar
//     function updateProgressBar(progress) {
//         $('#progress-bar').css('width', progress + '%').text(progress + '%');
//     }

//     // Function to preview the selected video file
//     function previewVideo(input) {
//         if (input.files && input.files[0]) {
//             var reader = new FileReader();
//             reader.onload = function (e) {
//                 $('#progress-bar').css('width', '100%').text('100%');
//                 setTimeout(function () {
//                     $('.progress').hide();
//                     $('#video-preview').attr('src', e.target.result);
//                     $('.preview-container').show();
//                 }, 3000);
//             };
//             reader.readAsDataURL(input.files[0]);
//         }
//     }

//     // Event handler for file input change
//     $('#video-file').on('change', function () {
//         $('.preview-container').hide();
//         $('.progress').show();
//         $('#progress-bar').css('width', '0%').text('0%');
//         previewVideo(this);
//     });
// });

$(document).ready(function () {
    var videoFiles = []; // Array to store the selected video files
    var currentVideoIndex = 0; // Index of the currently displayed video

    // Function to update the progress bar
    function updateProgressBar(progress) {
        $('#progress-bar').css('width', progress + '%').text(progress + '%');
    }

    // Function to preview the selected video file
    function previewVideo(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#progress-bar').css('width', '100%').text('100%');
                setTimeout(function () {
                    $('.progress').hide();
                    $('#video-preview').attr('src', e.target.result);
                    $('.preview-container').show();
                }, 3000);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    // Event handler for file input change
    $('#video-file').on('change', function () {
        $('.preview-container').hide();
        $('.progress').show();
        $('#progress-bar').css('width', '0%').text('0%');
        videoFiles = Array.from(this.files); // Store selected video files as an array
        currentVideoIndex = 0; // Reset the current video index
        previewVideo(this);
        updateAngleButtons(); // Update the visibility of angle buttons
    });

    // Function to display the previous video
    function prevVideo() {
        currentVideoIndex--;
        if (currentVideoIndex < 0) {
            currentVideoIndex = videoFiles.length - 1;
        }
        displayVideo();
    }

    // Function to display the next video
    function nextVideo() {
        currentVideoIndex++;
        if (currentVideoIndex >= videoFiles.length) {
            currentVideoIndex = 0;
        }
        displayVideo();
    }

    // Function to display the video at the current index
    function displayVideo() {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#video-preview').attr('src', e.target.result);
        };
        reader.readAsDataURL(videoFiles[currentVideoIndex]);
        updateAngleButtons(); // Update the visibility of angle buttons
    }

    // Function to update the visibility of angle buttons
    function updateAngleButtons() {
        var prevButton = $('#prev-button');
        var nextButton = $('#next-button');
        if (videoFiles.length > 1) {
            prevButton.prop('disabled', false).show();
            nextButton.prop('disabled', false).show();
        } else {
            prevButton.prop('disabled', true).hide();
            nextButton.prop('disabled', true).hide();
        }
    }

    // Event handler for previous button click
    $('#prev-button').on('click', function () {
        prevVideo();
    });

    // Event handler for next button click
    $('#next-button').on('click', function () {
        nextVideo();
    });

    // Hide the buttons initially
    $('#prev-button').hide();
    $('#next-button').hide();
});


$(document).ready(function () {
    var currentIndex = 0;
    var files = [];

    $('#image-file').on('change', function () {
        files = Array.from($(this)[0].files);
        resetSlider();
    });

    $('#prev-btn').on('click', function () {
        console.log('Previous button clicked');
        currentIndex = (currentIndex - 1 + files.length) % files.length;
        updateSlider();
    });

    $('#next-btn').on('click', function () {
        console.log('Next button clicked');
        currentIndex = (currentIndex + 1) % files.length;
        updateSlider();
    });

    function resetSlider() {
        currentIndex = 0;
        $('#slider').empty();

        files.forEach(function (file) {
            var reader = new FileReader();

            reader.onload = function (event) {
                var imgElement = $('<img>').attr('src', event.target.result).addClass('preview-image');
                $('#slider').append(imgElement);
            };

            reader.readAsDataURL(file);
        });

        updateSlider();
    }

    function updateSlider() {
        var sliderWidth = $('#slider').width();
        var newPosition = -(currentIndex * sliderWidth);
        $('#slider').css('left', newPosition);

        // Hide all images
        $('.preview-image').hide();

        // Show the current image
        $('.preview-image').eq(currentIndex).show();

        console.log('Slider updated. Current position:', newPosition);
    }
});
