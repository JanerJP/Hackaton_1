import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Ticket {
  id: number;
  title: string;
  description: string;
}

interface CaseFormProps {
  ticketToEdit?: Ticket;
  onTicketCreatedOrUpdated: () => void;
}

const CaseForm: React.FC<CaseFormProps> = ({ ticketToEdit, onTicketCreatedOrUpdated }) => {
  const [caseData, setCaseData] = useState<Ticket>({
    title: '',
    description: ''
  });

  useEffect(() => {
    if (ticketToEdit) {
      setCaseData(ticketToEdit);
    }
  }, [ticketToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaseData({ ...caseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (ticketToEdit) {
        await axios.put(`/tickets/${ticketToEdit.id}`, caseData);
        alert('Ticket actualizado exitosamente');
      } else {
        await axios.post('/tickets/', caseData);
        alert('Ticket creado exitosamente');
      }
      setCaseData({ title: '', description: '' });
      onTicketCreatedOrUpdated(); // Notificar al padre que se ha creado o actualizado un ticket
    } catch (error) {
      console.error('Error al crear o actualizar el ticket:', error);
      alert('Error al crear o actualizar el ticket');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{ticketToEdit ? 'Editar Ticket' : 'Crear Nuevo Ticket'}</h2>
      <input
        type="text"
        name="title"
        placeholder="Título del Ticket"
        value={caseData.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Descripción del Ticket"
        value={caseData.description}
        onChange={handleChange}
        required
      />
      <button type="submit">{ticketToEdit ? 'Actualizar Ticket' : 'Crear Ticket'}</button>
    </form>
  );
};

export default CaseForm;