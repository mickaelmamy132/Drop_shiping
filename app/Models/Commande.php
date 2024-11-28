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
        'prix_unitaire',
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
    public function produit()
    {
        return $this->belongsTo(Produit::class, 'produit_id');
    }
    public function produit_lot()
    {
        return $this->belongsTo(Produit_lot::class, 'produit_lot_id');
    }
    public function vendeur()
    {
        return $this->belongsTo(Vendeur::class, 'vendeur_id','user_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'acheteur_id');
    }

}
