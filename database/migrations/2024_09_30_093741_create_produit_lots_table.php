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
        Schema::create('produit_lots', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->text('description')->nullable();
            $table->integer('quantite');
            $table->decimal('prix', 10, 2);
            $table->decimal('prix_public', 10, 2);
            $table->string('etat');
            $table->string('image_lot')->nullable();
            $table->unsignedBigInteger('vendeur_id');
            $table->foreign('vendeur_id')->references('id')->on('vendeurs')->onDelete('cascade');

            $table->unsignedBigInteger('categorie_id');
            $table->foreign('categorie_id')->references('id')->on('categories')->onDelete('cascade');

            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produit_lots');
    }
};
