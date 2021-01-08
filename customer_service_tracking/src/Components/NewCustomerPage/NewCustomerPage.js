import React from 'react';
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
import { useHistory } from 'react-router-dom';
import { Header, Page } from '../Global';
import CustomerRequests from '../../Helpers/Data/CustomerRequests';

import './NewCustomerPage.scss';

const defaultCustomerAddress = {
  city: '',
  state: '',
  zipCode: '',
  addressLine1: '',
  addressLine2: '',
};

const defaultCustomer = {
  firstName: '',
  lastName: '',
  officePhone: '',
  homePhone: '',
  newCustomerAddress: defaultCustomerAddress,
};

const newCustomerValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  officePhone: Yup.string().notRequired(),
  homePhone: Yup.string().notRequired(),
  newCustomerAddress: Yup.object().shape({
    city: Yup.string().required('City is required'),
    state: Yup.string().length(2, 'Please use 2 letter state abbreviation').required('State is required'),
    zipCode: Yup.string().length(5, 'Zip Code must be only 5 digits long').required('Zip Code is required'),
    addressLine1: Yup.string().required('Address line is required'),
    addressLine2: Yup.string().notRequired(),
  }),
});

function NewCustomerPage({ userObj }) {
  const history = useHistory();
  const formik = useFormik({
    initialValues: defaultCustomer,
    enableReinitialize: true,
    validationSchema: newCustomerValidationSchema,
    onSubmit: (formValues, { setSubmitting, setValues }) => {
      const stuff = { ...formValues };
      stuff.businessId = userObj.businessId;
      setValues(stuff);
      CustomerRequests.addNewCustomer(stuff)
        .then(() => history.push('/customers'))
        .catch((err) => console.error(err));
      setSubmitting(false);
    },
  });
  return (
    <Page>
      <Header title="New Customer" icon="fa-user-plus" />
      <div className="widget col-6 d-flex justify-content-center">
        <Form className="col-8" onSubmit={formik.handleSubmit}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  {...formik.getFieldProps('firstName')} />
                <FormFeedback className="d-block">{formik.errors?.firstName}</FormFeedback>
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
                <FormFeedback className="d-block">{formik.errors?.lastName}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="addressLine1">Address Line</Label>
            <Input
              type="text"
              name="addressLine1"
              id="addressLine1"
              {...formik.getFieldProps('newCustomerAddress.addressLine1')} />
            <FormFeedback className="d-block">{formik.errors?.newCustomerAddress?.addressLine1}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="addressLine2">Address Line 2</Label>
            <Input
              type="text"
              name="addressLine2"
              id="addressLine2"
              {...formik.getFieldProps('newCustomerAddress.addressLine2')} />
            <FormFeedback className="d-block">{formik.errors?.newCustomerAddress?.addressLine2}</FormFeedback>
          </FormGroup>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="city">City</Label>
                <Input
                  type="text"
                  name="city"
                  id="city"
                  {...formik.getFieldProps('newCustomerAddress.city')} />
                <FormFeedback className="d-block">{formik.errors?.newCustomerAddress?.city}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="state">State</Label>
                <Input
                  type="text"
                  name="state"
                  id="state"
                  {...formik.getFieldProps('newCustomerAddress.state')} />
                <FormFeedback className="d-block">{formik.errors?.newCustomerAddress?.state}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="zipCode">Zip</Label>
                <Input
                  type="text"
                  name="zipCode"
                  id="zipCode"
                  {...formik.getFieldProps('newCustomerAddress.zipCode')} />
                <FormFeedback className="d-block">{formik.errors?.newCustomerAddress?.zipCode}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <div className="form-group">
            <label htmlFor="homePhone">Home Phone</label>
            <input
              type="input"
              className="form-control"
              {...formik.getFieldProps('homePhone')} />
            <FormFeedback className="d-block">{formik.errors?.homePhone}</FormFeedback>
          </div>
          <div className="form-group">
            <label htmlFor="officePhone">Office Phone</label>
            <input
              type="input"
              className="form-control"
              id="officePhone"
              {...formik.getFieldProps('officePhone')} />
            <FormFeedback className="d-block">{formik.errors?.officePhone}</FormFeedback>
          </div>
          <button type="submit" className="btn btn-success">Add New Customer</button>
        </Form>
      </div>
    </Page>
  );
}

export default NewCustomerPage;
