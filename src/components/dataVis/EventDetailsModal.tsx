import React from 'react';

interface EventDetailsModalProps {
  event: any;
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, onClose }) => {
  const formattedDate = new Date(event.start).toLocaleDateString(); // Convert start date to a readable format
  const eventUnitCode = event.unit1Code
  return (
    <div className="event-modal">  
      <h2>Event Details</h2>
      <p><strong>Title:</strong> {event.title}</p>
      <p><strong>Date:</strong> {formattedDate}</p>
      <p><strong>Unit Code:</strong> {eventUnitCode}</p>
      <p><strong>Annotation Tag:</strong> {event.annotationTag || "No annotation tag"}</p>
      <p><strong>Action Category:</strong> {event.actionCategory || "No action category"}</p>
      <p><strong>Notes:</strong> {event.notes || "No notes available"}</p>
      <p><strong>Common Theme:</strong> {event.commonTheme || "No common theme"}</p>
      <p><strong>Text:</strong> {event.text || "No text available"}</p>
      {event.actionItem && ( // Check if actionItem exists before accessing its properties
        <>
          <p><strong>Action Item ID:</strong> {event.actionItem.id}</p>
          <p><strong>Action:</strong> {event.actionItem.action}</p>
          <p><strong>Category:</strong> {event.actionItem.category}</p>
          <p><strong>Deadline:</strong> {new Date(event.actionItem.deadline).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {event.actionItem.status === 0 ? "Incomplete" : "Complete"}</p>
        </>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EventDetailsModal;
