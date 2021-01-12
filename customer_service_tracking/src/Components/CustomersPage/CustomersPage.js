import React, { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Page, Header, GlobalTable } from '../Global';

import Formatting from '../../Helpers/Functions/Formatting';
import CustomerRequests from '../../Helpers/Data/CustomerRequests';

import './CustomersPage.scss';

function CustomersPage({ userObj }) {
  const [customers, getCustomers] = useState();

  useEffect(() => {
    CustomerRequests.getCustomersForBusiness(userObj.businessId)
      .then((customersReturned) => getCustomers(customersReturned))
      .catch((err) => console.error(err));
  }, [userObj.businessId]);

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
      Header: 'Contact Info',
      accessor: (r) => r.id,
      Cell: ({ row: { original } }) => (
        Formatting.formatContactInfo(original)
      ),
    },
    {
      Header: 'Address',
      accessor: (r) => r.address.addressLine1,
      Cell: ({ row: { original } }) => (
        Formatting.formatAddressObj(original.address)
      ),
    },
  ], []);
  return (
    <Page>
      <div className="CustomersPage">
        <Header title="Customers" icon="fa-house-user"/>
        <div className="d-flex justify-content-end">
          <Link className="btn btn-info mr-4 mb-4" to={'/new-customer'}>Add a new customer</Link>
        </div>
        <div className="widget col-10">
          <GlobalTable
            columns={tableColumns}
            data={tableData}
            hidePagination={tableData.length < 10}
          />
        </div>
      </div>
    </Page>
  );
}

export default CustomersPage;
