<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePetitionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('petitions', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->unsignedInteger('user_id')->nullable($value = true);
          $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
          $table->longText('parameters')->nullable($value = true);
          $table->unsignedInteger('petition_type_id');
          $table->foreign('petition_type_id')->references('id')->on('petition_types')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('petitions');
    }
}