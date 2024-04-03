<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');


Route::get('/setup', function (Request $request) {
    // $credentials = $request->only('email', 'password');
    $credentials = [
        "email" => "admin@skalaab.com",
        "password" => "password",
        "name" => "admin"
    ];

    if (!Auth::attempt($credentials)) {

        $user = User::create([
            'name' => $credentials['name'],
            'email' => $credentials['email'],
            'password' => Hash::make($credentials['password'])
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('admin-token', ['c', 'd', 'u'])->plainTextToken;
            return response()->json(['token' => $token], 200);
        }
    } else {
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('admin-token', ['c', 'd', 'u'])->plainTextToken;
            return response()->json(['token' => $token], 200);
        }
    }
});



