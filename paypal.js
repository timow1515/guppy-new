$(document).ready(function () {
    var price = $('#price').attr('price-now');
    var category_id = $('#price').attr('category-id');
    var event_id = $('#price').attr('event-id');

    paypal.Buttons({
        style: {
            size: 'small',
            color: 'gold',
            shape: 'pill',
            label: 'pay'
        },
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: `${price}`,
                        currency_code: 'PHP'
                    }
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                $.ajax({
                    url: 'http://localhost/Guppy/ajax/payment.php',
                    type: 'POST',
                    data: {
                        payments: true,
                        price: price,
                        category_id: category_id
                    },
                    success: function (response) {
                        response = JSON.parse(response);
                        if (response.status == 'success') {
                            success('Transaction completed by ' + details.payer.name.given_name, response.entry_id, category_id, event_id, response.entry_code);
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error(error);
                    }
                });
            });
        },
        onError: function (error) {
            console.log(error);
        }
    }).render('#paypal-button-container');

    function success(message, id, id2, id3, code) {
        Swal.fire({
            title: 'Success',
            text: message,
            icon: 'success',
            confirmButtonText: 'Yes',
            cancelButtonText: false
        }).then(function (result) {
            if (result.isConfirmed) {
                window.location.href = `http://localhost/Guppy/views/uploadVideos.php?entry_id=${id}&category_id=${id2}&event_id=${id3}&entry_code=${code}`;
            }
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
