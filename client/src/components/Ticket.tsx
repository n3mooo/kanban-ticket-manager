import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface TicketProps {
  ticket: {
    id: string;
    title: string;
    description: string;
    status: string;
  };
  index: number;
  onDelete: (id: string) => void;
}

const Ticket: React.FC<TicketProps> = ({ ticket, index, onDelete }) => {
  return (
    <Draggable draggableId={ticket.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 mb-2 rounded shadow"
        >
          <h3 className="font-bold">{ticket.title}</h3>
          <p>{ticket.description}</p>
          <button
            onClick={() => onDelete(ticket.id)}
            className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default Ticket;