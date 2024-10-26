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
        Schema::create('commandes', function (Blueprint $table) {
            $table->id();
            $table->string('reference');
            $table->unsignedBigInteger('acheteur_id');
            $table->integer('quantite');
            $table->unsignedBigInteger('produit_id');
            $table->unsignedBigInteger('produit_lot_id');
            $table->decimal('total', 10, 2);
            $table->string('status');
            $table->text('adresse_livraison');
            $table->string('telephone');
            $table->string('email');
            $table->timestamps();

            $table->foreign('acheteur_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('produit_id')->references('id')->on('produits')->onDelete('cascade');
            $table->foreign('produit_lot_id')->references('id')->on('produit_lots')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
