<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CheckoutControlleur;
use App\Http\Controllers\Controller;
use App\Http\Controllers\EnchereController;
use App\Http\Controllers\PanieController;
use App\Http\Controllers\ProduirController;
use App\Http\Controllers\ProduitControllerLot;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canLogin_acheteurr' => Route::has('login_acheteur'),
        'canRegisterAcheteur' => Route::has('register_acheteur'),
        'canRegisterVendeur' => Route::has('register_vendeur'),
    ]);
});

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
    Route::get('/success', [CheckoutControlleur::class, 'success'])->name('checkout.success');
    Route::get('/cancel', [CheckoutControlleur::class, 'cancel'])->name('checkout.cancel');

});



Route::middleware('auth')->group(function () {
    Route::get('/categories', [ProfileController::class, 'Categorie'])->name('categories');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
