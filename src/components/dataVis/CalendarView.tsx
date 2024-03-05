import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


export function CalendarView({}) {
  const [events, setEvents] = useState([
    { title: 'Event 1', date: '2023-11-07' },
    { title: 'Event 2', date: '2023-11-10' },
  ]);

  const handleDateClick = (clickInfo) => {
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