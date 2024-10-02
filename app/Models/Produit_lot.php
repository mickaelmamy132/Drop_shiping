<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit_lot extends Model
{
    use HasFactory;
    protected $table = 'produit_lots';
    protected $fillable = [
        'id',
        'nom',
        'description',
        'quantite',
        'prix',
        'prix_public',
        'etat',
        'image_lot',
        'statut',
        'vendeur_id',
        'categorie_id',
    ];

    public function vendeur()
    {
        return $this->belongsTo(Vendeur::class, 'vendeur_id');
    }

    /**
     * Relation avec la catégorie.
     * Un produit appartient à une catégorie.
     */
    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'categorie_id');
    }

    public function panier()
    {
        return $this->belongsTo(Panie::class, 'vendeur_id');
    }

    public function enchere()
    {
        return $this->hasMany(enchere::class, 'lot_id');
    }
}
