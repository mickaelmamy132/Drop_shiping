<?php

use App\Http\Controllers\ProduirController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegisterAcheteur' => Route::has('register_acheteur'),
        'canRegisterVendeur' => Route::has('register_vendeur'),
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    Route::get('Acheteur', fn() => Inertia::render('ViewClientAcheteur/acheteur'))->name('Acheteur');

    Route::get('consulter_article', fn() => Inertia::render('ViewClientAcheteur/Article_infos'))->name('consulter_article');

    Route::resource('Produit',ProduirController::class);
});


Route::middleware('auth')->group(function () {
    Route::get('/categories', [ProfileController::class, 'Categorie'])->name('categories');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

require __DIR__ . '/auth.php';
