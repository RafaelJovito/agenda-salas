import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionar após a edição
import '../styles/ReservationsList.css';

function ReservationsList() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/reservas');
        if (!response.ok) throw new Error('Erro ao buscar reservas');
        const data = await response.json();
        setReservas(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  const handleEdit = (id) => {
    navigate(`/reservas/editar/${id}`); // Redireciona para a página de edição com o ID da reserva
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza de que deseja excluir esta reserva?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/reservas/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao excluir a reserva');
      
      setReservas(reservas.filter(reserva => reserva.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Carregando reservas...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="reservations-list">
      <h2>Reservas de Salas</h2>
      {reservas.length > 0 ? (
        <div className="reservations-cards-container">
          {reservas.map((reserva) => (
            <div key={reserva.id} className="reservation-card">
              <h3>Sala {reserva.sala_id}</h3>
              <p><strong>Início:</strong> {new Date(reserva.data_hora_inicio).toLocaleString()}</p>
              <p><strong>Fim:</strong> {new Date(reserva.data_hora_fim).toLocaleString()}</p>
              <p><strong>Responsável:</strong> {reserva.nome_responsavel}</p>
              <div className="reservation-actions">
                <button onClick={() => handleEdit(reserva.id)} className="edit-button">Editar</button>
                <button onClick={() => handleDelete(reserva.id)} className="delete-button">Excluir</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Não há reservas disponíveis.</p>
      )}
    </div>
  );
}

export default ReservationsList;
