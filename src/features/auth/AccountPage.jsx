import React from 'react';
import * as Yup from 'yup';
import { Button, Form, Header, Label, Segment } from 'semantic-ui-react';
import { Formik } from 'formik';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateUserPassword } from '../../app/firestore/firebaseService';

export default function AccountPage() {
  const {currentUser} = useSelector(state => state.auth)
  return (
    <Segment>
      <Header dividing size='large' content='Account' />
      {currentUser.providerId === 'password' &&
      <>
        <Header color='teal' sub content='Change Password' />
        <p>Use this form to change your password</p>
        <Formik
          initialValues={{ newPassword1: '', newPassword2: '' }}
          validationSchema={Yup.object({
            newPassword1: Yup.string().required('Password is required'),
            newPassword2: Yup.string().oneOf([Yup.ref('newPassword1'), null], 'Password does not match'),
          })}
          onSubmit={async (values, {setSubmitting, setErrors})=> {
            try{
              await updateUserPassword(values);
            }catch (error){
              setErrors({auth: error.message})
            }finally{
              setSubmitting(false);
            }
          }}
        >
          {({ errors, isSubmitting, isValid, dirty }) => ( 
                      <Form className='ui form'>
                          <MyTextInput name='newPassword1' type='password' placeholder='New password' />
                          <MyTextInput name='newPassword2' type='password' placeholder='Confirm password' />
                          {errors.auth && <Label basic color='red' style={{ maarginBottom: 10 }} content={errors.auth} />}
                          <Button
                              style={{display: 'block'}}
                              loading={isSubmitting}
                              size='large'
                              positive
                              content='Update Password'
                              disabled={!isValid || !dirty || isSubmitting}
                              type='submit' />
                      </Form>
                  )  
          }
        </Formik>
      </>}
      {currentUser.providerId === 'facebook.com' && 
      <>
        <Header color='teal' sub content='Facebook Account' />
        <p>Please visit Facebook to update your password</p>
        <Button as={Link} to='https://facebook.com' content='Go to Facebook' color='facebook' size='large' />
      </> }
      {currentUser.providerId === 'google.com' &&
      <>
        <Header color='teal' sub content='Google Account' />
        <p>Please visit Google to update your password</p>
        <Button as={Link} to='https://google.com' content='Go to Google' color='google plus' size='large' />
      </>}
    </Segment>
  );
}
