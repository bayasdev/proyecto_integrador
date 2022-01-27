<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestRequestAttachmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('request_request_attachment', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('request_id');
            $table->foreign('request_id')->references('id')->on('requests')->onDelete('cascade');
            $table->integer('attachments_id');
            $table->foreign('attachments_id')->references('id')->on('request_attachments')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('request_request_attachment');
    }
}
