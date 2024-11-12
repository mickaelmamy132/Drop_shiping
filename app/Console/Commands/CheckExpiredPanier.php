<?php

namespace App\Console\Commands;

use App\Models\Panie;
use Illuminate\Console\Command;

class CheckExpiredPanier extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:check-expired-panier';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Vérifie les enchères expirées et déclenche le processus de gestion des enchères terminées';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //recupere les panier expirées
        $expiredPaniers = Panie::where('created_at', '<',  now()->subDays(2))->get();
        // dd($expiredPaniers);
        foreach ($expiredPaniers as $panier) {
           //en supprime du panier et on les reintiliser
           $panier->delete();
        }
        //affiche un message de confirmation
        $this->info('Les enchères terminées ont été gérées avec succès.');
        return Command::SUCCESS;

    }
}
