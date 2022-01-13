<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatedeansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('deans', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('identification',10)->nullable($value = true);
          $table->string('name',200)->nullable($value = true);
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('deans');
    }
}