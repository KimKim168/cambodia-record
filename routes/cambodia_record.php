<?php

use App\Http\Controllers\CambodiaRecordController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [CambodiaRecordController::class, 'index']);
Route::get('/posts', [CambodiaRecordController::class, 'post']);
Route::get('/posts/{id}', [CambodiaRecordController::class, 'detail']);
