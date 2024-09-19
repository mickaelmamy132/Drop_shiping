<?php
 
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PanieResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'acheteur_id' => $this->acheteur_id,
            'produit' => new ProduitResource($this->whenLoaded('produits')),
            'vendeur' => new VendeurResource($this->whenLoaded('vendeur')),
            'commande_id' => $this->commande_id,
            'quantite' => $this->quantite,
            'prix_totale' => $this->prix_totale,
            'status' => $this->status,
        ];
    }
}
