<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Commande;
use Illuminate\Database\Eloquent\Model;

class Acheteur extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'numero',
        'genre',
        'pays',
        'tva',
        'nif',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class); // Relation avec le modèle Profil
    }

    // public function estClientFidele()
    // {
    //     return $this->Commande()->count() > 5;
    // }

    // public function commandes()
    // {
    //     // return $this->hasMany(Commande::class);
    // }

    // public function totalDepenses()
    // {
    //     return $this->Commande()->sum('total');
    // }

    // public function appliquerReduction($montant)
    // {
    //     if ($this->estClientFidele()) {
    //         return $montant * 0.90;
    //     }

    //     return $montant;
    // }
}
