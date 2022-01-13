<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class director extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'identification','name',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function carreer()
    {
       return $this->belongsTo('App\carreer');
    }

}