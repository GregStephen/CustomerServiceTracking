import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
} from 'reactstrap';

import EditCustomerModal from '../EditCustomerModal/EditCustomerModal';

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
};

class CustomerPage extends React.Component {
  static propTypes = {
    userObj: PropTypes.object.isRequired,
    authorized: PropTypes.bool.isRequired,
  }

  state = {
    customer: defaultCustomer,
    editCustomerModalIsOpen: false,
  }

  toggleModalOpen = () => {
    this.setState((prevState) => ({
      editCustomerModalIsOpen: !prevState.editCustomerModalIsOpen,
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

  componentDidMount() {
    this.loadPage();
  }

  render() {
    const { customer } = this.state;
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
        <button className="btn btn-info" onClick={this.toggleModalOpen}>Edit</button>
        <Modal isOpen={this.state.editCustomerModalIsOpen} toggle={this.toggleModalOpen}>
        <ModalHeader toggle={this.editCustomerModalIsOpen}>Edit Customer</ModalHeader>
        <EditCustomerModal
        toggleModalOpen={ this.toggleModalOpen }
        customer={ customer }
        updateCustomer={ this.customerUpdated }
        />
      </Modal>
      </div>
    );
  }
}

export default CustomerPage;
