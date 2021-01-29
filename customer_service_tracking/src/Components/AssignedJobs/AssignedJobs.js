import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Header, GlobalTable } from '../Global';
import JobNotesModal from '../Modals/JobNotesModal/JobNotesModal';
import Formatting from '../../Helpers/Functions/Formatting';

import { useJobsAssignedTo } from '../../Helpers/Data/JobRequests';

function AssignedJobs({ userId }) {
  const jobsAssigned = useJobsAssignedTo(userId);

  const tableData = useMemo(() => (jobsAssigned.data ? jobsAssigned.data : []), [jobsAssigned.data]);

  const tableColumns = useMemo(() => [
    {
      Header: 'Customer',
      accessor: (j) => j.customer,
      Cell: ({ row: { original } }) => (
        <Link to={{ pathname: `/customer/${original.customer?.id}` }}>{`${original.customer?.firstName} ${original.customer?.lastName}`}</Link>
      ),
    },
    {
      Header: 'Address',
      accessor: (j) => j.customer.address,
      Cell: ({ row: { original } }) => (
        <a rel="noopener noreferrer" target="_blank" href={Formatting.directionLink(original.customer?.address)}>{original.customer?.address?.addressLine1}</a>
      ),
    },
    {
      Header: 'Job Type',
      accessor: (j) => j.jobType?.type,
    },
    {
      Header: 'Notes',
      accessor: 'note',
      Cell: ({ value }) => (value ? <JobNotesModal note={value}/> : 'No Notes'),
    },
    {
      Header: ' ',
      accessor: (j) => j.id,
      Cell: ({ row: { original } }) => (
        <Link to={{ pathname: `/new-report/${original?.customerSystem?.id}` }} className="btn btn-info">Make a Report</Link>
      ),
    },
  ], []);

  return (
    <div className="AssignedJobs widget col-10 pt-0">
      <Header title="Jobs" />
      <GlobalTable
        columns={tableColumns}
        data={tableData}
        />
      </div>
  );
}

export default AssignedJobs;
