import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, GridColumn } from 'semantic-ui-react';
import { listenToEventFromFirestore } from '../../../app/firestore/firestoreService';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { listenToEvent } from '../eventActions';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Redirect } from 'react-router-dom';

export default function EventDetailedPage({ match }) {
  const dispatch = useDispatch();
  const event = useSelector((state) => state.event.events.find((e) => e.id === match.params.id));
  const { loading, error } = useSelector((state) => state.async);
  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvent([event])),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!event && !error)) return <LoadingComponent content='Loading event ...' />;
  if (error) {
      console.log(error);
      return <Redirect to='/error' />;
  } 

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedChat />
        <EventDetailedInfo event={event} />
      </Grid.Column>
      <GridColumn width={6}>
        <EventDetailedSidebar attendees={event?.attendees} />
      </GridColumn>
    </Grid>
  );
}
