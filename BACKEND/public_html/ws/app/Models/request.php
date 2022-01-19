<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class request extends Model
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

    function request_type()
    {
       return $this->hasOne('App\requestType');
    }

    function request_attachments()
    {
       return $this->belongsToMany('App\requestAttachment')->withTimestamps();
    }

    function subject()
    {
       return $this->hasOne('App\subject');
    }

}