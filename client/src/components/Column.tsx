import React from 'react';
import { StrictModeDroppable } from './StrictModeDroppable';
import Ticket from './Ticket';

interface ColumnProps {
  title: string;
  tickets: any[];
  status: string;
  onDelete: (id: string) => void;
}

const Column: React.FC<ColumnProps> = ({ title, tickets, status, onDelete }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg w-1/3">
      <h2 className="font-bold mb-4">{title}</h2>
      <StrictModeDroppable droppableId={status}>
        {(provided) => (
          <div 
            ref={provided.innerRef} 
            {...provided.droppableProps}
            className="min-h-[200px]"
          >
            {tickets.map((ticket, index) => (
              <Ticket key={ticket.id} ticket={ticket} index={index} onDelete={onDelete} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </div>
  );
};

export default Column;