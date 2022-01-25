<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('roles', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('name',200)->nullable($value = true);
       });
       
      //  Create default roles
       DB::table('users')->insert([
         ['name' => 'Administrador'],
         ['name' => 'Decano'],
         ['name' => 'Director de Carrera'],
         ['name' => 'Contabilidad'],
         ['name' => 'Estudiante']
       ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('roles');
    }
}