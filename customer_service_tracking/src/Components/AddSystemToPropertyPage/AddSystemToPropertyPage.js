import React, { useEffect } from 'react';
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

import { useAddNewPropertySystem } from '../../Helpers/Data/PropertyRequests';
import useGetJobTypeOptions from '../../Helpers/Data/JobTypeRequests';
import { useAddNewReport } from '../../Helpers/Data/ReportRequests';
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

function AddSystemToPropertyPage({ userObj }) {
  const { id } = useParams();
  const history = useHistory();
  const systemOptions = useGetSystemsForBusiness(userObj.businessId);
  const jobTypeOptions = useGetJobTypeOptions();
  const addNewReport = useAddNewReport();
  const addNewCustomerSystem = useAddNewPropertySystem();
  const today = moment().format('YYYY-MM-DD');

  useEffect(() => {
    if (addNewReport.isSuccess) {
      history.push(`/customer/${id}`);
    }
  }, [addNewReport, history, id]);

  const formik = useFormik({
    initialValues: { ...defaultReport, ...defaultSystem },
    enableReinitialize: true,
    validationSchema: newInstallReportValidationSchema,
    onSubmit: (formValues, { setSubmitting }) => {
      const submission = { ...formValues };
      const jTOptions = jobTypeOptions?.data;
      const installId = jTOptions.find((x) => x.type === 'Install').id;
      const newCustomerSystem = {
        customerId: id,
        nozzles: parseInt(submission.nozzles, 10),
        sprayCycles: parseInt(submission.sprayCycles, 10),
        sprayDuration: parseInt(submission.sprayCycles, 10),
        serialNumber: submission.serialNumber,
        sold: submission.sold,
        notes: submission.notes,
        systemId: submission.systemId,
        installDate: moment(submission.installDate).format('YYYY-MM-DD'),
      };
      const newInstallReport = {
        customerId: id,
        jobTypeId: installId,
        amountRemaining: 0,
        inchesAdded: parseInt(submission.inchesAdded, 10),
        serviceDate: submission.installDate,
        solutionAdded: parseInt(submission.solutionAdded, 10),
        technicianId: userObj.id,
        notes: '',
      };
      addNewCustomerSystem.mutate(newCustomerSystem, {
        onSuccess: (data, variables, context) => {
          newInstallReport.systemId = data.data;
          addNewReport.mutate(newInstallReport);
        },
      });
      setSubmitting(false);
    },
  });

  return (
    <Page>
      <Header title="Add System for Customer" />
      <div className="widget col-10 d-flex justify-content-center mb-4">
        <Form className="col-8" onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label htmlFor="systemId">Which system did you install?</Label>
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
            <Label for="sold">Sold</Label>
            <Input
              type="checkbox"
              id="sold"
              {...formik.getFieldProps('sold')} />
          </FormGroup>
          <FormGroup>
            <Label for="notes">Notes for the System</Label>
            <Input
              type="input"
              id="notes"
              {...formik.getFieldProps('notes')} />
            {formik.touched.notes
              && <FormFeedback className="d-block">{formik.errors?.notes}</FormFeedback>}
          </FormGroup>
          {formik.values.systemId
            && <FormGroup>
              <Label for="inchesAdded">Inches Added</Label>
              <Input
                type="number"
                min="0"
                id="inchesAdded"
                max={systemOptions?.data?.data?.find((x) => x.id === formik.values.systemId).inches}
                {...formik.getFieldProps('inchesAdded')} />
              {formik.touched.inchesAdded
                && <FormFeedback className="d-block">{formik.errors?.inchesAdded}</FormFeedback>}
            </FormGroup>
          }
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
          <button type="submit" className="btn btn-success">Add New System</button>
        </Form>
      </div>
    </Page>
  );
}

export default AddSystemToPropertyPage;
