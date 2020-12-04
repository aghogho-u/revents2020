import React from 'react';
import { Segment, Header, Form, Input, Button } from 'semantic-ui-react';

export default function EventForm({setFormOpen}){
    return(
        <Segment clearing>
            <Form>
            <Header content="Create new event"/>
            <Form.Field>
                <Input type="text" placeholder="Event title" />
            </Form.Field>
            <Form.Field>
                <Input type="text" placeholder="Category" />
            </Form.Field>
            <Form.Field>
                <Input type="text" placeholder="Description" />
            </Form.Field>
            <Form.Field>
                <Input type="text" placeholder="City" />
            </Form.Field>
            <Form.Field>
                <Input type="text" placeholder="Venue" />
            </Form.Field>
            <Form.Field>
                <Input type="date" placeholder="Date" />
            </Form.Field>
            <Button type="submit" positive floated="right" content="Submit" />
            <Button onClick={()=>setFormOpen(false)} type="submit" floated="right" content="Cancel" />
            </Form>
        </Segment>
    )
}