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
            $table->string('site_web');
            $table->string('activite');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('vendeurs');
    }
}
