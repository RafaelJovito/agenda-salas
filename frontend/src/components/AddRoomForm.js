import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddRoomForm() {
  const [nome, setNome] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/salas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          capacidade: parseInt(capacidade),
          descricao,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar a sala');
      }

      // Redireciona para a lista de salas após a criação
      navigate('/');
    } catch (err) {
      setError(err.message || 'Erro desconhecido ao adicionar sala');
    }
  };

  return (
    <div className="add-room-form-container">
      <h2>Adicionar Nova Sala</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} className="add-room-form">
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Capacidade</label>
          <input
            type="number"
            value={capacidade}
            onChange={(e) => setCapacidade(e.target.value)}
            required
            min="1"
          />
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Adicionar Sala</button>
      </form>
    </div>
  );
}

export default AddRoomForm;
