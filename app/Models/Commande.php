<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;
    protected $fillable = [
        'acheteur_id',
        'reference',
        'quantite',
        'produit_id',
        'produit_lot_id',
        'total',
        'status',
        'adresse_livraison',
        'telephone',
        'email',
        'vendeur_id',
    ];

    public function paniers()
    {
        return $this->hasMany(Panie::class, 'commande_id');
    }
}
