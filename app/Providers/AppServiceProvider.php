<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Tighten\Ziggy\Ziggy;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (env('APP_ENV') === 'production') {
            URL::forceScheme('https');
        }

        Inertia::share([
            'auth' => [
                'user' => fn() => Auth::user(),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => url()->current(),
            ],
            'flash' => [
                'success' => fn() => session()->get('success'),
                'error' => fn() => session()->get('error'),
                'warning' => fn() => session()->get('warning'),
            ]
        ]);
    }
}
