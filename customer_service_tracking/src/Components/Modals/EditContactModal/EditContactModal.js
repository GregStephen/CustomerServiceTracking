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
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Formatting from '../../../Helpers/Functions/Formatting';
import { useUpdateContact, useAddNewContact } from '../../../Helpers/Data/PropertyRequests';

const phoneRegEx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const editContactValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  workPhone: Yup.string().notRequired().matches(phoneRegEx, 'Phone number is not valid'),
  homePhone: Yup.string().notRequired().matches(phoneRegEx, 'Phone number is not valid'),
  cellPhone: Yup.string().notRequired().matches(phoneRegEx, 'Phone number is not valid'),
  email: Yup.string().notRequired(),
  primary: Yup.bool(),
});


function EditContactModal({ contact }) {
  const [isToggled, setIsToggled] = useState(false);
  const { propertyId } = useParams();
  const updateCustomer = useUpdateContact();
  const addNewContact = useAddNewContact();
  const updatingContact = contact !== null;

  const defaultContact = useMemo(() => ({
    id: contact?.id ?? '',
    firstName: contact?.firstName ?? '',
    lastName: contact?.lastName ?? '',
    homePhone: Formatting.formatPhoneNumber(contact?.homePhone) ?? '',
    cellPhone: Formatting.formatPhoneNumber(contact?.cellPhone) ?? '',
    workPhone: contact?.workPhone ?? '',
    email: contact?.email ?? '',
    primary: contact?.primary ?? false,
  }), [contact]);

  const formik = useFormik({
    initialValues: defaultContact,
    enableReinitialize: true,
    validationSchema: editContactValidationSchema,
    onSubmit: (formValues, { setSubmitting, setValues }) => {
      let submission = { ...formValues };
      if (updatingContact) {
        submission = { ...contact, ...formValues };
        submission.propertyId = propertyId;
        updateCustomer.mutate(submission, {
          onSuccess: () => {
            setIsToggled(false);
          },
        });
      } else {
        submission.propertyId = propertyId;
        setValues(submission);
        addNewContact.mutate(submission, {
          onSuccess: () => {
            setIsToggled(false);
          },
        });
      }
      setSubmitting(false);
    },
  });

  return (<>
    <button className={updatingContact ? 'btn btn-secondary' : 'btn btn-info mr-4 mb-2'} onClick={() => setIsToggled(true)}>{updatingContact ? 'Edit' : 'Create New'}</button>
    <Modal isOpen={isToggled} toggle={() => setIsToggled(false)}>
      <ModalHeader toggle={() => setIsToggled(false)}>{updatingContact ? 'Edit' : 'Create New'} Contact</ModalHeader>
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
              {...formik.getFieldProps('lastName')} />
            {formik.touched.lastName
              && <FormFeedback className="d-block">{formik.errors?.lastName}</FormFeedback>}
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
          {(!contact?.primary || !updatingContact)
            && <FormGroup check>
              <Input
                id="primary"
                type="checkbox"
                {...formik.getFieldProps('primary')} />
              <Label for="primary" check>Set as Primary</Label>
            </FormGroup>}
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">{updatingContact ? 'Edit' : 'Create New'} Contact</Button>{' '}
          <Button color="secondary" value="info" onClick={() => setIsToggled(false)}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  </>
  );
}

export default EditContactModal;
