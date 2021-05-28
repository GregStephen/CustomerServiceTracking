/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useCallback, useMemo, useState } from 'react';
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
import MaskedInput from 'react-input-mask';
import { useUpdateContact, useAddNewContact } from '../../Helpers/Data/PropertyRequests';
import DeleteContactModal from './DeleteContactModal';

const editContactValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  workPhone: Yup.string().notRequired().matches(/^[0-9]{10}$/, 'Phone number is not valid'),
  homePhone: Yup.string().notRequired().matches(/^[0-9]{10}$/, 'Phone number is not valid'),
  cellPhone: Yup.string().notRequired().matches(/^[0-9]{10}$/, 'Phone number is not valid'),
  email: Yup.string().notRequired(),
  primary: Yup.bool(),
});

interface Props {
  contact?: Property.Contact;
  deleteEnabled: boolean;
}

function EditContactModal({ contact, deleteEnabled }: Props) {
  const [isToggled, setIsToggled] = useState(false);
  const params = useParams<Routes.Property>();
  const updateContact = useUpdateContact();
  const addNewContact = useAddNewContact();

  const updatingContact = useMemo(() => !!contact, [contact]);

  const defaultContact: Property.Contact = useMemo(() => ({
    id: contact?.id ?? '',
    firstName: contact?.firstName ?? '',
    lastName: contact?.lastName ?? '',
    homePhone: contact?.homePhone ?? '',
    cellPhone: contact?.cellPhone ?? '',
    workPhone: contact?.workPhone ?? '',
    email: contact?.email ?? '',
    primary: contact?.primary ?? false,
    propertyId: contact?.propertyId ?? ''
  }), [contact]);

  const formik = useFormik({
    initialValues: defaultContact,
    enableReinitialize: true,
    validationSchema: editContactValidationSchema,
    onSubmit: (formValues, { setSubmitting, setValues }) => {
      let submission = { ...formValues } as Property.Contact;
      if (updatingContact) {
        submission = { ...contact, ...formValues };
        submission.propertyId = params.propertyId;
        submission.cellPhone = submission.cellPhone ? submission.cellPhone.replace(/[^\d]/g, '') : '';
        submission.workPhone = submission.workPhone ? submission.workPhone.replace(/[^\d]/g, '') : '';
        submission.homePhone = submission.homePhone ? submission.homePhone.replace(/[^\d]/g, '') : '';
        updateContact.mutate(submission, {
          onSuccess: () => {
            clearAndClose();
          },
        });
      } else {
        submission.propertyId = params.propertyId;
        setValues(submission);
        addNewContact.mutate(submission, {
          onSuccess: () => {
            clearAndClose();
          },
        });
      }
      setSubmitting(false);
    },
  });

  const clearAndClose = useCallback(() => {
    formik.resetForm({});
    setIsToggled(false);
  }, [formik]);

  return (<>
    <button className={updatingContact ? 'btn btn-outline-secondary' : 'btn btn-info mr-4 mb-2'} onClick={() => setIsToggled(true)}>{updatingContact ? <i className="fas fa-user-edit mr-0"/>: <i className="fas fa-user-plus"/>}</button>
    <Modal isOpen={isToggled} toggle={() => clearAndClose()}>
      <ModalHeader toggle={() => clearAndClose()}>{updatingContact ? 'Edit' : 'Create New'} Contact</ModalHeader>
      {updatingContact && contact && (<DeleteContactModal contact={contact} deleteEnabled={deleteEnabled} />)}
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
            <Label for="email">Email</Label>
            <Input
              type="email"
              id="email"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email
              && <FormFeedback className="d-block">{formik.errors?.email}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="homePhone">Home Phone</Label>
            <MaskedInput
              mask="(999) 999-9999"
              value={formik.values.homePhone}
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) => formik.handleBlur(e)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue('homePhone', e.currentTarget.value.replace(/\D/g, ''))}>
              {() => (<Input
                type="text"
                name="homePhone"
                id="homePhone"
              />)}
            </MaskedInput>
            {formik.touched.homePhone
              && <FormFeedback className="d-block">{formik.errors?.homePhone}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="cellPhone">Cell Phone</Label>
            <MaskedInput
              mask="(999) 999-9999"
              value={formik.values.cellPhone}
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) => formik.handleBlur(e)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue('cellPhone', e.currentTarget.value.replace(/\D/g, ''))}>
              {() => (<Input
                type="text"
                name="cellPhone"
                id="cellPhone"
              />)}
            </MaskedInput>
            {formik.touched.cellPhone
              && <FormFeedback className="d-block">{formik.errors?.cellPhone}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="workPhone">Work Phone</Label>
            <MaskedInput
              mask="(999) 999-9999"
              value={formik.values.workPhone}
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) => formik.handleBlur(e)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue('workPhone', e.currentTarget.value.replace(/\D/g, ''))}>
              {() => (<Input
                type="text"
                name="workPhone"
                id="workPhone"
              />)}
            </MaskedInput>
            {formik.touched.workPhone
              && <FormFeedback className="d-block">{formik.errors?.workPhone}</FormFeedback>}
          </FormGroup>
          {(!contact?.primary || !updatingContact)
            && <FormGroup check>
              <Input
                id="primary"
                type="checkbox"
                {...formik.getFieldProps('primary')}
              />
              <Label for="primary" check>Set as Primary</Label>
            </FormGroup>}
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">{updatingContact ? 'Save' : 'Create New'} Contact</Button>{' '}
          <Button color="secondary" value="info" onClick={() => clearAndClose()}>Cancel</Button>

        </ModalFooter>
      </Form>
    </Modal>
  </>
  );
}

export default EditContactModal;
