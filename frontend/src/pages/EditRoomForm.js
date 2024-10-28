import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditRoomForm() {
  const { id } = useParams();
  const [sala, setSala] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSala = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/salas`);
        if (!response.ok) {
          throw new Error('Erro ao buscar as salas');
        }
        const data = await response.json();
        const salaEncontrada = data.data.find((sala) => sala.id === parseInt(id));
        if (salaEncontrada) {
          setSala(salaEncontrada);
        } else {
          setError('Sala não encontrada');
        }
      } catch (error) {
        setError(error.message || 'Erro desconhecido ao buscar a sala');
      } finally {
        setLoading(false);
      }
    };

    fetchSala();
  }, [id]);

  const handleChange = (e) => {
    setSala({ ...sala, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/salas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sala),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar a sala');
      }
      navigate('/'); // Redireciona após a atualização
    } catch (error) {
      setError(error.message || 'Erro desconhecido ao atualizar a sala');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Você realmente deseja excluir esta sala?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/salas/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Erro ao excluir a sala');
        }
        navigate('/'); // Redireciona após a exclusão
      } catch (error) {
        setError(error.message || 'Erro desconhecido ao excluir a sala');
      }
    }
  };

  if (loading) {
    return <p>Carregando sala...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div>
      <h2>Editar Sala: {sala.nome}</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={sala.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="capacidade">Capacidade:</label>
          <input
            type="number"
            id="capacidade"
            name="capacidade"
            value={sala.capacidade}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            value={sala.descricao || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Atualizar Sala</button>
      </form>
      <button class="delete-button"onClick={handleDelete} style={{ marginTop: '20px', color: '#FFF' }}>
        Excluir Sala
      </button>
    </div>
  );
}

export default EditRoomForm;
