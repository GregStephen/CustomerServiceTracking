import React, { useMemo } from 'react';
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
import { useHistory, useParams } from 'react-router-dom';
import { Header, Page } from '../Global';
import { useAddNewContact, useUpdateContact } from '../../Helpers/Data/PropertyRequests';


const phoneRegEx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const newContactValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  workPhone: Yup.string().notRequired().matches(phoneRegEx, 'Phone number is not valid'),
  homePhone: Yup.string().notRequired().matches(phoneRegEx, 'Phone number is not valid'),
  cellPhone: Yup.string().notRequired().matches(phoneRegEx, 'Phone number is not valid'),
  email: Yup.string().notRequired(),
  primary: Yup.bool(),
});

function NewCustomerPage({ contact }) {
  const { propertyId } = useParams();
  const history = useHistory();
  const addNewContact = useAddNewContact();
  const updateCustomer = useUpdateContact();

  const defaultContact = useMemo(() => ({
    id: contact?.id ?? '',
    firstName: contact?.firstName ?? '',
    lastName: contact?.lastName ?? '',
    homePhone: contact?.homePhone ?? '',
    cellPhone: contact?.cellPhone ?? '',
    workPhone: contact?.workPhone ?? '',
    email: contact?.email ?? '',
    primary: contact?.primary ?? false,
  }), [contact]);

  const formik = useFormik({
    initialValues: defaultContact,
    enableReinitialize: true,
    validationSchema: newContactValidationSchema,
    onSubmit: (formValues, { setSubmitting, setValues }) => {
      let submission = { ...formValues };
      if (contact.id) {
        submission = { ...contact, ...formValues };
        submission.propertyId = propertyId;
        updateCustomer.mutate(submission, {
          onSuccess: () => {
            history.push('/properties');
          },
        });
      } else {
        submission.propertyId = propertyId;
        setValues(submission);
        addNewContact.mutate(submission, {
          onSuccess: () => {
            history.push('/properties');
          },
        });
      }
      setSubmitting(false);
    },
  });

  return (
    <Page>
      <Header title="New Contact" icon="fa-user-plus" />
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
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              {...formik.getFieldProps('email')} />
            {formik.touched.email
              && <FormFeedback className="d-block">{formik.errors?.email}</FormFeedback>}
          </FormGroup>
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
            <Label for="workPhone">Work Phone</Label>
            <Input
              type="text"
              name="workPhone"
              id="workPhone"
              {...formik.getFieldProps('workPhone')} />
            {formik.touched.workPhone
              && <FormFeedback className="d-block">{formik.errors?.workPhone}</FormFeedback>}
          </FormGroup>
          <FormGroup check>
            <Input
              id="primary"
              type="checkbox"
              {...formik.getFieldProps('primary')} />
            <Label for="primary" check>Set as Primary</Label>
          </FormGroup>
          <button type="submit" className="btn btn-success">Add New Contact</button>
        </Form>
      </div>
    </Page>
  );
}

export default NewCustomerPage;
