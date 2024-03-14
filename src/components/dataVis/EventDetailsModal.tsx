import React from 'react';

interface EventDetailsModalProps {
  event: any; // Replace 'any' with a type if you have a specific event object structure
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, onClose }) => {
  return (
    <div className="event-modal">  {/* Style this as needed */}
      <h2>Event Details</h2>
      <p><strong>Title:</strong> {event.title}</p>
      {event.extendedProps.description && ( 
        <p><strong>Description:</strong> {event.extendedProps.description}</p>
      )}
      {/* Add more fields as needed */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EventDetailsModal;