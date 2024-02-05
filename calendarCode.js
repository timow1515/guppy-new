//start
$(document).ready(function () {
    var calendar = $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            // right: 'agendaWeek'
        },
        defaultView: 'agendaWeek',
        selectable: false,
        selectHelper: true,
        slotLabelInterval: '00:30:00',
        minTime: '07:30:00',
        maxTime: '17:00:00',
        slotDuration: '00:30:00',
        contentHeight: 'auto',
        allDaySlot: false,
        // select: function (start, end) {
        //     $('#schedule').modal('show');
        //     var room = $('#room').val();
        //     var subject = $('#subject').val();
        //     var addScheduleButton = $('#addSchedule');

        //     addScheduleButton.off('click').on('click', function () {
        //         $.ajax({
        //             url: 'http://localhost/SchedulingSystem/actions/manageSchedule.php',
        //             data: {
        //                 addSchedule: true,
        //                 start: start.format('YYYY-MM-DD HH:mm:ss'),
        //                 end: end.format('YYYY-MM-DD HH:mm:ss'),
        //                 room: room,
        //                 subject: subject,
        //             },
        //             type: "POST",
        //             success: function (response) {
        //                 response = JSON.parse(response);
        //                 if (response.status == "success") {
        //                     success(response.message);
        //                     $('#schedule').modal('hide');
        //                     calendar.fullCalendar('refetchEvents'); // Refresh events after successful setting
        //                 } else {
        //                     failed('Error setting time.');
        //                     calendar.fullCalendar('unselect');
        //                 }
        //             },
        //             error: function (xhr, status, error) {
        //                 // Handle the error
        //                 failed('Error setting time.');
        //                 calendar.fullCalendar('unselect');
        //             }
        //         });
        //     });
        // },
        events: function (start, end, timezone, callback) {
            $.ajax({
                url: 'http://localhost/SchedulingSystem/ajax/schedule.php?getSchedule',
                type: "GET",
                success: function (response) {
                    response = JSON.parse(response);
                    if (response.status == "success") {
                        var events = [];
                        $.each(response.data, function (i, item) {
                            events.push({
                                id: item.schedule_id,
                                title: item.faculty_name + "\n" + item.subject_name + '  Room ' + item.room_num,
                                start: item.start,
                                end: item.end,
                                description: "hey"
                            });
                        });
                        callback(events);
                    }

                },
                error: function (xhr, status, error) {
                    // Handle the error
                    console.log('empty Schedule');
                }
            });
        },
        // eventClick: function (event, jsEvent, view) {
        //     Swal.fire({
        //         title: 'Are you sure?',
        //         text: 'Do you want to delete this Schedule?',
        //         icon: 'warning',
        //         showCancelButton: true,
        //         confirmButtonText: 'Yes',
        //         cancelButtonText: 'No'
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             $.ajax({
        //                 url: 'http://localhost/SchedulingSystem/ajax/schedule.php',
        //                 data: {
        //                     delete_schedule: true,
        //                     schedule_id: event.id,
        //                 },
        //                 type: "POST",
        //                 success: function (response) {
        //                     response = JSON.parse(response);
        //                     if (response.status == "success") {
        //                         success(response.message);
        //                         calendar.fullCalendar('refetchEvents'); // Refresh events after successful setting
        //                     } else {
        //                         failed('Error setting time.');
        //                         calendar.fullCalendar('unselect');
        //                     }
        //                 },
        //                 error: function (xhr, status, error) {
        //                     // Handle the error
        //                     failed('Error setting time.');
        //                     calendar.fullCalendar('unselect');
        //                 }
        //             });
        //         }
        //     });
        // }
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
            confirmButtonText: 'Yes',
            cancelButtonText: false
        })
    }
});
//end



$(document).ready(function () {
    var $faculty_id = $('#calendar1').attr('faculty-id');
    console.log($faculty_id);
    var calendar = $('#calendar1').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            // right: 'agendaWeek'
        },
        defaultView: 'agendaWeek',
        selectable: true,
        selectHelper: true,
        slotLabelInterval: '00:30:00',
        minTime: '07:30:00',
        maxTime: '17:00:00',
        slotDuration: '00:30:00',
        contentHeight: 'auto',
        allDaySlot: false,
        select: function (start, end) {
            $('#schedule').modal('show');
            var room = $('#room').val();
            var subject = $('#subject').val();
            var addScheduleButton = $('#addScheduleAdmin');

            addScheduleButton.off('click').on('click', function () {
                $.ajax({
                    url: 'http://localhost/SchedulingSystem/actions/manageSchedule.php',
                    data: {
                        addScheduleAdmin: true,
                        faculty_id: $faculty_id,
                        start: start.format('YYYY-MM-DD HH:mm:ss'),
                        end: end.format('YYYY-MM-DD HH:mm:ss'),
                        room: room,
                        subject: subject,
                    },
                    type: "POST",
                    success: function (response) {
                        response = JSON.parse(response);
                        if (response.status == "success") {
                            success(response.message);
                            $('#schedule').modal('hide');
                            calendar.fullCalendar('refetchEvents'); // Refresh events after successful setting
                        } else {
                            failed('Error setting time.');
                            calendar.fullCalendar('unselect');
                        }
                    },
                    error: function (xhr, status, error) {
                        // Handle the error
                        failed('Error setting time.');
                        calendar.fullCalendar('unselect');
                    }
                });
            });
        },
        events: function (start, end, timezone, callback) {
            $.ajax({
                url: `http://localhost/SchedulingSystem/ajax/schedule.php?getScheduleAdmin&faculty_id=${$faculty_id}`,
                type: "GET",
                success: function (response) {
                    response = JSON.parse(response);
                    if (response.status == "success") {
                        var events = [];
                        $.each(response.data, function (i, item) {
                            events.push({
                                id: item.schedule_id,
                                title: item.faculty_name + "\n" + item.subject_name + '  Room ' + item.room_num,
                                start: item.start,
                                end: item.end,
                                description: "hey"
                            });
                        });
                        callback(events);
                    }

                },
                error: function (xhr, status, error) {
                    // Handle the error
                    console.log('empty Schedule');
                }
            });
        },
        eventClick: function (event, jsEvent, view) {
            Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to delete this Schedule?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: 'http://localhost/SchedulingSystem/ajax/schedule.php',
                        data: {
                            delete_schedule: true,
                            schedule_id: event.id,
                        },
                        type: "POST",
                        success: function (response) {
                            response = JSON.parse(response);
                            if (response.status == "success") {
                                success(response.message);
                                calendar.fullCalendar('refetchEvents'); // Refresh events after successful setting
                            } else {
                                failed('Error setting time.');
                                calendar.fullCalendar('unselect');
                            }
                        },
                        error: function (xhr, status, error) {
                            // Handle the error
                            failed('Error setting time.');
                            calendar.fullCalendar('unselect');
                        }
                    });
                }
            });
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
            confirmButtonText: 'Yes',
            cancelButtonText: false
        })
    }
});
