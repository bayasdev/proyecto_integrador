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
        'student_id', 'career_id', 'request_type', 'request_status', 'parameters',
    ];
    
    /**
    * The attributes excluded from the model's JSON form.
    *
    * @var array
    */
    protected $hidden = [];
    
    // relations
    
    public function students()
    {
        return $this->hasOne(User::class);
    }
    
    public function careers()
    {
        return $this->hasOne(Career::class);
    }
    
    public function subjects()
    {
        return $this->belongsToMany(Subject::class)->withTimestamps();
    }
    
    public function attachments()
    {
        return $this->belongsToMany(RequestAttachment::class)->withTimestamps();;
    }
    
}
