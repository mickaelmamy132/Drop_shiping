<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enchere extends Model
{
    use HasFactory;
    protected $fillable = ['lot_id', 'acheteur_id', 'montant', 'fin_enchere'];

    public function produit_lot()
    {
        return $this->belongsTo(Produit_lot::class, 'lot_id');
    }

    public function acheteur()
    {
        return $this->belongsTo(User::class, 'acheteur_id');
    }
}
