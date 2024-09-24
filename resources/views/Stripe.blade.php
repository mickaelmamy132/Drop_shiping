<html>
<head>
    <script src="https://js.stripe.com/v3/"></script>
</head>
<body>
    <h1>Checkout</h1>
    <button id="checkout-button">Payer maintenant</button>

    <script>
        var stripe = Stripe('{{ config('services.stripe.key') }}');
        var checkoutButton = document.getElementById('checkout-button');

        checkoutButton.addEventListener('click', function() {
            stripe.redirectToCheckout({
                sessionId: '{{ $sessionId }}'
            });
        });
    </script>
</body>
</html>
