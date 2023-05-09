import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import "./calender.css";
import Swal from "sweetalert2";
import Navbar from '../navbar/navbar';


function ScheduleCalendar() {
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/calendarschema");
        const calendarEvents = response.data.map((event) => {
          return {
            title: event.title,
            start: event.start,
            // end: event.end,
            id: event._id,
          };
        });
        setEvents(calendarEvents);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  function handleDateSelect(selectInfo) {
    Swal.fire({
      title: "Enter a new title for your event",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Create",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        let title = result.value;
        let calendarApi = selectInfo.view.calendar;
  
        calendarApi.unselect(); // clear date selection
  
        if (title) {
          const event = {
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
          };
  
          axios
            .post("http://localhost:5000/calendarschema", event)
            .then((response) => {
              setEvents([...events, { ...event, id: response.data._id }]);
            });
        }
      }
    });
  }

  function handleEventRemove(clickInfo) {
    Swal.fire({
      title: `Are you sure you want to delete the event '${clickInfo.event.title}'?`,
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/calendarschema/${clickInfo.event.id}`).then(() => {
          const filteredEvents = events.filter((event) => event.id !== clickInfo.event.id);
          setEvents(filteredEvents);
        });
      }
    });
  }

  function handleEventUpdate(updateInfo, calendarApi) {
    const { event } = updateInfo;
    const updatedEvent = {
      ...event,
      start: updateInfo.start,
      end: updateInfo.end,
    };
    axios.put(`http://localhost:5000/calendarschema/${event.id}`, updatedEvent).then(() => {
      calendarApi.getApi().updateEvent(updatedEvent);
    });
  }

  function handleAddEvent() {
    let title = prompt("Please enter a title for your event:");

    if (title) {
      const event = {
        title,
        start: new Date(),
        allDay: true,
      };

      axios.post("http://localhost:5000/calendarschema", event).then((response) => {
        setEvents([...events, { ...event, id: response.data._id }]);
      });
    }
  }

  return (
    <div>
      <Navbar />
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        select={handleDateSelect}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        editable={true}
        eventDurationEditable={true}
        eventResize={(updateInfo) => handleEventUpdate(updateInfo, calendarRef)}
        eventDrop={(updateInfo) => handleEventUpdate(updateInfo, calendarRef)}
        eventClick={handleEventRemove}
        events={events}
      />
    </div>
  );
}

export default ScheduleCalendar;