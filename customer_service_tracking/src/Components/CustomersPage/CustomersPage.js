import React, { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Badge,
  Input,
} from 'reactstrap';

import { Page, Header, GlobalTable } from '../Global';
import CustomerRequests from '../../Helpers/Data/CustomerRequests';

import './CustomersPage.scss';

function CustomersPage({ userObj }) {
  const [customers, getCustomers] = useState();
  const [searchFilter, setSearchFilter] = useState('');
  const [inactiveCustomers, getInactiveCustomers] = useState();

  useEffect(() => {
    CustomerRequests.getCustomersForBusiness(userObj.businessId)
      .then((customersReturned) => getCustomers(customersReturned))
      .catch((err) => console.error(err));
  }, [userObj.businessId]);

  useEffect(() => {
    if (customers) {
      const numberOfInactiveCustomers = customers.filter((c) => !c.enabled).length;
      getInactiveCustomers(numberOfInactiveCustomers);
    }
  }, [customers]);

  const tableData = useMemo(() => (customers || []), [customers]);

  const tableColumns = useMemo(() => [
    {
      Header: 'Customer Name',
      accessor: (c) => c.firstName,
      Cell: ({ row: { original } }) => (
        <Link to={{ pathname: `/customer/${original.id}` }}>{`${original.firstName} ${original.lastName}`}</Link>
      ),
    },
    {
      Header: 'Email',
      accessor: (r) => r.id,
      Cell: ({ row: { original } }) => (original?.emails[0] ? original.emails[0] : ''),
    },
    {
      Header: 'City',
      accessor: (r) => r.address.city,
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
      accessor: (r) => r.address?.city + r.firstName + r.lastName,
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
      <div className="CustomersPage">
        <Header title="Customers" icon="fa-house-user" />
        <div className="d-flex justify-content-end">
          <Link className="btn btn-info mr-4 mb-2" to={'/new-customer'}>Add a new customer</Link>
        </div>
        <div className="d-flex justify-content-end">
          <p className="mr-4 mb-4">Total number of inactive: {inactiveCustomers}</p>
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
            defaultSortColumn='Customer Name'
            hiddenColumns={hiddenColumns}
            filters={filters}
          />
        </div>
      </div>
    </Page>
  );
}

export default CustomersPage;
