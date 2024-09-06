<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profil extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'Role'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');  // Assurez-vous que 'user_id' est bien le nom de la clé étrangère
    }
}
