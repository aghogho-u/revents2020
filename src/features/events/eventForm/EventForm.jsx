import cuid from 'cuid';
import React, {useState} from 'react';
import { Segment, Header, Form, Input, Button } from 'semantic-ui-react';

export default function EventForm({setFormOpen, setEvents, createEvent, selectedEvent, updateEvent}){
    const initialValues = selectedEvent ?? {
        title: "",
        Category: "",
        Description: "",
        City: "",
        Venue: "",
        Date: ""
    }
    const [values, setValues] = useState(initialValues);
    function handleFormSubmit(){
        selectedEvent ? updateEvent({...selectedEvent, ...values}) :
        createEvent({...values, id: cuid(), hostedBy:"Bob", attendees: [], hostPhotoURL:"/assets/user.png"} );
        setFormOpen(false);
    }

    function handleInputChange(e){
        const {name, value} = e.target;
        setValues({...values, [name]:value})
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleFormSubmit}>
            <Header content={selectedEvent ? "Edit event" : "Create new event"}/>
            <Form.Field>
                <Input 
                    type="text" 
                    placeholder="Event title" 
                    name="title"
                    value={values.title} 
                    onChange={e=>handleInputChange(e)} />
            </Form.Field>
            <Form.Field>
                <Input type="text" placeholder="Category" name="Category"
                    value={values.category} 
                    onChange={e=>handleInputChange(e)} /> 
            </Form.Field>
            <Form.Field>
                <Input type="text" placeholder="Description" name="Description"
                    value={values.description} 
                    onChange={e=>handleInputChange(e)} />
            </Form.Field>
            <Form.Field>
                <Input type="text" placeholder="City" name="City"
                    value={values.city} 
                    onChange={e=>handleInputChange(e)} />
            </Form.Field>
            <Form.Field>
                <Input type="text" placeholder="Venue" name="Venue"
                    value={values.venue} 
                    onChange={e=>handleInputChange(e)} />
            </Form.Field>
            <Form.Field>
                <Input type="date" placeholder="Date" name="Date"
                    value={values.date} 
                    onChange={e=>handleInputChange(e)} />
            </Form.Field>
            <Button  type="submit" positive floated="right" content="Submit" />
            <Button onClick={()=>setFormOpen(false)} type="submit" floated="right" content="Cancel" />
            </Form>
        </Segment>
    )
}