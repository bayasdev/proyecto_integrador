<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

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
            $table->id();
            $table->timestamps();
            $table->string('identification')->nullable($value = true);
            $table->string('name')->nullable($value = true);
            $table->string('email')->nullable($value = true);
            $table->integer('role_id')->nullable($value = true);
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
            $table->integer('attempts')->nullable($value = true);
            $table->string('password')->nullable($value = true);
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
