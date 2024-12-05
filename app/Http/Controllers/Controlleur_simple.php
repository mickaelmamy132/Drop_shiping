<?php

namespace App\Http\Controllers;

use App\Models\Acheteur;
use App\Models\Categorie;
use App\Models\Commande;
use App\Models\Produit;
use App\Models\Produit_lot;
use App\Models\User;
use App\Models\Vendeur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class Controlleur_simple extends Controller
{
    public function Categories()
    {
        $Categories = Categorie::all();
        return response()->json($Categories);
    }


    public function voir_artcles()
    {
        $produit = Produit::all();
        return Inertia::render('view_article', ['produits' => $produit]);
    }

    public function voir_lots()
    {
        $lots = Produit_lot::with(['enchere' => function ($query) {
            $query->latest();
        }, 'vendeur.user', 'categorie'])
            ->withCount('enchere')
            ->get();
        $lots = $lots->map(function ($lot) {
            $lot->montant = $lot->enchere->first()->montant ?? null;
            return $lot;
        });
        return Inertia::render('view_lot', ['lots' => $lots]);
    }

    public function inbox()
    {
        $produit = Produit_lot::with(['enchere', 'vendeur.user', 'categorie'])->get();
        $acheteur = User::with(['acheteur', 'vendeur'])->get();
        return Inertia::render('ViewClientAcheteur/Inbox_acheteur', ['produit' => $produit, 'acheteur' => $acheteur]);
    }
    public function inbox_vendeur()
    {
        $produit = Produit_lot::with(['enchere', 'vendeur.user', 'categorie'])->get();
        $acheteur = User::with(['acheteur', 'vendeur'])->get();
        return Inertia::render('ViewClientVendeur/Inbox_vendeur', ['produit' => $produit, 'acheteur' => $acheteur]);
    }

    /**
     * Renders the dashboard view with the list of products.
     *
     * This method retrieves all the products from the database and passes them to the 'dashboard' Inertia view.
     *
     * @return \Inertia\Response
     */
    public function view_dashboard()
    {
        $user = Auth::user();
        $produit = Produit::all();
        $produitCount = Produit::count();
        $produit_lot = Produit_lot::count();
        $produit_lotCount = Produit_lot::count();
        $AcheteurCount = Acheteur::where('user_id', '!=', $user->id)->count();
        $VendeurCount = Vendeur::where('user_id', '!=', $user->id)->count();
        $CommandeParMois = Commande::selectRaw('MONTH(created_at) as mois, COUNT(*) as total')
            ->groupBy('mois')
            ->orderBy('mois')
            ->get();
        Stripe::setApiKey(config('Stripe.sk'));

        $paiements = PaymentIntent::all([
            'limit' => 10, // Par exemple, les 10 derniers paiements
        ]);

        $totalRevenus = 0;
        foreach ($paiements->data as $paiement) {
            if ($paiement->status === 'succeeded') {
                $totalRevenus += $paiement->amount_received / 100; // Convertir en euros/dollars
            }
        }


        return Inertia::render('Admin/Dashboard', [
            'produit' => $produit,
            'produit_lot' => $produit_lot,
            'AcheteurCount' => $AcheteurCount,
            'VendeurCount' => $VendeurCount,
            'CommandeParMois' => $CommandeParMois,
            'produitCount' => $produitCount,
            'produit_lotCount' => $produit_lotCount,
            'totalRevenus' => $totalRevenus,
        ]);
    }

    public function gereComptesacheteur()
    {
        $allAcheteur = Acheteur::with('user')->get();
        return Inertia::render('Admin/GereComptes_acheteur', [
            'allAcheteur' => $allAcheteur,
        ]);
    }

    public function gereComptesvendeur()
    {
        $produit = Produit::count();
        $produit_lot = Produit_lot::count();
        $allVendeur = Vendeur::with('user')->get();
        return Inertia::render('Admin/GereComptes_vendeur', [
            'allVendeur' => $allVendeur,
            'produit' => $produit,
            'produit_lot' => $produit_lot,
        ]);
    }

    public function infos_vendeur($id)
    {
        $vendeur = Vendeur::where('user_id', $id)->firstOrFail();
        $produit = Produit::where('vendeur_id', $vendeur->user_id)->get();
        $produit_lot = Produit_lot::where('vendeur_id', $vendeur->user_id)->get();
        return Inertia::render('Admin/View/View_vendeur', [
            'produit' => $produit,
            'produit_lot' => $produit_lot,
            'vendeur' => $vendeur,
        ]);
    }

    public function gereComptesCommande() {
        $commandes = Commande::with(['produit', 'produit_lot', 'vendeur', 'user.acheteur'])->get();
        // dd($commandes);
        return Inertia::render('Admin/GereCommande', [
            'commandes' => $commandes,
        ]);    }


    public function Blog_view()
    {
        return Inertia::render('Bloc');
    }
}
