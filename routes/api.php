<?php

use App\Http\Controllers\Api\V1\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\BookController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::
    prefix('/v1')->group(function () {
        Route::apiResource('books', BookController::class);
        Route::apiResource('tasks', TaskController::class);
    });