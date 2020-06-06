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

class EditCustomerModal extends React.Component {
  static propTypes = {
    customer: PropTypes.object.isRequired,
    toggleModalOpen: PropTypes.func.isRequired,
    updateCustomer: PropTypes.func.isRequired,
  }

  state = {
    updatedCustomer: defaultCustomer,
  }

  componentDidMount() {
    const { customer } = this.props;
    this.setState({ updatedCustomer: customer });
  }

  toggleModal = (e) => {
    const { toggleModalOpen } = this.props;
    toggleModalOpen(e);
  };

  formSubmit = (e) => {
    e.preventDefault();
    const { updatedCustomer } = this.state;
    const { updateCustomer } = this.props;
    updateCustomer(updatedCustomer);
    this.toggleModal();
  };

  formFieldStringState = (e) => {
    const tempCustomer = { ...this.state.updatedCustomer };
    tempCustomer[e.target.id] = e.target.value;
    this.setState({ updatedCustomer: tempCustomer });
  };

  render() {
    const { updatedCustomer } = this.state;
    return (
      <div className="EditCustomerModal">
        <Form onSubmit={this.formSubmit}>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="input"
                className="form-control"
                id="firstName"
                value={updatedCustomer.firstName}
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
                value={updatedCustomer.lastName}
                onChange={this.formFieldStringState}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="homePhone">Home Phone</label>
              <input
                type="input"
                className="form-control"
                id="homePhone"
                value={updatedCustomer.homePhone}
                onChange={this.formFieldStringState}
              />
            </div>
            <div className="form-group">
              <label htmlFor="officePhone">Office Phone</label>
              <input
                type="input"
                className="form-control"
                id="officePhone"
                value={updatedCustomer.officePhone}
                onChange={this.formFieldStringState}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">Edit Customer</Button>{' '}
            <Button color="secondary" value="info" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Form>
      </div>
    );
  }
}

export default EditCustomerModal;
