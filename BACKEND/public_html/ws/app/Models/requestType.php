<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class requestType extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'name',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function request()
    {
       return $this->belongsTo('App\request');
    }

}