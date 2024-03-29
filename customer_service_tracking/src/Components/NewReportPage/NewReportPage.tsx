import React, { useContext, useMemo } from 'react';
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
import UserContext from '../../Contexts/UserContext';
import { useGetPropertyFromPropertyId, useGetPropertySystemFromPropertySystemId } from '../../Helpers/Data/PropertyRequests';
import { useDeleteJob, useJobForSystemBySystemId } from '../../Helpers/Data/JobRequests';
import useGetJobTypeOptions from '../../Helpers/Data/JobTypeRequests';
import { useAddNewReport } from '../../Helpers/Data/ReportRequests';
import EditPropertySystemModal from '../Modals/EditPropertySystemModal';

const newReportValidationSchema = Yup.object().shape({
  amountRemaining: Yup.number().required('Amount remaining is required'),
  inchesAdded: Yup.number().required('Inches added is required'),
  solutionAdded: Yup.number().required('Solution Added is required'),
  notes: Yup.string().notRequired(),
  jobTypeId: Yup.string().notRequired(),
  serviceDate: Yup.date().notRequired(),
});

const today = moment().format('YYYY-MM-DD');

function NewReportPage() {
  const userObj = useContext(UserContext);
  const params = useParams<Routes.System>();
  const propertySystem = useGetPropertySystemFromPropertySystemId(params.systemId);
  const property = useGetPropertyFromPropertyId(params.propertyId);
  const jobTypeOptions = useGetJobTypeOptions();
  const history = useHistory();
  const deleteJob = useDeleteJob();
  const job = useJobForSystemBySystemId(params.systemId);
  const addNewReport = useAddNewReport();

  const jobType = useMemo(() => jobTypeOptions.data?.find((x) => x.id === job.data?.jobTypeId), [job.data, jobTypeOptions.data]);

  const initalValues: Partial<Property.Report> = {
    amountRemaining: 0,
    propertyId: propertySystem?.data?.propertyId ?? '',
    inchesAdded: 0,
    notes: '',
    serviceDate: '',
    solutionAdded: 0,
    systemId: propertySystem?.data?.id ?? '',
    technicianId: userObj.id,
    jobTypeId: job?.data?.jobTypeId ?? '',
  };

  const formik = useFormik({
    initialValues: initalValues,
    enableReinitialize: true,
    validationSchema: newReportValidationSchema,
    onSubmit: (formValues, { setSubmitting, setValues }) => {
      const submission = { ...formValues };
      submission.serviceDate = userObj.admin ? submission.serviceDate : moment().utc().format();
      setValues(submission);
      addNewReport.mutate(submission, {
        onSuccess: () => {
          if (job.data) {
            deleteJob.mutate(job.data.id, {
              onSuccess: () => {
                history.push('/');
              },
            });
          }
          history.push('/');
        },
      });
      setSubmitting(false);
    },
  });
  const maxInches = useMemo(() => propertySystem?.data?.systemInfo?.inches ?? 0, [propertySystem]);

  const maxInchesToAdd: string = useMemo(() => {
    if (formik.values.amountRemaining) {
      return (maxInches - formik.values.amountRemaining ?? 0).toString()
    } else {
      return maxInches.toString();
    }
  }, [formik.values.amountRemaining, maxInches]);

  return (
    <Page>
      <>
        <Header title="New Report" />
        {property.isSuccess
          && <>
            <div>
              <EditPropertySystemModal propertySystem={propertySystem.data} />
            </div>
            <div className="widget col-6 d-flex justify-content-center mb-4">
              <Form className="col-8" onSubmit={formik.handleSubmit}>
                <h3>{property?.data?.displayName}</h3>
                <h3>{property?.data?.addressLine1}</h3>
                {property?.data?.addressLine2 ? <h3>{property?.data?.addressLine2} </h3> : ''}
                <h3>{property?.data?.city}, {property?.data?.state} {property?.data?.zipCode}</h3>
                <h3>{propertySystem?.data?.displayName}</h3>
                {propertySystem?.data?.notes
                  ? <div>
                    <h3>Notes on System</h3>
                    <p>{propertySystem?.data?.notes}</p>
                  </div>
                  : ''}
                <p>Job Type: {jobType?.type}</p>
                {userObj.admin
            && job.data?.id
                && <Row>
                  <Col md={6}>
                    <FormGroup >
                      <Label for="serviceDate">Service Date</Label>
                      <Input
                        type="date"
                        id="serviceDate"
                        max={today}
                        {...formik.getFieldProps('serviceDate')}
                      />
                      {formik.touched.serviceDate
                && <FormFeedback className="d-block">{formik.errors?.serviceDate}</FormFeedback>}
                    </FormGroup>
                  </Col>
                </Row>
                }
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="amountRemaining">Inches Remaining</Label>
                      <Input
                        type="number"
                        id="amountRemaining"
                        min="0"
                        max={maxInches}
                        {...formik.getFieldProps('amountRemaining')}
                      />
                      {formik.touched.amountRemaining
                    && <FormFeedback className="d-block">{formik.errors?.amountRemaining}</FormFeedback>}
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="inchesAdded">Inches Added</Label>
                      <Input
                        type="number"
                        id="inchesAdded"
                        min="0"
                        max={maxInchesToAdd}
                        {...formik.getFieldProps('inchesAdded')}
                      />
                      {formik.touched.inchesAdded
                    && <FormFeedback className="d-block">{formik.errors?.inchesAdded}</FormFeedback>}
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="solutionAdded">Solution Added</Label>
                      <Input
                        type="number"
                        id="solutionAdded"
                        min="0"
                        {...formik.getFieldProps('solutionAdded')}
                      />
                      {formik.touched.solutionAdded
                && <FormFeedback className="d-block">{formik.errors?.solutionAdded}</FormFeedback>}
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup>
                  <Label for="notes">Notes</Label>
                  <Input
                    type="textarea"
                    id="notes"
                    {...formik.getFieldProps('notes')}
                  />
                  {formik.touched.notes
                && <FormFeedback className="d-block">{formik.errors?.notes}</FormFeedback>}
                </FormGroup>

                <button type="submit" className="btn btn-success">Add New Report</button>
              </Form>
            </div>
          </>}
      </>
    </Page>
  );
}

export default NewReportPage;
