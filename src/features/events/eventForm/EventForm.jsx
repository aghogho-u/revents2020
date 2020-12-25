import cuid from "cuid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Segment,
  Header,
  Form,
  Input,
  Button,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent, createEvent } from "../eventActions";

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  const initialValues = selectedEvent ?? {
    title: "",
    Category: "",
    Description: "",
    City: "",
    Venue: "",
    Date: "",
  };
  const [values, setValues] = useState(initialValues);
  function handleFormSubmit() {
    selectedEvent
      ? dispatch(
          updateEvent({ ...selectedEvent, ...values })
        )
      : dispatch(
          createEvent({
            ...values,
            id: cuid(),
            hostedBy: "Bob",
            attendees: [],
            hostPhotoURL: "/assets/user.png",
          })
        );
        history.push('/events');
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleFormSubmit}>
        <Header
          content={
            selectedEvent
              ? "Edit event"
              : "Create new event"
          }
        />
        <Form.Field>
          <Input
            type='text'
            placeholder='Event title'
            name='title'
            value={values.title}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type='text'
            placeholder='Category'
            name='Category'
            value={values.category}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type='text'
            placeholder='Description'
            name='Description'
            value={values.description}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type='text'
            placeholder='City'
            name='City'
            value={values.city}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type='text'
            placeholder='Venue'
            name='Venue'
            value={values.venue}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type='date'
            placeholder='Date'
            name='Date'
            value={values.date}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Button
          type='submit'
          positive
          floated='right'
          content='Submit'
        />
        <Button
          as={Link}
          to='/events'
          type='submit'
          floated='right'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
}
