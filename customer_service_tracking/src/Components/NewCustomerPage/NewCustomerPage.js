import React from 'react';
import PropTypes from 'prop-types';

import CustomerRequests from '../../Helpers/Data/CustomerRequests';

import './NewCustomerPage.scss';

const defaultCustomer = {
  firstName: '',
  lastName: '',
  officePhone: '',
  homePhone: '',
};

const defaultCustomerAddress = {
  city: '',
  state: '',
  zipCode: '',
  addressLine1: '',
  addressLine2: '',
};

class NewCustomerPage extends React.Component {
  static propTypes = {
    userObj: PropTypes.object.isRequired,
    authorized: PropTypes.bool.isRequired,
  }

  state = {
    newCustomer: defaultCustomer,
    newCustomerAddress: defaultCustomerAddress,
  }

  formFieldStringState = (e) => {
    const tempCustomer = { ...this.state.newCustomer };
    tempCustomer[e.target.id] = e.target.value;
    this.setState({ newCustomer: tempCustomer });
  };

  customerAddressFormFieldStringState = (e) => {
    const tempCustomerAddress = { ...this.state.newCustomerAddress };
    tempCustomerAddress[e.target.id] = e.target.value;
    this.setState({ newCustomerAddress: tempCustomerAddress });
  };

  createNewCustomer = (e) => {
    e.preventDefault();
    const { newCustomer, newCustomerAddress } = this.state;
    const { userObj } = this.props;
    newCustomer.businessId = userObj.businessId;
    newCustomer.newCustomerAddress = newCustomerAddress;
    CustomerRequests.addNewCustomer(newCustomer)
      .then(() => {
        console.error('done');
        this.props.history.push('/customers');
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { newCustomer, newCustomerAddress } = this.state;
    return (
      <div className="NewCustomerPage">
        <form className="col-12 col-md-8 col-lg-4 log-in-form" onSubmit={this.createNewCustomer}>
          <h3>New Customer</h3>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="input"
              className="form-control"
              id="firstName"
              value={newCustomer.firstName}
              onChange={this.formFieldStringState}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="input"
              className="form-control"
              id="lastName"
              value={newCustomer.lastName}
              onChange={this.formFieldStringState}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="addressLine1">Address Line 1</label>
            <input
              type="input"
              className="form-control"
              id="addressLine1"
              value={newCustomerAddress.addressLine1}
              onChange={this.customerAddressFormFieldStringState}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="addressLine2">Address Line 2</label>
            <input
              type="input"
              className="form-control"
              id="addressLine2"
              value={newCustomerAddress.addressLine2}
              onChange={this.customerAddressFormFieldStringState}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="input"
              className="form-control"
              id="city"
              value={newCustomerAddress.city}
              onChange={this.customerAddressFormFieldStringState}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="input"
              className="form-control"
              id="state"
              value={newCustomerAddress.state}
              onChange={this.customerAddressFormFieldStringState}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="zipCode">Zip Code</label>
            <input
              type="input"
              className="form-control"
              id="zipCode"
              value={newCustomerAddress.zipCode}
              onChange={this.customerAddressFormFieldStringState}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="homePhone">Home Phone</label>
            <input
              type="input"
              className="form-control"
              id="homePhone"
              value={newCustomer.homePhone}
              onChange={this.formFieldStringState}
            />
          </div>
          <div className="form-group">
            <label htmlFor="officePhone">Office Phone</label>
            <input
              type="input"
              className="form-control"
              id="officePhone"
              value={newCustomer.officePhone}
              onChange={this.formFieldStringState}
            />
          </div>
          <button type="submit" className="btn btn-success">Add New Customer</button>
        </form>
      </div>
    );
  }
}

export default NewCustomerPage;
