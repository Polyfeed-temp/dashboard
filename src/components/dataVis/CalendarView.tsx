import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


export function CalendarView({}) {
  const [events, setEvents] = useState([
    { title: 'Event 1', date: '2024-03-07' , backgroundColor: 'red'},
    { title: 'Event 2', date: '2024-03-10' },
    { title: 'Event with Stripes', date: '2024-03-15', classNames: 'striped-event' }
  ]);

  const handleDateClick = (clickInfo: { dateStr: string; }) => {
    alert('Clicked on: ' + clickInfo.dateStr);
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
      />
    </div>
  );
};