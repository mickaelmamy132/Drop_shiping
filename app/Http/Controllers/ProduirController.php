<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProduitRequest;
use App\Http\Requests\UpdateProduitRequest;
use App\Models\Produit;
use Illuminate\Container\Attributes\Storage;
use Inertia\Inertia;

class ProduirController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $produits = Produit::all();
        return Inertia::render('Dashboard', ['produits' => $produits]);
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
        
        $validated = $request->validated();
        if ($request->hasFile('image_rubrique')) {
            $path = $request->file('image_rubrique')->store('Produits');
            $validated['image_rubrique'] = $path;
        }
        Produit::create($validated);
        return redirect()->route('dashboard')->with('success', 'Produit créé');
    }


    /**
     * Display the specified resource.
     */
    public function show(Produit $produit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Produit $produit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProduitRequest $request, Produit $produit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Produit $produit)
    {
        //
    }
}
