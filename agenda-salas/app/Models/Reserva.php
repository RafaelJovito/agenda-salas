<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    use HasFactory;

    protected $fillable = ['sala_id', 'data_hora_inicio', 'data_hora_fim', 'nome_responsavel'];

    protected $dates = ['data_hora_inicio', 'data_hora_fim'];

    public function sala()
    {
        return $this->belongsTo(Sala::class);
    }

    public static function verificaConflito($salaId, $dataHoraInicio, $dataHoraFim)
    {
        return self::where('sala_id', $salaId)
            ->where(function ($query) use ($dataHoraInicio, $dataHoraFim) {
                $query->whereBetween('data_hora_inicio', [$dataHoraInicio, $dataHoraFim])
                      ->orWhereBetween('data_hora_fim', [$dataHoraInicio, $dataHoraFim])
                      ->orWhere(function ($query) use ($dataHoraInicio, $dataHoraFim) {
                          $query->where('data_hora_inicio', '<=', $dataHoraInicio)
                                ->where('data_hora_fim', '>=', $dataHoraFim);
                      });
            })
            ->exists();
    }
}
