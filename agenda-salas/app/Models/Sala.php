<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sala extends Model
{
    use HasFactory;

    // Definindo os campos que podem ser preenchidos
    protected $fillable = [
        'nome',       // Nome da sala
        'capacidade', // Capacidade de pessoas na sala
        'descricao',  // Descrição da sala
    ];

    // Relacionamento com reservas (se aplicável)
    public function reservas()
    {
        return $this->hasMany(Reserva::class); // Uma sala pode ter muitas reservas
    }
}
