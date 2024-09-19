<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;
    protected $fillable = [
        'acheteur_id',
        'total_prix',
        'status',
    ];

    public function paniers()
    {
        return $this->hasMany(Panie::class, 'commande_id');
    }
}
