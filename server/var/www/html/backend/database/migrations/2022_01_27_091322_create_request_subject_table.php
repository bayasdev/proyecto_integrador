<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestSubjectTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('request_subject', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('request_id');
            $table->foreign('request_id')->references('id')->on('requests')->onDelete('cascade');
            $table->integer('subject_id');
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
        Schema::dropIfExists('request_subject');
    }
}
