import React from 'react';
import PropTypes from 'prop-types';

import LogInForm from './LogInForm/LogInForm';

import './LandingPage.scss';

class LandingPage extends React.Component {
  static propTypes = {
    logIn: PropTypes.func.isRequired,
    error: PropTypes.string,
  }

  loggingIn = (email, password) => {
    const { logIn } = this.props;
    logIn(email, password);
  }

  render() {
    return (
      <div className="LandingPage">
        <div className="container">
          <div className="page row">
            <div className="welcome col-12 col-md-8 col-lg-6 row justify-content-center">
              <h2 className="welcome-header">Service Tracker</h2>
              <p className="welcome-text">Start doing the things</p>
            </div>
            <LogInForm
              loggingIn={this.loggingIn}
              error={this.props.error}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
