import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SystemsRequests from '../../Helpers/Data/SystemRequests';

import './SystemsPage.scss';

class SystemsPage extends React.Component {
  static propTypes = {
    userObj: PropTypes.object.isRequired,
    authorized: PropTypes.bool.isRequired,
  }

  state = {
    systems: {},
  }

  componentDidMount() {
    const { userObj } = this.props;
    SystemsRequests.getSystemsForBusiness(userObj.businessId)
      .then((systems) => {
        this.setState({ systems });
      })
      .catch();
  }

  render() {
    return (
      <div className="SystemsPage">
        <h1>Systems</h1>
        <Link className="btn btn-info col-8" to={'/new-system'}>Create a New System</Link>
      </div>
    );
  }
}

export default SystemsPage;
