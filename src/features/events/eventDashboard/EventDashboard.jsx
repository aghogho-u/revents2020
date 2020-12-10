import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import EventForm from "../eventForm/EventForm";
import EventList from "./EvenList";
import { sampleData } from "../../../app/api/sampleData";

function EventDashboard({
  formOpen,
  setFormOpen,
  selectEvent,
  selectedEvent,
}) {
  const [events, setEvents] = useState(sampleData);

  function handleCreateEvents(event) {
    setEvents([...events, event]);
  }

  function handleUpdateEvent(updatedEvent){
      setEvents(events.map(evt => evt.id === updatedEvent.id ? updatedEvent : evt))
      selectEvent(null)
  }

  function handleDeleteEvent(deletedEvent){
      setEvents(events.filter(evt => evt.id !== deletedEvent.id ))
  }
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={events}
          selectEvent={selectEvent}
          deleteEvent={handleDeleteEvent}
        />
      </Grid.Column>

      <Grid.Column width={6}>
        {formOpen && (
          <EventForm
            setFormOpen={setFormOpen}
            setEvent={setEvents}
            createEvent={handleCreateEvents}
            selectedEvent={selectedEvent}
            updateEvent={handleUpdateEvent}
            key={selectedEvent ? selectedEvent.id : null}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
export default EventDashboard;
