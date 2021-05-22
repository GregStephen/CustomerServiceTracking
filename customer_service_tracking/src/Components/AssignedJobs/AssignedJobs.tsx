import React, {
  useMemo,
  useEffect,
  useState,
  useContext,
} from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Button } from 'reactstrap';
import { Column } from 'react-table';
import { Header, GlobalTable } from '../Global';
import JobsMap from '../JobsMap/JobsMap';
import { JobNotesModal } from '../Modals';
import Formatting from '../../Helpers/Functions/Formatting';
import UserContext from '../../Contexts/UserContext';
import { useJobsAssignedTo } from '../../Helpers/Data/JobRequests';

function AssignedJobs() {
  const userObj = useContext(UserContext);
  const jobsAssigned = useJobsAssignedTo(userObj?.id);
  const [markersData, setMarkersData] = useState<CustomMarker[]>();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const tableData = useMemo(() => (jobsAssigned.data ? jobsAssigned.data : []), [jobsAssigned.data]);

  useEffect(() => {
    const markers: CustomMarker[] = [];
    if (jobsAssigned.data) {
      jobsAssigned.data.forEach((element) => {
        const newMarker = {
          title: `${element.property?.displayName}`,
          propertyLink: `/property/${element.property?.id}`,
          latLng: {
            lat: element.property?.latitude ? parseInt(element.property.latitude): 0,
            lng: element.property?.longitude ? parseInt(element.property?.longitude) : 0,
          },
          color: 'green',
          address: element.property,
        };
        markers.push(newMarker);
      });
    }
    setMarkersData(markers);
  }, [jobsAssigned.data]);

  const tableColumns: Column<Business.Job>[] = useMemo(() => [
    {
      Header: 'Property',
      accessor: 'propertySystemId',
      Cell: ({ row: { original } }) => (
        <Link to={{ pathname: `/property/${original.property?.id}` }}>{`${original.property?.displayName}`}</Link>
      ),
    },
    {
      Header: 'Address',
      accessor: 'property',
      Cell: ({ row: { original } }) => (
        <a rel="noopener noreferrer" target="_blank" href={original.property ? Formatting.directionLink(original.property) : ''}>{original.property?.addressLine1}</a>
      ),
    },
    {
      Header: 'System',
      accessor: (j) => j.propertySystem?.displayName,
    },
    {
      Header: 'Job Type',
      accessor: 'jobType',
    },
    {
      Header: 'Notes',
      accessor: 'note',
      Cell: ({ value }) => (value ? <JobNotesModal note={value} /> : 'No Notes'),
    },
    {
      Header: ' ',
      accessor: 'id',
      Cell: ({ row: { original } }) => (
        <Link to={{ pathname: `/new-report/${original?.propertySystemId}` }} className="btn btn-info">Make a Report</Link>
      ),
    },
  ], []);

  return (
    <div className="AssignedJobs widget col-10 pt-0 mt-4">
      <Header title="Your Jobs" icon="fa-briefcase" />
      {jobsAssigned.data && jobsAssigned.data.length > 0
        && (<>
          <div className="d-flex justify-content-end">
            <Button color="primary" onClick={toggle} className="mr-3 mb-3" >{isOpen ? 'Close Map' : 'Show Map'}</Button>
          </div>
          <Collapse isOpen={isOpen}>
            <JobsMap
              getLocation={true}
              markersData={markersData}
              businessAddress={userObj?.business}
              hideMainMarkerPopup={false}
            />
          </Collapse>
        </>)}
      {jobsAssigned.isLoading && <p>LOADING</p>}
      {jobsAssigned.isSuccess
      && <GlobalTable
        columns={tableColumns}
        data={tableData}
        emptyTableMessage="No jobs currently assigned"
      />
      }
    </div>
  );
}

export default AssignedJobs;
