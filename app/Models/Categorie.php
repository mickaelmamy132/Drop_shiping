<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'description_categorie',
    ];
 
    /**
     * Relation avec le modèle Produit.
     * Une catégorie peut avoir plusieurs produits.
     */
    public function produits()
    {
        return $this->hasMany(Produit::class, 'categorie_id');
    }
}
