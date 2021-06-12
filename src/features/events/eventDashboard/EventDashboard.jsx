import React, { useState }  from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EvenList";
import { useDispatch, useSelector } from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "../../../EventFilters";
import { listenToEventsFromFirestore } from "../../../app/firestore/firestoreService";
import { listenToEvent } from "../eventActions";
import useFirestoreCollections from "../../../app/hooks/useFirestoreCollections";

function EventDashboard() {
  const dispatch = useDispatch();
  const {events} = useSelector(state => state.event );
  const {loading} = useSelector(state => state.async);
  const [ predicate, setPredicate ] = useState(new Map([
    ['startDate', new Date()],
    ['filter', 'all']
  ]))

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

   useFirestoreCollections({
     query: () => listenToEventsFromFirestore(predicate),
     data: events => dispatch(listenToEvent(events)),
     deps: [dispatch, predicate]
   })

  return (
    <Grid>
      <Grid.Column width={10}>
        {
          loading && 
          <>
          <EventListItemPlaceholder />
          <EventListItemPlaceholder />
          </>
        }
        <EventList
          events={events}
          
        />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventFilters predicate={predicate} setPredicate={handleSetPredicate} loading={loading} />
      </Grid.Column>
    </Grid>
  );
}
export default EventDashboard;
