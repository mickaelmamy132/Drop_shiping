<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Produit;
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
}
