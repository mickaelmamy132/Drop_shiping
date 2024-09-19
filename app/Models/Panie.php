<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Panie extends Model
{
    use HasFactory;

    protected $fillable = [
        'acheteur_id',
        'produit_id',
        'vendeur_id',
        'commande_id',
        'quantite',
        'prix_totale',
        'status',
    ];

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'commande_id');
    }

    public function produits()
    {
        return $this->belongsTo(Produit::class, 'produit_id');
    }

    public function vendeur()
    {
        return $this->belongsTo(Vendeur::class, 'vendeur_id');
    }
}
