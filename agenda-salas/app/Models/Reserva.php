<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    use HasFactory;

    // Defina os atributos que podem ser preenchidos em massa
    protected $fillable = ['sala_id', 'data_hora_inicio', 'data_hora_fim', 'nome_responsavel'];
}
