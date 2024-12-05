<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProduitRequest;
use App\Http\Requests\UpdateProduitRequest;
use App\Http\Resources\ProduitResource;
use App\Models\Commande;
use App\Models\Enchere;
use App\Models\Panie;
use App\Models\Produit;
use App\Models\Produit_lot;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Exists;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Stripe\Charge;

class ProduirController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private function checkInternetConnection()
    {
        $connected = @fsockopen("www.stripe.com", 443);
        if ($connected) {
            fclose($connected);
            return true;
        }
        return false;
    }

    public function index_vendeur()
    {

        $userId = Auth::user()->id;

        $produit = Produit::where('vendeur_id', $userId)->count();
        $produit_lot = Produit_lot::where('vendeur_id', $userId)->count();

        $commande = Commande::where('vendeur_id', $userId)->count();
        $encheres = Enchere::where('acheteur_id', '!=', $userId);

        Stripe::setApiKey(config('Stripe.sk'));
       
        $paiements = PaymentIntent::all([
            'limit' => 10, // Par exemple, les 10 derniers paiements
        ]);

        $totalRevenus = 0;
        foreach ($paiements->data as $paiement) {
            if ($paiement->status === 'succeeded') {
                $totalRevenus += $paiement->amount_received / 100; // Convertir en euros/dollars
            }
        }


        return Inertia::render('Dashboard', [
            'commande' => $commande,
            'produit_lot' => $produit_lot,
            'produit' => $produit,
            'encheres' => $encheres->count(),
            'totalRevenus' => $totalRevenus,
        ]);
    }
    public function index()
    {
        $produits = Produit::with('categorie', 'vendeur')->where('quantite', '>', 0)->get();
        return Inertia::render('ViewClientAcheteur/View_produit', ['produits' => $produits]);
    }

    public function view_article_all()
    {
        $userId = Auth::user()->id;

        $produits = Produit::where('vendeur_id', $userId)->get();

        return Inertia::render('ViewClientVendeur/View_article', ['produits' => $produits]);
    }

    public function view_produit_all()
    {
        $userId = Auth::user()->id;
        $article = Produit::first();
        $lot = Produit_lot::first();

        $panie = Panie::where('acheteur_id', $userId)->count();
        $produit_lot = Panie::where('produit_lot_id', $lot ? $lot->id : 0)->count();
        $produit = Panie::where('produit_id', $article ? $article->id : 0)->count();
        $commande = Commande::where('acheteur_id', $userId)->count();
        $encheres = Enchere::where('acheteur_id', $userId)
            ->where('statut', 'en_cours')
            ->count();
        return Inertia::render('ViewClientAcheteur/acheteur', [
            'panie' => $panie,
            'commande' => $commande,
            'produit_lot' => $produit_lot,
            'produit' => $produit,
            'encheres' => $encheres,
        ]);
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
            $path = $request->file('image_rubrique')->store('Produits', 'public');
            $validated['image_rubrique'] = $path;
        }
        Produit::create($validated);
        return redirect()->route('Mes_rubrique/show')->with('success', 'Produit créé');
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $produit = Produit::with('categorie', 'vendeur.user')->findOrFail($id);
        return Inertia('ViewClientAcheteur/Article_infos', [
            'produit' => new ProduitResource($produit),
        ]);
    }

    public function show_vendeur($id)
    {
        $produit = Produit::with('categorie', 'vendeur.user')->findOrFail($id);
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
        $produit = Produit::findOrFail($id);

        $validated = $request->validated();

        if ($request->hasFile('image_rubrique')) {
            if ($produit->image_rubrique && Storage::disk('public')->exists($produit->image_rubrique)) {
                Storage::disk('public')->delete($produit->image_rubrique);
            }
            $image = $request->file('image_rubrique');
            $path = $image->store('Produits', 'public');
            $validated['image_rubrique'] = $path;
        } else {
            $validated['image_rubrique'] = $produit->image_rubrique;
        }

        $produit->update($validated);

        return redirect()->route('Mes_rubrique/show')->with('success', 'Produit mis à jour');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $produit = Produit::findOrFail($id);

        if (!$produit) {
            return redirect()->route('Mes_rubrique/show')->with('error', 'Produit non trouvé');
        }

        if ($produit->vendeur_id !== Auth::user()->id) {
            return back()->with('erro', 'Vous ne pouvez pas supprimer cet artile');
        }
        if ($produit->image_rubrique) {
            Storage::disk('public')->delete($produit->image_rubrique);
        }

        $produit->delete();
        return redirect()->route('Mes_rubrique/show')->with('success', 'Produit mis à jour');
    }
}
