/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Modal,
  ModalHeader,
} from 'reactstrap';

import EditCustomerModal from '../EditCustomerModal/EditCustomerModal';
import EditCustomerAddressModal from '../EditCustomerAddressModal/EditCustomerAddressModal';

import CustomerRequests from '../../Helpers/Data/CustomerRequests';

import './CustomerPage.scss';

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

class CustomerPage extends React.Component {
  static propTypes = {
    userObj: PropTypes.object.isRequired,
    authorized: PropTypes.bool.isRequired,
  }

  state = {
    customer: defaultCustomer,
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

  componentDidMount() {
    this.loadPage();
  }

  showSystems = () => {
    const { systems } = this.state;
    if (!systems) {
      return (<p>Customer has no systems. You should add some!</p>);
    }
    return (
        <div>
          <p>found some systems</p>
        </div>
    );
  }

  render() {
    const { customer, modalOpen } = this.state;
    const addSystemLink = `/add-system-to-customer/${customer.id}`;
    return (
      <div className="CustomerPage">
        <h1>Customer {customer.firstName} {customer.lastName}</h1>
        {customer.homePhone !== '' ? <p>{customer.homePhone}</p> : ''}
        {customer.officePhone !== '' ? <p>{customer.officePhone}</p> : ''}
        <p> Address</p>
        <p>{customer.address.addressLine1}</p>
        {customer.address.addressLine2 !== '' ? <p>{customer.address.addressLine2}</p> : ''}
        <p>{customer.address.city}</p>
        <p>{customer.address.state}</p>
        <p>{customer.address.zipCode}</p>
        <button className="btn btn-info" onClick={() => this.toggleModalOpen('editCustomer')}>Edit Customer</button>
        <button className="btn btn-info" onClick={() => this.toggleModalOpen('editAddress')}>Edit Address</button>
        <div>
          <h1>Systems</h1>
          {this.showSystems()}
        </div>

        <Link className="btn btn-info" tag={Link} to={addSystemLink}>Add System</Link>
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
