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
          title: `${element.property?.displayName}`,
          propertyLink: `/property/${element.property?.id}`,
          latLng: {
            lat: element.property?.latitude,
            lng: element.property?.longitude,
          },
          color: 'green',
          address: element.property,
        };
        markers.push(newMarker);
      });
    }
    setMarkersData(markers);
  }, [jobsAssigned.data]);

  const tableColumns = useMemo(() => [
    {
      Header: 'Property',
      accessor: (j) => j.propertySystemId,
      Cell: ({ row: { original } }) => (
        <Link to={{ pathname: `/property/${original.property?.id}` }}>{`${original.property?.displayName}`}</Link>
      ),
    },
    {
      Header: 'Address',
      accessor: (j) => j.property,
      Cell: ({ row: { original } }) => (
        <a rel="noopener noreferrer" target="_blank" href={Formatting.directionLink(original.property)}>{original.property?.addressLine1}</a>
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
        <Link to={{ pathname: `/new-report/${original?.propertySystemId}` }} className="btn btn-info">Make a Report</Link>
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
