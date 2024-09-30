<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProduit_lotRequest;
use App\Http\Requests\UpdateProduit_lotRequest;
use App\Models\Produit_lot;
use Inertia\Inertia;

class ProduitControllerLot extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Produit_lot $produit_lot)
    {
        //
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
    public function destroy(Produit_lot $produit_lot)
    {
        //
    }
}
