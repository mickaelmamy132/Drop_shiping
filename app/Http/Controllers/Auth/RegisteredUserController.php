<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Acheteur;
use App\Models\Vendeur;

use PhpParser\Node\Expr\Exit_;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create_acheteur(): Response
    {
        return Inertia::render('Auth/Register_acheteur');
    }

    public function create_vendeur(): Response
    {
        return Inertia::render('Auth/Register_vendeur');
    }
    /** 
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store_acheteur(Request $request): RedirectResponse
    {
        try {
            // Validation des données du formulaire
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
                'numero' => 'required|string|max:15',
                'genre' => 'required|string|max:10',
                'pays' => 'required|string|max:50',
                'tva' => 'required|string|max:50',
                'nif' => 'required|string|max:50',
            ]);

            // Création de l'utilisateur
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'role' => 'acheteur',
                'password' => Hash::make($request->password),
            ]);


            // Création de l'acheteur
            $acheteur = Acheteur::create([
                'user_id' => $user->id,
                'numero' => $request->numero,
                'genre' => $request->genre,
                'pays' => $request->pays,
                'tva' => $request->tva,
                'nif' => $request->nif,
            ]);

            event(new Registered($user));

            Auth::login($user);

            return redirect()->route('Acheteur');
        } catch (\Exception $e) {
            echo $e->getMessage();
            exit;
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function switchRole($role)
    {
        $user = Auth::user();

        if (in_array($role, ['acheteur', 'vendeur'])) {
            $user->switchRole($role);

            // Rafraîchir l'utilisateur pour obtenir le rôle mis à jour
            $user->refresh();

            if ($user->role === 'acheteur') {
                return Inertia::location(route('Acheteur'));
            } elseif ($user->role === 'vendeur') {
                return Inertia::location(route('dashboard'));
            }
        }

        return back()->withErrors(['error' => 'Rôle invalide']);
    }
}
