<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use App\Models\Produit_lot;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class CheckoutControlleur extends Controller
{
    public function createCheckoutSession(Request $request)
    {
        $produits = $request->all();
        $user = Auth::user()->id;

        
        foreach ($produits as $produit) {
            if (isset($produit['produit_id'])) {
                // Cas d'un produit lot
                $produitLot = Produit_lot::find($produit['produit_lot_id']);  // Trouver le produit lot via son ID
                if (!$produitLot) {
                    return response()->json(['error' => 'Produit lot non trouvé'], 404);
                }
                $vendeur = $produitLot->vendeur;  // Relation vendeur dans ProduitLot
            } elseif (isset($produit['produit_id'])) {
                // Cas d'un produit normal
                $produitNormal = Produit::find($produit['produit_id']);
                if (!$produitNormal) {
                    return response()->json(['error' => 'Produit non trouvé'], 404);
                }
                $vendeur = $produitNormal->vendeur;  // Relation vendeur dans Produit
            } else {
                return response()->json(['error' => 'Aucun produit trouvé'], 400);
            }

            // Récupérer l'acheteur à partir de l'utilisateur connecté
            $acheteur = $user;

            // Debug : Afficher les informations du produit, vendeur et acheteur
            dd([
                'produit' => isset($produitLot) ? $produitLot : $produitNormal,
                'vendeur' => $vendeur,
                'acheteur' => $acheteur
            ]);
        }



        // Stripe::setApiKey(config('Stripe.sk'));

        // $lineItems = [];
        // foreach ($request->produits as $produit) {
        //     $lineItems[] = [
        //         'price_data' => [
        //             'currency' => 'eur',
        //             'product_data' => [
        //                 'name' => 'Produit ID: ' . $produit['produit_id'],
        //             ],
        //             'unit_amount' => intval(floatval($produit['prix_totale']) * 100 / $produit['quantite']),
        //         ],
        //         'quantity' => $produit['quantite'],
        //     ];
        // }

        // $session = Session::create([
        //     'payment_method_types' => ['card'],
        //     'line_items' => $lineItems,
        //     'mode' => 'payment',
        //     'success_url' => route('checkout.success', [], true) . '?session_id={CHECKOUT_SESSION_ID}',
        //     'cancel_url' => route('checkout.cancel', [], true),
        //     'metadata' => [
        //         'acheteur_id' => $request->acheteur_id,
        //         'vendeurs' => json_encode($request->vendeurs),
        //     ],
        // ]);

        // return Inertia::location($session->url);
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
