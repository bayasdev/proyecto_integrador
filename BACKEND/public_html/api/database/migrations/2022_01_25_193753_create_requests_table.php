<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('requests', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('student_id');
            $table->foreign('student_id')->references('id')->on('users')->onDelete('cascade');
            $table->integer('career_id');
            $table->foreign('career_id')->references('id')->on('careers')->onDelete('cascade');
            $table->integer('request_type');
            $table->integer('request_status');
            // esto será un JSON
            $table->text('parameters')->nullable();
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
