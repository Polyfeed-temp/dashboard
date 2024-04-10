import React from 'react';

interface EventDetailsModalProps {
  event: any; 
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, onClose }) => {

  return (
     <div className="event-modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 z-1000">  
      <h2 className="text-lg font-large mb-1">To-do List Description</h2>

      <div className="event-details-section flex flex-col items-start mb-4">
        <p><strong>To-do Item:</strong> {event.title}</p>
        <p><strong>Date:</strong> {new Date(event.start).toLocaleDateString('en-US', {month: "long", day: "numeric", year: "numeric"})}
        </p>
        <p><strong>Unit Code:</strong> {event.extendedProps?.unitCode || "No unit code"}</p> 
        <p><strong>Annotation Tag:</strong> {event.extendedProps?.annotationTag}</p> 
        {event.extendedProps?.actionItem && ( 
          <>
            <p><strong>Highlighted text:</strong> {event.extendedProps.text}</p>
            <p><strong>Category:</strong> {event.extendedProps.actionItem.category}</p>
            <p><strong>Status:</strong> {renderStatus(event.extendedProps.actionItem)}</p> 
          </>
        )} 
      </div>

      <button onClick={onClose}>Close</button>
    </div>
  );
};

const renderStatus = (actionItem: any) => {
  const today = new Date();
  const eventDeadline = new Date(actionItem.deadline);

  if (actionItem.status === 0 && eventDeadline < today) {
    return "Overdue";
  } else if (actionItem.status === 1) {
    return "Completed";
  } else if (actionItem.status === 0) {
    return "Incomplete";
  } else {
    return "Unknown Status";
  }
}

export default EventDetailsModal;
