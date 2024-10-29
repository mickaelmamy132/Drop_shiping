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
                    $vendeurs_lots = json_decode($session->metadata->vendeurs_lots ?? '{}');
                    $vendeurs_produits = json_decode($session->metadata->vendeurs_produits ?? '{}');

                    foreach ($produit_ids as $index => $produit_id) {
                        $commandeData = [
                            'acheteur_id' => $session->metadata->acheteur_id,
                            'reference' => $session->id,
                            'quantite' => $quantities ?? 1,
                            'total' => $session->amount_total / 100,
                            'status' => 'completed',
                            'adresse_livraison' => null,
                            'telephone' => $session->customer_details->phone ?? 'Téléphone non fourni',
                            'email' => $session->customer_details->email ?? 'Email non fourni'
                        ];

                        if ($produit_id) {
                            $commandeData['produit_id'] = $produit_id;
                            $commandeData['produit_lot_id'] = null;
                            $commandeData['vendeur_id'] = $vendeurs_produits->{$produit_id} ?? null;
                        } else {
                            $lot_data = $produit_lot_ids[$index] ?? null;
                            if ($lot_data) {
                                $commandeData['produit_lot_id'] = $lot_data->id ?? null;
                                $commandeData['produit_id'] = null;
                                $commandeData['vendeur_id'] = $vendeurs_lots->{$lot_data->id} ?? null;
                            }
                        }

                        $commande = Commande::create($commandeData);
                        
                        if (!$commande) {
                            return redirect()->route('Panie.index')->with('error', 'Une erreur est survenue lors de la création de la commande.');
                        }
                    }
                    return redirect()->route("Commande")->with('success', 'Votre transaction a été effectuée avec succès!');
                } else {
                    return redirect()->route('Panie.index')->with('error', 'Le paiement a échoué.');
                }
            } catch (\Exception $e) {
                return redirect()->route('Panie.index')->with('error', 'Une erreur est survenue : ' . $e->getMessage());
            }
        } else {
            $commandes = Commande::where('acheteur_id', Auth::user()->id)->get();
            return Inertia::render("ViewClientAcheteur/Commande", [
                'commandes' => $commandes
            ]);
        }
    }
}
