import React from 'react';
import {
  Button, ModalBody, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';

class DeletePropertySystemModal extends React.Component {
  static propTypes = {
    toggleModalOpen: PropTypes.func.isRequired,
    modalIsOpen: PropTypes.bool.isRequired,
    deletePropertySystem: PropTypes.func.isRequired,
  }

  toggleModal = (e) => {
    const { toggleModalOpen, modalIsOpen } = this.props;
    toggleModalOpen(!modalIsOpen);
  };

  confirmDeletion = () => {
    const { deletePropertySystem, systemId } = this.props;
    deletePropertySystem(systemId);
  }

  render() {
    return (
      <div className="DeletePropertySystemModal">
          <ModalBody>
          <h1>Are you sure you want to delete this system?</h1>
          <h2>This cannot be undone</h2>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" onClick={this.confirmDeletion} color="danger">Delete System</Button>{' '}
            <Button color="secondary" value="info" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
      </div>
    );
  }
}

export default DeletePropertySystemModal;
