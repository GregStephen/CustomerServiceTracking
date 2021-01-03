import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Page, Header } from '../Global';
import System from './System/System';

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
      <Page>
        <div className="SystemsPage">
          <Header title="Systems"/>
          <Link className="btn btn-info col-8 mt-3" to={'/new-system'}>Create a New System</Link>
          <div className="col-12 row justify-content-around">
            {systems.length > 0 ? showSystems
              : <p className="no-systems">You have no systems to show! Try adding some first</p>}
          </div>
        </div>
      </Page>
    );
  }
}

export default SystemsPage;
