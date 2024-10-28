import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate
import '../styles/RoomList.css';

function RoomList({ onAddRoom }) { // Recebe a função onAddRoom como props
  const [salas, setSalas] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Inicialize o navigate

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/salas');
        if (!response.ok) {
          throw new Error('Erro ao buscar as salas');
        }
        const data = await response.json();
        setSalas(data.data);
      } catch (error) {
        setError(error.message || 'Erro desconhecido ao buscar salas');
        console.error('Erro ao buscar as salas:', error);
      }
    };

    fetchSalas();
  }, []);

  return (
    <div className="room-list-container">
      <h2>Lista de Salas de Reunião</h2>
      {error && <p className="error-message">{error}</p>}
      
      <div className="room-list">
        {salas.length > 0 ? (
          salas.map((sala) => (
            <div 
              key={sala.id} 
              className="room-card" 
              onClick={() => navigate(`/edit-room/${sala.id}`)} // Redireciona para a página de edição
              style={{ cursor: 'pointer' }} // Adiciona o cursor pointer para indicar que é clicável
            >
              <h3 className="room-name">{sala.nome}</h3>
              <p className="room-capacity">Capacidade: {sala.capacidade} pessoas</p>
              <p className="room-description">Descrição: {sala.descricao}</p>
            </div>
          ))
        ) : (
          <p className="no-rooms-message">Nenhuma sala disponível no momento.</p>
        )}
      </div>
    </div>
  );
}

export default RoomList;
