import React, { useEffect, useState } from 'react';
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
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

import { Header, Page } from '../Global';

import defaults from '../../Helpers/defaults';
import CustomerRequests from '../../Helpers/Data/CustomerRequests';
import { useDeleteJob, useJobForSystemBySystemId } from '../../Helpers/Data/JobRequests';
import JobTypeRequests from '../../Helpers/Data/JobTypeRequests';
import ReportRequests from '../../Helpers/Data/ReportRequests';

import './NewReportPage.scss';

const newReportValidationSchema = Yup.object().shape({
  amountRemaining: Yup.number().required('Amount remaining is required'),
  inchesAdded: Yup.number().required('Inches added is required'),
  solutionAdded: Yup.number().required('Solution Added is required'),
  notes: Yup.string().notRequired(),
  jobTypeId: Yup.string().notRequired('Job type is required'),
  serviceDate: Yup.date().required('Service date is required'),
});

function NewReportPage({ userObj }) {
  const { id } = useParams();
  const [customerSystem, getCustomerSystem] = useState();
  const [customer, getCustomer] = useState();
  const [jobTypeOptions, getJobTypeOptions] = useState();
  const [job, getJob] = useState();
  const history = useHistory();
  const deleteJob = useDeleteJob();
  const getJobForSystemBySystemId = useJobForSystemBySystemId();

  const formik = useFormik({
    initialValues: defaults.defaultReport,
    enableReinitialize: true,
    validationSchema: newReportValidationSchema,
    onSubmit: (formValues, { setSubmitting, setValues }) => {
      const submission = { ...formValues };
      if (job !== '') {
        submission.jobTypeId = job.jobTypeId;
      }
      submission.technicianId = userObj.id;
      submission.customerId = customerSystem?.customerId;
      submission.systemId = customerSystem?.id;
      submission.amountRemaining = parseInt(submission.amountRemaining, 10);
      submission.inchesAdded = parseInt(submission.inchesAdded, 10);
      submission.serviceDate = moment(submission.serviceDate).format('YYYY-MM-DD');
      submission.solutionAdded = parseInt(submission.solutionAdded, 10);
      setValues(submission);
      ReportRequests.addNewReport(submission)
        .then(() => {
          if (job !== '') {
            deleteJob(job.id)
              .then(() => history.push('/home'));
          } else {
            history.push('/home');
          }
        });
      setSubmitting(false);
    },
  });

  useEffect(() => {
    CustomerRequests.getCustomerSystemFromCustomerSystemId(id)
      .then((systemReturned) => getCustomerSystem(systemReturned))
      .catch((err) => console.error(err));
    JobTypeRequests.getJobTypes()
      .then((types) => {
        const reportTypes = types.filter((x) => x.type !== 'Install');
        getJobTypeOptions(reportTypes);
      })
      .catch((err) => console.error(err));
    getJobForSystemBySystemId(id)
      .then((jobForSystem) => getJob(jobForSystem))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    if (customerSystem) {
      CustomerRequests.getCustomerFromCustomerId(customerSystem?.customerId)
        .then((customerReturned) => getCustomer(customerReturned));
    }
  }, [customerSystem]);

  const maxInches = customerSystem?.systemInfo?.inches;
  const today = moment().format('YYYY-MM-DD');
  return (
    <Page>
      <Header title="New Report" />
      <div className="widget col-10 d-flex justify-content-center mb-4">
        <Form className="col-8" onSubmit={formik.handleSubmit}>
          <h3>{customer?.firstName} {customer?.lastName}</h3>
          <h3>{customer?.address?.addressLine1}</h3>
          {customer?.address?.addressLine2 ? <h3>{customer?.address?.addressLine2} </h3> : ''}
          <h3>{customer?.address?.city}, {customer?.address?.state} {customer?.address?.zipCode}</h3>
          {customerSystem?.notes
            ? <div>
              <h3>Notes on System</h3>
              <p>{customerSystem?.notes}</p>
            </div>
            : ''}
          {job !== ''
            ? <p className="typeOfJob">Type of Job: {jobTypeOptions?.find((x) => x.id === job?.jobTypeId)?.type}</p>
            : <FormGroup>
              <Label htmlFor="jobTypeId">What type of job?</Label>
              <Input
                type="select"
                name="jobTypeId"
                id="jobTypeId"
                {...formik.getFieldProps('jobTypeId')}>
                <option value="">Select a job</option>
                {jobTypeOptions?.map((object) => (
                  <option key={object.id} value={object.id}>{object.type}</option>
                ))}
              </Input>
              {formik.touched.jobTypeId
                && <FormFeedback className="d-block">{formik.errors?.jobTypeId}</FormFeedback>}
            </FormGroup>
          }
          <FormGroup>
            <Label for="serviceDate">Service Date</Label>
            <Input
              type="date"
              id="serviceDate"
              name="serviceDate"
              max={today}
              {...formik.getFieldProps('serviceDate')} />
            {formik.touched.serviceDate
              && <FormFeedback className="d-block">{formik.errors?.serviceDate}</FormFeedback>}
          </FormGroup>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="amountRemaining">Inches of Water Remaining</Label>
                <Input
                  type="number"
                  id="amountRemaining"
                  min="0"
                  max={maxInches}
                  {...formik.getFieldProps('amountRemaining')} />
                {formik.touched.amountRemaining
                  && <FormFeedback className="d-block">{formik.errors?.amountRemaining}</FormFeedback>}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="inchesAdded">Inches of Water Added</Label>
                <Input
                  type="number"
                  id="inchesAdded"
                  min="0"
                  max={(maxInches - formik.values.amountRemaining ?? 0).toString()}
                  {...formik.getFieldProps('inchesAdded')} />
                {formik.touched.inchesAdded
                  && <FormFeedback className="d-block">{formik.errors?.inchesAdded}</FormFeedback>}
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="solutionAdded">Solution Added</Label>
            <Input
              type="number"
              id="solutionAdded"
              min="0"
              {...formik.getFieldProps('solutionAdded')} />
            {formik.touched.solutionAdded
              && <FormFeedback className="d-block">{formik.errors?.solutionAdded}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="notes">Notes</Label>
            <Input
              type="input"
              id="notes"
              {...formik.getFieldProps('notes')} />
            {formik.touched.notes
              && <FormFeedback className="d-block">{formik.errors?.notes}</FormFeedback>}
          </FormGroup>
          <button type="submit" className="btn btn-success">Add New Report</button>
        </Form>
      </div>
    </Page>
  );
}

export default NewReportPage;
