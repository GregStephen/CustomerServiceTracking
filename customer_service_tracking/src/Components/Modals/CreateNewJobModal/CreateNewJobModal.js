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

function CreateNewJobModal({
  systemNeedingService,
  createJob,
  jobTypeOptions,
}) {
  const [isToggled, setIsToggled] = useState(false);

  const defaultJob = useMemo(() => ({
    id: '',
    propertySystemId: systemNeedingService?.system?.id,
    dateAssigned: '',
    technicianId: '',
    jobTypeId: '',
    note: '',
    includeOtherSystems: false,
    otherSystemIds: [],
    includeNotes: false,
  }), [systemNeedingService]);

  const formik = useFormik({
    initialValues: defaultJob,
    enableReinitialize: true,
    validationSchema: editJobValidationSchema,
    onSubmit: (formValues, { setSubmitting, setValues }) => {
      const submission = { ...formValues };
      submission.jobTypeId = jobTypeOptions.find((x) => x.type === 'Service').id;
      submission.dateAssigned = moment();
      if (submission.includeOtherSystems === true) {
        const systems = systemNeedingService?.property?.systems;
        systems.forEach((system) => {
          if (system.id !== submission.propertySystemId) {
            submission.otherSystemIds.push(system.id);
          }
        });
      }
      setValues(submission);
      createJob.mutate(submission, {
        onSuccess: () => {
          setIsToggled(false);
        },
      });
      setSubmitting(false);
    },
  });

  return (<>
    <button className="btn btn-info" onClick={() => setIsToggled(true)}>Assign</button>
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
<FormGroup>
              <Label check>
                <Input
                  type="checkbox"
                  id="includeOtherSystems"
                  {...formik.getFieldProps('includeOtherSystems')} />
              Create job for other systems on property?
            </Label>
            </FormGroup>
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
          <Button type="submit" color="primary">Create Job</Button>{' '}
          <Button color="secondary" value="info" onClick={() => setIsToggled(false)}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  </>
  );
}

export default CreateNewJobModal;
