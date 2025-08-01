<?php

use App\Http\Controllers\FrontPageController\WestecController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WestecController::class, 'index'])->name('home');
Route::get('/about', [WestecController::class, 'about'])->name('about');
Route::get('/solutions', [WestecController::class, 'solutions'])->name('solutions');
Route::get('/case_studies', [WestecController::class, 'case_studies'])->name('case_studies');


Route::get('/contact', function () {
    return Inertia::render('westec/Contact');
})->name('contact');

Route::get('/career', function () {
    return Inertia::render('westec/Career');
})->name('career');

Route::get('/detail/{id}', function ($id) {
    return Inertia::render('westec/Detail', [
        'id' => $id,
    ]);
})->name('detail');
