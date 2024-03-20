import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import GetUserFeedback from '../GetUserFeedback';
import EventDetailsModal from './EventDetailsModal';
import interactionPlugin from '@fullcalendar/interaction'; // Import EventClickArg


export function CalendarView() {
  const Feedbacks = GetUserFeedback();

  const extractActionItemsAndUnitCode = (data: any[]) => {
    const actionItems: {
      id: any;
      title: any;
      start: any;
      unitCode: any;
      annotationTag: any;
      actionCategory: any; // New field for action item category
      notes: any; // New field for notes
      commonTheme: any;
      text: any;
      actionItem: any;
    }[] = [];
  
    data.forEach((assessment: { unitCode: any; highlights: any[]; }) => {
      const unitCode = assessment.unitCode;
      
      assessment.highlights.forEach((highlight: { actionItems: any[]; annotation: { annotationTag: any; commonTheme: any; text: any; notes: any; }; }) => {
        highlight.actionItems.forEach((actionItem: { id: any; action: any; category: any; deadline: any; }) => {
          actionItems.push({
            id: actionItem.id,
            title: actionItem.action,
            start: actionItem.deadline,
            unitCode: unitCode,
            annotationTag: highlight.annotation.annotationTag,
            actionCategory: actionItem.category, // Assign action item category
            notes: highlight.annotation.notes, // Assign notes
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

  const handleEventClick = (clickInfo : any) => { // Adjust type of clickInfo
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
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Add interactionPlugin here
          initialView="dayGridMonth"
          events={ActionItems}
          eventClick={handleEventClick}
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
