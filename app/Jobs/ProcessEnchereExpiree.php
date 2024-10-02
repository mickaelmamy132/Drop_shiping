<?php

namespace App\Jobs;

use App\Models\Enchere;
use App\Models\Panie;
use App\Models\Produit_lot;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessEnchereExpiree implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $lot;
    /**
     * Create a new job instance.
     */
    public function __construct(Produit_lot $lot)
    {
        $this->lot = $lot;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Récupérer la dernière enchère la plus élevée pour ce lot
        $enchereGagnante = Enchere::where('lot_id', $this->lot->id)
            ->orderBy('montant', 'desc')
            ->first();

        if ($enchereGagnante) {
            // Ajouter le lot au panier du vainqueur
            Panie::create([
                'acheteur_id' => $enchereGagnante->acheteur_id,
                'lot_id' => $this->lot->id,
                'quantite' => 1,
            ]);

            // Mettre à jour le statut du lot pour indiquer qu'il a été vendu
            $this->lot->update(['statut' => 'vendu']);
        }
    }
}
