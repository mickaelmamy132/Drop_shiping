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
                'facturation' => 'required|string|',
                'industrie' => 'required|array',
                'description' => 'required|string',
                // 'documentation' => 'required|mimes:pdf,doc,docx|max:20240',
                'ville' => 'required|string|max:100',
                'code_postal' => 'required|string|max:20',
                'activite' => 'required|array',
                // 'adresse_livraison' => 'required|string|max:255',
                // 'code_postal_livraison' => 'required|string|max:20',
                // 'facturation' => 'required|string|max:255',
            ]);

            // Ce bloc de code vérifie si un fichier de documentation a été téléchargé et le stocke

            // Vérifie si une documentation a été envoyée dans la requête et si elle est valide
            if ($request->hasFile('documentation') && $request->file('documentation')->isValid()) {
                // Si oui, stocke le fichier dans le dossier 'documents' et récupère le chemin
                $path = $request->file('documentation')->store('Documentation');
            } else {
                // Si non, lance une exception avec un message d'erreur
                throw new \Exception('The documentation failed hghgjgshjgdj to upload.');
            }
            
            // Vérification des données reçues
            dd($request->all(), $path);
            

            // Création de l'utilisateur et du vendeur
            // $user = User::create([
            //     'name' => $validatedData['nom'] . ' ' . $validatedData['prenom'],
            //     'email' => $validatedData['email'],
            //     'role' => 'vendeur',
            //     'password' => Hash::make($request->password), // Génère un mot de passe aléatoire
            // ]);

            // $vendeur = Vendeur::create([
            //     'user_id' => $user->id,
            //     'numero' => $validatedData['numero'],
            //     'facturation' => $validatedData['facturation'],
            //     'industrie' => json_encode($validatedData['industrie']),
            //     'description' => $validatedData['description'],
            //     'documentation' => $path,
            //     'ville' => $validatedData['ville'],
            //     'code_postal' => $validatedData['code_postal'],
            //     'activite' => json_encode($validatedData['activite']),
            //     'adresse_livraison' => $validatedData['adresse_livraison'] ?? null,
            // ]);

            event(new Registered($user));

            Auth::login($user);

            return redirect()->route('Vendeur');
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

            // $user->refresh();

            if ($user->role === 'acheteur') {
                return Inertia::location(route('Acheteur'));
            } elseif ($user->role === 'vendeur') {
                return Inertia::location(route('dashboard'));
            }
        }

        return back()->withErrors(['error' => 'Rôle invalide']);
    }
}
