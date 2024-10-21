<?php

namespace App\Http\Controllers;

use App\Models\Panie;
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
    public function createCheckoutSession(Request $request)
    {
        Stripe::setApiKey(config('Stripe.sk'));

        $user = Auth::user();
        $produits = $request->input('produits');
        // dd($produits);
        $lineItems = [];

        if (is_array($produits)) {
            foreach ($produits as $produit) {
                if (is_array($produit)) {
                    // Si un produit normal est présent
                    if (isset($produit['produit_id'])) {
                        $item = Produit::find($produit['produit_id']);
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
                        }
                    }

                    // Si un produit lot est présent et que c'est un objet
                    if (isset($produit['produit_lot_id']) && is_array($produit['produit_lot_id'])) {
                        // Directement récupérer les informations depuis l'objet produit_lot_id
                        $item = $produit['produit_lot_id'];

                        if (isset($item['nom']) && isset($item['prix'])) {
                            $lineItems[] = [
                                'price_data' => [
                                    'currency' => 'eur',
                                    'product_data' => [
                                        'name' => $item['nom'],
                                    ],
                                    'unit_amount' => $produit['prix_totale'] * 100, // Prix en centimes
                                ],
                                'quantity' => $produit['quantite'] ?? 1,
                            ];
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
            'success_url' => route('checkout.success', [], true) . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('checkout.cancel', [], true),
            'metadata' => [
                'acheteur_id' => $user->id, // Stocker uniquement l'ID de l'utilisateur
                'vendeurs' => json_encode($request->vendeurs), // Stocker les vendeurs dans les métadonnées
            ],
        ]);

        // Rediriger vers Stripe
        return Inertia::location($session->url);
    }

    public function handleWebhook(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $endpointSecret = config('services.stripe.webhook_secret'); // Récupérer le secret dans la config

        try {
            $event = Webhook::constructEvent($payload, $sigHeader, $endpointSecret);
        } catch (\UnexpectedValueException $e) {
            // Payload invalide
            return response()->json(['error' => 'Invalid payload'], 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            // Signature non valide
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        // Traiter les événements Stripe ici
        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;
            // Récupérer l'ID de la session Stripe et traiter le paiement
            $this->handleSuccessfulPayment($session);
        }

        return response()->json(['status' => 'success'], 200);
    }

    protected function handleSuccessfulPayment($session)
    {
        // Logique pour gérer un paiement réussi
        // Vous pouvez marquer la commande comme payée, envoyer un e-mail, etc.
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
