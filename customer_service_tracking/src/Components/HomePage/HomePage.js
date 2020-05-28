import React from 'react';
import PropTypes from 'prop-types';

import './HomePage.scss';

class HomePage extends React.Component {
  static propTypes = {
    userObj: PropTypes.object.isRequired,
    authorized: PropTypes.bool.isRequired,
  }

  render() {
    const { userObj } = this.props;
    return (
      <div className="HomePage">
        <h1>WELCOME IN {userObj.firstName}</h1>
        <h2>from {userObj.businessName}</h2>
      </div>
    );
  }
}

export default HomePage;
