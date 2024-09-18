<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VendeurResource extends JsonResource
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
            'user_id' => $this->user_id,
            'nom' => $this->nom,
            'prenom' => $this->prenom,
            'email' => $this->email,
            'password' => $this->password,
            'numero' => $this->numero,
            'industrie' => $this->industrie,
            'nom_de_l_entreprise' => $this->nom_de_l_entreprise,
            'description' => $this->description,
            'ville' => $this->ville,
            'code_postal' => $this->code_postal,
            'activite' => $this->activite,
            'facturation' => $this->facturation,
            'adresse_livraison' => $this->adresse_livraison,
            'ville_livraison' => $this->ville_livraison,
            'code_postal_livraison' => $this->code_postal_livraison,
            'documentation' => $this->documentation,
            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}
