<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('users', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('identification',10)->nullable($value = true);
          $table->string('name',200)->nullable($value = true);
          $table->string('email',200)->nullable($value = true);
          $table->unsignedInteger('role_id')->nullable($value = true);
          $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
          $table->unsignedInteger('attempts')->nullable($value = true);
          $table->string('password')->nullable($value = true);
          $table->string('api_token')->nullable($value = true);
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('users');
    }
}
