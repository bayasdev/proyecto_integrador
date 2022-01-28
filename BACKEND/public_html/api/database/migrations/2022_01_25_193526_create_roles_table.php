<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

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
            $table->id();
            $table->timestamps();
            $table->string('name',200)->nullable($value = true);
        });
        
        //  Create default roles
        DB::table('roles')->insert([
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
