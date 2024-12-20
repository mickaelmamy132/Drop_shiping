<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->text('description_categorie');
            $table->timestamps();
        });

        // Insertion des catégories par défaut
        DB::table('categories')->insert([
            ['nom' => 'vetements', 'description_categorie' => 'Articles de vêtements pour homme, femme, et enfant'],
            ['nom' => 'nourriture', 'description_categorie' => 'Produits alimentaires et de consommation courante'],
            ['nom' => 'materiel de cuisine', 'description_categorie' => 'Équipements et ustensiles pour la cuisine'],
            ['nom' => 'bricolage', 'description_categorie' => 'Matériel et outils pour les travaux de bricolage'],
            ['nom' => 'sport', 'description_categorie' => 'Matériel et outils de sport'],
            ['nom' => 'electromenager', 'description_categorie' => 'Appareils électroménagers pour la maison'],
            ['nom' => 'equipement professionels', 'description_categorie' => 'Équipements et matériels pour professionnels'],
            ['nom' => 'jouts', 'description_categorie' => 'Jouets et jeux pour tous les âges'],
        ]);    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
