import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EvenList";
import { sampleData } from "../../../app/api/sampleData";

function EventDashboard() {
  const [events, setEvents] = useState(sampleData);

  // function handleCreateEvents(event) {
  //   setEvents([...events, event]);
  // }

  // function handleUpdateEvent(updatedEvent){
  //     setEvents(events.map(evt => evt.id === updatedEvent.id ? updatedEvent : evt))
  //     selectEvent(null)
  // }

  function handleDeleteEvent(deletedEvent){
      setEvents(events.filter(evt => evt.id !== deletedEvent.id ))
  }
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={events}
          deleteEvent={handleDeleteEvent}
        />
      </Grid.Column>

      <Grid.Column width={6}>
        <h2>Event Filters</h2>
      </Grid.Column>
    </Grid>
  );
}
export default EventDashboard;
