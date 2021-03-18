import React, {
  useEffect,
  useMemo,
  useState,
  useContext,
} from 'react';
import { Link } from 'react-router-dom';
import {
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Button,
  Collapse,
} from 'reactstrap';
import moment from 'moment';

import JobsMap from '../JobsMap/JobsMap';
import { GlobalTable } from '../Global';
import EditJobModal from '../Modals/EditJobModal/EditJobModal';
import NewJobModal from '../Modals/NewJobModal/NewJobModal';
import Formatting from '../../Helpers/Functions/Formatting';

import {
  useJobsNeedingAssignment,
  useCreateNewJob,
  useDeleteJob,
  useEditJob,
} from '../../Helpers/Data/JobRequests';
import useGetJobTypeOptions from '../../Helpers/Data/JobTypeRequests';
import UserContext from '../../Contexts/UserContext';
import './ServiceNeededReport.scss';

function ServiceNeededReport() {
  const userObj = useContext(UserContext);
  const [markersData, setMarkersData] = useState([]);
  const [daysOut, getDaysOut] = useState(7);
  const systemsNeedingService = useJobsNeedingAssignment(userObj.business?.id, daysOut);
  const jobTypeOptions = useGetJobTypeOptions();
  const deleteJob = useDeleteJob();
  const createNewJob = useCreateNewJob();
  const editTheJob = useEditJob();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const tableData = useMemo(() => (systemsNeedingService.data ? systemsNeedingService.data : []), [systemsNeedingService.data]);

  useEffect(() => {
    const markers = [];
    if (systemsNeedingService.data) {
      systemsNeedingService.data.forEach((element) => {
        const newMarker = {
          title: `${element.property?.displayName}`,
          propertyLink: `/property/${element.property?.id}`,
          latLng: {
            lat: element.property?.latitude,
            lng: element.property?.longitude,
          },
          color: element.job ? 'green' : 'red',
          tech: element.job?.technicianName ?? '',
          address: element.property,
        };
        markers.push(newMarker);
      });
    }
    setMarkersData(markers);
  }, [systemsNeedingService.data]);

  const tableColumns = useMemo(() => [
    {
      Header: 'Property',
      accessor: (r) => r.property.displayName,
      Cell: ({ row: { original } }) => (
        <Link to={{ pathname: `/property/${original.property?.id}` }}>{`${original.property?.displayName}`}</Link>
      ),
    },
    {
      Header: 'Address',
      accessor: (r) => r.property,
      Cell: ({ row: { original } }) => (
        <a rel="noopener noreferrer" target="_blank" href={Formatting.directionLink(original.property)}>{original.property?.addressLine1}</a>
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
          jobTypeOptions={jobTypeOptions?.data}
        />
      ),
    },
  ], [jobTypeOptions, deleteJob, createNewJob, editTheJob]);

  return (
    <div className="ServiceNeededReport widget col-10 mb-4">
      <div className="d-flex justify-content-end">
        <NewJobModal userObj={userObj} />
        <Button color="primary" onClick={toggle} className="mr-3">{isOpen ? 'Close Map' : 'Show Map'}</Button>
      </div>

      <Collapse isOpen={isOpen}>
        <div className="mt-3">
        <JobsMap
          getLocation={false}
          businessAddress={userObj.business}
          markersData={markersData}
          />
          </div>
      </Collapse>

      <Row className="ml-4">
        <Col sm={12} md={3}>
          <FormGroup>
            <Label for="daysOut">How many days out?</Label>
            <Input type="select" name="select" id="daysOut" onChange={(e) => getDaysOut(e.target.value)}>
              <option value={7}>1 week</option>
              <option value={14}>2 weeks</option>
              <option value={moment().daysInMonth()}>1 month</option>
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <h3>Customers needing service from {moment().format('L')} to {moment().add(daysOut, 'days').format('L')}</h3>
      <GlobalTable
        columns={tableColumns}
        data={tableData}
        defaultSortColumn="Days Until Empty"
      />
    </div>
  );
}
export default ServiceNeededReport;
