<?php

namespace App\Http\Middleware;

use App\Models\Profil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Middleware;
use PgSql\Lob;
use App\Models\User;

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
        $profil = null;
        $acheteurInfo = null;


        if ($user) {
            $user->load(['acheteur', 'vendeur']);
            $profil = $user->activeRole();
            $role = $user->role;
            if ($role === 'acheteur' && $profil) {
                $acheteurInfo = $profil->toArray();
            } else {
                $acheteurInfo = null;
            }
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'role' => $role,
                'profil' => $acheteurInfo,
            ],
        ];
    }
}
