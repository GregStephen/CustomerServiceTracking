import React from 'react';
import {
  Form, Button, ModalBody, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';


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

class EditCustomerAddressModal extends React.Component {
  static propTypes = {
    customer: PropTypes.object.isRequired,
    toggleModalOpen: PropTypes.func.isRequired,
    updateCustomerAddress: PropTypes.func.isRequired,
  }

  state = {
    updatedCustomerAddress: defaultCustomer,
  }

  componentDidMount() {
    const { customer } = this.props;
    this.setState({ updatedCustomerAddress: customer });
  }

  toggleModal = (e) => {
    const { toggleModalOpen } = this.props;
    toggleModalOpen(e);
  };

  formSubmit = (e) => {
    e.preventDefault();
    const { updatedCustomerAddress } = this.state;
    const { updateCustomerAddress } = this.props;
    updateCustomerAddress(updatedCustomerAddress);
    this.toggleModal();
  };

  formFieldStringState = (e) => {
    const tempCustomerAddress = { ...this.state.updatedCustomerAddress };
    tempCustomerAddress.address[e.target.id] = e.target.value;
    this.setState({ updatedCustomerAddress: tempCustomerAddress });
  };

  render() {
    const { updatedCustomerAddress } = this.state;
    return (
      <div className="EditCustomerAddressModal">
        <Form onSubmit={this.formSubmit}>
          <ModalBody>
          <div className="form-group">
            <label htmlFor="addressLine1">Address Line 1</label>
            <input
              type="input"
              className="form-control"
              id="addressLine1"
              value={updatedCustomerAddress.address.addressLine1}
              onChange={this.formFieldStringState}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="addressLine2">Address Line 2</label>
            <input
              type="input"
              className="form-control"
              id="addressLine2"
              value={updatedCustomerAddress.address.addressLine2}
              onChange={this.formFieldStringState}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="input"
              className="form-control"
              id="city"
              value={updatedCustomerAddress.address.city}
              onChange={this.formFieldStringState}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="input"
              className="form-control"
              id="state"
              value={updatedCustomerAddress.address.state}
              onChange={this.formFieldStringState}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="zipCode">Zip Code</label>
            <input
              type="input"
              className="form-control"
              id="zipCode"
              value={updatedCustomerAddress.address.zipCode}
              onChange={this.formFieldStringState}
              required
            />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">Edit Customer Address</Button>{' '}
            <Button color="secondary" value="info" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Form>
      </div>
    );
  }
}

export default EditCustomerAddressModal;
