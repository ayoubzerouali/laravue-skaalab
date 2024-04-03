<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\BookController;

Route::get('/v1/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::
    prefix('/v1')->middleware('auth:sanctum')->group(function () {
        Route::apiResource('books', BookController::class);
        Route::apiResource('tasks', TaskController::class);
    });

Route::post('v1/login', [AuthController::class, 'login']);
Route::post('v1/register', [AuthController::class, 'register']);