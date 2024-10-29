<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\Checkout\Session as StripeSession;
use App\Models\Commande;
use Illuminate\Support\Facades\Auth;

class CommandeControlleur extends Controller
{
    public function index(Request $request)
    {
        $sessionId = $request->query('session_id');
        $success = $request->query('success', false);

        if ($sessionId && $success) {
            try {
                Stripe::setApiKey(config('Stripe.sk'));
                $session = \Stripe\Checkout\Session::retrieve($sessionId);

                if ($session->payment_status === 'paid') {
                    $produit_ids = json_decode($session->metadata->produit_ids ?? '[]');
                    $produit_lot_ids = json_decode($session->metadata->produit_lot_ids ?? '[]');
                    $quantities = json_decode($session->metadata->quantity ?? '[]');
                    $vendeurs_lots = json_decode($session->metadata->vendeurs_lots ?? '{}', true);
                    $vendeurs_produits = json_decode($session->metadata->vendeurs_produits ?? '{}', true);
                    $prix_unitaires_produits = json_decode($session->metadata->prix_unitaires_produits ?? '{}', true);
                    $prix_unitaires_lots = json_decode($session->metadata->prix_unitaires_lots ?? '{}', true);

                    foreach ($produit_ids as $index => $produit_id) {
                        if ($produit_id) {  // Vérifie si le produit_id est valide
                            $commandeData = [
                                'acheteur_id' => $session->metadata->acheteur_id,
                                'reference' => $session->id,
                                'quantite' => $quantities[$index] ?? 1,
                                'total' => ($prix_unitaires_produits[$produit_id] ?? 0) * ($quantities[$index] ?? 1),
                                'prix_unitaire' => $prix_unitaires_produits[$produit_id] ?? 0,
                                'status' => 'en cours',
                                'adresse_livraison' => null,
                                'telephone' => $session->customer_details->phone ?? 'Téléphone non fourni',
                                'email' => $session->customer_details->email ?? 'Email non fourni',
                                'produit_id' => $produit_id,
                                'produit_lot_id' => null,
                                'vendeur_id' => $vendeurs_produits[$produit_id] ?? null
                            ];

                            Commande::create($commandeData);
                        }
                    }

                    // Enregistrer les commandes pour chaque produit en lot
                    foreach ($produit_lot_ids as $index => $produit_lot) {
                        $produit_lot_id = is_object($produit_lot) ? $produit_lot->id : $produit_lot;

                        if ($produit_lot_id) {  // Vérifie si le produit_lot_id est valide
                            $commandeData = [
                                'acheteur_id' => $session->metadata->acheteur_id,
                                'reference' => $session->id,
                                'quantite' => $quantities[$index] ?? 1,
                                'total' => ($prix_unitaires_lots[$produit_lot_id] ?? 0) * ($quantities[$index] ?? 1),
                                'prix_unitaire' => $prix_unitaires_lots[$produit_lot_id] ?? 0,
                                'status' => 'en cours',
                                'adresse_livraison' => null,
                                'telephone' => $session->customer_details->phone ?? 'Téléphone non fourni',
                                'email' => $session->customer_details->email ?? 'Email non fourni',
                                'produit_id' => null,
                                'produit_lot_id' => $produit_lot_id,
                                'vendeur_id' => $vendeurs_lots[$produit_lot_id] ?? null
                            ];

                            Commande::create($commandeData);
                        }
                    }

                    return redirect()->route("Commande")->with('success', 'Votre transaction a été effectuée avec succès!');
                } else {
                    return redirect()->route('Panier.index')->with('error', 'Le paiement a échoué.');
                }
            } catch (\Exception $e) {
                return redirect()->route('Panier.index')->with('error', 'Une erreur est survenue : ' . $e->getMessage());
            }
        } else {
            $commandes = Commande::with(['produit', 'produit_lot', 'vendeur'])->where('acheteur_id', Auth::user()->id)->get();
            return Inertia::render("ViewClientAcheteur/Commande", [
                'commandes' => $commandes
            ]);
        }
    }
}
