<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCareersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('careers', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('name')->nullable($value = true);
          $table->integer('faculty_id');
          $table->foreign('faculty_id')->references('id')->on('faculties')->onDelete('cascade');
          $table->integer('director_id');
          $table->foreign('director_id')->references('id')->on('directors')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('careers');
    }
}