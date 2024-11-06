<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Produit;
use App\Models\Produit_lot;
use Illuminate\Http\Request;
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
        $produit = Produit_lot::all();
        return Inertia::render('ViewClientAcheteur/Inbox_acheteur', ['produit' => $produit]);
    }
    public function inbox_vendeur()
    {
        $produit = Produit_lot::all();
        return Inertia::render('ViewClientVendeur/Inbox_vendeur', ['produit' => $produit]);
    }
}
