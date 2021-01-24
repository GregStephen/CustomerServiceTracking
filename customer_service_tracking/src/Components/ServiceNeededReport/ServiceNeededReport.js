import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { GlobalTable } from '../Global';
import EditJobModal from '../Modals/EditJobModal/EditJobModal';

import Formatting from '../../Helpers/Functions/Formatting';

import {
  useJobsNeedingAssignment,
  useCreateNewJob,
  useDeleteJob,
  useEditJob,
} from '../../Helpers/Data/JobRequests';
import JobTypeRequests from '../../Helpers/Data/JobTypeRequests';

import './ServiceNeededReport.scss';

function ServiceNeededReport({ businessId }) {
  const [daysOut, getDaysOut] = useState(7);
  const systemsNeedingService = useJobsNeedingAssignment(businessId, daysOut);
  const [jobTypeOptions, getJobTypeOptions] = useState();
  const deleteJob = useDeleteJob();
  const createNewJob = useCreateNewJob();
  const editTheJob = useEditJob();

  useEffect(() => {
    JobTypeRequests.getJobTypes()
      .then((types) => getJobTypeOptions(types))
      .catch((err) => console.error(err));
  }, []);

  const tableData = useMemo(() => (systemsNeedingService.data?.data ? systemsNeedingService.data.data : []), [systemsNeedingService.data]);

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
          deleteJob={deleteJob}
          createJob={createNewJob}
          jobTypeOptions={jobTypeOptions}
        />
      ),
    },
  ], [jobTypeOptions, deleteJob, createNewJob, editTheJob]);

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
