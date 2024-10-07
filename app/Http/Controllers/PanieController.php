<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePanieRequest;
use App\Http\Requests\UpdatePanieRequest;
use App\Http\Resources\PanieResource;
use App\Models\Panie;
use App\Models\Produit;
use Illuminate\Auth\Events\Validated;
use Illuminate\Support\Facades\Auth;

class PanieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response 
     */
    public function index()
    {
        $userId = Auth::user()->id;

        $panier = Panie::with('produits.categorie', 'vendeur.user', 'produit_lot')->where('acheteur_id', $userId)->get();

        // dd($panier);
        return inertia('ViewClientAcheteur/Panier', [
            'panies' => PanieResource::collection($panier)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePanieRequest $request)
    {
        $validated = $request->validated();
        // dd($validated);
        $product = Produit::findOrFail($validated['produit_id']);

        // Vérifier si le produit est déjà dans le panier
        $existingPanie = Panie::where('produit_id', $validated['produit_id'])->first();
        if ($existingPanie) {
            return back()->withErrors(['error' => 'Ce produit est déjà dans votre panier']);
        }

        if ($product->quantite < $validated['quantite']) {
            return back()->withErrors(['error' => 'Quantité insuffisante en stock']);
        }

        $prix_total = $product->prix * $validated['quantite'];
        $validated['prix_totale'] = $prix_total;
        $validated['status'] = 'en attente';
        $validated['prix'] = $product->prix;

        $panie = Panie::create($validated);

        // Mise à jour de la quantité du produit
        $product->quantite -= $validated['quantite'];
        $product->save();

        return back()->with('success', 'Produit ajouté au panier avec succès');
    }

    /**
     * Display the specified resource.
     */
    public function show(Panie $panie)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Panie $panie)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePanieRequest $request, Panie $panie)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Panie $panie, $id)
    {
        $panie = Panie::findOrFail($id);
        $product = Produit::findOrFail($panie->produit_id);
        $product->quantite += $panie->quantite;
        $product->save();
        
        $panie->delete();

        return back()->with('success', 'Produit retiré du panier avec succès');
    }

    public function destroy_lot($id)
    {
        $panie = Panie::findOrFail($id);
        // dd($panie);
        // $product = Produit_lot::findOrFail($panie->produit_lot_id);
        // dd($product);
        // $product->quantite += $panie->quantite;
        // $product->save();

        $panie->delete();

        return back()->with('success', 'lot retiré du panier avec succès');
    }
}