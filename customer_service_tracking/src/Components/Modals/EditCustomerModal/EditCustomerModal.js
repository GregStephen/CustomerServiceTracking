import React from 'react';
import {
  Modal, ModalHeader, Form, Button, ModalBody, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';

import DeleteCustomerModal from '../DeleteCustomerModal/DeleteCustomerModal';

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
    customerDeleted: PropTypes.func.isRequired,
  }

  state = {
    updatedCustomer: defaultCustomer,
    deleteCustomerModalIsOpen: false,
  }

  componentDidMount() {
    const { customer } = this.props;
    this.setState({ updatedCustomer: customer });
  }

  toggleModal = (e) => {
    const { toggleModalOpen } = this.props;
    toggleModalOpen(e);
  };

  toggleDeleteCustomerModal = (e) => {
    this.setState((prevState) => ({
      deleteCustomerModalIsOpen: !prevState.deleteCustomerModalIsOpen,
    }));
  }

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

  deleteCustomer = () => {
    const { customerDeleted } = this.props;
    customerDeleted();
  }

  render() {
    const { updatedCustomer } = this.state;
    const { customer } = this.props;
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
            <Button color="danger" value="info" onClick={this.toggleDeleteCustomerModal}>DELETE</Button>
          </ModalFooter>
        </Form>
        <Modal isOpen={this.state.deleteCustomerModalIsOpen} toggle={this.toggleDeleteCustomerModal}>
          <ModalHeader toggle={this.deleteCustomerModalIsOpen}>Delete Customer?</ModalHeader>
          <DeleteCustomerModal
              toggleModalOpen={this.toggleDeleteCustomerModal}
              customer={customer}
              deleteCustomer={this.deleteCustomer}
            />
        </Modal>
      </div>
    );
  }
}

export default EditCustomerModal;
