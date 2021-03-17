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

import { useUpdatePropertyName } from '../../../Helpers/Data/PropertyRequests';

const editPropertyValidationSchema = Yup.object().shape({
  displayName: Yup.string().required('Display Name is required'),
});

function EditPropertyNameModal({ property }) {
  const [isToggled, setIsToggled] = useState(false);
  const updatePropertyName = useUpdatePropertyName();

  const formik = useFormik({
    initialValues: property,
    enableReinitialize: true,
    validationSchema: editPropertyValidationSchema,
    onSubmit: (formValues, { setSubmitting }) => {
      const submission = { ...formValues };
      updatePropertyName.mutate(submission, {
        onSuccess: () => {
          setIsToggled(false);
        },
      });
    },
  });

  return (<>
    <Button color="info" onClick={() => setIsToggled(true)}><i className="fas fa-edit"></i></Button>
    <Modal isOpen={isToggled} toggle={() => setIsToggled(false)}>
      <ModalHeader toggle={() => setIsToggled(false)}>Edit Property Name</ModalHeader>
      <Form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              type="input"
              className="form-control"
              id="displayName"
              {...formik.getFieldProps('displayName')}
            />
            {formik.touched.displayName
              && <FormFeedback className="d-block">{formik.errors?.displayName}</FormFeedback>}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Edit Property Name</Button>{' '}
          <Button color="secondary" value="info" onClick={() => setIsToggled(false)}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  </>);
}

export default EditPropertyNameModal;
