import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, GridColumn } from 'semantic-ui-react';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';

export default function EventDetailedPage ({match}){
    const event = useSelector (state => state.event.events.find(e => e.id === match.params.id))
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventDetailedHeader event={event} />
                <EventDetailedChat />
                <EventDetailedInfo event={event} />
             </Grid.Column>
             <GridColumn width={6}>
                 <EventDetailedSidebar attendees={event.attendees} />
             </GridColumn>
        </Grid>
    )
}