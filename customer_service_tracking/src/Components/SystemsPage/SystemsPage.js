import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import System from '../System/System';

import SystemsRequests from '../../Helpers/Data/SystemRequests';

import './SystemsPage.scss';

class SystemsPage extends React.Component {
  static propTypes = {
    userObj: PropTypes.object.isRequired,
    authorized: PropTypes.bool.isRequired,
  }

  state = {
    systems: [],
  }

  componentDidMount() {
    this.getAllSystems();
  }

  getAllSystems = () => {
    const { userObj } = this.props;
    SystemsRequests.getSystemsForBusiness(userObj.businessId)
      .then((systems) => {
        this.setState({ systems });
      })
      .catch();
  }

  editTheSystem = (updatedSystem) => {
    SystemsRequests.editSystem(updatedSystem)
      .then(() => this.getAllSystems())
      .catch((err) => console.error(err));
  }

  deleteTheSystem = (systemId) => {
    SystemsRequests.deleteSystemById(systemId)
      .then(() => this.getAllSystems())
      .catch((err) => console.error(err));
  }

  render() {
    const { systems } = this.state;
    const showSystems = systems.map((system) => (
      <System
        system={system}
        key={system.id}
        deleteTheSystem={this.deleteTheSystem}
        editTheSystem={this.editTheSystem}
      />
    ));
    return (
      <div className="SystemsPage container">
        <h1>Systems</h1>
        <Link className="btn btn-info col-8" to={'/new-system'}>Create a New System</Link>
        <div className="row justify-content-around">
          {systems.length > 0 ? showSystems
            : <p className="no-systems">You have no systems to show! Try adding some first</p>}
        </div>
      </div>
    );
  }
}

export default SystemsPage;
