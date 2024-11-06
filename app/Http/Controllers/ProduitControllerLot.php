<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProduit_lotRequest;
use App\Http\Requests\UpdateProduit_lotRequest;
use App\Http\Resources\EnchereResource;
use App\Models\Panie;
use App\Models\Produit;
use App\Models\Produit_lot;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProduitControllerLot extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $lots = Produit_lot::with(['enchere' => function ($query) {
            $query->latest();
        }, 'vendeur.user', 'categorie'])
            ->withCount('enchere')
            ->where('vendeur_id', $user->id)
            ->get();

        $lots = $lots->map(function ($lot) {
            $lot->montant = $lot->enchere->first()->montant ?? null;
            return $lot;
        });
 
        return Inertia::render("ViewClientVendeur/Produit_lot", ['lots' => $lots]);
    }
    public function  index_acheteur()
    {
        $user = Auth::user();
        $lots = Produit_lot::with(['enchere' => function ($query) {
            $query->latest();
        }, 'vendeur.user', 'categorie'])
            ->withCount('enchere')
            ->where('vendeur_id', '!=', $user->id)
            ->get();
        $lots = $lots->map(function ($lot) {
            $lot->montant = $lot->enchere->first()->montant ?? null;
            return $lot;
        });
        return Inertia::render("ViewClientAcheteur/Produit_lot", ['lots' => $lots]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("ViewClientVendeur/Add_lot");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProduit_lotRequest $request)
    {
        $validated = $request->validated();
        $prix_public = $validated['quantite'] * $validated['prix'];

        if ($request->hasFile('image_lot')) {
            $image_lot = $request->file('image_lot');
            $path = $image_lot->store('Produits_lot', 'public');
            $validated['image_lot'] = $path;
        }

        $validated['prix_public'] = $prix_public;

        Produit_lot::create($validated);
        return redirect()->route('Produit_Lot.index')->with('success', 'Lot créé avec succès');
    }

    /**
     * Display the specified resource.
     */
    public function show(Produit_lot $produit_lot,  $produit_lost)
    {
        $produit_lot = Produit_lot::with(['enchere' => function ($query) {
            $query->latest();
        }, 'vendeur.user', 'categorie'])
            ->withCount('enchere')
            ->where('id', $produit_lost)
            ->get();
        // dd($produit_lot);
        return Inertia::render("ViewClientAcheteur/Produit_lot_infos", ['produit_lot' => $produit_lot]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Produit_lot $produit_lot)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProduit_lotRequest $request, Produit_lot $produit_lot)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Produit_lot $produit_lot, $id)
    {
       //
    }
}
