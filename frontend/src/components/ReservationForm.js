import React, { useState, useEffect } from 'react';
import '../styles/ReservationForm.css';
import { useNavigate } from 'react-router-dom';

function ReservationForm({ onReservationCreated }) {
  const navigate = useNavigate(); // Definindo navigate

  const [formData, setFormData] = useState({
    sala_id: '',
    data_hora_inicio: '',
    data_hora_fim: '',
    nome_responsavel: '',
  });
  const [message, setMessage] = useState(null);
  const [salas, setSalas] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/salas');
        const data = await response.json();
        setSalas(data.data);
      } catch (error) {
        console.error('Erro ao buscar salas:', error);
      }
    };

    fetchSalas();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.sala_id || !formData.data_hora_inicio || !formData.data_hora_fim || !formData.nome_responsavel) {
      setMessage("Por favor, preencha todos os campos.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/reservar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setMessage("Reserva realizada com sucesso!");
        setFormData({ sala_id: '', data_hora_inicio: '', data_hora_fim: '', nome_responsavel: '' });

        if (typeof onReservationCreated === 'function') {
          onReservationCreated();
        } else {
          console.warn('onReservationCreated não é uma função');
        }
      } else {
        setMessage(`Erro: ${responseData.message || "Erro ao realizar a reserva. Tente novamente."}`);
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      setMessage("Erro ao enviar os dados. Verifique a conexão e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/'); // Redireciona para a página inicial
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Reserve uma Sala</h2>
        <label>Sala:</label>
        <select
          className="select-custom"
          name="sala_id"
          value={formData.sala_id}
          onChange={handleChange}
          required
        >
          <option value="">Selecione uma sala</option>
          {salas.map((sala) => (
            <option key={sala.id} value={sala.id}>
              {sala.nome}
            </option>
          ))}
        </select>

        <label>Data e Hora de Início:</label>
        <input
          type="datetime-local"
          name="data_hora_inicio"
          value={formData.data_hora_inicio}
          onChange={handleChange}
          required
        />

        <label>Data e Hora de Fim:</label>
        <input
          type="datetime-local"
          name="data_hora_fim"
          value={formData.data_hora_fim}
          onChange={handleChange}
          required
        />

        <label>Nome do Responsável:</label>
        <input
          className="input-custom"
          name="nome_responsavel"
          value={formData.nome_responsavel}
          onChange={handleChange}
          placeholder="Digite o nome do responsável"
          required
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Reservando...' : 'Reservar'}
        </button>

        <button type="button" onClick={handleBack} className="back-button">Voltar</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default ReservationForm;
