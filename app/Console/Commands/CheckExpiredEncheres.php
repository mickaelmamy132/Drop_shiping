<?php

namespace App\Console\Commands;

use App\Jobs\ProcessEnchereExpiree;
use App\Models\enchere;
use App\Models\Panie;
use App\Models\Produit_lot;
use Illuminate\Console\Command;

class CheckExpiredEncheres extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:check-expired-encheres';

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
        $expiredEncheres = Enchere::where('fin_enchere', '<', now())
            ->whereHas('produit_lot', function ($query) {
                $query->where('statut', '!=', 'vendu');
            })
            ->get();

        foreach ($expiredEncheres as $enchere) {
            $produit_lot = $enchere->produit_lot;  // Relation produit_lot dans Enchere
            $enchereGagnante = Enchere::where('lot_id', $produit_lot->id)
                ->orderBy('montant', 'desc')
                ->first();

            if ($enchereGagnante && $produit_lot->statut != 'vendu') {
                try {
                    $existingPanie = Panie::where('produit_lot_id', $produit_lot->id)
                        ->where('acheteur_id', $enchereGagnante->acheteur_id)
                        ->first();
                    if (!$existingPanie) {
                        Panie::create([
                            'acheteur_id' => $enchereGagnante->acheteur_id,
                            'produit_id' => null,
                            'produit_lot_id' => $produit_lot->id,
                            'vendeur_id' => $produit_lot->vendeur_id,
                            'prix_totale' => $enchereGagnante->montant,
                            'prix' => $enchereGagnante->montant,
                            'status' => 'en attente',
                            'quantite' => 1,
                        ]);

                        $enchereGagnante->update(['statut' => 'gagnée']);
                    }
                } catch (\Illuminate\Database\QueryException $e) {
                    $this->error("Erreur lors de la création du panier pour l'enchère ID: " . $enchere->id);
                    $this->error($e->getMessage());
                    continue;
                }
            }
        }

        $this->info('Les enchères expirées ont été traitées.');
    }
}
