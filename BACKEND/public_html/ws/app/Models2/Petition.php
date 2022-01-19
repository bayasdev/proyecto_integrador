<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Petition extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'parameters',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function petition_type()
    {
       return $this->hasOne('App\PetitionType');
    }

    function petition_attachments()
    {
       return $this->belongsToMany('App\PetitionAttachment')->withTimestamps();
    }

    function subjects()
    {
       return $this->belongsToMany('App\Subject')->withTimestamps();
    }

}