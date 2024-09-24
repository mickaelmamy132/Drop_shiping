<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class CheckoutControlleur extends Controller
{
    public function createCheckoutSession(Request $request)
    {

        // dd($request->all());
        Stripe::setApiKey(config('Stripe.sk'));

        $lineItems = [];
        foreach ($request->produits as $produit) {
            $lineItems[] = [
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => 'Produit ID: ' . $produit['produit_id'],
                    ],
                    'unit_amount' => intval(floatval($produit['prix_totale']) * 100 / $produit['quantite']),
                ],
                'quantity' => $produit['quantite'],
            ];
        }

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => route('checkout.success', [], true) . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('checkout.cancel', [], true),
            'metadata' => [
                'acheteur_id' => $request->acheteur_id,
                'vendeurs' => json_encode($request->vendeurs),
            ],
        ]);

        return Inertia::location($session->url);
    }

    // public function success()
    // {
    //     return view('success');
    // }

    // public function cancel()
    // {
    //     return view('cancel');
    // }
}
