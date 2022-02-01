<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Career extends Model
{
    /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
    protected $fillable = [
        'name', 'director_id', 'faculty_id',
    ];
    
    /**
    * The attributes excluded from the model's JSON form.
    *
    * @var array
    */
    protected $hidden = [];
    
    public function subjects()
    {
        return $this->hasOne(Subject::class);
    }

    public function faculties()
    {
        return $this->belongsTo(Faculty::class);
    }
}