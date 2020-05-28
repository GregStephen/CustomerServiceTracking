import React from 'react';
import PropTypes from 'prop-types';

import './SystemsPage.scss';

class SystemsPage extends React.Component {
  static propTypes = {
    userObj: PropTypes.object.isRequired,
    authorized: PropTypes.bool.isRequired,
  }

  render() {
    const { userObj } = this.props;
    return (
      <div className="SystemsPage">
        <h1>Systems</h1>
      </div>
    );
  }
}

export default SystemsPage;
