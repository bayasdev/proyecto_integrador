<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class carreer extends Model
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
       return $this->hasOne('App\faculty');
    }

    function director()
    {
       return $this->hasOne('App\director');
    }

}