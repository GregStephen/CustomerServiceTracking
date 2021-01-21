import React, { useState, useMemo } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  ModalBody,
  Modal,
  ModalHeader,
  Button,
  ModalFooter,
  FormFeedback,
} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

const editJobValidationSchema = Yup.object().shape({
  technicianId: Yup.string().required('Technician is required'),
  note: Yup.string().notRequired(),
  includeOtherSystems: Yup.bool().notRequired(),
  includeNote: Yup.bool().notRequired(),
});

function EditJobModal({
  systemNeedingService,
  editJob,
  deleteJob,
  createJob,
  jobTypeOptions,
}) {
  const [isToggled, setIsToggled] = useState(false);

  const defaultJob = useMemo(() => ({
    customerSystemId: systemNeedingService?.job?.customerSystemId ?? systemNeedingService?.system?.id,
    dateAssigned: systemNeedingService?.job?.dateAssigned ?? '',
    technicianId: systemNeedingService?.job?.technicianId ?? '',
    jobTypeId: systemNeedingService?.job?.jobTypeId ?? '',
    note: systemNeedingService?.job?.note ?? '',
    includeOtherSystems: false,
    includeNotes: false,
  }), [systemNeedingService]);

  const newJob = !systemNeedingService.job;

  const formik = useFormik({
    initialValues: defaultJob,
    enableReinitialize: true,
    validationSchema: editJobValidationSchema,
    onSubmit: (formValues, { setSubmitting, setValues }) => {
      const submission = { ...formValues };
      submission.jobTypeId = jobTypeOptions.find((x) => x.type === 'Service').id;
      submission.dateAssigned = moment();
      setValues(submission);
      if (newJob) {
        createJob(submission);
      } else {
        editJob(submission);
      }
      setSubmitting(false);
      setIsToggled(false);
    },
  });

  const deleteThisJob = (JobId) => {
    deleteJob(JobId);
    setIsToggled(false);
  };

  return (<>
    <button className="btn btn-info"onClick={() => setIsToggled(true)}>{newJob ? 'Assign' : 'Edit/Delete'}</button>
    <Modal isOpen={isToggled} toggle={() => setIsToggled(false)}>
      <ModalHeader toggle={() => setIsToggled(false)}></ModalHeader>
      <Form className="col-8" onSubmit={formik.handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label htmlFor="technicianId">Assign a technician</Label>
            <Input
              type="select"
              name="technicianId"
              id="technicianId"
              {...formik.getFieldProps('technicianId')}>
              <option value="">Select a technician</option>
              {systemNeedingService?.employeeOptions.map((object) => (
                <option key={object.id} value={object.id}>{object.fullName}</option>
              ))}
            </Input>
            {formik.touched.jobTypeId
              && <FormFeedback className="d-block">{formik.errors?.jobTypeId}</FormFeedback>}
          </FormGroup>
          <FormGroup>
        <Label for="note">Notes</Label>
            <Input
              type="textarea"
              name="note"
              id="note"
              {...formik.getFieldProps('note')} />
          </FormGroup>
          <FormGroup>
            <Label check>
              <Input
                type="checkbox"
                id="includeOtherSystems"
                {...formik.getFieldProps('includeOtherSystems')} />
              Create job for Customers other systems?
            </Label>
          </FormGroup>
          {// check to see if includeOtherSystems is true}
          <FormGroup>
            <Label check>
              <Input
                type="checkbox"
                id="includeNote"
                {...formik.getFieldProps('includeNote')} />
              Attach the same note for new jobs?
            </Label>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">{newJob ? 'Create Job' : 'Edit Job'}</Button>{' '}
          <Button color="secondary" value="info" onClick={() => setIsToggled(false)}>Cancel</Button>
          {!newJob
            && <Button color="danger" value="info" onClick={() => deleteThisJob(systemNeedingService?.job?.id)}>Delete?</Button>
          }
        </ModalFooter>
      </Form>
    </Modal>
    </>
  );
};
export default EditJobModal;
