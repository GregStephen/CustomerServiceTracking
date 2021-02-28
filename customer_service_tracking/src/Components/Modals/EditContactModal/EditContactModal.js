import React, { useMemo, useState } from 'react';
import {
  Modal,
  ModalHeader,
  Form,
  Button,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  FormFeedback,
  FormGroup,
} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useUpdateContact } from '../../../Helpers/Data/PropertyRequests';

const editContactValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  homePhone: Yup.string().notRequired(),
  cellPhone: Yup.string().notRequired(),
  workPhone: Yup.string().notRequired(),
  email: Yup.string().notRequired(),
});


function EditContactModal({ contact }) {
  const [isToggled, setIsToggled] = useState(false);
  const updateCustomer = useUpdateContact();

  const defaultContact = useMemo(() => ({
    id: contact?.id ?? '',
    firstName: contact?.firstName ?? '',
    lastName: contact?.lastName ?? '',
    homePhone: contact?.homePhone ?? '',
    cellPhone: contact?.cellPhone ?? '',
    workPhone: contact?.workPhone ?? '',
    email: contact?.email ?? '',
  }), [contact]);

  const formik = useFormik({
    initialValues: defaultContact,
    enableReinitialize: true,
    validationSchema: editContactValidationSchema,
    onSubmit: (formValues, { setSubmitting }) => {
      const submission = { ...contact, ...formValues };
      updateCustomer.mutate(submission);
      setSubmitting(false);
      setIsToggled(false);
    },
  });

  return (<>
    <button className="btn btn-info" onClick={() => setIsToggled(true)}>Edit Contact</button>
    <Modal isOpen={isToggled} toggle={() => setIsToggled(false)}>
      <ModalHeader toggle={() => setIsToggled(false)}>Edit Contact</ModalHeader>
      <Form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="input"
              className="form-control"
              id="firstName"
              {...formik.getFieldProps('firstName')}
            />
            {formik.touched.firstName
              && <FormFeedback className="d-block">{formik.errors?.firstName}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="input"
              className="form-control"
              id="lastName"
              {...formik.getFieldProps('lastName')}
            />
            {formik.touched.lastName
              && <FormFeedback className="d-block">{formik.errors?.lastName}</FormFeedback>}
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
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Edit Contact</Button>{' '}
          <Button color="secondary" value="info" onClick={() => setIsToggled(false)}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  </>
  );
}

export default EditContactModal;
