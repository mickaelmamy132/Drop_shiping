<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Commande;

class Acheteur extends Profil
{
    use HasFactory;

    protected $fillable = [
        'profil_id',
        'numero',
        'genre',
        'pays',
        'tva',
        'nif',
    ];
    
    public function profil()
    {
        return $this->belongsTo(Profil::class, 'profil_id'); // Relation avec le modèle Profil
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
