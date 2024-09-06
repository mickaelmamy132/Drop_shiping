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
use App\Models\Profil;
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
                'password' => Hash::make($request->password),
            ]);

            // Création du profil associé à l'utilisateur
            $profil = Profil::create([
                'user_id' => $user->id,
                'Role' => 'Acheteur',
            ]);

            // Création de l'acheteur
            $acheteur = Acheteur::create([
                'profil_id' => $profil->id,
                'numero' => $request->numero,
                'genre' => $request->genre,
                'pays' => $request->pays,
                'tva' => $request->tva,
                'nif' => $request->nif,
            ]);

            // Déclenche l'événement d'enregistrement
            event(new Registered($user));

            // Authentifie l'utilisateur
            Auth::login($user);

            // Redirection vers la route définie
            return redirect()->route('Acheteur');
        } catch (\Exception $e) {
            echo $e->getMessage();
            exit;
            // Gère l'exception et retourne une réponse appropriée
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
