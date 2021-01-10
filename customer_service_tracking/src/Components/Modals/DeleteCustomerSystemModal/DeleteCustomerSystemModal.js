import React from 'react';
import {
  Button, ModalBody, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';

class DeleteCustomerSystemModal extends React.Component {
  static propTypes = {
    toggleModalOpen: PropTypes.func.isRequired,
    modalIsOpen: PropTypes.bool.isRequired,
    deleteCustomerSystem: PropTypes.func.isRequired,
  }

  toggleModal = (e) => {
    const { toggleModalOpen, modalIsOpen } = this.props;
    toggleModalOpen(!modalIsOpen);
  };

  confirmDeletion = () => {
    const { deleteCustomerSystem, systemId } = this.props;
    deleteCustomerSystem(systemId);
  }

  render() {
    return (
      <div className="DeleteCustomerSystemModal">
          <ModalBody>
          <h1>Are you sure you want to delete this customers system?</h1>
          <h2>This cannot be undone</h2>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" onClick={this.confirmDeletion} color="danger">Delete Customer System</Button>{' '}
            <Button color="secondary" value="info" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
      </div>
    );
  }
}

export default DeleteCustomerSystemModal;
