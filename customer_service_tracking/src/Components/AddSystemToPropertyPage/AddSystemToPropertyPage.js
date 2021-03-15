import React, { useMemo, useContext } from 'react';
import {
  Col,
  Row,
  FormGroup,
  Form,
  FormFeedback,
  Label,
  Input,
} from 'reactstrap';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';
import { Header, Page } from '../Global';
import UserContext from '../../Contexts/UserContext';

import { useAddNewPropertySystem } from '../../Helpers/Data/PropertyRequests';
import useGetJobTypeOptions from '../../Helpers/Data/JobTypeRequests';
import { useGetSystemsForBusiness } from '../../Helpers/Data/SystemRequests';

import defaults from '../../Helpers/defaults';

const { defaultReport, defaultSystem } = defaults;

const newInstallReportValidationSchema = Yup.object().shape({
  inchesAdded: Yup.number().required('Inches added is required'),
  notes: Yup.string().notRequired(),
  systemId: Yup.string().required('System Type is required'),
  solutionAdded: Yup.number().required('Solution added is required'),
  serviceDate: Yup.date().required('Service Date is required'),
  installDate: Yup.date().required('Install Date is required'),
  nozzles: Yup.number().required('Nozzles is required'),
  sprayCycles: Yup.number().required('Spray cycles is required'),
  sprayDuration: Yup.number().required('Spray duration is required'),
  serialNumber: Yup.string().required('Serial number is required'),
  sold: Yup.bool().required(),
});

function AddSystemToPropertyPage() {
  const userObj = useContext(UserContext);
  const { id } = useParams();
  const history = useHistory();
  const systemOptions = useGetSystemsForBusiness(userObj.businessId);
  const jobTypeOptions = useGetJobTypeOptions();
  const addNewPropertySystem = useAddNewPropertySystem();
  const today = moment().format('YYYY-MM-DD');

  const formik = useFormik({
    initialValues: { ...defaultReport, ...defaultSystem },
    enableReinitialize: true,
    validationSchema: newInstallReportValidationSchema,
    onSubmit: (formValues, { setSubmitting }) => {
      const submission = { ...formValues };
      const jTOptions = jobTypeOptions?.data;
      const installId = jTOptions.find((x) => x.type === 'Install').id;
      const newPropertySystem = {
        propertyId: id,
        nozzles: parseInt(submission.nozzles, 10),
        sprayCycles: parseInt(submission.sprayCycles, 10),
        sprayDuration: parseInt(submission.sprayDuration, 10),
        serialNumber: submission.serialNumber,
        sold: submission.sold,
        notes: submission.notes,
        systemId: submission.systemId,
        installDate: moment(submission.installDate).format('YYYY-MM-DD'),
      };
      const newInstallReport = {
        propertyId: id,
        jobTypeId: installId,
        amountRemaining: 0,
        inchesAdded: parseInt(submission.inchesAdded, 10),
        serviceDate: submission.installDate,
        solutionAdded: parseInt(submission.solutionAdded, 10),
        technicianId: userObj.id,
        notes: '',
      };
      const dataToSend = {
        system: newPropertySystem,
        report: newInstallReport,
      };
      addNewPropertySystem.mutate(dataToSend, {
        onSuccess: () => {
          history.push(`/property/${id}`);
        },
      });
      setSubmitting(false);
    },
  });

  const systemMax = useMemo(() => {
    if (formik.values.systemId) {
      return systemOptions?.data?.find((x) => x.id === formik.values.systemId).inches;
    }
    return 0;
  }, [formik.values.systemId, systemOptions]);

  return (
    <Page>
      <Header title="Add System for Property" />
      <div className="widget col-10 d-flex justify-content-center mb-4">
        <Form className="col-8" onSubmit={formik.handleSubmit}>
          <Row form className="align-items-center">
            <Col md={10}>
              <FormGroup>
                <Label htmlFor="systemId">Which of your systems did you install?</Label>
                <Input
                  type="select"
                  name="systemId"
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
                  {...formik.getFieldProps('sold')} />
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
                  name="installDate"
                  max={today}
                  {...formik.getFieldProps('installDate')} />
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
                  name="serialNumber"
                  max={today}
                  {...formik.getFieldProps('serialNumber')} />
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
                  {...formik.getFieldProps('nozzles')} />
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
                  {...formik.getFieldProps('sprayCycles')} />
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
                  {...formik.getFieldProps('sprayDuration')} />
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
              {...formik.getFieldProps('notes')} />
            {formik.touched.notes
              && <FormFeedback className="d-block">{formik.errors?.notes}</FormFeedback>}
          </FormGroup>
          {formik.values.systemId
            && <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="inchesAdded">Inches Added</Label>
                <Input
                  type="number"
                  min="0"
                  id="inchesAdded"
                  max={systemMax}
                  {...formik.getFieldProps('inchesAdded')} />
                  {formik.touched.inchesAdded
                    && <FormFeedback className="d-block">{formik.errors?.inchesAdded}</FormFeedback>}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="solutionAdded">Solution Added</Label>
                  <Input
                    type="number"
                    min="0"
                    id="solutionAdded"
                    {...formik.getFieldProps('solutionAdded')} />
                  {formik.touched.solutionAdded
                    && <FormFeedback className="d-block">{formik.errors?.solutionAdded}</FormFeedback>}
                </FormGroup>
              </Col>
            </Row>
          }
          <button type="submit" className="btn btn-success">Add New System</button>
        </Form>
      </div>
    </Page>
  );
}

export default AddSystemToPropertyPage;
