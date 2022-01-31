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
        'user_id', 'request_type_id', 'request_status_id', 'parameters',
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

    public function attachments()
    {
        return $this->belongsToMany(RequestAttachment::class)->withTimestamps();;
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class)->withTimestamps();
    }
}
