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
  Form,
  Button,
  Collapse,
  Spinner,
} from 'reactstrap';
import moment from 'moment';

import JobsMap from '../JobsMap/JobsMap';
import { GlobalTable, Header } from '../Global';
import Jobs from '../Jobs/Jobs';
import CreateNewJobModal from '../Modals/CreateNewJobModal.tsx';
import NewJobModal from '../Modals/NewJobModal';
import Formatting from '../../Helpers/Functions/Formatting';

import { useJobsNeedingAssignment, useJobs } from '../../Helpers/Data/JobRequests';
import UserContext from '../../Contexts/UserContext';

function ServiceNeededReport() {
  const userObj = useContext(UserContext);
  const [markersData, setMarkersData] = useState([]);
  const [daysOut, getDaysOut] = useState(7);
  const systemsNeedingService = useJobsNeedingAssignment(userObj.business?.id, daysOut);
  const jobs = useJobs(userObj?.businessId);


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
          system: element.system?.displayName,
          latLng: {
            lat: element.property?.latitude ? parseFloat(element.property.latitude): 0,
            lng: element.property?.longitude ? parseFloat(element.property?.longitude) : 0,
          },
          color: 'red',
          address: element.property,
        };
        markers.push(newMarker);
      });
    }
    if (jobs.data) {
      jobs.data.forEach((element) => {
        const newMarker = {
          title: `${element.property?.displayName}`,
          propertyLink: `/property/${element.property?.id}`,
          system: element.propertySystem?.displayName,
          latLng: {
            lat: element.property?.latitude ? parseFloat(element.property.latitude): 0,
            lng: element.property?.longitude ? parseFloat(element.property?.longitude) : 0,
          },
          color: 'green',
          tech: element.technicianName,
          address: element.property,
        };
        markers.push(newMarker);
      });
    }
    setMarkersData(markers);
  }, [systemsNeedingService.data, jobs.data]);

  const tableColumns = useMemo(() => [
    {
      Header: `Customers needing service from ${moment().format('L')} to ${moment().add(daysOut, 'days').format('L')}`,
      className: 'top-header',
      columns: [
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
          Header: 'System',
          accessor: (r) => r.system.displayName,
        },
        {
          Header: 'Days Until Service Date',
          accessor: 'daysUntilServiceDate',
          Cell: ({ value }) => (value > 0 ? value : 'Past Due'),
        },
        {
          Header: ' ',
          accessor: (r) => r.id,
          Cell: ({ row: { original } }) => (
            <CreateNewJobModal
              systemNeedingService={original}
            />
          ),
        },
      ],
    },
  ], [daysOut]);

  return (
    <div className="ServiceNeededReport widget col-10 mb-4 mt-4">
      <Header title='Jobs' />
      <div className="d-flex justify-content-between align-items-start mb-3">
        <Row className="ml-4 col-6">
          <Form inline>
            <FormGroup>
              <Label for="daysOut" className="mr-2">How many days out?</Label>
              <Input type="select" name="select" id="daysOut" onChange={(e) => getDaysOut(e.target.value)}>
                <option value={7}>1 week</option>
                <option value={14}>2 weeks</option>
                <option value={moment().daysInMonth()}>1 month</option>
              </Input>
            </FormGroup>
          </Form>
        </Row>
        <Row className="mr-2">
          <NewJobModal userObj={userObj} />
          {systemsNeedingService.data?.length > 0
            && <Button color="primary" onClick={toggle} className="mr-3">{isOpen ? 'Close Map' : 'Show Map'}</Button>}
        </Row>
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
      { systemsNeedingService.isLoading && <Spinner color="info" style={{ width: '3rem', height: '3rem' }} />}
      { systemsNeedingService.isSuccess
        && <GlobalTable
          columns={tableColumns}
          data={tableData}
          defaultSortColumn="Days Until Empty"
          emptyTableMessage="No one needs service in the time specified"
        />
      }
      {jobs.isLoading && <Spinner color="info" style={{ width: '3rem', height: '3rem' }} />}
      {jobs.isSuccess && <Jobs jobs={jobs?.data} />}
    </div>
  );
}
export default ServiceNeededReport;
