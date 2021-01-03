import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Modal,
  ModalHeader,
} from 'reactstrap';
import moment from 'moment';

import DeleteCustomerSystemModal from '../../Modals/DeleteCustomerSystemModal/DeleteCustomerSystemModal';

class CustomerSystem extends React.Component {
  static propTypes = {
    system: PropTypes.object.isRequired,
    deleteThisCustomerSystem: PropTypes.func.isRequired,
  }

  state = {
    modalIsOpen: false,
  }

  toggleModalOpen = () => {
    this.setState((prevState) => ({
      modalIsOpen: !prevState.modalIsOpen,
    }));
  }

  customerDeleted = () => {
    const { system, deleteThisCustomerSystem } = this.props;
    deleteThisCustomerSystem(system.id);
  }

  render() {
    const { system } = this.props;
    const editCustomerSystemLink = `/edit-customer-system/${system.id}`;
    const newReportLink = `/new-report/${system.id}`;
    return (
      <div className="CustomerSystem">
        <p>Install Date: {moment(system.installDate).format('L')}</p>
        <p>Serial Number: {system.serialNumber}</p>
        {system.sold
          ? <p>Sold</p>
          : <p>Lease</p>}
        <p>Nozzles: {system.nozzles}</p>
        <p>Spray Cycles: {system.sprayCycles}</p>
        <p>Spray Duration: {system.sprayDuration}</p>
        <Link className="btn btn-info" tag={Link} to={editCustomerSystemLink}>Change settings</Link>
        <Link className="btn btn-info" tag={Link} to={newReportLink}>New Report</Link>
        <button className="btn btn-danger" onClick={this.toggleModalOpen}>DELETE SYSTEM</button>
        <Modal isOpen={this.state.modalIsOpen} toggle={this.toggleModalOpen}>
          <ModalHeader toggle={this.modalIsOpen}>Delete Customer System</ModalHeader>
            <DeleteCustomerSystemModal
              toggleModalOpen={this.toggleModalOpen}
              deleteCustomerSystem={this.customerDeleted}
            />
        </Modal>
      </div>
    );
  }
}

export default CustomerSystem;
