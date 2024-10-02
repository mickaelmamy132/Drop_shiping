<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreenchereRequest;
use App\Http\Requests\UpdateenchereRequest;
use App\Jobs\ProcessEnchereExpiree;
use App\Models\enchere;
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
        $derniere_enchere = Enchere::where('lot_id', $request->lot_id)->orderBy('montant', 'desc')->first();

        if ($derniere_enchere && $request->montant <= $derniere_enchere->montant) {
            return back()->withErrors(['montant' => 'Le montant de l\'enchère doit être supérieur à l\'enchère précédente.']);
        }

        $lot = Produit_lot::find($request->lot_id);
        if ($lot && $lot->fin_enchere && now()->greaterThan($lot->fin_enchere)) {
            return back()->withErrors(['enchere' => 'L\'enchère est terminée.']);
        }

        Enchere::create([
            'montant' => $request->montant,
            'acheteur_id' => $request->acheteur_id,
            'lot_id' => $request->lot_id,
        ]);

        if (!$lot->fin_enchere) {
            // Si aucun compte à rebours n'est en cours, définir la fin de l'enchère à 2 heures
            $lot->fin_enchere = now()->addHours(2);
            $lot->save();

            // Planifier le job qui va s'exécuter à la fin de l'enchère
            ProcessEnchereExpiree::dispatch($lot)->delay($lot->fin_enchere);
        }
        return redirect()->back()->with('success', 'Enchère placée avec succès.');
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
