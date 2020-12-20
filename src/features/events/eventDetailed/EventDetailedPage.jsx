import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';

export default function EventDetailedPage (){
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventDetailedHeader />
                <EventDetailedChat />
                <EventDetailedInfo />
             </Grid.Column>
             <GridColumn width={6}>
                 <EventDetailedSidebar />
             </GridColumn>
        </Grid>
    )
}