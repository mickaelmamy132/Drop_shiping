<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;

    protected $primaryKey = 'id'; // Si la clé primaire est autre, change 'id' par le nom de ta clé

    protected $fillable = [

        'nom',
        'description',
        'prix',
        'image_rubrique',
        'etat',
        'categorie_id',
        'vendeur_id',
    ];

    /**
     * Relation avec le vendeur (ou utilisateur).
     * Un produit appartient à un vendeur.
     */
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
}
