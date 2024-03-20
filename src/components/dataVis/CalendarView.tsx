import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import GetUserFeedback from '../GetUserFeedback';
import EventDetailsModal from './EventDetailsModal';

export function CalendarView() {
  const Feedbacks = GetUserFeedback();

  const extractActionItemsAndUnitCode = (data: any[]) => {
    const actionItems: {
      id: any; // Ensure each event has a unique id
      title: any; // Use action as the event title
      start: any; // Use deadline as the event start date
      unitCode: any; annotationTag: any; commonTheme: any; text: any; actionItem: any;
    }[] = [];
    data.forEach((assessment: { unitCode: any; highlights: any[]; }) => {
      const unitCode = assessment.unitCode;
      assessment.highlights.forEach((highlight: { actionItems: any[]; annotation: { annotationTag: any; commonTheme: any; text: any; }; }) => {
        highlight.actionItems.forEach((actionItem: { id: any; action: any; deadline: any; }) => {
          actionItems.push({
            id: actionItem.id, // Ensure each event has a unique id
            title: actionItem.action, // Use action as the event title
            start: actionItem.deadline, // Use deadline as the event start date
            unitCode: unitCode,
            annotationTag: highlight.annotation.annotationTag,
            commonTheme: highlight.annotation.commonTheme,
            text: highlight.annotation.text,
            actionItem: actionItem,
          });
        });
      });
    });
    return actionItems;
  };

  const ActionItems = extractActionItemsAndUnitCode(Feedbacks);

  console.log('ActionItems:', ActionItems);

  const [showModal, setShowModal] = useState(false);
  const [clickedEvent, setClickedEvent] = useState(null);

  const handleEventClick = (clickInfo: { event: React.SetStateAction<null>; }) => {
    setClickedEvent(clickInfo.event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="calendar-container container">
      <div className="left-content">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={ActionItems}
          // eventClick={handleEventClick}
        />
        {showModal && (
          <>
            <div className="overlay" onClick={closeModal}></div>
            <EventDetailsModal event={clickedEvent} onClose={closeModal} />
          </>
        )}
      </div>

      <div className="right-content">
        <FullCalendar
          plugins={[listPlugin]}
          initialView="listWeek"
          events={ActionItems}
          eventContent={(arg) => <div>{arg.event.title}</div>}
        />
      </div>
    </div>
  );
}
