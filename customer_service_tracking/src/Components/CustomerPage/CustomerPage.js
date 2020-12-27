/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Modal,
  ModalHeader,
} from 'reactstrap';
import Header from '../Global/Header';

import CustomerReports from './CustomerReports/CustomerReports';
import CustomerSystem from './CustomerSystem/CustomerSystem';
import EditCustomerModal from '../Modals/EditCustomerModal/EditCustomerModal';
import EditCustomerAddressModal from '../Modals/EditCustomerAddressModal/EditCustomerAddressModal';

import CustomerRequests from '../../Helpers/Data/CustomerRequests';
import ReportRequests from '../../Helpers/Data/ReportRequests';

import './CustomerPage.scss';
import Formatting from '../../Helpers/Functions/Formatting';

const defaultCustomer = {
  id: '',
  firstName: '',
  lastName: '',
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

  showSystems = () => {
    const { customer } = this.state;
    if (customer.systems.length === 0) {
      return (<p>Customer has no systems. You should add some!</p>);
    }
    return (
      customer.systems.map((system) => (
          <CustomerSystem
          key={ system.id }
          system={ system }
          deleteThisCustomerSystem={ this.deleteThisCustomerSystem }/>
      ))
    );
  }

  render() {
    const { customer, modalOpen, reports } = this.state;
    const addSystemLink = `/add-system-to-customer/${customer.id}`;
    const customerName = `${customer.firstName} ${customer.lastName}`;
    return (
      <div className="CustomerPage">
        <div className="customer-info widget col-10 mb-4">
          <Header header={customerName}/>
          {customer.homePhone !== '' ? <p>Home Phone: {Formatting.formatPhoneNumber(customer.homePhone)}</p> : ''}
          {customer.officePhone !== '' ? <p>Office Phone: {Formatting.formatPhoneNumber(customer.officePhone)}</p> : ''}
          <p> Address</p>
          <p>{customer.address.addressLine1}</p>
          {customer.address.addressLine2 !== '' ? <p>{customer.address.addressLine2}</p> : ''}
          <p>{customer.address.city}</p>
          <p>{customer.address.state}</p>
          <p>{customer.address.zipCode}</p>
          <button className="btn btn-info" onClick={() => this.toggleModalOpen('editCustomer')}>Edit Customer</button>
          <button className="btn btn-info" onClick={() => this.toggleModalOpen('editAddress')}>Edit Address</button>
        </div>
        <div className="Customer-Systems widget col-10 mb-4">
          <Header header={'Systems'} />
          {this.showSystems()}
          <Link className="btn btn-info" tag={Link} to={addSystemLink}>Add System</Link>
        </div>
        <CustomerReports
        reports={reports}/>
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
    );
  }
}

export default CustomerPage;
