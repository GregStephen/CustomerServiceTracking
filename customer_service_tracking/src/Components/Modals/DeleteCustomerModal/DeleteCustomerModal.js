import React from 'react';
import {
  Button, ModalBody, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';

class DeleteCustomerModal extends React.Component {
  static propTypes = {
    toggleModalOpen: PropTypes.func.isRequired,
    deleteCustomer: PropTypes.func.isRequired,
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
          <h2>All records will be deleted and this cannot be undone</h2>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" onClick={this.confirmDeletion} color="danger">Delete Customer</Button>{' '}
            <Button color="secondary" value="info" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
      </div>
    );
  }
}

export default DeleteCustomerModal;
