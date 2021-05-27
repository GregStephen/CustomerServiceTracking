import React, {
  useMemo,
  useEffect,
  useState,
  useContext
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Column } from 'react-table';
import {
  Row,
  Col,
  Badge,
  Input,
  Collapse,
  Button
} from 'reactstrap';
import UserContext from '../../Contexts/UserContext';
import JobsMap from '../JobsMap/JobsMap';
import { Page, Header, GlobalTable } from '../Global';
import { useGetPropertiesForBusiness } from '../../Helpers/Data/PropertyRequests';

function PropertiesPage() {
  const userObj = useContext(UserContext);
  const history = useHistory();
  const properties = useGetPropertiesForBusiness(userObj.businessId);
  const [searchFilter, setSearchFilter] = useState('');
  const [markersData, setMarkersData] = useState<CustomMarker[]>();
  const [inactiveProperties, getInactiveProperties] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const returnPrimaryContactName = (contacts: Property.Contact[]) => {
    const primary = contacts.find((contact) => contact.primary);
    return `${primary?.firstName} ${primary?.lastName}`;
  };

  useEffect(() => {
    const markers: CustomMarker[] = [];
    if (properties.data) {
      properties.data.forEach((element) => {
        const newMarker = {
          title: `${element?.displayName}`,
          propertyLink: `/property/${element?.id}`,
          latLng: {
            lat: element?.latitude ? parseFloat(element.latitude): 0,
            lng: element?.longitude ? parseFloat(element.longitude) : 0,
          },
          color: 'green',
          tech: '',
          address: element,
        };
        markers.push(newMarker);
      });
    }
    setMarkersData(markers);
  }, [properties.data]);

  useEffect(() => {
    if (properties.data) {
      const numberOfInactiveCustomers = properties.data.filter((p) => !p.enabled).length;
      getInactiveProperties(numberOfInactiveCustomers);
    }
  }, [properties]);

  const tableData = useMemo(() => (properties.data ? properties.data : []), [properties.data]);

  const tableColumns: Column<Property.Property>[]= useMemo(() => [
    {
      Header: 'Name',
      accessor: 'displayName',
      Cell: ({ row: { original } }) => (
        <p>{original.displayName} {!original.enabled ? <Badge color='danger'>Inactive</Badge> : ''}</p>
      ),
    },
    {
      Header: 'Primary Contact',
      accessor: 'id',
      Cell: ({ row: { original } }) => (returnPrimaryContactName(original.contacts)),
    },
    {
      Header: 'Address',
      accessor: 'addressLine1',
    },
    {
      Header: 'City',
      accessor: 'city',
    },
    {
      Header: 'State',
      accessor: 'state',
    },
    {
      Header: 'Zip Code',
      accessor: 'zipCode',
    },
    {
      Header: 'Search',
      accessor: (r) => r.city + r.displayName + r.zipCode + r.state + r.addressLine1,
    },
  ], []);

  const hiddenColumns = useMemo(() => ['Search'], []);

  const filters = useMemo(
    () => [
      { id: 'Search', value: searchFilter },
    ],
    [searchFilter],
  );

  return (
    <Page>
      <div className="widget col-10 mt-4">
        <Header title="Properties" icon="fa-house-user" />
        <Row className="mb-3">
          <Col className="d-flex justify-content-between">
            <div className="ml-4">
              <Input
                type="text"
                value={searchFilter}
                onChange={(e: any) => setSearchFilter(e.target.value)}
                placeholder="Search Properties"
                style={{ maxWidth: '100%', width: '300px' }}
              />
            </div>
            <div className="d-flex justify-content-end">
              <Button color="primary" onClick={toggle} className="mr-3" style={{ height: '38px' }}>{isOpen ? 'Close Map' : 'Show Map'}</Button>
              <Link className="btn btn-info mr-4 mb-2" to="/new-property">Add a new Property</Link>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-between">
            {/* <div className="ml-4">
              <CustomInput onChange={(e: any) => filterResults(e)} type="switch" id="active" name="active" label="Active" inline/>
              <CustomInput onChange={(e: any) => filterResults(e)} type="switch" id="inactive" name="inactive" label="Inactive" inline/>
              <CustomInput onChange={(e: any) => filterResults(e)} type="switch" id="all" name="all" label="Show All" inline/>
            </div> */}
            <div className="d-flex justify-content-end">
              <p className="mr-4 mb-4">Total number of inactive: {inactiveProperties}</p>
            </div>
          </Col>
        </Row>
        <div>
          <Collapse isOpen={isOpen}>
            <div className="d-flex justify-content-center">
              <div className="col-10 mt-3">
                <JobsMap
                  hideMainMarkerPopup={false}
                  getLocation={false}
                  businessAddress={userObj.business}
                  markersData={markersData}
                />
              </div>
            </div>
          </Collapse>
        </div>
        <GlobalTable
          columns={tableColumns}
          hover
          striped
          data={tableData}
          hidePagination={tableData.length < 10}
          defaultSortColumn='displayName'
          hiddenColumns={hiddenColumns}
          filters={filters}
          customRowProps={(row) => ({
            className: 'cursor-pointer',
            onClick: () => {
              history.push(`/property/${row?.original.id}`);
            },
          })}
        />
      </div>
    </Page>
  );
}

export default PropertiesPage;
