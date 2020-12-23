import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
} from 'reactstrap';

import EditSystemModal from '../../Modals/EditSystemModal/EditSystemModal';

import './System.scss';

class System extends React.Component {
  static propTypes = {
    system: PropTypes.object.isRequired,
    deleteTheSystem: PropTypes.func.isRequired,
    editTheSystem: PropTypes.func.isRequired,
  }

  state = {
    editSystemModalIsOpen: false,
  }

  toggleModalOpen = () => {
    this.setState((prevState) => ({
      editSystemModalIsOpen: !prevState.editSystemModalIsOpen,
    }));
  };

  systemEdited = (updatedSystem) => {
    const { editTheSystem } = this.props;
    editTheSystem(updatedSystem);
  };

  systemDeleted = (systemId) => {
    const { deleteTheSystem } = this.props;
    deleteTheSystem(systemId);
  };

  render() {
    const { system } = this.props;
    return (
      <div className="System col-5 widget">
        <h1>{system.type}</h1>
        <p>Gallons: {system.gallons}</p>
        <p>Inches: {system.inches}</p>
        <button className="btn btn-info" onClick={this.toggleModalOpen}>Edit</button>
        <Modal isOpen={this.state.editSystemModalIsOpen} toggle={this.toggleModalOpen}>
        <ModalHeader toggle={this.editSystemModalIsOpen}>Edit System</ModalHeader>
        <EditSystemModal
        toggleModalOpen={ this.toggleModalOpen }
        system={ system }
        editSystem={ this.systemEdited }
        deleteSystem={ this.systemDeleted }
        />
      </Modal>
      </div>
    );
  }
}

export default System;
