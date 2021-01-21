/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  Badge,
} from 'reactstrap';
import { Page, Header } from '../Global';

import CustomerReports from './CustomerReports/CustomerReports';
import EditCustomerModal from '../Modals/EditCustomerModal/EditCustomerModal';
import EditCustomerAddressModal from '../Modals/EditCustomerAddressModal/EditCustomerAddressModal';
import CustomerSystems from './CustomerSystems';
import CustomerRequests from '../../Helpers/Data/CustomerRequests';
import ReportRequests from '../../Helpers/Data/ReportRequests';

import './CustomerPage.scss';
import Formatting from '../../Helpers/Functions/Formatting';

const defaultCustomer = {
  id: '',
  firstName: '',
  lastName: '',
  enabled: false,
  officePhone: '',
  homePhone: '',
  address: {
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
  },
  systems: [
    {
      id: '',
      systemId: '',
      installDate: '',
      nozzles: 0,
      serialNumber: '',
      sold: false,
      sprayCycles: 0,
      sprayDuration: 0,
      systemInfo: {
        type: '',
        gallons: '',
        inches: '',
      },
    },
  ],
};

const defaultReports = [
  {
    id: '',
    amountRemaining: 0,
    customerId: '',
    inchesAdded: 0,
    notes: '',
    serviceDate: '',
    solutionAdded: 0,
    systemId: '',
    technicianName: '',
    type: '',
  },
];

class CustomerPage extends React.Component {
  static propTypes = {
    userObj: PropTypes.object.isRequired,
    authorized: PropTypes.bool.isRequired,
  }

  state = {
    customer: defaultCustomer,
    reports: defaultReports,
    modalOpen: '',
    modalIsOpen: false,
  }

  toggleModalOpen = (modalName) => {
    this.setState({ modalOpen: modalName });
    this.setState((prevState) => ({
      modalIsOpen: !prevState.modalIsOpen,
    }));
  }

  loadPage() {
    const customerId = this.props.match.params.id;
    CustomerRequests.getCustomerFromCustomerId(customerId)
      .then((customerResult) => this.setState({ customer: customerResult }))
      .catch((err) => console.error(err));
    ReportRequests.getReportsByCustomerId(customerId)
      .then((reportResults) => this.setState({ reports: reportResults }))
      .catch((err) => console.error(err));
  }

  customerUpdated = (updatedCustomer) => {
    CustomerRequests.updateCustomer(updatedCustomer)
      .then(() => this.loadPage())
      .catch((err) => console.error(err));
  }

  customerAddressUpdated = (updatedCustomerAddress) => {
    CustomerRequests.updateCustomerAddress(updatedCustomerAddress)
      .then(() => this.loadPage())
      .catch((err) => console.error(err));
  }

  customerDeleted = () => {
    const { customer } = this.state;
    CustomerRequests.deleteCustomer(customer.id)
      .then(() => this.props.history.push('/customers'))
      .catch((err) => console.error(err));
  }

  deleteThisCustomerSystem = (systemId) => {
    CustomerRequests.deleteThisCustomerSystem(systemId)
      .then(() => this.loadPage())
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.loadPage();
  }

  setCustomerStatus = () => {
    const { customer } = this.state;
    const customerUpdated = { ...customer };
    customerUpdated.enabled = !customer.enabled;
    CustomerRequests.updateCustomerStatus(customerUpdated)
      .then(() => this.loadPage())
      .catch((err) => console.error(err));
  }

  render() {
    const { customer, modalOpen, reports } = this.state;
    const customerName = `${customer.firstName} ${customer.lastName}`;
    return (
      <Page>
        <div className="CustomerPage">
          <Header title={customerName} description={<Badge color={customer.enabled ? 'success' : 'danger'}>{ customer.enabled ? 'Active' : 'Inactive'}</Badge>}/>
          <div className="customer-info widget col-10 mb-4 pt-0">
            <Header title="Info" icon="fas fa-address-card" />
            {customer.homePhone !== '' ? <p>Home Phone: {Formatting.formatPhoneNumber(customer.homePhone)}</p> : ''}
            {customer.officePhone !== '' ? <p>Office Phone: {Formatting.formatPhoneNumber(customer.officePhone)}</p> : ''}
            {Formatting.formatAddressObj(customer.address)}

            <button className="btn btn-info" onClick={() => this.toggleModalOpen('editCustomer')}>Edit Customer</button>
            <button className="btn btn-info" onClick={() => this.toggleModalOpen('editAddress')}>Edit Address</button>
            <button className={`btn btn-${customer.enabled ? 'danger' : 'success'}`} onClick={() => this.setCustomerStatus()}>{ customer.enabled ? 'Deactivate' : 'Activate'}</button>
          </div>
          <CustomerSystems customer={customer} deleteThisCustomerSystem={this.deleteThisCustomerSystem} />
          <CustomerReports
            reports={reports} />
          <Modal isOpen={this.state.modalIsOpen} toggle={this.toggleModalOpen}>
            <ModalHeader toggle={this.modalIsOpen}>
              {modalOpen === 'editCustomer' ? 'Edit Customer'
                : modalOpen === 'editAddress' ? 'Edit Address' : ''}
            </ModalHeader>
            {modalOpen === 'editCustomer'
              ? <EditCustomerModal
                toggleModalOpen={this.toggleModalOpen}
                customer={customer}
                updateCustomer={this.customerUpdated}
                customerDeleted={this.customerDeleted}
              />
              : modalOpen === 'editAddress'
                ? <EditCustomerAddressModal
                  toggleModalOpen={this.toggleModalOpen}
                  customer={customer}
                  updateCustomerAddress={this.customerAddressUpdated}
                />
                : ''
            }
          </Modal>
        </div>
      </Page>
    );
  }
}

export default CustomerPage;
