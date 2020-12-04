import React from 'react';
import { Button, Icon, Item, List, Segment } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';

export default function EventListItem({event}){
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src={event.hostPhotoURL} />
                        <Item.Content>
                            <Item.Header content={event.title} />
                            <Item.Description> 
                                Hosted by {event.hostedBy}
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name="clock" /> Date
                    <Icon name="marker" />Venue
                </span>
            </Segment>
            <Segment secondary>
                <List horizontal>
                    {event.attendees.map(attendee=>(
                        <EventListAttendee key={attendee.id} attendee={attendee} />
                    ))}
                </List>
            </Segment>
            <Segment clearing>
                <div>Description of Event</div>
                <Button color="teal" floated="right" content="view" />
            </Segment>
        </Segment.Group>
    )
}