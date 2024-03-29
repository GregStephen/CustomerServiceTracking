import React, { useEffect, useContext } from 'react';
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
import { useHistory } from 'react-router-dom';
import { Header, Page } from '../Global';
import { useAddNewSystem } from '../../Helpers/Data/SystemRequests';
import UserContext from '../../Contexts/UserContext';

import './NewSystemPage.scss';

const defaultSystem: Partial<Business.BusinessSystem> = {
  type: '',
  gallons: 0,
  inches: 0,
  businessId: '',
};

const newSystemValidationSchema = Yup.object().shape({
  type: Yup.string().required('System type is required'),
  gallons: Yup.number().positive().required('Gallon size is required'),
  inches: Yup.number().positive().required('Inches are required'),
});

function NewSystemPage() {
  const userObj = useContext(UserContext);
  const history = useHistory();
  const addNewSystem = useAddNewSystem();

  const formik = useFormik({
    initialValues: defaultSystem,
    enableReinitialize: true,
    validationSchema: newSystemValidationSchema,
    onSubmit: (formValues, { setSubmitting }) => {
      const submission = { ...formValues };
      submission.businessId = userObj.businessId;
      addNewSystem.mutate(submission);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (addNewSystem.isSuccess) {
      history.push('/systems');
    }
  }, [addNewSystem, history]);

  return (
    <Page>
      <>
        <Header title="New System" />
        <div className="widget col-6 d-flex justify-content-center">
          <Form className="col-8" onSubmit={formik.handleSubmit}>
            <FormGroup>
              <Label for="type">Type</Label>
              <Input
                type="text"
                id="type"
                {...formik.getFieldProps('type')}
              />
              {formik.touched.type
              && <FormFeedback className="d-block">{formik.errors?.type}</FormFeedback>}
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="gallons">Gallons</Label>
                  <Input
                    type="number"
                    id="gallons"
                    min="0"
                    {...formik.getFieldProps('gallons')}
                  />
                  {formik.touched.gallons
                  && <FormFeedback className="d-block">{formik.errors?.gallons}</FormFeedback>}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="inches">Inches</Label>
                  <Input
                    type="number"
                    id="inches"
                    min="0"
                    {...formik.getFieldProps('inches')}
                  />
                  {formik.touched.inches
                  && <FormFeedback className="d-block">{formik.errors?.inches}</FormFeedback>}
                </FormGroup>
              </Col>
            </Row>
            <button type="submit" className="btn btn-success">Add New System</button>
          </Form>
        </div>
      </>
    </Page>
  );
}

export default NewSystemPage;
