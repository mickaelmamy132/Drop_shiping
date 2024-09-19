<?php

namespace App\Http\Resources;

use Illuminate\Http\Request; 
use Illuminate\Http\Resources\Json\JsonResource;

class CategorieResource extends JsonResource
{
    public static $swap = false;
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
            'description_categorie' => $this->description_categorie,
        ];
        // return parent::toArray($request);
    }
}
