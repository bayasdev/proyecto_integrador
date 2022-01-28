<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class RequestAttachment extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    //  Tipos (attachment_type):
    // payment (pago) = 1
    // attachment (arhivo adjunto cualquiera) = 2
    // validar en RequestController
    protected $fillable = [
        'file_name', 'file_path', 'file_type', 'attachment_type',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    function requests()
    {
       return $this->belongsToMany('App\Request')->withTimestamps();
    }
}
