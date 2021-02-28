import React, { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Badge,
  Input,
} from 'reactstrap';

import { Page, Header, GlobalTable } from '../Global';
import { useGetPropertiesForBusiness } from '../../Helpers/Data/PropertyRequests';

function PropertiesPage({ userObj }) {
  const properties = useGetPropertiesForBusiness(userObj.businessId);
  const [searchFilter, setSearchFilter] = useState('');
  const [inactiveProperties, getInactiveProperties] = useState();

  const returnPrimaryContactName = (contacts) => {
    contacts.forEach((contact) => {
      if (contact.primary === true) {
        return <p>{contact.firstName}</p>;
      }
      return '';
    });
  };

  useEffect(() => {
    if (properties?.data) {
      const numberOfInactiveCustomers = properties.data.filter((p) => !p.enabled).length;
      getInactiveProperties(numberOfInactiveCustomers);
    }
  }, [properties]);

  const tableData = useMemo(() => (properties.data ? properties.data : []), [properties.data]);

  const tableColumns = useMemo(() => [
    {
      Header: 'Property Display Name',
      accessor: (r) => r.displayName,
      Cell: ({ row: { original } }) => (
        <Link to={{ pathname: `/customer/${original.id}` }}>{`${original.displayName}`}</Link>
      ),
    },
    {
      Header: 'Primary Contact',
      accessor: (r) => r.id,
      Cell: ({ row: { original } }) => (returnPrimaryContactName(original.contacts)),
    },
    {
      Header: 'City',
      accessor: (r) => r.city,
    },
    {
      Header: 'Active',
      accessor: (r) => r.enabled,
      Cell: ({ row: { original } }) => (
        <h5><Badge color={original.enabled ? 'success' : 'danger'}>{original.enabled ? 'Active' : 'Inactive'}</Badge></h5>
      ),
    },
    {
      Header: 'Search',
      accessor: (r) => r.city + r.displayName,
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
      <div className="PropertiesPage">
        <Header title="Properties" icon="fa-house-user" />
        <div className="d-flex justify-content-end">
          <Link className="btn btn-info mr-4 mb-2" to={'/new-customer'}>Add a new Property</Link>
        </div>
        <div className="d-flex justify-content-end">
          <p className="mr-4 mb-4">Total number of inactive: {inactiveProperties}</p>
        </div>
        <div className="widget col-10">
          <Row className="mb-3">
            <Col className="d-flex justify-content-between">
              <div className="ml-4">
                <Input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search Reports"
                  style={{ maxWidth: '100%', width: '300px' }}
                />
              </div>
            </Col>
          </Row>
          <GlobalTable
            columns={tableColumns}
            data={tableData}
            hidePagination={tableData.length < 10}
            defaultSortColumn='Property Display Name'
            hiddenColumns={hiddenColumns}
            filters={filters}
          />
        </div>
      </div>
    </Page>
  );
}

export default PropertiesPage;
