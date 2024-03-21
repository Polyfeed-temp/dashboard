import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import GetUserFeedback from '../GetUserFeedback';
import EventDetailsModal from './EventDetailsModal';

export function CalendarView() {
  const Feedbacks = GetUserFeedback();

  const colorMapping = {
    "Strength": "#a70b7",
    "Weakness": "#ef5975",
    "Action Item" : "#23bfc6",
    "Confused": "#f7633",
    "Other": "#8960aa"
  };

  const extractActionItemsAndUnitCode = (data: any[]) => {
    const actionItems: {
      id: any;
      title: any;
      start: any;
      unitCode: any;
      annotationTag: any;
      actionCategory: any;
      notes: any;
      commonTheme: any;
      text: any;
      actionItem: any;
      backgroundColor?: string;
      textColor?: string;
      borderColor?: string; // Add borderColor field
    }[] = [];

    const today = new Date();

    data.forEach((assessment: { unitCode: any; highlights: any[]; }) => {
      const unitCode = assessment.unitCode;

      assessment.highlights.forEach((highlight: { actionItems: any[]; annotation: { annotationTag: any; commonTheme: any; text: any; notes: any; }; }) => {
        highlight.actionItems.forEach((actionItem: { id: any; action: any; category: any; deadline: any; }) => {
          const deadlineDate = new Date(actionItem.deadline);

          const isOverdue = today > deadlineDate;

          actionItems.push({
            id: actionItem.id,
            title: actionItem.action,
            start: actionItem.deadline,
            unitCode: unitCode,
            annotationTag: highlight.annotation.annotationTag,
            actionCategory: actionItem.category,
            notes: highlight.annotation.notes,
            commonTheme: highlight.annotation.commonTheme,
            text: highlight.annotation.text,
            actionItem: actionItem,
            backgroundColor: isOverdue ? 'white' : colorMapping[highlight.annotation.annotationTag as keyof typeof colorMapping] || '#dddddd',
            textColor: isOverdue ? 'black' : 'white',
            borderColor: colorMapping[highlight.annotation.annotationTag as keyof typeof colorMapping] || 'black' // Set borderColor to colorMapping value
          });
        });
      });
    });

    return actionItems;
  };

  const ActionItems = extractActionItemsAndUnitCode(Feedbacks);

  const [showModal, setShowModal] = useState(false);
  const [clickedEvent, setClickedEvent] = useState(null);

  const handleEventClick = (clickInfo : any) => {
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
          eventClick={handleEventClick}
          eventContent={renderEventContent} // Use custom event rendering
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

const renderEventContent = (eventInfo: any) => {
  return (
    <div style={{ backgroundColor: eventInfo.backgroundColor, borderColor: eventInfo.borderColor, color: eventInfo.textColor, borderWidth: '2px', borderStyle: 'solid' }}>
      {eventInfo.timeText && (
        <div className="fc-event-time">{eventInfo.timeText}</div>
      )}
      <div className="fc-event-title">{eventInfo.event.extendedProps.unitCode} - {eventInfo.event.title}</div>
    </div>
  );
};
