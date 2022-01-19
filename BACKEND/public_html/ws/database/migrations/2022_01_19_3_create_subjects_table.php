<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatesubjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('subjects', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('code',15)->nullable($value = true);
          $table->string('name',200)->nullable($value = true);
          $table->integer('credits')->nullable($value = true);
          $table->unsignedInteger('carreer_id');
          $table->foreign('carreer_id')->references('id')->on('carreers')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('subjects');
    }
}