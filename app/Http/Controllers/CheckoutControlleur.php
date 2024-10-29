<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use App\Models\Produit_lot;
use App\Models\User;
use Stripe\Webhook;
use Stripe\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\Checkout\Session;


class CheckoutControlleur extends Controller
{
    private function checkInternetConnection()
    {
        $connected = @fsockopen("www.stripe.com", 443);
        if ($connected) {
            fclose($connected);
            return true;
        }
        return false;
    }

    public function createCheckoutSession(Request $request)
    {
        if (!$this->checkInternetConnection()) {
            return response()->json(['error' => 'Pas de connexion Internet. Veuillez vérifier votre connexion.'], 503);
        }

        Stripe::setApiKey(config('Stripe.sk'));
        $user = Auth::user();
        $produits = $request->input('produits');
        // dd($produits);
        $lineItems = [];
        $vendeursProduits = [];
        $vendeursLots = [];

        if (is_array($produits)) {
            foreach ($produits as $produit) {
                if (is_array($produit)) {
                    // Si un produit normal est présent
                    if (isset($produit['produit_id'])) {
                        $item = Produit::find($produit['produit_id']);
                        // dd($item);
                        if ($item) {
                            $lineItems[] = [
                                'price_data' => [
                                    'currency' => 'eur',
                                    'product_data' => [
                                        'name' => $item->nom,
                                    ],
                                    'unit_amount' => $item->prix * 100, // Prix en centimes
                                ],
                                'quantity' => $produit['quantite'] ?? 1,
                            ];
                            $vendeursProduits[$item->id] = $item->vendeur_id;
                        }
                    }

                    // Si un produit lot est présent et que c'est un objet
                    if (isset($produit['produit_lot_id']) && is_array($produit['produit_lot_id'])) {
                        // Directement récupérer les informations depuis l'objet produit_lot_id
                        $item = Produit_lot::find($produit['produit_lot_id']['id']);
                        if ($item) {
                            $lineItems[] = [
                                'price_data' => [
                                    'currency' => 'eur',
                                    'product_data' => [
                                        'name' => $item->nom,
                                    ],
                                    'unit_amount' => $produit['prix_totale'] * 100, // Prix en centimes
                                ],
                                'quantity' => $produit['quantite'] ?? 1,
                            ];
                            $vendeursLots[$item->id] = $item->vendeur_id;
                        }
                    }
                } else {
                    echo 'Invalid product data<br>';
                }
            }
        } else {
            echo 'Invalid products data<br>';
        }

        // Création de la session Stripe
        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => route('Commande', [], true) . '?session_id={CHECKOUT_SESSION_ID}&success=true',
            'cancel_url' => route('checkout.cancel', [], true),
            'metadata' => [
                'acheteur_id' => $user->id,
                'vendeurs_produits' => json_encode($vendeursProduits),
                'vendeurs_lots' => json_encode($vendeursLots),
                'produit_ids' => json_encode(array_column($produits, 'produit_id')),
                'produit_lot_ids' => json_encode(array_column($produits, 'produit_lot_id')),
                'quantity' => json_encode(array_column($produits, 'quantite')),
            ],
        ]);        // Rediriger vers Stripe
        return Inertia::location($session->url);
    }

    protected function handleSuccessfulPayment($session)
    {
        return response()->json(['status' => 'success', 'message' => 'Payment processed successfully.'], 200);
    }

    public function success() {}

    // public function cancel()
    // {
    //     return view('cancel');
    // }
}
