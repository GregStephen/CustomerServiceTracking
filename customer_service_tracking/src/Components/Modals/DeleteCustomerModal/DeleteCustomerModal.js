import React from 'react';
import {
  Button, ModalBody, ModalFooter,
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
    deleteCustomer: PropTypes.func.isRequired,
  }

  state = {
    customerToDelete: defaultCustomer,
  }

  componentDidMount() {
    const { customer } = this.props;
    this.setState({ customerToDelete: customer });
  }

  toggleModal = (e) => {
    const { toggleModalOpen } = this.props;
    toggleModalOpen(e);
  };

  confirmDeletion = () => {
    const { deleteCustomer } = this.props;
    deleteCustomer();
  }

  render() {
    return (
      <div className="DeleteCustomerModal">
          <ModalBody>
          <h1>Are you sure you want to delete this customer?</h1>
          <h2>All records will be deleted and this can not be undone</h2>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" onClick={this.confirmDeletion} color="danger">Delete Customer</Button>{' '}
            <Button color="secondary" value="info" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
      </div>
    );
  }
}

export default EditCustomerAddressModal;
