import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CaseForm from './CaseForm';

interface Ticket {
  id: number;
  title: string;
  description: string;
}

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('/tickets/');
      setTickets(response.data);
    } catch (error) {
      console.error('Error al obtener los tickets:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/tickets/${id}`);
      alert('Ticket eliminado exitosamente');
      fetchTickets(); // Refrescar la lista después de eliminar
    } catch (error) {
      console.error('Error al eliminar el ticket:', error);
      alert('Error al eliminar el ticket');
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div>
      <h2>Seguimiento de Tickets</h2>
      <input
        type="text"
        placeholder="Filtrar por título"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {tickets
          .filter((ticket) => ticket.title.toLowerCase().includes(filter.toLowerCase()))
          .map((ticket) => (
            <li key={ticket.id}>
              <strong>Título:</strong> {ticket.title}, 
              <strong>Descripción:</strong> {ticket.description}
              <button onClick={() => setSelectedTicket(ticket)}>Editar</button>
              <button onClick={() => handleDelete(ticket.id)}>Eliminar</button>
            </li>
          ))}
      </ul>
      {selectedTicket && (
        <CaseForm
          ticketToEdit={selectedTicket}
          onTicketCreatedOrUpdated={() => {
            setSelectedTicket(null);
            fetchTickets();
          }}
        />
      )}
    </div>
  );
};

export default TicketList;