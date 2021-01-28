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
import { useUpdateCustomer } from '../../../Helpers/Data/CustomerRequests';

import DeleteCustomerModal from '../DeleteCustomerModal/DeleteCustomerModal';

const editCustomerValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
});


function EditCustomerModal({ customer }) {
  const [isToggled, setIsToggled] = useState(false);
  const updateCustomer = useUpdateCustomer();

  const defaultCustomer = useMemo(() => ({
    id: customer?.id ?? '',
    firstName: customer?.firstName ?? '',
    lastName: customer?.lastName ?? '',
  }), [customer]);

  const formik = useFormik({
    initialValues: defaultCustomer,
    enableReinitialize: true,
    validationSchema: editCustomerValidationSchema,
    onSubmit: (formValues, { setSubmitting }) => {
      const submission = { ...customer, ...formValues };
      updateCustomer.mutate(submission);
      setSubmitting(false);
      setIsToggled(false);
    },
  });

  return (<>
    <button className="btn btn-info" onClick={() => setIsToggled(true)}>Edit Customer</button>
    <Modal isOpen={isToggled} toggle={() => setIsToggled(false)}>
      <ModalHeader toggle={() => setIsToggled(false)}>Edit Customer</ModalHeader>
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
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Edit Customer</Button>{' '}
          <Button color="secondary" value="info" onClick={() => setIsToggled(false)}>Cancel</Button>
          <DeleteCustomerModal customer={customer} />
        </ModalFooter>
      </Form>
    </Modal>
  </>
  );
}

export default EditCustomerModal;
