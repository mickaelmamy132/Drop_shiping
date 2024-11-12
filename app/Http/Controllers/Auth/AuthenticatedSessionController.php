<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Profil;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    public function create_acheteur(): Response
    {
        return Inertia::render('Auth/Login_acheteur', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    public function create_acheteur2(): Response
    {
        $user = Auth::user();
        return Inertia::render('Auth/Register_acheteur_2', [
            'user' => $user,
        ]);
    }

    public function create_vendeur2(): Response
    {
        $user = Auth::user();
        return Inertia::render('Auth/Register_vendeur_2', [
            'user' => $user,
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = Auth::user();

        $user->load(['acheteur', 'vendeur']);

        if ($user->vendeur === null) {
            return redirect()->route('register_vendeur2')->with('user', $user);
        }

        $user->role='vendeur';
        $user->save();

        $this->authenticated($request, $user);

        return redirect()->intended(route('dashboard', ['absolute' => false]));
    }

    public function store_acheteur(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = Auth::user();

        $user->load(['acheteur', 'vendeur']);

        if ($user->acheteur === null) {
            return redirect()->route('register_acheteur2')->with('user', $user);
        }

        $user->role='acheteur';
        $user->save();

        return redirect()->route('Acheteur');
    }

    

    /**
     * Destroy an authenticated session.
     */

    public function destroy(Request $request): RedirectResponse
    {
        $user = Auth::user();
        if ($user) {
            $user->role = '';
            $user->save();
        }

        // Déconnexion de l'utilisateur
        Auth::guard('web')->logout();

        // Invalidation de la session
        $request->session()->invalidate();

        // Régénération du token de session
        $request->session()->regenerateToken();

        // Redirection vers la page d'accueil
        return redirect('/');
    }

    /**
     * Handle additional actions after authentication.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return void
     */
    protected function authenticated(Request $request, $user) {}
}
