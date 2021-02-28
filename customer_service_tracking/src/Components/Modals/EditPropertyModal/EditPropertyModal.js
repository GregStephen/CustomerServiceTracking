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
import { useUpdateProperty } from '../../../Helpers/Data/PropertyRequests';

const editPropertyValidationSchema = Yup.object().shape({
  displayName: Yup.string().required('Display Name is required'),
  addressLine1: Yup.string().required('Address is required'),
  addressLine2: Yup.string().notRequired().nullable(),
  city: Yup.string().required('City is required'),
  state: Yup.string().length(2).required('State is required'),
  zipCode: Yup.string().length(5).required('Zip Code is required'),
});

function EditPropertyModal({
  property,
}) {
  const [isToggled, setIsToggled] = useState(false);
  const updateProperty = useUpdateProperty();

  const formik = useFormik({
    initialValues: property,
    enableReinitialize: true,
    validationSchema: editPropertyValidationSchema,
    onSubmit: ({ setSubmitting }) => {
      const submission = { ...property };
      updateProperty.mutate(submission);
      setSubmitting(false);
      setIsToggled(false);
    },
  });

  return (<>
    <button className="btn btn-info" onClick={() => setIsToggled(true)}>Edit Property</button>
    <Modal isOpen={isToggled} toggle={() => setIsToggled(false)}>
      <ModalHeader toggle={() => setIsToggled(false)}>Edit Property</ModalHeader>
      <Form onSubmit={formik.handleSubmit}>
        <ModalBody>
        <FormGroup>
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              type="input"
              className="form-control"
              id="displayName"
              placeholder="'Smith Town House', '123 Fake Street', 'Johnson Beach House', etc..."
              {...formik.getFieldProps('displayName')}
            />
            {formik.touched.displayName
              && <FormFeedback className="d-block">{formik.errors?.displayName}</FormFeedback>}
          </FormGroup>
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
          <Button type="submit" color="primary">Edit Property</Button>{' '}
          <Button color="secondary" value="info" onClick={() => setIsToggled(false)}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  </>);
}

export default EditPropertyModal;
