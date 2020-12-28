import cuid from 'cuid';
import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Segment, Header, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';

import { updateEvent, createEvent } from '../eventActions';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryData } from '../../../app/api/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';

const validationSchema = Yup.object({
  title: Yup.string().required('Kindly fill out a title'),
  category: Yup.string().required(),
  description: Yup.string().required(),
  city: Yup.string().required(),
  venue: Yup.string().required(),
  date: Yup.string().required(),
});

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  const initialValues = selectedEvent ?? {
    title: '',
    Category: '',
    Description: '',
    City: '',
    Venue: '',
    Date: '',
  };

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          selectedEvent
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(
                createEvent({
                  ...values,
                  id: cuid(),
                  hostedBy: 'Bob',
                  attendees: [],
                  hostPhotoURL: '/assets/user.png',
                })
              );
          history.push('/events');
        }}
      >
        {({isSubmitting, dirty, isValid})=>(
          <Form className='ui form'>
          <Header sub color='teal' content='Event Details' />
          <MyTextInput name='title' placeholder='Event Title' />
          <MySelectInput name='category' placeholder='Category' options={categoryData} />
          <MyTextArea name='description' placeholder='Description' rows={3} />
          <Header sub color='teal' content='Event Location' />
          <MyTextInput name='city' placeholder='City' />
          <MyTextInput name='venue' placeholder='Venue' />
          <MyDateInput
            name='date'
            placeholderText='Event Date'
            timeFormat='HH:mm'
            showTimeSelect
            timeCaption='time'
            dateFormat='MMMM d yyyy h:mm a'
          />

          <Button loading={isSubmitting} disabled={!isValid || !dirty || isSubmitting} type='submit' positive floated='right' content='Submit' />
          <Button disabled={isSubmitting} as={Link} to='/events' type='submit' floated='right' content='Cancel' />
        </Form>
        )}
        
      </Formik>
    </Segment>
  );
}
