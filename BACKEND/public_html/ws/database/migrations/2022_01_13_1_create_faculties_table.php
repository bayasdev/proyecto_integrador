<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatefacultiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('faculties', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('name',200)->nullable($value = true);
          $table->unsignedInteger('dean_id');
          $table->foreign('dean_id')->references('id')->on('deans')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('faculties');
    }
}