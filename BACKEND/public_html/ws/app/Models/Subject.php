<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'code','name','credits',
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
       return $this->hasOne('App\Carreer');
    }

    function petitions()
    {
       return $this->belongsToMany('App\Petition')->withTimestamps();
    }

}