<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreaterequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('requests', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->longText('parameters')->nullable($value = true);
          $table->unsignedInteger('request_type_id');
          $table->foreign('request_type_id')->references('id')->on('request_types')->onDelete('cascade');
          $table->unsignedInteger('subject_id');
          $table->foreign('subject_id')->references('id')->on('subjects')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('requests');
    }
}