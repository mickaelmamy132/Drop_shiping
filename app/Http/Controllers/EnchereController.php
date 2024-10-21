<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreenchereRequest;
use App\Http\Requests\UpdateenchereRequest;
use App\Jobs\ProcessEnchereExpiree;
use App\Models\Enchere;
use App\Models\Produit_lot;
use Carbon\Carbon;

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
        
        $lot = Produit_lot::find($request->lot_id);
        $prix_base = $lot->prix_public;
        
        $derniere_enchere = Enchere::where('lot_id', $request->lot_id)
            ->orderBy('montant', 'desc')
            ->first();

        if ($request->montant < $prix_base) {
            return back()->withErrors(['montant' => 'Le montant de l\'enchère doit être supérieur au prix de base de ' . $prix_base . ' €.']);
        }

        if ($derniere_enchere && $request->montant <= $derniere_enchere->montant) {
            return back()->withErrors(['montant' => 'Le montant de l\'enchère doit être supérieur à l\'enchère précédente.' . $derniere_enchere->montant . ' €.']);
        }

        $enchere = Enchere::where('lot_id', $request->lot_id)->first();

        if ($enchere && $enchere->fin_enchere && now()->greaterThan($enchere->fin_enchere)) {
            return back()->withErrors(['enchere' => 'L\'enchère est terminée.']);
        }

        $fin_enchere = $enchere ? ($enchere->fin_enchere ?? now()->addDays(2)) : now()->addDays(2);
        $nouvelleEnchere = Enchere::create([
            'montant' => $request->montant,
            'acheteur_id' => $request->acheteur_id,
            'lot_id' => $request->lot_id,
            'fin_enchere' => $fin_enchere,
            'statut' => 'en cours',
        ]);

        // Retourner un message de succès
        return redirect()->back()->with('success', 'Enchère placée avec succès.');
    }






    /**
     * Display the specified resource.
     */
    public function show(Enchere $enchere)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Enchere $enchere)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateenchereRequest $request, Enchere $enchere)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Enchere $enchere)
    {
        //
    }
}
