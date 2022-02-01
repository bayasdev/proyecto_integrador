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
            $table->timestamp('date')->nullable($value = true);
            $table->integer('user_id')->nullable($value = true);
            $table->string('identification')->nullable($value = true);
            $table->string('name')->nullable($value = true);
            $table->string('email')->nullable($value = true);
            $table->integer('role')->nullable($value = true);
            $table->integer('attempts')->nullable($value = true);
            $table->string('password')->nullable($value = true);
        });

        DB::unprepared('
        CREATE OR REPLACE FUNCTION insertar_trigger_insert()
        RETURNS trigger AS $insertar$
        BEGIN
            INSERT INTO auditoria_insert (date, user_id, identification, name, email, role, attempts, password) VALUES (current_timestamp, NEW.id, NEW.identification, NEW.name, NEW.email, NEW.role, NEW.attempts, NEW.password);
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
