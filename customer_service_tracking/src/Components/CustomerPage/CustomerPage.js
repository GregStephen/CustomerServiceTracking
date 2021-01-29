import React from 'react';
import { Badge } from 'reactstrap';
import { useParams } from 'react-router-dom';

import { Page, Header } from '../Global';

import CustomerReports from './CustomerReports/CustomerReports';
import EditCustomerModal from '../Modals/EditCustomerModal/EditCustomerModal';
import EditCustomerAddressModal from '../Modals/EditCustomerAddressModal/EditCustomerAddressModal';
import CustomerSystems from './CustomerSystems';
import { useGetCustomerFromCustomerId, useUpdateCustomerStatus } from '../../Helpers/Data/CustomerRequests';
import { useGetReportsByCustomerId } from '../../Helpers/Data/ReportRequests';

import './CustomerPage.scss';
import Formatting from '../../Helpers/Functions/Formatting';

function CustomerPage({ userObj }) {
  const { id } = useParams();
  const reports = useGetReportsByCustomerId(id);
  const customer = useGetCustomerFromCustomerId(id);
  const updateCustomerStatus = useUpdateCustomerStatus();
  const customerName = `${customer?.data?.firstName} ${customer?.data?.lastName}`;

  return (
    <Page>
      {customer?.data
        && <div className="CustomerPage">
        <Header title={customerName}
          description={
            <Badge color={customer.data.enabled ? 'success' : 'danger'}>
              {customer.data.enabled ? 'Active' : 'Inactive'}
            </Badge>
          }
        />
          <div className="customer-info widget col-10 mb-4 pt-0">
            <Header title="Info" icon="fas fa-address-card" />
            {Formatting.formatContactInfo(customer.data)}
            {Formatting.formatAddressObj(customer.data.address)}
            <EditCustomerModal customer={customer.data} />
            <EditCustomerAddressModal customer={customer.data} />
          <button className={`btn btn-${customer.data.enabled ? 'danger' : 'success'}`}
            onClick={() => updateCustomerStatus.mutate(customer.data)}>
            {customer.data.enabled ? 'Deactivate' : 'Activate'}
          </button>
          </div>
        <CustomerSystems customer={customer.data} />
        {reports?.data
          && <CustomerReports reports={reports.data} />}
        </div>
      }
    </Page>
  );
}

export default CustomerPage;
