<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePetitionPetitionAttachmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('petition_petition_attachment', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->unsignedInteger('petition_attachment_id');
          $table->foreign('petition_attachment_id')->references('id')->on('petition_attachments')->onDelete('cascade');
          $table->unsignedInteger('petition_id');
          $table->foreign('petition_id')->references('id')->on('petitions')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('petition_petition_attachment');
    }
}