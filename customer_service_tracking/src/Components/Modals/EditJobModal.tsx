import React, { useState, useMemo, useContext } from 'react';
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
import { useGetRegisteredAndUnregisteredEmployees } from '../../Helpers/Data/BusinessRequests';
import UserContext from '../../Contexts/UserContext';
import { UseMutationResult } from 'react-query';

const editJobValidationSchema = Yup.object().shape({
  technicianId: Yup.string().required('Technician is required'),
  note: Yup.string().notRequired(),
  includeOtherSystems: Yup.bool().required(),
  includeNotes: Yup.bool().required(),
});
interface Props {
  job: Business.Job;
  editJob: UseMutationResult<Business.Job, Error, Business.Job, unknown>;
  deleteJob: UseMutationResult<any, Error, string, unknown>;
  jobTypeOptions: Business.JobType[];
}

function EditJobModal({
  job,
  editJob,
  deleteJob,
  jobTypeOptions,
}: Props) {
  const userObj = useContext(UserContext);
  const [isToggled, setIsToggled] = useState(false);
  const employeeOptions = useGetRegisteredAndUnregisteredEmployees(userObj.businessId).data;

  const defaultJob = useMemo(() => ({
    id: job?.id ?? '',
    propertySystemId: job?.propertySystemId ?? '',
    dateAssigned: job?.dateAssigned ?? '',
    technicianId: job?.technicianId ?? '',
    jobTypeId: job?.jobTypeId ?? '',
    note: job?.note ?? '',
    includeOtherSystems: job?.includeOtherSystems ?? false,
    otherSystemIds: [],
    includeNotes: job?.includeNotes ?? false,
  }), [job]);

  const formik = useFormik({
    initialValues: defaultJob,
    enableReinitialize: true,
    validationSchema: editJobValidationSchema,
    onSubmit: (formValues, { setSubmitting, setValues }) => {
      const submission = { ...formValues };
      submission.dateAssigned = moment().format();
      setValues(submission);
      editJob.mutate(submission, {
        onSuccess: () => {
          setIsToggled(false);
        },
      });
      setSubmitting(false);
    },
  });

  const deleteThisJob = (JobId: string) => {
    deleteJob.mutate(JobId, {
      onSuccess: () => {
        setIsToggled(false);
      },
    });
  };

  return (<>
    <button className="btn btn-info" onClick={() => setIsToggled(true)}>Edit/Delete</button>
    <Modal isOpen={isToggled} toggle={() => setIsToggled(false)}>
      <ModalHeader toggle={() => setIsToggled(false)}></ModalHeader>
      <Form className="col-8" onSubmit={formik.handleSubmit}>
        <ModalBody>
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
          {(formik.values.includeOtherSystems === true)
            && <FormGroup>
              <Label check>
                <Input
                  type="checkbox"
                  id="includeNotes"
                  {...formik.getFieldProps('includeNotes')}
                />
              Attach the same note for new jobs?
              </Label>
            </FormGroup>
          }
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Edit Job'</Button>{' '}
          <Button color="secondary" value="info" onClick={() => setIsToggled(false)}>Cancel</Button>
          <Button color="danger" value="info" onClick={() => deleteThisJob(job?.id)}>Delete?</Button>
        </ModalFooter>
      </Form>
    </Modal>
  </>
  );
}

export default EditJobModal;
