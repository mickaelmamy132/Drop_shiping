<?php

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
        Schema::create('produits', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('vendeur_id');
            $table->unsignedBigInteger('categorie_id');
            $table->string('nom');
            $table->integer('quantite');
            $table->text('description');
            $table->decimal('prix', 10, 2);
            $table->string('image_rubrique')->nullable();
            $table->string('etat');
            $table->timestamps();
        });

        Schema::table('produits', function (Blueprint $table) {
            $table->foreign('vendeur_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('categorie_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produits');
    }
};
