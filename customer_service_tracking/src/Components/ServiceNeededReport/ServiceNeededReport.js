import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
} from 'reactstrap';
import { GlobalTable } from '../Global';
import EditJobModal from '../Modals/EditJobModal/EditJobModal';

import Formatting from '../../Helpers/Functions/Formatting';

import JobRequests from '../../Helpers/Data/JobRequests';
import JobTypeRequests from '../../Helpers/Data/JobTypeRequests';

import './ServiceNeededReport.scss';

function ServiceNeededReport({ businessId }) {
  const [systemsNeedingService, getSystemsNeedingService] = useState();
  const [daysOut, getDaysOut] = useState(7);
  const [jobTypeOptions, getJobTypeOptions] = useState();

  useEffect(() => {
    JobRequests.getJobsNeedingAssignment(businessId, daysOut)
      .then((systems) => getSystemsNeedingService(systems))
      .catch((err) => console.error(err));
    JobTypeRequests.getJobTypes()
      .then((types) => getJobTypeOptions(types))
      .catch((err) => console.error(err));
  }, [businessId, daysOut]);

  const createTheJob = (newJob) => {
    JobRequests.createNewJob(newJob)
      .then()
      .catch();
  };

  const editTheJob = (updatedJob) => {
    JobRequests.editJob(updatedJob)
      .then(() => this.getAllSystems())
      .catch((err) => console.error(err));
  };

  const deleteTheJob = (jobId) => {
    JobRequests.deleteJob(jobId)
      .then(() => this.getAllSystems())
      .catch((err) => console.error(err));
  };

  const tableData = useMemo(() => (systemsNeedingService || []), [systemsNeedingService]);

  const tableColumns = useMemo(() => [
    {
      Header: 'Customer',
      accessor: (r) => r.customer,
      Cell: ({ row: { original } }) => (
        <Link to={{ pathname: `/customer/${original.customer?.id}` }}>{`${original.customer?.firstName} ${original.customer?.lastName}`}</Link>
      ),
    },
    {
      Header: 'Address',
      accessor: (r) => r.customer.address,
      Cell: ({ row: { original } }) => (
        <a rel="noopener noreferrer" target="_blank" href={Formatting.directionLink(original.customer?.address)}>{original.customer?.address?.addressLine1}</a>
      ),
    },
    {
      Header: 'Days Until Empty',
      accessor: (r) => r.daysUntilEmpty,
      Cell: ({ value }) => (value > 0 ? value : 'Past Due'),
    },
    {
      Header: 'Tech Assigned',
      accessor: (r) => r.job?.technicianName,
      Cell: ({ value }) => (value || 'Unassigned'),
    },
    {
      Header: ' ',
      accessor: (r) => r.job?.id,
      Cell: ({ row: { original } }) => (
        <EditJobModal
          systemNeedingService={original}
          editJob={editTheJob}
          deleteJob={deleteTheJob}
          createJob={createTheJob}
          jobTypeOptions={jobTypeOptions}
        />
      ),
    },
  ], [jobTypeOptions]);

  return (
    <div className="ServiceNeededReport widget col-10">
      <FormGroup>
        <Label for="daysOut">How many days out?</Label>
        <Input type="select" name="select" id="daysOut">
          <option value={7}>1 week</option>
          <option value={14}>2 weeks</option>
          <option value={31}>1 month</option>
        </Input>
      </FormGroup>
      <h3>Customers needing service in the next {daysOut} days</h3>
      <GlobalTable
        columns={tableColumns}
        data={tableData}
        defaultSortColumn="Days Until Empty"
      />
    </div>
  );
}
export default ServiceNeededReport;
