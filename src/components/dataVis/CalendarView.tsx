import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { aa } from '@fullcalendar/core/internal-common';

export function CalendarView({}) {
  const [events, setEvents] = useState([
    { id:  '1', title: 'Event 1', date: '2024-03-07' , backgroundColor: 'red', checked: false },
    { id:  '2', title: 'Event 2', date: '2024-03-10', checked: false  },
    { id:  '3', title: 'Event with Stripes', date: '2024-03-15', checked: false  }
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

  return (
    <div className="calendar-container container">
      <div className="left-content">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          // dateClick={handleDateClick}
        />
      </div>
       

      <div className="right-content">
        <FullCalendar
            plugins={[listPlugin]}
            initialView="listWeek"
            events={events}
            eventContent={(arg) => (
              <div> 
                <input 
                  type="checkbox" 
                  checked={arg.event.extendedProps.checked}
                  onChange={() => handleCheckboxChange(arg)} 
                />
                {' '} {arg.event.title} 
              </div>
            )}
        />
      </div>
        
  
      
    </div>
  );
};