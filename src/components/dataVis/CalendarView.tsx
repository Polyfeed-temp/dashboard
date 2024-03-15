import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { aa } from '@fullcalendar/core/internal-common';
import EventDetailsModal from './EventDetailsModal'; 

export function CalendarView({}) {
  const [events, setEvents] = useState([
    { id:  '1', title: 'Redo Design', date: '2024-03-07' , backgroundColor: '#ef5975', checked: false },
    { id:  '2', title: 'Look at Design', date: '2024-03-10', backgroundColor: '##3a70b7', checked: false  },
    { id:  '3', title: 'Review Code', date: '2024-03-15', checked: false  },
    { id:  '4', title: 'Revise Report', date: '2024-03-04' , backgroundColor: '#ef5975', checked: false },
    { id:  '5', title: 'Revise Report', date: '2024-03-19', checked: false  },
    { id:  '6', title: 'Discuss with TA', date: '2024-03-22', backgroundColor: '#23bfc6', checked: false  },
    { id:  '7', title: 'Review Feedback', date: '2024-03-25' , backgroundColor: '#8960aa', checked: false },
    { id:  '8', title: 'Review Feedback', date: '2024-03-26', backgroundColor: '#8960aa', checked: false  },
    { id:  '9', title: 'Look at Results', date: '2024-03-27', backgroundColor:'#23bfc6', checked: false  },
    { id:  '10', title: 'Review Feedback', date: '2024-03-27' , backgroundColor: '#ef5975', checked: false },
    { id:  '11', title: 'Review Feedback', date: '2024-03-29', backgroundColor: '#ef5975', checked: false  },
    { id:  '12', title: 'Review Code', date: '2024-03-15', backgroundColor:'#f79633', checked: false  },
  ]);

  const handleCheckboxChange = (eventInfo: aa) => {
    // const newEvents = [...events];  // Duplicate the events array
    // const updatedEvent = newEvents.find((e) => e.id === eventInfo.event.id);
    // updatedEvent?.checked = !updatedEvent?.checked; 
    // setEvents(newEvents); // Update React state
  };

  // const handleDateClick = (clickInfo: { dateStr: string; }) => {
  //   alert('Clicked on: ' + clickInfo.dateStr);
  // };

  const [showModal, setShowModal] = useState(false);
    const [clickedEvent, setClickedEvent] = useState(null);

    const handleEventClick = (clickInfo: { event: any; }) => {
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
          events={events}
          // dateClick={handleDateClick}
          eventClick={handleEventClick}
        />
        {showModal && (
        <> {/* Using a React Fragment for multiple elements*/}
                <div className="overlay" onClick={closeModal}></div>  
                <EventDetailsModal event={clickedEvent} onClose={closeModal} />
        </>    
            )}
        
      </div>
       

      <div className="right-content">
        <FullCalendar
            plugins={[listPlugin]}
            initialView="listWeek"
            events={events}
            eventContent={(arg) => (
              <div> 
                {/* <input 
                  type="checkbox" 
                  checked={arg.event.extendedProps.checked}
                  onChange={() => handleCheckboxChange(arg)} 
                /> */}
                {' '} {arg.event.title} 
              </div>
            )}
        />
      </div>
        
  
      
    </div>
  );
};