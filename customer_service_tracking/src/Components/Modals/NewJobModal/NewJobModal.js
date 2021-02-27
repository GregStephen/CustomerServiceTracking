/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import {
  ModalBody,
  Modal,
  ModalHeader,
  Button,
  ModalFooter,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import { useCreateNewJob } from '../../../Helpers/Data/JobRequests';
import { useGetCustomerForBusiness } from '../../../Helpers/Data/CustomerRequests';
import { useGetRegisteredEmployees } from '../../../Helpers/Data/BusinessRequests';
import useGetJobTypes from '../../../Helpers/Data/JobTypeRequests';

const validationSchema = Yup.object().shape({
  customerId: Yup.string().required('Customer is required'),
  technicianId: Yup.string().required('Technician is required'),
  note: Yup.string().notRequired(),
  jobTypeId: Yup.string().notRequired('Job type is required'),
});

const initialValues = {
  customerId: '',
  customerSystemId: '',
  dateAssigned: '',
  technicianId: '',
  jobTypeId: '',
  note: '',
  includeOtherSystems: true,
  otherSystemIds: [],
  includeNotes: true,
};

function NewJobModal({
  userObj,
}) {
  const [isToggled, setIsToggled] = useState(false);
  const createNewJob = useCreateNewJob();
  const customerOptions = useGetCustomerForBusiness(userObj.businessId).data;
  const employeeOptions = useGetRegisteredEmployees(userObj.businessId).data;
  const jobTypeOptions = useGetJobTypes().data;

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (formValues, { setSubmitting, setValues }) => {
      const submission = { ...formValues };
      submission.dateAssigned = moment();
      const chosenCustomer = customerOptions.find((customer) => customer.id === formValues.customerId);
      submission.customerSystemId = chosenCustomer.systems[0].id;
      chosenCustomer.systems.forEach((system) => {
        if (system.id !== submission.customerSystemId) {
          submission.otherSystemIds.push(system.id);
        }
      });
      setValues(submission);
      createNewJob.mutate(submission);
      setSubmitting(false);
      setIsToggled(false);
    },
  });
  return (<>
    <button className="btn btn-info mb-3" onClick={() => setIsToggled(true)}>New Job</button>
    <Modal isOpen={isToggled} toggle={() => setIsToggled(false)}>
      <ModalHeader toggle={() => setIsToggled(false)}>New Job</ModalHeader>
      <Form className="col-8" onSubmit={formik.handleSubmit}>
        <ModalBody>
        <FormGroup>
            <Label htmlFor="customerId">Which Customer?</Label>
            <Input
              type="select"
              name="customerId"
              id="customerId"
              {...formik.getFieldProps('customerId')}>
              <option value="">Select a customer</option>
              {customerOptions?.map((customer) => (
                <option key={customer.id} value={customer.id}>{customer.firstName} {customer.lastName}</option>
              ))}
            </Input>
            {formik.touched.customerId
              && <FormFeedback className="d-block">{formik.errors?.customerId}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="jobTypeId">What Type of Job?</Label>
            <Input
              type="select"
              name="jobTypeId"
              id="jobTypeId"
              {...formik.getFieldProps('jobTypeId')}>
              <option value="">Select a job type</option>
              {jobTypeOptions?.map((jobType) => (
                <option key={jobType.id} value={jobType.id}>{jobType.type}</option>
              ))}
            </Input>
            {formik.touched.customerId
              && <FormFeedback className="d-block">{formik.errors?.customerId}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="technicianId">Assign a technician</Label>
            <Input
              type="select"
              name="technicianId"
              id="technicianId"
              {...formik.getFieldProps('technicianId')}>
              <option value="">Select a technician</option>
              {employeeOptions?.map((object) => (
                <option key={object.id} value={object.id}>{object.fullName}</option>
              ))}
            </Input>
            {formik.touched.technicianId
              && <FormFeedback className="d-block">{formik.errors?.technicianId}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="note">Notes</Label>
            <Input
              type="textarea"
              name="note"
              id="note"
              {...formik.getFieldProps('note')} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Create Job</Button>{' '}
          <Button color="secondary" value="info" onClick={() => setIsToggled(false)}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  </>
  );
}

export default NewJobModal;
