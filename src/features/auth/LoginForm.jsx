import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Form, Button } from 'semantic-ui-react';
import {closeModal} from '../../app/common/modals/modalReducer';
import { useDispatch } from 'react-redux';
import {signInUser} from './authActions';

export default function LoginForm(){
    const dispatch = useDispatch();
    return (
        <ModalWrapper size ='mini' header='Sign in to Re-vents'>
            <Formik
                initialValues={{email:'', password:''}}  
                validationSchema={Yup.object({
                    email: Yup.string().required().email(),
                    password: Yup.string().required()
                })}
                onSumbit = {(values, {setSubmitting}) => {
                    dispatch(signInUser(values));
                    setSubmitting(false);  
                    dispatch(closeModal()); 
                }}
            >  
                {({isSubmitting, isValid, dirty}) => (
                    <Form className='ui form'>
                        <MyTextInput name='email' placeholder ='Email Address' /> 
                        <MyTextInput name='password' placeholder ='Password' type='password' />  
                        <Button
                           loading={isSubmitting}
                           disabled={!isValid || !dirty || isSubmitting}
                           type='submit'
                           fluid
                           size ='large'
                           color = 'teal'
                           content = 'Login'
                        />     
                    </Form>
                )}
            </Formik>
        </ModalWrapper>
    )
}