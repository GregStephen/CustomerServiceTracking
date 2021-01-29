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
import { useAddNewCustomer } from '../../Helpers/Data/CustomerRequests';

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
  cellPhone: '',
  newCustomerAddress: defaultCustomerAddress,
};

const newCustomerValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  officePhone: Yup.string().length(10).notRequired(),
  homePhone: Yup.string().length(10).notRequired(),
  cellPhone: Yup.string().length(10).notRequired(),
  email: Yup.string().notRequired(),
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
  const addNewCustomer = useAddNewCustomer();

  const formik = useFormik({
    initialValues: defaultCustomer,
    enableReinitialize: true,
    validationSchema: newCustomerValidationSchema,
    onSubmit: (formValues, { setSubmitting, setValues }) => {
      const stuff = { ...formValues };
      stuff.emails = [];
      stuff.emails.push(stuff.email);
      stuff.phoneNumbers = [];
      const newHomeNumber = {
        type: 1,
        number: stuff.homePhone,
      };
      const newCellNumber = {
        type: 2,
        number: stuff.cellPhone,
      };
      const newOfficeNumber = {
        type: 3,
        number: stuff.officePhone,
      };
      stuff.phoneNumbers.push(newCellNumber, newHomeNumber, newOfficeNumber);
      stuff.businessId = userObj.businessId;
      setValues(stuff);
      addNewCustomer.mutate(stuff, {
        onSuccess: () => {
          history.push('/customers');
        },
      });
      setSubmitting(false);
    },
  });
  return (
    <Page>
      <Header title="New Customer" icon="fa-user-plus" />
      <div className="widget col-8 d-flex justify-content-center mb-4">
        <Form className="col-10" onSubmit={formik.handleSubmit}>
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
            <Label for="addressLine1">Address Line</Label>
            <Input
              type="text"
              name="addressLine1"
              id="addressLine1"
              {...formik.getFieldProps('newCustomerAddress.addressLine1')} />
            {formik.touched.newCustomerAddress?.addressLine1
              && <FormFeedback className="d-block">{formik.errors?.newCustomerAddress?.addressLine1}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="addressLine2">Address Line 2</Label>
            <Input
              type="text"
              name="addressLine2"
              id="addressLine2"
              {...formik.getFieldProps('newCustomerAddress.addressLine2')} />
            {formik.touched.newCustomerAddress?.addressLine2
              && <FormFeedback className="d-block">{formik.errors?.newCustomerAddress?.addressLine2}</FormFeedback>}
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
                {formik.touched.newCustomerAddress?.city
                  && <FormFeedback className="d-block">{formik.errors?.newCustomerAddress?.city}</FormFeedback>}
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="state">State</Label>
                <Input
                  type="text"
                  name="state"
                  id="state"
                  {...formik.getFieldProps('newCustomerAddress.state')} />
                {formik.touched.newCustomerAddress?.state
                  && <FormFeedback className="d-block">{formik.errors?.newCustomerAddress?.state}</FormFeedback>}
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="zipCode">Zip</Label>
                <Input
                  type="text"
                  name="zipCode"
                  id="zipCode"
                  {...formik.getFieldProps('newCustomerAddress.zipCode')} />
                {formik.touched.newCustomerAddress?.zipCode
                  && <FormFeedback className="d-block">{formik.errors?.newCustomerAddress?.zipCode}</FormFeedback>}
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="homePhone">Home Phone</Label>
            <Input
              type="text"
              name="homePhone"
              id="homePhone"
              {...formik.getFieldProps('homePhone')} />

            {formik.touched.homePhone
              && <FormFeedback className="d-block">{formik.errors?.homePhone}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="cellPhone">Cell Phone</Label>
            <Input
              type="text"
              name="cellPhone"
              id="cellPhone"
              {...formik.getFieldProps('cellPhone')} />

            {formik.touched.cellPhone
              && <FormFeedback className="d-block">{formik.errors?.cellPhone}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="officePhone">Office Phone</Label>
            <Input
              type="text"
              name="officePhone"
              id="officePhone"
              {...formik.getFieldProps('officePhone')} />

            {formik.touched.officePhone
              && <FormFeedback className="d-block">{formik.errors?.officePhone}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              {...formik.getFieldProps('email')} />

            {formik.touched.email
              && <FormFeedback className="d-block">{formik.errors?.email}</FormFeedback>}
          </FormGroup>
          <button type="submit" className="btn btn-success">Add New Customer</button>
        </Form>
      </div>
    </Page>
  );
}

export default NewCustomerPage;
