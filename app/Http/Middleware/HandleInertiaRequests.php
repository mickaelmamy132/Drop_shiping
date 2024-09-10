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

        if ($user) {
            $profil = $user->activeRole();
            $role = $user->role;
        }


        // Log::info('User role:', ['role' => $role]);
        // dd($role, $profil);

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'role' => $role,
                'profil' => $profil,
            ],
        ];
    }
}
