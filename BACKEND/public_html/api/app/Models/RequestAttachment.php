<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequestAttachment extends Model
{
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

    public function requests()
    {
        return $this->belongsToMany(Request::class)->withTimestamps();;
    }
}
