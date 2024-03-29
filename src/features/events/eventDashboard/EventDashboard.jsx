import React, { useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import EventList from './EvenList';
import { useDispatch, useSelector } from 'react-redux';
import EventListItemPlaceholder from './EventListItemPlaceholder';
import EventsFeed from './EventsFeed';
import EventFilters from './EventFilters';
import { fetchEvents } from '../eventActions';
import { RETAIN_STATE } from '../eventsConstants';

function EventDashboard() {
  const limit = 2;
  const dispatch = useDispatch();
  const { events, moreEvents,filter, startDate, retainState, lastVisible } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const { authenticated } = useSelector((state) => state.auth);
 

  
  useEffect(() => {
    if(retainState) return;
    setLoadingInitial(true);
    dispatch(fetchEvents(filter, startDate, limit)).then(() => {
      setLoadingInitial(false);
    });
    return () => {
      dispatch({type: RETAIN_STATE});
    };
  }, [dispatch, filter, startDate, retainState]);

  function handleFetchNextEvents() {
    dispatch(fetchEvents(filter, startDate, limit, lastVisible))
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        {loadingInitial && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        )}
        <EventList
          events={events}
          loading={loading}
          getNextEvents={handleFetchNextEvents}
          moreEvents={moreEvents}
        />
      </Grid.Column>

      <Grid.Column width={6}>
        {authenticated && <EventsFeed />}
        <EventFilters loading={loading} />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loading} />
      </Grid.Column>
    </Grid>
  );
}
export default EventDashboard;
