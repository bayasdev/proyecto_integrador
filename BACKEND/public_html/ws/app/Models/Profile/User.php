<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;


class User extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'identification','name','email','role_id','attempts','password','api_token',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       'password', 'attempts','api_token',
    ];

    function role()
    {
       return $this->hasOne('App\Role');
    }

    function profile_picture()
    {
       return $this->belongsTo('App\ProfilePicture');
    }

}
