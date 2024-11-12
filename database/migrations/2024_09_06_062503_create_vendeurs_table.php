<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVendeursTable extends Migration
{
    public function up()
    {
        Schema::create('vendeurs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('nom_de_l_entreprise');
            $table->string('numero', 15);
            $table->json('industrie');
            $table->string('description', 100);
            $table->string('ville', 100);
            $table->string('code_postal', 20);
            $table->json('activite');
            $table->string('facturation');
            $table->string('adresse_livraison')->nullable();
            $table->string('ville_livraison', 100)->nullable();
            $table->string('code_postal_livraison', 20)->nullable();
            $table->string('documentation');
            $table->timestamps(); 
        });
    }

    public function down()
    {
        Schema::dropIfExists('vendeurs');
    }
}
