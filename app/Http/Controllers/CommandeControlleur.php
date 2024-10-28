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
                \Stripe\Stripe::setApiKey(config('services.stripe.secret'));
                $session = \Stripe\Checkout\Session::retrieve($sessionId);

                if ($session->payment_status === 'paid') {
                    // Décoder les données de commande depuis les métadonnées
                    $produit_ids = json_decode($session->metadata->produit_ids ?? '[]');
                    $produit_lot_ids = json_decode($session->metadata->produit_lot_ids ?? '[]');
                    $quantities = json_decode($session->metadata->quantity ?? '[]');
                    $vendeurs_lots = json_decode($session->metadata->vendeurs_lots ?? '{}');
                    $vendeurs_produits = json_decode($session->metadata->vendeurs_produits ?? '{}');

                    foreach ($produit_ids as $index => $produit_id) {
                        $commande = new Commande();
                        $commande->acheteur_id = $session->metadata->acheteur_id;
                        $commande->reference = $session->id;
                        $commande->quantite = $quantities[$index] ?? 1;

                        if ($produit_id) {
                            $commande->produit_id = $produit_id;
                            $commande->produit_lot_id = null;
                            $commande->vendeur_id = $vendeurs_produits->{$produit_id} ?? null;
                        } else {
                            $lot_data = $produit_lot_ids[$index] ?? null;
                            if ($lot_data) {
                                $commande->produit_lot_id = $lot_data->id ?? null;
                                $commande->produit_id = null;
                                $commande->vendeur_id = $vendeurs_lots->{$lot_data->id} ?? null;
                            }
                        }

                        $commande->total = $session->amount_total / 100;
                        $commande->status = 'completed';
                        $commande->adresse_livraison = null;
                        $commande->telephone = $session->customer_details->phone ?? 'Téléphone non fourni';
                        $commande->email = $session->customer_details->email ?? 'Email non fourni';

                        $commande->save();

                        if (!$commande->save()) {
                            throw new \Exception('Erreur lors de l\'enregistrement de la commande');
                        }
                    }

                    return redirect()->route("Commande")->with('message', 'Votre transaction a été effectuée avec succès!');
                } else {
                    return redirect()->route("Commande")->with('error', 'Le paiement a échoué.');
                }
            } catch (\Exception $e) {
                return redirect()->route("Commande")->with('error', 'Une erreur est survenue : ' . $e->getMessage());
            }
        } else {
            $commandes = Commande::where('acheteur_id', Auth::user()->id)->get();
            return Inertia::render("ViewClientAcheteur/Commande", [
                'commandes' => $commandes
            ]);
        }
    }
}
