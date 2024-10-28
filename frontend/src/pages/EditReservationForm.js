import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/EditReservationForm.css';

function EditReservationForm() {
  const { id } = useParams();
  const [reserva, setReserva] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/reservas/${id}`);
        if (!response.ok) throw new Error('Erro ao buscar dados da reserva');
        const data = await response.json();
        setReserva(data); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReserva((prevReserva) => ({
      ...prevReserva,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/api/reservas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reserva),
      });

      if (!response.ok) throw new Error('Erro ao atualizar a reserva');
      
      alert('Reserva atualizada com sucesso!');
      navigate('/reservas');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/reservas/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao deletar a reserva');
      
      alert('Reserva deletada com sucesso!');
      navigate('/reservas'); // Redireciona para a página de reservas
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Carregando dados da reserva...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="edit-reservation-form">
      <h2>Editar Reserva</h2>
      {reserva ? (
        <form onSubmit={handleSubmit}>
          <label>
            Sala:
            <input
              type="text"
              name="sala_id"
              value={reserva.sala_id || ''}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Data e Hora de Início:
            <input
              type="datetime-local"
              name="data_hora_inicio"
              value={reserva.data_hora_inicio || ''}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Data e Hora de Fim:
            <input
              type="datetime-local"
              name="data_hora_fim"
              value={reserva.data_hora_fim || ''}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Responsável:
            <input
              type="text"
              name="nome_responsavel"
              value={reserva.nome_responsavel || ''}
              onChange={handleChange}
              required
            />
          </label>
          <div className="form-buttons">
            <button type="submit" className="save-button">Salvar Alterações</button>
            <button type="button" onClick={handleDelete} className="delete-button">Deletar Reserva</button>
          </div>
        </form>
      ) : (
        <p>Carregando dados da reserva...</p>
      )}
    </div>
  );
}

export default EditReservationForm;
