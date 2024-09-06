<?php

namespace App\Http\Middleware;

use App\Models\Profil;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user();

        $role = null;

        if ($user) {
            // Charger le profil de l'utilisateur
            $profil = Profil::where('user_id', $user->id)->first();
            
            // Si le profil existe, récupérer le rôle
            if ($profil) {
                $role = $profil->Role; // Utilisez le bon nom du champ ici
            }
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'Role' => $role, // Partager le rôle
            ],
        ];
    }
}
