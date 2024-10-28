<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\SalaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Rota para obter informações do usuário autenticado
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Rotas para o recurso de reservas
Route::apiResource('reservas', ReservaController::class);
Route::apiResource('reservar', ReservaController::class);
Route::put('/reservas/{id}', [ReservaController::class, 'update']);

// Rotas para o recurso de salas
Route::apiResource('salas', SalaController::class);
Route::put('/salas/{id}', [SalaController::class, 'update']);

