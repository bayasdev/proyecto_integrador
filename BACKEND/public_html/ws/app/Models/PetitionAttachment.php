<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PetitionAttachment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'request_attachment_file_type','request_attachment_file_name','request_attachment_file',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function petitions()
    {
       return $this->belongsToMany('App\Petition')->withTimestamps();
    }

}