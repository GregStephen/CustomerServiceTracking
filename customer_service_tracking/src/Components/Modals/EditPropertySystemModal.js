import React, { useState } from 'react';
import {
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Modal,
  ModalHeader,
} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useUpdatePropertySystem } from '../../Helpers/Data/PropertyRequests';

const validationSchema = Yup.object().shape({
  nozzles: Yup.number().required('Nozzles is required'),
  notes: Yup.string().notRequired(),
  sprayCycles: Yup.number().required('Spray cycles is required'),
  sprayDuration: Yup.number().required('Spray duration is required'),
});


function EditPropertySystemModal({ propertySystem }) {
  const [isToggled, setIsToggled] = useState(false);
  const updatePropertySystem = useUpdatePropertySystem();

  const formik = useFormik({
    initialValues: propertySystem,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (formValues) => {
      const updatedPropertySystem = { ...formValues };
      updatedPropertySystem.nozzles = parseInt(updatedPropertySystem.nozzles, 10);
      updatedPropertySystem.sprayCycles = parseInt(updatedPropertySystem.sprayCycles, 10);
      updatedPropertySystem.sprayDuration = parseInt(updatedPropertySystem.sprayDuration, 10);
      updatePropertySystem.mutate(updatedPropertySystem, {
        onSuccess: () => {
          setIsToggled(false);
        },
      });
    },
  });

  return (<>
    <button className="btn btn-info" onClick={() => setIsToggled(true)}>Update System</button>
    <Modal isOpen={isToggled} toggle={() => setIsToggled(false)}>
      <ModalHeader toggle={() => setIsToggled(false)}>Update System</ModalHeader>
      <Form className="col-8" onSubmit={formik.handleSubmit}>
        <Row form>
          <Col md={4}>
            <FormGroup>
              <Label for="nozzles">Number of nozzles</Label>
              <Input
                type="number"
                id="nozzles"
                min="0"
                {...formik.getFieldProps('nozzles')}
              />
              {formik.touched.nozzles
                  && <FormFeedback className="d-block">{formik.errors?.nozzles}</FormFeedback>}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="sprayCycles">Spray Cycles</Label>
              <Input
                type="number"
                id="sprayCycles"
                min="0"
                {...formik.getFieldProps('sprayCycles')}
              />
              {formik.touched.sprayCycles
                  && <FormFeedback className="d-block">{formik.errors?.sprayCycles}</FormFeedback>}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="sprayDuration">Duration of spray in seconds</Label>
              <Input
                type="number"
                id="sprayDuration"
                min="0"
                {...formik.getFieldProps('sprayDuration')}
              />
              {formik.touched.sprayDuration
                  && <FormFeedback className="d-block">{formik.errors?.sprayDuration}</FormFeedback>}
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="notes">Notes for the System</Label>
          <Input
            type="textarea"
            id="notes"
            {...formik.getFieldProps('notes')}
          />
          {formik.touched.notes
              && <FormFeedback className="d-block">{formik.errors?.notes}</FormFeedback>}
        </FormGroup>
        <button type="submit" className="btn btn-success">Edit Properties System</button>
      </Form>
    </Modal>
  </>);
}

export default EditPropertySystemModal;
