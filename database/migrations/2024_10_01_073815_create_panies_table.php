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
        Schema::create('panies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('acheteur_id');
            $table->unsignedBigInteger('produit_id')->nullable();
            $table->unsignedBigInteger('produit_lot_id')->nullable();
            $table->unsignedBigInteger('vendeur_id');
            $table->foreignId('commande_id')->nullable()->constrained();
            $table->integer('quantite');
            $table->decimal('prix', 8, 2);
            $table->decimal('prix_totale', 8, 2);
            $table->string('status');
            $table->timestamps();

            $table->foreign('acheteur_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('produit_id')->references('id')->on('produits')->onDelete('cascade');
            $table->foreign('produit_lot_id')->references('id')->on('produit_lots')->onDelete('cascade');
            $table->foreign('vendeur_id')->references('id')->on('users')->onDelete('cascade');
        });
    }
 
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('panies');
    }
};
