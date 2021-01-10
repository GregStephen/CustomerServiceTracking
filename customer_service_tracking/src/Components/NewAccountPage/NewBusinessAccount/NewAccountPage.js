import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  Col,
  Row,
  FormGroup,
  Form,
  FormFeedback,
  Label,
  Input,
} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Header, Page } from '../../Global';

import './NewAccountPage.scss';

import UserRequests from '../../../Helpers/Data/UserRequests';

const defaultBusinessAddress = {
  city: '',
  state: '',
  zipCode: '',
  addressLine1: '',
  addressLine2: '',
};

const defaultUser = {
  email: '',
  password: '',
  confirmPassword: '',
  businessName: '',
  firstName: '',
  lastName: '',
  admin: true,
  businessAddress: defaultBusinessAddress,
};

const newAccountValidationSchema = Yup.object().shape({
  email: Yup.string().email().required('An email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password confirmation is required'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  businessName: Yup.string().required('Business Name is required'),
  businessAddress: Yup.object().shape({
    city: Yup.string().required('City is required'),
    state: Yup.string().length(2, 'Please use 2 letter state abbreviation').required('State is required'),
    zipCode: Yup.string().length(5, 'Zip Code must be only 5 digits long').required('Zip Code is required'),
    addressLine1: Yup.string().required('Address line is required'),
    addressLine2: Yup.string().notRequired(),
  }),
});

function NewAccountPage({ logIn }) {
  const formik = useFormik({
    initialValues: defaultUser,
    enableReinitialize: true,
    validationSchema: newAccountValidationSchema,
    onSubmit: (formValues, { setSubmitting }) => {
      const submission = { ...formValues };
      const { email } = submission;
      const { password } = submission;
      delete submission.confirmPassword;
      delete submission.password;
      delete submission.email;
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((cred) => {
          cred.user.getIdToken()
            .then((token) => sessionStorage.setItem('token', token));
          submission.firebaseUid = firebase.auth().currentUser.uid;
          UserRequests.addNewUser(submission)
            .then(() => logIn(email, password))
            .catch((err) => console.error(err));
        })
        .catch((err) => setErrorMessage(err.message));
      setSubmitting(false);
    },
  });

  const [errorMessage, setErrorMessage] = useState();

  return (
    <Page>
      <Header title="Create Business Account" />
      <div className="NewAccountPage">
        <div className="widget col-8 d-flex justify-content-center">
          <Form className="col-10" onSubmit={formik.handleSubmit}>
            <h3 className="sign-in-header">Personal Info</h3>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    {...formik.getFieldProps('firstName')} />
                  {formik.touched.firstName
                    && <FormFeedback className="d-block">{formik.errors?.firstName}</FormFeedback>}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="lastName">Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    {...formik.getFieldProps('lastName')} />
                  {formik.touched.lastName
                    && <FormFeedback className="d-block">{formik.errors?.lastName}</FormFeedback>}
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="Tom@ExampleEmail.com"
                {...formik.getFieldProps('email')} />
              {formik.touched.email
                && <FormFeedback className="d-block">{formik.errors?.email}</FormFeedback>}
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    {...formik.getFieldProps('password')} />
                  {formik.touched.password
                    && <FormFeedback className="d-block">{formik.errors?.password}</FormFeedback>}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="confirmPassword">Confirm Password</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    {...formik.getFieldProps('confirmPassword')} />
                  {formik.touched.confirmPassword
                    && <FormFeedback className="d-block">{formik.errors?.confirmPassword}</FormFeedback>}
                </FormGroup>
              </Col>
            </Row>
            <h3 className="sign-in-header">Business Info</h3>
            <FormGroup>
              <Label for="businessName">Business Name</Label>
              <Input
                type="text"
                name="businessName"
                id="businessName"
                {...formik.getFieldProps('businessName')} />
              {formik.touched.businessName
                && <FormFeedback className="d-block">{formik.errors?.businessName}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for="addressLine1">Address Line</Label>
              <Input
                type="text"
                name="addressLine1"
                id="addressLine1"
                {...formik.getFieldProps('businessAddress.addressLine1')} />
              {formik.touched.businessAddress?.addressLine1
                && <FormFeedback className="d-block">{formik.errors?.businessAddress?.addressLine1}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for="addressLine2">Address Line 2</Label>
              <Input
                type="text"
                name="addressLine2"
                id="addressLine2"
                {...formik.getFieldProps('businessAddress.addressLine2')} />
              {formik.touched.businessAddress?.addressLine2
                && <FormFeedback className="d-block">{formik.errors?.businessAddress?.addressLine2}</FormFeedback>}
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="city">City</Label>
                  <Input
                    type="text"
                    name="city"
                    id="city"
                    {...formik.getFieldProps('businessAddress.city')} />
                  {formik.touched.businessAddress?.city
                    && <FormFeedback className="d-block">{formik.errors?.businessAddress?.city}</FormFeedback>}
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="state">State</Label>
                  <Input
                    type="text"
                    name="state"
                    id="state"
                    {...formik.getFieldProps('businessAddress.state')} />
                  {formik.touched.businessAddress?.state
                    && <FormFeedback className="d-block">{formik.errors?.businessAddress?.state}</FormFeedback>}
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="zipCode">Zip</Label>
                  <Input
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    {...formik.getFieldProps('businessAddress.zipCode')} />
                  {formik.touched.businessAddress?.zipCode
                    && <FormFeedback className="d-block">{formik.errors?.businessAddress?.zipCode}</FormFeedback>}
                </FormGroup>
              </Col>
            </Row>
            <div className="row col-12 mb-4 justify-content-center">
              <h3 className="error col-12">{errorMessage}</h3>
              <button type="submit" className="btn btn-success col-6">Create Account</button>
            </div>
          </Form>
        </div>
      </div>
    </Page>
  );
}

export default NewAccountPage;
