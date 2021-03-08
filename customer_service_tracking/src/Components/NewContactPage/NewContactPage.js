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
import { useHistory, useParams } from 'react-router-dom';
import { Header, Page } from '../Global';
import { useAddNewContact } from '../../Helpers/Data/PropertyRequests';

const defaultContact = {
  firstName: '',
  lastName: '',
  workPhone: '',
  homePhone: '',
  cellPhone: '',
  email: '',
};

const newContactValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  workPhone: Yup.string().length(10).notRequired(),
  homePhone: Yup.string().length(10).notRequired(),
  cellPhone: Yup.string().length(10).notRequired(),
  email: Yup.string().notRequired(),
});

function NewCustomerPage() {
  const { propertyId } = useParams();
  const history = useHistory();
  const addNewContact = useAddNewContact();


  const formik = useFormik({
    initialValues: defaultContact,
    enableReinitialize: true,
    validationSchema: newContactValidationSchema,
    onSubmit: (formValues, { setSubmitting, setValues }) => {
      const stuff = { ...formValues };
      stuff.propertyId = propertyId;
      setValues(stuff);
      addNewContact.mutate(stuff, {
        onSuccess: () => {
          history.push('/properties');
        },
      });
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
          <button type="submit" className="btn btn-success">Add New Contact</button>
        </Form>
      </div>
    </Page>
  );
}

export default NewCustomerPage;
