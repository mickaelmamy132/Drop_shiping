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
        Schema::create('encheres', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('lot_id');
            $table->unsignedBigInteger('acheteur_id');
            $table->decimal('montant', 10, 2);
            $table->timestamp('fin_enchere')->nullable();
            $table->timestamps();

            $table->foreign('lot_id')->references('id')->on('produit_lots')->onDelete('cascade');
            $table->foreign('acheteur_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('encheres');
    }
};
