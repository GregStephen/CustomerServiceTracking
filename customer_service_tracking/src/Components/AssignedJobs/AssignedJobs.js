import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Header, GlobalTable } from '../Global';
import Formatting from '../../Helpers/Functions/Formatting';

import JobRequests from '../../Helpers/Data/JobRequests';

function AssignedJobs({ userId }) {
  const [jobsAssigned, getJobsAssigned] = useState();

  useEffect(() => {
    JobRequests.getJobsAssignedTo(userId)
      .then((jobs) => getJobsAssigned(jobs))
      .catch((err) => console.error(err));
  }, [userId]);

  const tableData = useMemo(() => (jobsAssigned || []), [jobsAssigned]);

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
      accessor: (j) => j.type,
    },
    {
      Header: '',
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
