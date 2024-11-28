<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Produit;
use App\Models\Produit_lot;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
        $produit_lot = Produit_lot::count();
        $allUser = User::where('id', '!=', $user->id)->get();
        return Inertia::render('Admin/Dashboard', [
            'produit' => $produit,
            'produit_lot' => $produit_lot,
            'allUser' => $allUser
        ]);
    }
}
