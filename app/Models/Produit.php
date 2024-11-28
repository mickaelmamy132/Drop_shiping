<?php

namespace App\Models; 

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model 
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $fillable = [
        'id',
        'nom',
        'description',
        'prix',
        'image_rubrique',
        'etat',
        'quantite',
        'categorie_id',
        'vendeur_id',
    ];

    /**
     * Relation avec le vendeur (ou utilisateur).
     * Un produit appartient à un vendeur.
     */
    public function vendeur()
    {
        return $this->belongsTo(Vendeur::class, 'vendeur_id', 'user_id');
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
}
