/* eslint-disable no-param-reassign */
import React, { useContext, useMemo } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  FormFeedback,
} from 'reactstrap';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams, useHistory } from 'react-router-dom';
import UserContext from '../../Contexts/UserContext';
import { Page, Header } from '../Global';
import { useUpdatePropertySystem, useGetPropertySystemFromPropertySystemId } from '../../Helpers/Data/PropertyRequests';
import { useGetSystemsForBusiness } from '../../Helpers/Data/SystemRequests';

const editPropertySystemValidationSchema = Yup.object().shape({
  nozzles: Yup.number().required('Nozzles is required'),
  notes: Yup.string().notRequired(),
  sprayCycles: Yup.number().required('Spray cycles is required'),
  sprayDuration: Yup.number().required('Spray duration is required'),
  serialNumber: Yup.string().required('Serial number is required'),
  sold: Yup.bool().required(),
});


function EditPropertySystemPage() {
  const userObj = useContext(UserContext);
  const params = useParams<Routes.System>();
  const history = useHistory();
  const systemOptions = useGetSystemsForBusiness(userObj.businessId);
  const currentSystem = useGetPropertySystemFromPropertySystemId(params.systemId);
  const today = moment().format('YYYY-MM-DD');
  const updatePropertySystem = useUpdatePropertySystem();

  const defaultPropertySystem = useMemo(() => ({
    id: currentSystem?.data?.id ?? '',
    customerId: currentSystem?.data?.propertyId ?? '',
    systemId: currentSystem?.data?.systemId ?? '',
    notes: currentSystem?.data?.notes ?? '',
    installDate: currentSystem?.data?.installDate ? moment(currentSystem?.data?.installDate).format('YYYY-MM-DD') : '',
    nozzles: currentSystem?.data?.nozzles ?? 0,
    serialNumber: currentSystem?.data?.serialNumber ?? '',
    sold: currentSystem?.data?.sold ?? false,
    sprayCycles: currentSystem?.data?.sprayCycles ?? 0,
    sprayDuration: currentSystem?.data?.sprayDuration ?? 0,
    propertyId: currentSystem?.data?.propertyId ?? '',
  }), [currentSystem]);

  const formik = useFormik({
    initialValues: defaultPropertySystem,
    enableReinitialize: true,
    validationSchema: editPropertySystemValidationSchema,
    onSubmit: (formValues, { setSubmitting }) => {
      const updatedPropertySystem = { ...formValues };
      updatedPropertySystem.installDate = moment(updatedPropertySystem.installDate).format('YYYY-MM-DD');
      updatePropertySystem.mutate(updatedPropertySystem, {
        onSuccess: () => {
          history.push(`/property/${updatedPropertySystem.propertyId}`);
        },
      });
      setSubmitting(false);
    },
  });

  return (
    <Page>
      <>
        <Header title="Edit System" />
        <div className="widget col-10 d-flex justify-content-center mb-4">
          <Form className="col-8" onSubmit={formik.handleSubmit}>
            <Row form className="align-items-center">
              <Col md={10}>
                <FormGroup>
                  <Label htmlFor="systemId">Which of your systems did you install?</Label>
                  <Input
                    type="select"
                    id="systemId"
                    {...formik.getFieldProps('systemId')}>
                    <option value="">Select a system</option>
                    {systemOptions?.data?.map((object) => (
                      <option key={object.id} value={object.id}>{object.type}</option>
                    ))}
                  </Input>
                  {formik.touched.systemId
                  && <FormFeedback className="d-block">{formik.errors?.systemId}</FormFeedback>}
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup check>
                  <Input
                    type="checkbox"
                    id="sold"
                    {...formik.getFieldProps('sold')}
                  />
                  <Label for="sold" check>Sold</Label>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="installDate">Install Date</Label>
                  <Input
                    type="date"
                    id="installDate"
                    max={today}
                    {...formik.getFieldProps('installDate')}
                  />
                  {formik.touched.installDate
                  && <FormFeedback className="d-block">{formik.errors?.installDate}</FormFeedback>}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="serialNumber">Serial number</Label>
                  <Input
                    type="input"
                    id="serialNumber"
                    max={today}
                    {...formik.getFieldProps('serialNumber')}
                  />
                  {formik.touched.serialNumber
                  && <FormFeedback className="d-block">{formik.errors?.serialNumber}</FormFeedback>}
                </FormGroup>
              </Col>
            </Row>
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
        </div>
      </>
    </Page>
  );
}

export default EditPropertySystemPage;
