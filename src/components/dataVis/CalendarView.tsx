import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import GetUserFeedback from '../GetUserFeedback';
import EventDetailsModal from './EventDetailsModal';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styling/Calendar.css'


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

  useEffect(() => {
    const removeTimeFromList = () => {
      const timeElements = document.querySelectorAll('.fc-list-event-time');
      timeElements.forEach((element) => {
        (element as HTMLElement).style.display = 'none'; // Type assertion
      });
    };

    removeTimeFromList();

    return () => {
      // Cleanup function to restore original state when component unmounts
      const timeElements = document.querySelectorAll('.fc-list-event-time');
      timeElements.forEach((element) => {
        (element as HTMLElement).style.display = ''; // Type assertion
      });
    };
  }, []); 

  return (
    <div className="container">
      <div className='row'>
        <div className="col-md-9">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={ActionItems}
            eventClick={handleEventClick}
            eventContent={renderEventContent} // Use custom event rendering
            headerToolbar={{ // Customize header toolbar with custom buttons and default navigation buttons
              start: 'prev', // Include customPrev button and prev button
              center: 'title',
              end: 'next' // Include customNext button and next button
          
            }}
            
            
          />
          {showModal && (
            <>
              <div className="overlay" onClick={closeModal}></div>
              <EventDetailsModal event={clickedEvent} onClose={closeModal} />
            </>
          )}
        </div>

        <div className="col-md-3">
          <FullCalendar
            

            plugins={[listPlugin]}
            initialView="listWeek"
            events={ActionItems}
            eventContent={(arg) => (
              
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {/* Display unit code before event title */}
                <div>
                  {arg.event.extendedProps.unitCode && (
                    <span>{arg.event.extendedProps.unitCode.split('_')[0]}: </span>
                  )}
                  {arg.event.title}
                </div>
                <div>
                  <span>{renderStatus(arg.event.extendedProps.actionItem)}</span>
                </div>
              </div>

        
            )}
            eventClick={handleEventClick}
            displayEventTime={false}
            headerToolbar={{ // Customize header toolbar with custom buttons and default navigation buttons
              start: 'prev', // Include customPrev button and prev button
              center: 'title',
              end: 'next' // Include customNext button and next button
            }}
              // Custom style for the title
            titleFormat={{
              month: 'short', // Display the full month name
              day: 'numeric', // Display the day of the month
            }}
            buttonIcons={{
              prev: 'chevron-left',
              next: 'chevron-right',
            }}

          />
          {showModal && (
            <>
              <div className="overlay" onClick={closeModal}></div>
              <EventDetailsModal event={clickedEvent} onClose={closeModal} />
            </>
          )}
        </div>
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
      <div className="fc-event-title">{eventInfo.event.title}</div>
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
