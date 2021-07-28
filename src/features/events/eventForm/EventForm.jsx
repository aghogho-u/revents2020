/* global google */
//import cuid from 'cuid';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Segment, Header, Button, Confirm } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';

import { clearSelectedEvent, listenToSelectedEvent } from '../eventActions';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryData } from '../../../app/api/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MyPlaceInput from '../../../app/common/form/MyPlaceInput';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import {
  addEventToFirestore,
  cancelEventToggle,
  listenToEventFromFirestore,
  updateEventInFirestore,
} from '../../../app/firestore/firestoreService';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  title: Yup.string().required('Kindly fill out a title'),
  category: Yup.string().required(),
  description: Yup.string().required(),
  city: Yup.object().shape({
    address: Yup.string().required(),
  }),
  venue: Yup.object().shape({
    address: Yup.string().required(),
  }),
  date: Yup.string().required(),
});

export default function EventForm({ match, history, location }) {
  const dispatch = useDispatch();
  const [loandingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const {selectedEvent} = useSelector((state) => state.event);

  const { loading, error } = useSelector((state) => state.async);

  useEffect(()=>{
    if(location.pathname !== '/createEvent') return;
    dispatch(clearSelectedEvent());
  }, [dispatch, location.pathname])

  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: {
      address: '',
      latLng: null,
    },
    venue: {
      address: '',
      latLng: null,
    },
    date: '',
  };


  async function handleCancelToggle(event){
    setConfirmOpen(false);
    setLoadingCancel(true);
    try{
      await cancelEventToggle(event);
      setLoadingCancel(false);
    }catch(error){
      setLoadingCancel(true);
      toast.error(error.message)
    }
  }

  useFirestoreDoc({
    shouldExecute: match.params.id !== selectedEvent?.id && location.pathname !== '/createEvent' ,
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToSelectedEvent(event)),
    deps: [match.params.id, dispatch],
  });

  if (loading)
    return <LoadingComponent content='Loading event ...' />;
  if (error) return <Redirect to='/error' />;

  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : await addEventToFirestore(values);
            history.push('/events');
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className='ui form'>
            <Header sub color='teal' content='Event Details' />
            <MyTextInput name='title' placeholder='Event Title' />
            <MySelectInput name='category' placeholder='Category' options={categoryData} />
            <MyTextArea name='description' placeholder='Description' rows={3} />
            <Header sub color='teal' content='Event Location' />
            <MyPlaceInput name='city' placeholder='City' />
            <MyPlaceInput
              disabled={!values.city.latLng}
              name='venue'
              placeholder='Venue'
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000,
                types: ['establishment'],
              }}
            />
            <MyDateInput
              name='date'
              placeholderText='Event Date'
              timeFormat='HH:mm'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d yyyy h:mm a'
              autoComplete='off'
            />
            {selectedEvent &&
            <Button
              loading={loandingCancel}
              type='button'
              color={selectedEvent.isCancelled ? 'green' : 'red'}
              floated='left'
              content={selectedEvent.isCancelled ? 'Reactivate Event' : 'Cancel Event'}
              onClick={()=>setConfirmOpen(true)}
            />}

            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              positive
              floated='right'
              content='Submit'
            />
            <Button
              disabled={isSubmitting}
              as={Link}
              to='/events'
              type='submit'
              floated='right'
              content='Cancel'
            />
          </Form>
        )}
      </Formik>
      <Confirm
        content={selectedEvent?.isCancelled ? 'This will activate the event - are you sure?' : 'This will cancel the event - are you sure?'}
        open={confirmOpen}
        onCancel={()=>setConfirmOpen(false)}
        onConfirm={()=>handleCancelToggle(selectedEvent)}
       />
    </Segment>
  );
}
