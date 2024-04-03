<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        return User::all();
    }


    public function getUser($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user, 200);
    }
}
