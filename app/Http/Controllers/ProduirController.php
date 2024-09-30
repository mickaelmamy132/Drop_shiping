<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProduitRequest;
use App\Http\Requests\UpdateProduitRequest;
use App\Http\Resources\ProduitResource;
use App\Models\Produit;
use Illuminate\Container\Attributes\Storage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProduirController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index_vendeur()
    {
        $userId = Auth::user()->id;

        $produits = Produit::where('vendeur_id', $userId)->get();

        return Inertia::render('Dashboard', ['produits' => $produits]);
    }

    public function index()
    {

        $produits = Produit::all();
        return Inertia::render('ViewClientAcheteur/acheteur', ['produits' => $produits]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("ViewClientVendeur/Add_rubrique");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProduitRequest $request)
    {
        // dd($request);

        $validated = $request->validated();
        if ($request->hasFile('image_rubrique')) {
            $path = $request->file('image_rubrique')->store('Produits', 'public');
            $validated['image_rubrique'] = $path;
        }
        Produit::create($validated);
        return redirect()->route('dashboard')->with('success', 'Produit créé');
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $produit = Produit::with('categorie', 'vendeur.user')->findOrFail($id);
        // dd($produit->categorie, $produit->vendeur);
        return Inertia('ViewClientAcheteur/Article_infos', [
            'produit' => new ProduitResource($produit),
        ]);
    }

    public function show_vendeur($id)
    {
        $produit = Produit::with('categorie', 'vendeur.user')->findOrFail($id);
        // dd($produit->categorie, $produit->vendeur);
        return Inertia('ViewClientVendeur/Article_infos', [
            'produit' => new ProduitResource($produit),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Produit $produit, $id)
    {
        $produit = Produit::with('categorie', 'vendeur.user')->findOrFail($id);
        return Inertia::render("ViewClientVendeur/Edit_rubrique", [
            'produit' => new ProduitResource($produit),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProduitRequest $request, $id)
    {
        // dd($request->all(), $id);
        $produit = Produit::findOrFail($id);

        $validated = $request->validated();

        if ($request->hasFile('image_rubrique')) {
            $path = $request->file('image_rubrique')->store('Produits', 'public');
            $validated['image_rubrique'] = $path;
        } else {
            $validated['image_rubrique'] = $produit->image_rubrique;
        }

        $produit->update($validated);

        return redirect()->route('dashboard')->with('success', 'Produit mis à jour');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Produit $produit)
    {
        //
    }
}
