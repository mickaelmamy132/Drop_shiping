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
        Schema::create('acheteurs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('profil_id')->constrained('profils')->onDelete('cascade');
            $table->string('numero', 20);
            $table->string('genre', 10);
            $table->string('pays');
            $table->string('tva', 15)->nullable();
            $table->string('nif', 20)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('acheteurs');
    }
};
