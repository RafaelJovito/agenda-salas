<?php

namespace App\Http\Controllers;

use App\Models\Sala;
use Illuminate\Http\Request;

class SalaController extends Controller
{
    // Listar todas as salas
    public function index()
    {
        // Retorna todas as salas paginadas, altere '10' para o número desejado por página
        $salas = Sala::paginate(10);
        return response()->json($salas);
    }

    // Exibir uma sala específica
    public function show($id)
    {
        $sala = Sala::find($id);

        if (!$sala) {
            return response()->json(['error' => 'Sala não encontrada'], 404);
        }

        return response()->json($sala);
    }

    // Criar uma nova sala
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nome' => 'required|string|max:255',
            'capacidade' => 'required|integer',
            'descricao' => 'nullable|string',
        ]);

        $sala = Sala::create($validatedData);

        return response()->json($sala, 201); // Retorna a sala criada com código 201 (created)
    }

    // Atualizar uma sala existente
    public function update(Request $request, $id)
    {
        $sala = Sala::find($id);

        if (!$sala) {
            return response()->json(['error' => 'Sala não encontrada'], 404);
        }

        $validatedData = $request->validate([
            'nome' => 'required|string|max:255',
            'capacidade' => 'required|integer',
            'descricao' => 'nullable|string',
        ]);

        $sala->update($validatedData);

        return response()->json($sala);
    }

    // Deletar uma sala
    public function destroy($id)
    {
        $sala = Sala::find($id);

        if (!$sala) {
            return response()->json(['error' => 'Sala não encontrada'], 404);
        }

        $sala->delete();

        return response()->json(['message' => 'Sala excluída com sucesso']);
    }
}
