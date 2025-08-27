<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Discourse extends Model
{
    protected $guarded;
    public $table = 'discourses';
    public function created_by()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
    public function updated_by()
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
