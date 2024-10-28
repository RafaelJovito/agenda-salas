<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReservaController extends Controller
{
    public function index()
    {
        // Paginação das reservas
        return Reserva::paginate(10);
    }

    public function store(Request $request)
    {
        // Validação
        $validator = Validator::make($request->all(), [
            'sala_id' => 'required|exists:salas,id',
            'data_hora_inicio' => 'required|date|after:now',
            'data_hora_fim' => 'required|date|after:data_hora_inicio',
            'nome_responsavel' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Verifica se a sala já está reservada no intervalo de tempo solicitado
        if ($this->isSalaReservada($request->sala_id, $request->data_hora_inicio, $request->data_hora_fim)) {
            return response()->json(['message' => 'A sala já está reservada nesse período.'], 409);
        }

        // Criação da reserva
        $reserva = Reserva::create($request->all());
        return response()->json($reserva, 201);
    }

    public function show($id)
    {
        $reserva = Reserva::find($id);
        if (!$reserva) {
            return response()->json(['message' => 'Reserva não encontrada'], 404);
        }
        return response()->json($reserva);
    }

    public function update(Request $request, $id)
    {
        // Validação
        $validator = Validator::make($request->all(), [
            'sala_id' => 'exists:salas,id',
            'data_hora_inicio' => 'date|after:now',
            'data_hora_fim' => 'date|after:data_hora_inicio',
            'nome_responsavel' => 'string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $reserva = Reserva::find($id);
        if (!$reserva) {
            return response()->json(['message' => 'Reserva não encontrada'], 404);
        }

        // Verifica se a sala já está reservada no novo intervalo de tempo
        if ($this->isSalaReservada($request->sala_id, $request->data_hora_inicio, $request->data_hora_fim, $id)) {
            return response()->json(['message' => 'A sala já está reservada nesse período.'], 409);
        }

        // Atualiza a reserva
        $reserva->update($request->only(['sala_id', 'data_hora_inicio', 'data_hora_fim', 'nome_responsavel']));
        return response()->json($reserva);
    }

    public function destroy($id)
    {
        $reserva = Reserva::find($id);
        if (!$reserva) {
            return response()->json(['message' => 'Reserva não encontrada'], 404);
        }

        $reserva->delete();
        return response()->json(['message' => 'Reserva deletada com sucesso']);
    }

    // Método para verificar conflitos de reservas
    private function isSalaReservada($sala_id, $data_hora_inicio, $data_hora_fim, $excluir_id = null)
    {
        $query = Reserva::where('sala_id', $sala_id)
            ->where(function ($query) use ($data_hora_inicio, $data_hora_fim) {
                $query->whereBetween('data_hora_inicio', [$data_hora_inicio, $data_hora_fim])
                      ->orWhereBetween('data_hora_fim', [$data_hora_inicio, $data_hora_fim]);
            });

        if ($excluir_id) {
            $query->where('id', '!=', $excluir_id);
        }

        return $query->exists();
    }
}
