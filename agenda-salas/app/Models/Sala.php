<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sala extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',       // Nome da sala
        'capacidade', // Capacidade de pessoas na sala
        'descricao',  // Descrição da sala
    ];

    protected $table = 'salas'; // Caso a tabela não siga a convenção padrão

    // Relacionamento com reservas
    public function reservas()
    {
        return $this->hasMany(Reserva::class); // Uma sala pode ter muitas reservas
    }

    // Contagem de reservas
    public function contagemReservas()
    {
        return $this->reservas()->count();
    }

    // Regras de validação
    public static function regrasValidacao()
    {
        return [
            'nome' => 'required|string|max:255',
            'capacidade' => 'required|integer|min:1', // Capacidade deve ser maior que 0
            'descricao' => 'nullable|string',
        ];
    }

    // Accessor para nome
    public function getNomeAttribute($value)
    {
        return ucfirst($value);
    }

    // Mutator para nome
    public function setNomeAttribute($value)
    {
        $this->attributes['nome'] = strtolower($value);
    }
}
