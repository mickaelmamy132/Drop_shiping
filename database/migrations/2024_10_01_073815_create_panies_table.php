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
            $table->foreignId('acheteur_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('produit_id')->nullable()->constrained('produits')->onDelete('cascade');
            $table->foreignId('produit_lot_id')->nullable()->constrained('produit_lots')->onDelete('cascade');
            $table->foreignId('vendeur_id')->constrained('users');
            $table->foreignId('commande_id')->nullable()->constrained();
            $table->integer('quantite');
            $table->decimal('prix', 8, 2);
            $table->decimal('prix_totale', 8, 2);
            $table->string('status');
            $table->timestamps();
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
