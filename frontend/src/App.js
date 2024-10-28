// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RoomList from './components/RoomList';
import ReservationPage from './pages/ReservationPage';
import ReservationForm from './components/ReservationForm';
import AddRoomForm from './components/AddRoomForm';
import EditRoomForm from './pages/EditRoomForm';
import EditReservationForm from './pages/EditReservationForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Sistema de Reservas de Salas de Reunião</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reservas" element={<ReservationPage />} />
            <Route path="/salas" element={<RoomList />} />
            <Route path="/reservar" element={<ReservationForm />} />
            <Route path="/add-room" element={<AddRoomForm />} />
            <Route path="/edit-room/:id" element={<EditRoomForm />} />
            <Route path="/reservas/editar/:id" element={<EditReservationForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
