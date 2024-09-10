<?php

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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'canSwicht' => Route::has('Acheteur'),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/Acheteur', function () {
    return Inertia::render('ViewClientAcheteur/acheteur', [
        'canSwicht' => Route::has('dashboard'),
    ]);
})->middleware(['auth', 'verified'])->name('Acheteur');

Route::post('/switch/{role}', function ($role) {
    Auth::user()->switchRole($role);
    if ($role === 'acheteur') {
        return redirect()->route('Acheteur');
    }
    return redirect()->route('dashboard');
})->middleware(['auth', 'verified'])->name('switch');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
