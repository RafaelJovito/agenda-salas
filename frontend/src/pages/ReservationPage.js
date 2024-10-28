import React from 'react';
import ReservationsList from '../components/ReservationsList';
import '../styles/ReservationPage.css';

function ReservationPage() {
  return (
    <div className="reservation-page">
      <h1>Gerenciar Reservas</h1>
      <h2>Lista de Reservas</h2>
      <ReservationsList /> 
    </div>
  );
}

export default ReservationPage;
