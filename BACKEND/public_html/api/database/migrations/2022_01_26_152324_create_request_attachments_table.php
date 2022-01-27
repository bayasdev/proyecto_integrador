<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestAttachmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('request_attachments', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('file_name')->nullable($value = true);
            $table->string('file_path')->nullable($value = true);
            $table->string('file_type')->nullable($value = true);
            $table->integer('request_id');
            $table->foreign('request_id')->references('id')->on('requests')->onDelete('cascade');
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
