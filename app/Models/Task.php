<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'text',
        'stat',
        'user_id',
    ];
    public function user()
    {
        $this->belongsToMany(User::class);
    }

    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }
}
