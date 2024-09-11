<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendeur extends Model
{

    use HasFactory;

    protected $fillable = ['user_id', 'nom_de_l_entreprise', 'site_web', 'activite'];
    
    public function user()
    {
        return $this->belongsTo(User::class); // Relation avec le modèle user
    }
}
