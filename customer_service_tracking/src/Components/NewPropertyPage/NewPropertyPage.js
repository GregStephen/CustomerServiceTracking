import React, { useContext } from 'react';
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
import { useAddNewProperty } from '../../Helpers/Data/PropertyRequests';
import UserContext from '../../Contexts/UserContext';

const defaultPrimaryContact = {
  firstName: '',
  lastName: '',
  workPhone: '',
  homePhone: '',
  cellPhone: '',
  email: '',
  primary: true,
};

const defaultNewProperty = {
  property: {
    displayName: '',
    city: '',
    state: '',
    zipCode: '',
    addressLine1: '',
    addressLine2: '',
    latitude: '36.033115',
    longitude: '-86.782776',
  },
  contact: defaultPrimaryContact,
};

const newPropertyValidationSchema = Yup.object().shape({
  property: Yup.object().shape({
    city: Yup.string().required('City is required'),
    state: Yup.string().length(2, 'Please use 2 letter state abbreviation').required('State is required'),
    zipCode: Yup.string().length(5, 'Zip Code must be only 5 digits long').required('Zip Code is required'),
    addressLine1: Yup.string().required('Address line is required'),
    addressLine2: Yup.string().notRequired(),
  }),
  contact: Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    workPhone: Yup.string().length(10).notRequired(),
    homePhone: Yup.string().length(10).notRequired(),
    cellPhone: Yup.string().length(10).notRequired(),
    email: Yup.string().notRequired(),
  }),
});

function NewPropertyPage() {
  const userObj = useContext(UserContext);
  const history = useHistory();
  const addnewProperty = useAddNewProperty();

  const formik = useFormik({
    initialValues: defaultNewProperty,
    enableReinitialize: true,
    validationSchema: newPropertyValidationSchema,
    onSubmit: (formValues, { setSubmitting, setValues }) => {
      const newProperty = { ...formValues };
      newProperty.property.businessId = userObj.businessId;
      setValues(newProperty);
      addnewProperty.mutate(newProperty, {
        onSuccess: () => {
          history.push('/properties');
        },
      });
      setSubmitting(false);
    },
  });

  return (
    <Page>
      <Header title="New Property" icon="fa-user-plus" />
      <div className="widget col-8 d-flex justify-content-center mb-4">
        <Form className="col-10" onSubmit={formik.handleSubmit}>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label for="displayName">Display Name</Label>
                <Input
                  type="text"
                  name="displayName"
                  id="displayName"
                  {...formik.getFieldProps('property.displayName')} />
                {formik.touched.property?.displayName
                  && <FormFeedback className="d-block">{formik.errors?.property?.displayName}</FormFeedback>}
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="property.addressLine1">Address Line</Label>
            <Input
              type="text"
              name="property.addressLine1"
              id="property.addressLine1"
              {...formik.getFieldProps('property.addressLine1')} />
            {formik.touched.property?.addressLine1
              && <FormFeedback className="d-block">{formik.errors?.property?.addressLine1}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="property.addressLine2">Address Line 2</Label>
            <Input
              type="text"
              name="property.addressLine2"
              id="property.addressLine2"
              {...formik.getFieldProps('property.addressLine2')} />
            {formik.touched.property?.addressLine2
              && <FormFeedback className="d-block">{formik.errors?.property?.addressLine2}</FormFeedback>}
          </FormGroup>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="property.city">City</Label>
                <Input
                  type="text"
                  name="property.city"
                  id="property.city"
                  {...formik.getFieldProps('property.city')} />
                {formik.touched.property?.city
                  && <FormFeedback className="d-block">{formik.errors?.property?.city}</FormFeedback>}
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="property.state">State</Label>
                <Input
                  type="text"
                  name="property.state"
                  id="property.state"
                  {...formik.getFieldProps('property.state')} />
                {formik.touched.property?.state
                  && <FormFeedback className="d-block">{formik.errors?.property?.state}</FormFeedback>}
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="property.zipCode">Zip</Label>
                <Input
                  type="text"
                  name="property.zipCode"
                  id="property.zipCode"
                  {...formik.getFieldProps('property.zipCode')} />
                {formik.touched.property?.zipCode
                  && <FormFeedback className="d-block">{formik.errors?.property?.zipCode}</FormFeedback>}
              </FormGroup>
            </Col>
          </Row>
          <h2>Primary Contact</h2>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="contact.firstName">First Name</Label>
                <Input
                  type="text"
                  name="contact.firstName"
                  id="contact.firstName"
                  {...formik.getFieldProps('contact.firstName')} />
                {formik.touched.contact?.firstName
                  && <FormFeedback className="d-block">{formik.errors?.contact?.firstName}</FormFeedback>}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="contact.lastName">Last Name</Label>
                <Input
                  type="text"
                  name="contact.lastName"
                  id="contact.lastName"
                  {...formik.getFieldProps('contact.lastName')} />
                {formik.touched.contact?.lastName
                  && <FormFeedback className="d-block">{formik.errors?.contact?.lastName}</FormFeedback>}
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="contact.homePhone">Home Phone</Label>
            <Input
              type="text"
              name="contact.homePhone"
              id="contact.homePhone"
              {...formik.getFieldProps('contact.homePhone')} />

            {formik.touched.contact?.homePhone
              && <FormFeedback className="d-block">{formik.errors?.contact?.homePhone}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="contact.cellPhone">Cell Phone</Label>
            <Input
              type="text"
              name="contact.cellPhone"
              id="contact.cellPhone"
              {...formik.getFieldProps('cellPhone')} />

            {formik.touched.contact?.cellPhone
              && <FormFeedback className="d-block">{formik.errors?.contact?.cellPhone}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="contact.workPhone">Work Phone</Label>
            <Input
              type="text"
              name="contact.workPhone"
              id="contact.workPhone"
              {...formik.getFieldProps('contact.workPhone')} />
            {formik.touched.contact?.workPhone
              && <FormFeedback className="d-block">{formik.errors?.contact?.workPhone}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="contact.email">Email</Label>
            <Input
              type="email"
              name="contact.email"
              id="contact.email"
              {...formik.getFieldProps('contact.email')} />
            {formik.touched.contact?.email
              && <FormFeedback className="d-block">{formik.errors?.contact?.email}</FormFeedback>}
          </FormGroup>
          <button type="submit" className="btn btn-success">Add New Property</button>
        </Form>
      </div>
    </Page>
  );
}

export default NewPropertyPage;
