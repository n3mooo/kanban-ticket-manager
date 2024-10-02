import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from './Column';
import { getTickets, updateTicket, createTicket, deleteTicket } from '../services/ticket';

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
}

const Board: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const response = await getTickets();
    setTickets(response.data);
  };

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedTicket = tickets.find(ticket => ticket.id === draggableId);
    if (updatedTicket) {
      const newStatus = destination.droppableId;
      await updateTicket(draggableId, { ...updatedTicket, status: newStatus });
      fetchTickets();
    }
  };

  const handleCreate = async () => {
    const title = prompt('Enter ticket title:');
    const description = prompt('Enter ticket description:');
    if (title && description) {
      await createTicket({ title, description, status: 'todo' });
      fetchTickets();
    }
  };

  const handleDelete = async (id: string) => {
    await deleteTicket(id);
    fetchTickets();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <button
        onClick={handleCreate}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Ticket
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          <Column
            title="To Do"
            tickets={tickets.filter((t) => t.status === 'todo')}
            status="todo"
            onDelete={handleDelete}
          />
          <Column
            title="In Progress"
            tickets={tickets.filter((t) => t.status === 'inProgress')}
            status="inProgress"
            onDelete={handleDelete}
          />
          <Column
            title="Done"
            tickets={tickets.filter((t) => t.status === 'done')}
            status="done"
            onDelete={handleDelete}
          />
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;