<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProduitLotResource extends JsonResource
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
            'id' => $this->id,
            'nom' => $this->nom,
            'description' => $this->description,
            'quantite' => $this->quantite,
            'prix' => $this->prix,
            'prix_public' => $this->prix_public,
            'etat' => $this->etat,
            'image_lot' => $this->image_lot,
            'categorie_id' => new CategorieResource($this->categorie),
            'vendeur_id' => new VendeurResource($this->whenLoaded('vendeur')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
