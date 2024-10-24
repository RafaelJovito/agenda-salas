<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReservaController extends Controller
{
    public function index()
    {
        return Reserva::all();
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

        // Atualiza a reserva
        $reserva->update($request->all());
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
}
