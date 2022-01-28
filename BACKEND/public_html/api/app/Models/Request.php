<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'request_type_id', 'parameters',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
    
    // relaciones
    public function users()
    {
        return $this->hasOne('App\User');
    }

    public function types()
    {
        return $this->hasOne('App\PetitionAttachment');
    }

    public function requestAttachments()
    {
        return $this->hasMany('App\PetitionAttachment')->withTimestamps();
    }

    public function subjects()
    {
        return $this->hasMany('App\Subject')->withTimestamps();
    }
}
