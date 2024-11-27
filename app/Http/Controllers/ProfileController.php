<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Acheteur;
use App\Models\Categorie;
use App\Models\Vendeur;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */

    public function edit(Request $request): Response
    {
        $user = $request->user();

        // Récupérez les données supplémentaires en fonction du rôle
        $additionalData = [];
        if ($user->role === 'vendeur') {
            $additionalData = Vendeur::where('user_id', $user->id)->first();
        } elseif ($user->role === 'acheteur') {
            $additionalData = Acheteur::where('user_id', $user->id)->first();
        }

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'role' => $user->role,
            'additionalData' => $additionalData,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        $user = $request->user();

        if ($user->role === 'vendeur') {
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

            $vendeur = Vendeur::where('user_id', $user->id)->first();
            if ($vendeur) {
                $vendeur->update($request->only([
                    'numero',
                    'facturation',
                    'industrie',
                    'nom_de_l_entreprise',
                    'description',
                    'ville',
                    'code_postal',
                    'activite',
                    'adresse_livraison',
                    'ville_livraison',
                    'code_postal_livraison',
                    'documentation'
                ]));
            }
        } elseif ($user->role === 'acheteur') {
            $request->validate([
                'numero' => 'required|string|max:15',
                'genre' => 'required|string|max:10',
                'pays' => 'required|string|max:50',
                'tva' => 'required|string|max:70',
                'nif' => 'required|string|max:50',
            ]);

            $acheteur = Acheteur::where('user_id', $user->id)->first();
            if ($acheteur) {
                $acheteur->update($request->only([
                    'numero',
                    'genre',
                    'pays',
                    'tva',
                    'nif',
                ]));
            }
        }

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }
    /** 
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function Categorie()
    {
        $Categories = Categorie::all();
        return response()->json($Categories);
    }
}
