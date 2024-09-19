<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendeur extends Model
{

    use HasFactory;
    protected $primaryKey = 'id';
 
    protected $fillable = [
        'user_id',
        'nom',
        'prenom',
        'email',
        'password',
        'numero',
        'industrie',
        'nom_de_l_entreprise',
        'description',
        'ville',
        'code_postal',
        'activite',
        'facturation',
        'adresse_livraison',
        'ville_livraison',
        'code_postal_livraison',
        'documentation',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id'); // Relation avec le modèle user
    }
    public function produits()
    {
        return $this->hasMany(Produit::class, 'vendeur_id');
    }
}
