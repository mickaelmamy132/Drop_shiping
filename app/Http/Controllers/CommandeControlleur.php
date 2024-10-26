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

        // Configurer la clé secrète de Stripe
        Stripe::setApiKey(config('Stripe.sk'));

        if ($sessionId) {
            try {
                // Récupérer la session de paiement depuis Stripe
                $session = StripeSession::retrieve($sessionId);
                dd($session);

                if ($session->payment_status === 'paid') {
                    $commande = new Commande();
                    $commande->acheteur_id = Auth::user()->id;
                    $commande->reference = uniqid('CMD-');
                    $commande->quantite = $session->metadata->quantity;

                    // Vérifier si produit_id existe
                    if (!empty($session->metadata->produit_id) && !empty($session->metadata->produit_lot_id)) {
                        $commande->produit_id = $session->metadata->produit_id;
                        $commande->produit_lot_id = $session->metadata->produit_lot_id;
                    }
                    elseif (!empty($session->metadata->produit_id)) {
                        $commande->produit_id = $session->metadata->produit_id;
                        $commande->produit_lot_id = null;
                    }
                    // Vérifier si produit_lot_id existe
                    elseif (!empty($session->metadata->produit_lot_id)) {
                        $commande->produit_lot_id = $session->metadata->produit_lot_id;
                        $commande->produit_id = null;
                    }

                    $commande->total = $session->amount_total / 100;
                    $commande->status = 'completed';
                    $commande->adresse_livraison = $session->shipping->address->line1;
                    $commande->telephone = $session->customer_details->phone;
                    $commande->email = $session->customer_details->email;
                    $commande->vendeur_id = $session->metadata->vendeur_id;
                    $commande->save();
                    $commandes = Commande::where('acheteur_id', Auth::user()->id)->get();
                    return Inertia::render("ViewClientAcheteur/Commande", [
                        'message' => 'Votre transaction a été effectuée avec succès!',
                        'commandes' => $commandes
                    ]);
                } else {
                    return redirect()->back()->with('error', 'Le paiement a échoué.');
                }
            } catch (\Exception $e) {
                // Gérer les erreurs, par exemple si l'ID de session est invalide
                return redirect()->back()->with('error', 'Une erreur est survenue lors du traitement du paiement.');
            }
        } else {
            $user = Auth::user()->id;
            $commandes = Commande::where('acheteur_id', $user)->get();
            return Inertia::render("ViewClientAcheteur/Commande", [
                'commandes' => $commandes
            ]);
        }
    }
}
