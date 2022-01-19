<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Carreer extends Model
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

    function faculty()
    {
       return $this->hasOne('App\Faculty');
    }

    function director()
    {
       return $this->hasOne('App\Director');
    }

    function subject()
    {
       return $this->belongsTo('App\Subject');
    }

}