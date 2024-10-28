import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import RoomList from '../components/RoomList';

function HomePage() {
  const navigate = useNavigate(); 
  const handleAddRoom = () => {
    navigate('/add-room'); 
  };
  const handleReserveRoom = () => {
    navigate('/reservar'); 
  };

  const handleReserveList = () => {
    navigate('/reservas'); 
  };

  return (
    <div>
      <RoomList onAddRoom={handleAddRoom} />
      
      <div className="add-room-button-container">
        <button className="add-room-button" onClick={handleAddRoom}>
          Adicionar Sala
        </button>
        <button className="add-room-button btn-rs" onClick={handleReserveRoom}>
          Reservar Sala
        </button>
        <button className="add-room-button btn-rl" onClick={handleReserveList}>
          Gerenciar Reservas
        </button>
      </div>
    </div>
  );
}

export default HomePage;
