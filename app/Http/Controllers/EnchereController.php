<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreenchereRequest;
use App\Http\Requests\UpdateenchereRequest;
use App\Models\enchere;
use App\Models\Produit_lot;

class EnchereController extends Controller
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreenchereRequest $request)
    {
        $derniere_enchere = Enchere::where('lot_id', $request->lot_id)->orderBy('montant', 'desc')->first();

        if ($derniere_enchere && $request->montant <= $derniere_enchere->montant) {
            return redirect()->back()->with('error', 'Augmentez votre enchère. Le montant est inférieur à l\'enchère actuelle.');
        }
        
        $lot = Produit_lot::find($request->lot_id);
        if ($lot && $lot->fin_enchere && now()->greaterThan($lot->fin_enchere)) {
            return response()->json(['message' => 'L\'enchère est clôturée.'], 403);
        }

        

        // Créer une nouvelle enchère
        Enchere::create([
            'montant' => $request->montant,
            'acheteur_id' => $request->acheteur_id,
            'lot_id' => $request->lot_id,
        ]);

        return redirect()->route('Produit_lots')->with('success', 'Lot enchéri');
    }

    /**
     * Display the specified resource.
     */
    public function show(enchere $enchere)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(enchere $enchere)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateenchereRequest $request, enchere $enchere)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(enchere $enchere)
    {
        //
    }
}
