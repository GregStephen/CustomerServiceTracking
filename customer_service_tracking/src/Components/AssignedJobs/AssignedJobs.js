import React, { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Header, GlobalTable } from '../Global';
import JobsMap from '../JobsMap/JobsMap';
import JobNotesModal from '../Modals/JobNotesModal/JobNotesModal';
import Formatting from '../../Helpers/Functions/Formatting';

import { useJobsAssignedTo } from '../../Helpers/Data/JobRequests';

function AssignedJobs({ userObj }) {
  const jobsAssigned = useJobsAssignedTo(userObj.id);
  const [markersData, setMarkersData] = useState([]);

  const tableData = useMemo(() => (jobsAssigned.data ? jobsAssigned.data : []), [jobsAssigned.data]);

  useEffect(() => {
    const markers = [];
    if (jobsAssigned.data) {
      jobsAssigned.data.forEach((element) => {
        const newMarker = {
          title: `${element.customer?.firstName} ${element.customer?.lastName}`,
          customerLink: `/customer/${element.customer?.id}`,
          latLng: {
            lat: element.customer?.address?.latitude,
            lng: element.customer?.address?.longitude,
          },
          color: 'green',
          address: element.customer?.address,
        };
        markers.push(newMarker);
      });
    }
    setMarkersData(markers);
  }, [jobsAssigned.data]);

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
      <JobsMap
        getLocation={true}
        markersData={markersData}
        businessAddress={userObj.business.address}/>
      <GlobalTable
        columns={tableColumns}
        data={tableData}
        />
      </div>
  );
}

export default AssignedJobs;
