<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePetitionAttachmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('petition_attachments', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('request_attachment_file_type',50)->nullable($value = true);
          $table->string('request_attachment_file_name',255)->nullable($value = true);
          $table->longText('request_attachment_file')->nullable($value = true);
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('petition_attachments');
    }
}