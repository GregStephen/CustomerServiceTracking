import React from 'react';

import './HomePage.scss';

class HomePage extends React.Component {
  render() {
    const { userObj } = this.props;
    return (
      <div className="HomePage">
        <h1>WELCOME IN {userObj.firstName}</h1>
      </div>
    );
  }
}

export default HomePage;
