<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EnchereResource extends JsonResource
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
            'lot_id' => $this->lot_id,
            'acheteur_id' => $this->acheteur_id,
            'montant' => $this->montant,
            'fin_enchere' => $this->fin_enchere,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
