<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuditoriaInsertTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('auditoria_insert', function (Blueprint $table) {
            $table->increments('id');
            $table->string('identification');
            $table->string('name');
            $table->string('email');
            $table->integer('role_id')->nullable($value = true);
            $table->integer('attempts')->nullable($value = true);
            $table->string('password')->nullable($value = true);
        });

        DB::unprepared('
        CREATE OR REPLACE FUNCTION insertar_trigger_insert()
        RETURNS trigger AS $insertar$
        BEGIN
            INSERT INTO auditoria_insert (identification, name, email, role_id, attempts, password) VALUES (OLD.identification, OLD.name, OLD.email, OLD.role_id, OLD.attempts, OLD.password);
            RETURN NULL;
        END
        $insertar$ LANGUAGE plpgsql;

        CREATE TRIGGER insertar_auditoria_insert
        AFTER INSERT
        ON users FOR EACH ROW
        EXECUTE PROCEDURE insertar_trigger_insert();
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('auditoria_insert');
    }
}
