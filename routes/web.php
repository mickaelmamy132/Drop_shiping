<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CheckoutControlleur;
use App\Http\Controllers\CommandeControlleur;
use App\Http\Controllers\Controlleur_simple;
use App\Http\Controllers\EnchereController;
use App\Http\Controllers\PanieController;
use App\Http\Controllers\ProduirController;
use App\Http\Controllers\ProduitControllerLot;
use App\Http\Controllers\ProfileController;
use App\Models\Produit;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia; 
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    $produit = Produit::all();
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canLogin_acheteurr' => Route::has('login_acheteur'),
        'canRegisterAcheteur' => Route::has('register_acheteur'),
        'canRegisterVendeur' => Route::has('register_vendeur'),
    ]);
});

Route::get('/categorieses', [Controlleur_simple::class, 'Categories'])->name('categorieses');


Route::get('/voir-rubriques',[Controlleur_simple::class,'voir_artcles'])->name('voir-rubriques');
Route::get('/voir-lots',[Controlleur_simple::class,'voir_lots'])->name('voir-lots');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [ProduirController::class, 'index_vendeur'])->name('dashboard');
    Route::get('/Acheteur', [ProduirController::class, 'view_produit_all'])->name('Acheteur');

    Route::get('Mes_rubrique/show', [ProduirController::class, 'view_article_all'])->name('Mes_rubrique/show');
    Route::get('/Produit/show_vendeur/{produit}', [ProduirController::class, 'show_vendeur'])->name('Produit.show_vendeur');
    Route::get('/Produit/show_form/{produit}', [ProduirController::class, 'show_vendeur_form'])->name('Produit.show_form');
    Route::resource('Produit', ProduirController::class);
    Route::resource('Produit_Lot', ProduitControllerLot::class);
    Route::resource('enchere', EnchereController::class);

    Route::delete('PanieLot/destroy/{produit_lot}', [PanieController::class, 'destroy_lot'])->name('panieLot.destroy');
    Route::get('Produit_lots', [ProduitControllerLot::class, 'index_acheteur'])->name('Produit_lots');
    Route::post('/checkout', [CheckoutControlleur::class, 'createCheckoutSession'])->name('checkout');


    Route::resource('Panie', PanieController::class);
    Route::get('/success', [CheckoutControlleur::class, 'success'])->name('success');
    Route::get('/cancel', [CheckoutControlleur::class, 'cancel'])->name('checkout.cancel');

    Route::get('/Commande', [CommandeControlleur::class, 'index'])->name('Commande');
    Route::get('/Commande_vendeur', [CommandeControlleur::class, 'index_vendeur'])->name('Commande_vendeur');

    Route::post('/webhook/stripe', [PanieController::class, 'handleWebhook'])->name('webhook.stripe');

    Route::get('inbox', [Controlleur_simple::class, 'inbox'])->name('inbox');
    Route::get('inbox_vendeur',[Controlleur_simple::class, 'inbox_vendeur'])->name('inbox_vendeur');
});


Route::middleware('auth')->group(function () {
    Route::get('/categories', [ProfileController::class, 'Categorie'])->name('categories');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
