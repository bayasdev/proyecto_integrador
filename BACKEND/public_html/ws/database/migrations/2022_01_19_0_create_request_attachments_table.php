<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreaterequestAttachmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('request_attachments', function (Blueprint $table) {
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
       Schema::dropIfExists('request_attachments');
    }
}