<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProduitResource extends JsonResource
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
            'image_rubrique' => $this->image_rubrique,
            'prix' => $this->prix,
            'etat' => $this->etat,
            'categorie' => new CategorieResource($this->categorie),
            'vendeur' => new VendeurResource($this->whenLoaded('vendeur')),
        ];
        return parent::toArray($request);
    }
}
