<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];



    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function acheteur()
    {
        return $this->hasOne(Acheteur::class);
    }


    public function vendeur()
    {
        return $this->hasOne(Vendeur::class);
    }

    /**
     * Change le rôle de l'utilisateur.
     *
     * @param string $role
     * @return void
     */

    public function switchRole($role)
    {
        if (in_array($role, ['acheteur', 'vendeur'])) {
            $this->role = $role;
            $this->save();
        }
    }


    public function activeRole()
    {
        if ($this->role === 'acheteur') {
            return $this->acheteur;
        }
        return $this->vendeur;
    }

    public function produits()
    {
        return $this->hasMany(Produit::class, 'vendeur_id');
    }
}
