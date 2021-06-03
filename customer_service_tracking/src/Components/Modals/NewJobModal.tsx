/* eslint-disable no-plusplus */
import React, { useContext, useState } from 'react';
import {
  ModalBody,
  Modal,
  ModalHeader,
  Button,
  ButtonGroup,
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

import { useCreateNewJob } from '../../Helpers/Data/JobRequests';
import { useGetPropertiesForBusiness } from '../../Helpers/Data/PropertyRequests';
import { useGetRegisteredAndUnregisteredEmployees } from '../../Helpers/Data/BusinessRequests';
import useGetJobTypes from '../../Helpers/Data/JobTypeRequests';
import UserContext from '../../Contexts/UserContext';

const validationSchema = Yup.object().shape({
  propertyId: Yup.string().required('Property is required'),
  technicianId: Yup.string().required('Technician is required'),
  note: Yup.string().notRequired(),
  jobTypeId: Yup.string().notRequired(),
});

const initialValues = {
  propertyId: '',
  propertySystemId: '',
  dateAssigned: '',
  technicianId: '',
  jobTypeId: '',
  note: '',
  includeOtherSystems: true,
  otherSystemIds: [],
  includeNotes: true,
  businessId: ''
};

function NewJobModal() {
  const userObj = useContext(UserContext);
  const [isToggled, setIsToggled] = useState(false);
  const createNewJob = useCreateNewJob();
  const propertyOptions = useGetPropertiesForBusiness(userObj.businessId).data;
  const employeeOptions = useGetRegisteredAndUnregisteredEmployees(userObj.businessId).data;
  const jobTypeOptions = useGetJobTypes().data;

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (formValues, { setSubmitting, setValues }) => {
      const submission = { ...formValues } as Partial<Business.Job>;
      submission.dateAssigned = moment().format();
      const chosenProperty = propertyOptions?.find((property) => property.id === formValues.propertyId);
      submission.propertySystemId = chosenProperty?.systems[0].id ?? '';
      submission.businessId = userObj.businessId;
      chosenProperty?.systems.forEach((system) => {
        if (system.id !== submission.propertySystemId) {
          submission?.otherSystemIds?.push(system.id);
        }
      });
      setValues(submission);
      createNewJob.mutate(submission);
      setSubmitting(false);
      setIsToggled(false);
    },
  });
  return (<>
    <button className="btn btn-info mr-3" onClick={() => setIsToggled(true)}><i className="fas fa-briefcase"/><i className="fas fa-plus ml-1"/></button>
    <Modal isOpen={isToggled} toggle={() => setIsToggled(false)}>
      <ModalHeader toggle={() => setIsToggled(false)}>New Job</ModalHeader>
      <Form className="col-8" onSubmit={formik.handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label htmlFor="propertyId">Which property?</Label>
            <Input
              type="select"
              id="propertyId"
              {...formik.getFieldProps('propertyId')}>
              <option value="">Select a property</option>
              {propertyOptions?.map((property) => (
                <option key={property.id} value={property.id}>{property.displayName}</option>
              ))}
            </Input>
            {formik.touched.propertyId
              && <FormFeedback className="d-block">{formik.errors?.propertyId}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="jobTypeId">What Type of Job?</Label>
            <ButtonGroup>
              {jobTypeOptions?.map((jobType) => (
                <Button type="button" key={jobType.id} value={jobType.id} name="jobTypeId" onClick={() => formik.setFieldValue('jobTypeId', jobType.id)} active={formik.values.jobTypeId === jobType.id} color="primary">{jobType.type}</Button>
              ))}
            </ButtonGroup>
            {formik.touched.jobTypeId
              && <FormFeedback className="d-block">{formik.errors?.jobTypeId}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="technicianId">Assign a technician</Label>
            <Input
              type="select"
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
              id="note"
              {...formik.getFieldProps('note')}
            />
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
