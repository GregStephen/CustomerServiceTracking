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
  includeOtherSystems: Yup.bool().required(),
  includeNotes: Yup.bool().required(),
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
    id: systemNeedingService?.job?.id ?? '',
    customerSystemId: systemNeedingService?.job?.customerSystemId ?? systemNeedingService?.system?.id,
    dateAssigned: systemNeedingService?.job?.dateAssigned ?? '',
    technicianId: systemNeedingService?.job?.technicianId ?? '',
    jobTypeId: systemNeedingService?.job?.jobTypeId ?? '',
    note: systemNeedingService?.job?.note ?? '',
    includeOtherSystems: systemNeedingService?.job?.includeOtherSystems ?? false,
    otherSystemIds: [],
    includeNotes: systemNeedingService?.job?.includeNotes ?? false,
  }), [systemNeedingService]);

  const newJob = !systemNeedingService?.job?.id;

  const formik = useFormik({
    initialValues: defaultJob,
    enableReinitialize: true,
    validationSchema: editJobValidationSchema,
    onSubmit: (formValues, { setSubmitting, setValues }) => {
      const submission = { ...formValues };
      submission.jobTypeId = jobTypeOptions.find((x) => x.type === 'Service').id;
      submission.dateAssigned = moment();
      if (submission.includeOtherSystems === true) {
        const systems = systemNeedingService?.customer?.systems;
        systems.forEach((system) => {
          if (system.id !== submission.customerSystemId) {
            submission.otherSystemIds.push(system.id);
          }
        });
      }
      setValues(submission);
      if (newJob) {
        createJob.mutate(submission);
      } else {
        editJob.mutate(submission);
      }
      setSubmitting(false);
      setIsToggled(false);
    },
  });

  const deleteThisJob = (JobId) => {
    deleteJob.mutate(JobId);
    setIsToggled(false);
  };

  return (<>
    <button className="btn btn-info" onClick={() => setIsToggled(true)}>{newJob ? 'Assign' : 'Edit/Delete'}</button>
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
          {newJob
            && <FormGroup>
              <Label check>
                <Input
                  type="checkbox"
                  id="includeOtherSystems"
                  {...formik.getFieldProps('includeOtherSystems')} />
              Create job for Customers other systems?
            </Label>
            </FormGroup>
          }
          {(formik.values.includeOtherSystems === true)
            && <FormGroup>
              <Label check>
                <Input
                  type="checkbox"
                  id="includeNotes"
                  {...formik.getFieldProps('includeNotes')} />
              Attach the same note for new jobs?
            </Label>
            </FormGroup>
          }
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
}

export default EditJobModal;
