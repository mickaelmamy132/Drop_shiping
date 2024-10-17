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

    public function store_acheteur_2(Request $request): RedirectResponse
    {
        try {
            $request->validate([
                'numero' => 'required|string|max:15',
                'genre' => 'required|string|max:10',
                'pays' => 'required|string|max:50',
                'tva' => 'required|string|max:50',
                'nif' => 'required|string|max:50',
            ]);
            $role = 'acheteur';

            $user = Auth::user();

            $acheteur = new Acheteur();
            $acheteur->user_id = $user->id;
            $acheteur->numero = $request->numero;
            $acheteur->genre = $request->genre;
            $acheteur->pays = $request->pays;
            $acheteur->tva = $request->tva;
            $acheteur->nif = $request->nif;
            $acheteur->save();
            $user->switchRole($role);
            return redirect()->route('Acheteur');
        } catch (\Exception $e) {
            echo $e->getMessage();
            exit;
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }


    public function store_vendeur(Request $request): RedirectResponse
    {
        try {
            // Validation des données du formulaire
            $validatedData = $request->validate([
                'nom' => 'required|string|max:255',
                'prenom' => 'required|string|max:255',
                'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
                'numero' => 'required|string|max:15',
                'industrie' => 'required|array',
                'nom_de_l_entreprise' => 'required|string',
                'description' => 'required|string|max:100',
                'ville' => 'required|string|max:100',
                'code_postal' => 'required|string|max:20',
                'activite' => 'required|array',
                'facturation' => 'required|string',
                'adresse_livraison' => 'nullable|string|max:255',
                'ville_livraison' => 'nullable|string|max:100',
                'code_postal_livraison' => 'nullable|string|max:20',
                'documentation' => 'required|file|mimes:pdf,doc,docx|max:20048',
            ]);

            $path = null;
            if ($request->hasFile('documentation') && $request->file('documentation')->isValid()) {
                $path = $request->file('documentation')->store('Documentation', 'public');
            }

            // Création de l'utilisateur et du vendeur
            $user = User::create([
                'name' => $validatedData['nom'] . ' ' . $validatedData['prenom'],
                'email' => $validatedData['email'],
                'role' => 'vendeur',
                'password' => Hash::make($validatedData['password']),
            ]);

            $vendeur = Vendeur::create([
                'user_id' => $user->id,
                'numero' => $validatedData['numero'],
                'facturation' => $validatedData['facturation'],
                'industrie' => json_encode($validatedData['industrie']),
                'nom_de_l_entreprise' => $validatedData['nom_de_l_entreprise'],
                'description' => $validatedData['description'],
                'documentation' => $path,
                'ville' => $validatedData['ville'],
                'code_postal' => $validatedData['code_postal'],
                'activite' => json_encode($validatedData['activite']),
                'adresse_livraison' => $validatedData['adresse_livraison'] ?? null,
                'ville_livraison' => $validatedData['ville_livraison'] ?? null,
                'code_postal_livraison' => $validatedData['code_postal_livraison'] ?? null,
            ]);

            event(new Registered($user));

            Auth::login($user);

            return redirect()->route('dashboard');
        } catch (\Exception $e) {
            echo $e->getMessage();
            exit;
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function store_vendeur_2(Request $request): RedirectResponse
    {
        try {
            $request->validate([
                'numero' => 'required|string|max:15',
                'facturation' => 'required|string',
                'industrie' => 'required|array',
                'nom_de_l_entreprise' => 'required|string',
                'description' => 'required|string|max:100',
                'ville' => 'required|string|max:100',
                'code_postal' => 'required|string|max:20',
                'activite' => 'required|array',
                'adresse_livraison' => 'nullable|string|max:255',
                'ville_livraison' => 'nullable|string|max:100',
                'code_postal_livraison' => 'nullable|string|max:20',
                'documentation' => 'required|file|mimes:pdf,doc,docx|max:20048',
            ]);


            $path = null;
            if ($request->hasFile('documentation') && $request->file('documentation')->isValid()) {
                $path = $request->file('documentation')->store('Documentation', 'public');
            }
            $user = Auth::user();
            $role = 'vendeur';

            $vendeur = new Vendeur();
            $vendeur->user_id = $user->id;
            $vendeur->numero = $request->input('numero');
            $vendeur->facturation = $request->input('facturation');
            $vendeur->industrie = json_encode($request->input('industrie'));
            $vendeur->nom_de_l_entreprise = $request->input('nom_de_l_entreprise');
            $vendeur->description = $request->input('description');
            $vendeur->ville = $request->input('ville');
            $vendeur->code_postal = $request->input('code_postal');
            $vendeur->activite = json_encode($request->input('activite'));
            $vendeur->adresse_livraison = $request->input('adresse_livraison');
            $vendeur->ville_livraison = $request->input('ville_livraison');
            $vendeur->code_postal_livraison = $request->input('code_postal_livraison');
            $vendeur->documentation = $path;
            $vendeur->save();
            $user->switchRole($role);
            return redirect()->route('dashboard');
        } catch (\Exception $e) {
            echo $e->getMessage();
            exit;
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function switchRole($role)
    {
        $user = Auth::user();
        if ($role === 'acheteur') {
            if ($user->acheteur === null) {
                return Inertia::render('Auth/Register_acheteur_2', [
                    'user' => $user,
                ]);
            }
            $user->switchRole($role);
            return Inertia::location(route('Acheteur'));
        } elseif ($role === 'vendeur') {
            if ($user->vendeur === null) {
                return Inertia::render('Auth/Register_vendeur_2', [
                    'user' => $user,
                ]);
            }
            $user->switchRole($role);
            return Inertia::location(route('dashboard'));
        } else {
            return response()->json(['error' => 'Rôle invalide'], 400);
        }

        return back()->withErrors(['error' => 'Rôle invalide']);
    }
}
