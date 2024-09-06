<?php

namespace App\Http\Middleware;

use App\Models\Profil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Middleware;
use PgSql\Lob;

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

            $profil = Profil::where('user_id', $user->id)->first();
            
            if ($profil) {
                $role = $profil->Role;
            }
        }
        // Log::info('User role:', ['role' => $role]);
        // dd($role, $user);

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'role' => $role,
            ],
        ];
    }
}
