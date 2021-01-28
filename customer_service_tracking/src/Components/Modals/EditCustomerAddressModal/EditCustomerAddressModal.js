import React, { useState } from 'react';
import {
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Button,
  ModalBody,
  ModalFooter,
  Modal,
  ModalHeader,
} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useUpdateCustomerAddress } from '../../../Helpers/Data/CustomerRequests';

const editAddressValidationSchema = Yup.object().shape({
  addressLine1: Yup.string().required('Address is required'),
  addressLine2: Yup.string().notRequired().nullable(),
  city: Yup.string().required('City is required'),
  state: Yup.string().length(2).required('State is required'),
  zipCode: Yup.string().length(5).required('Zip Code is required'),
});

function EditCustomerAddressModal({
  customer,
}) {
  const [isToggled, setIsToggled] = useState(false);
  const updateCustomerAddress = useUpdateCustomerAddress();

  const formik = useFormik({
    initialValues: customer?.address,
    enableReinitialize: true,
    validationSchema: editAddressValidationSchema,
    onSubmit: (formValues, { setSubmitting }) => {
      const submission = { ...customer };
      submission.address = formValues;
      updateCustomerAddress.mutate(submission);
      setSubmitting(false);
      setIsToggled(false);
    },
  });

  return (<>
    <button className="btn btn-info" onClick={() => setIsToggled(true)}>Edit Address</button>
    <Modal isOpen={isToggled} toggle={() => setIsToggled(false)}>
      <ModalHeader toggle={() => setIsToggled(false)}>Edit Customer Address</ModalHeader>
      <Form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label htmlFor="addressLine1">Address</Label>
            <Input
              type="input"
              className="form-control"
              id="addressLine1"
              {...formik.getFieldProps('addressLine1')}
            />
            {formik.touched.addressLine1
              && <FormFeedback className="d-block">{formik.errors?.addressLine1}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="addressLine2">Address Line 2</Label>
            <Input
              type="input"
              className="form-control"
              id="addressLine2"
              {...formik.getFieldProps('addressLine2')}
            />
            {formik.touched.addressLine2
              && <FormFeedback className="d-block">{formik.errors?.addressLine2}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="city">City</Label>
            <Input
              type="input"
              className="form-control"
              id="city"
              {...formik.getFieldProps('city')}
            />
            {formik.touched.city
              && <FormFeedback className="d-block">{formik.errors?.city}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="state">State</Label>
            <Input
              type="input"
              className="form-control"
              id="state"
              {...formik.getFieldProps('state')}
            />
            {formik.touched.state
              && <FormFeedback className="d-block">{formik.errors?.state}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              type="input"
              className="form-control"
              id="zipCode"
              {...formik.getFieldProps('zipCode')}
            />
            {formik.touched.zipCode
              && <FormFeedback className="d-block">{formik.errors?.zipCode}</FormFeedback>}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Edit Customer Address</Button>{' '}
          <Button color="secondary" value="info" onClick={() => setIsToggled(false)}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  </>);
}

export default EditCustomerAddressModal;
