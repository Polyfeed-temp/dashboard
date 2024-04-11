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
    "Strength": "#3a70b7",
    "Weakness": "#ef5975",
    "Action Item" : "#23bfc6",
    "Confused": "#f79633",
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
      //backgroundImage: string;
      textColor?: string;
      borderColor?: string; // Add borderColor field
    }[] = [];

    const today = new Date();

    data.forEach((assessment: { unitCode: any; highlights: any[]; }) => {
      const unitCode = assessment.unitCode;

      assessment.highlights.forEach((highlight: { actionItems: any[]; annotation: { annotationTag: any; commonTheme: any; text: any; notes: any; }; }) => {
        highlight.actionItems.forEach((actionItem: { id: any; action: any; category: any; deadline: any; status: any }) => {
          const deadlineDate = new Date(actionItem.deadline);
          const status = actionItem.status;
          const isOverdue = today > deadlineDate;

          var bgColor = 'white';
          var brColor = 'white';
          var txtColor = 'white';

          if (status ==1) {
            bgColor = colorMapping[highlight.annotation.annotationTag as keyof typeof colorMapping];
            brColor = colorMapping[highlight.annotation.annotationTag as keyof typeof colorMapping];
          }else if (status == 0 && isOverdue){
            bgColor = '#878787';
            brColor = '#878787';
            txtColor = 'white';
          }else{
            brColor = colorMapping[highlight.annotation.annotationTag as keyof typeof colorMapping];
            txtColor = 'black';
          }

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
            backgroundColor: bgColor,
            textColor: txtColor,
            borderColor: brColor
          });
          //console.log(actionItems);
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
        <div className="col-md-8 col-lg-8 col-xl-8">
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

        <div className="col-md-4 col-lg-4 col-xl-4">
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
                <div style={{fontStyle: "italic", fontSize: "12px"}}>
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
          <br/>
          {/* Adding Legend*/}
          <table className="Legendtable" style={{fontSize: '12px'}}>
            <thead>
                <tr>
                    <th scope="col">Legend</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div style={{backgroundColor:'#3a70b7',width:'50px',height:'25px',borderColor:'#3a70b7'}}></div>
                </td>
                <td>Completed to-do list item labelled for strength </td>
              </tr>
              <tr>
              <td>
                  <div style={{backgroundColor:'white',width:'50px',height:'25px', border:'2px solid #3a70b7'}}></div>
                </td>
                <td>Incomplete to-do list item labelled for strength </td>
              </tr>
              <tr>
                <td>
                  <div style={{backgroundColor:'#ef5975',width:'50px',height:'25px'}}></div>
                </td>
                <td>Completed to-do list item labelled for weakness </td>
              </tr>
              <tr>
              <td>
                  <div style={{backgroundColor:'white',width:'50px',height:'25px', border:' 2px solid #ef5975'}}></div>
                </td>
                <td>Incomplete to-do list item labelled for weakness </td>
              </tr>
              <tr>
                <td>
                  <div style={{backgroundColor:'#23bfc6',width:'50px',height:'25px'}}></div>
                </td>
                <td>Completed to-do list item labelled for action point </td>
              </tr>
              <tr>
              <td>
                  <div style={{backgroundColor:'white',width:'50px',height:'25px', border:'2px solid #23bfc6'}}></div>
                </td>
                <td>Incomplete to-do list item labelled for action point </td>
              </tr>
              <tr>
                <td>
                  <div style={{backgroundColor:'#f79633',width:'50px',height:'25px'}}></div>
                </td>
                <td>Completed to-do list item labelled for confused </td>
              </tr>
              <tr>
              <td>
                  <div style={{backgroundColor:'white',width:'50px',height:'25px', border:'2px solid #f79633'}}></div>
                </td>
                <td>Incomplete to-do list item labelled for confused </td>
              </tr>
              <tr>
                <td>
                  <div style={{backgroundColor:'#8960aa',width:'50px',height:'25px'}}></div>
                </td>
                <td>Completed to-do list item labelled for other </td>
              </tr>
              <tr>
              <td>
                  <div style={{backgroundColor:'white',width:'50px',height:'25px', border:'2px solid #8960aa'}}></div>
                </td>
                <td>Incomplete to-do list item labelled for other </td>
              </tr>
              <tr>
              <td>
                  <div style={{backgroundColor:'#878787',width:'50px',height:'25px', border:'2px solid #878787'}}></div>
                </td>
                <td>Overdue to-do list items</td>
              </tr>
              
            </tbody>
        </table>
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
