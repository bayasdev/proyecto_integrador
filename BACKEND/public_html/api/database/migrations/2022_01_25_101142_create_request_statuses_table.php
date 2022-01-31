<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('request_statuses', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
        });

        //  Create default statuses
        DB::table('request_statuses')->insert([
            ['name' => 'Voucher Pendiente de Validación'],
            ['name' => 'Voucher Validado'],
            ['name' => 'Voucher Rechazado'],
            ['name' => 'Aprobada por Director'],
            ['name' => 'Rechazada por Director'],
            ['name' => 'Aprobada por Decano'],
            ['name' => 'Rechazada por Decano'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('request_statuses');
    }
}
