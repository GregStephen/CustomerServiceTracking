import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import LogInForm from '../LogInForm/LogInForm';

import './LandingPage.scss';

class LandingPage extends React.Component {
  static propTypes = {
    authorized: PropTypes.bool.isRequired,
    logIn: PropTypes.func.isRequired,
  }

  loggingIn = (email, password) => {
    const { logIn } = this.props;
    logIn(email, password);
  }

  render() {
    return (
      <div className="LandingPage">
        <h1>WELCOME BITCHES</h1>
        <LogInForm
          loggingIn={this.loggingIn}
        />
        <div>
          <Link className="btn btn-info col-8" to={'/new-business-account'}>Create a Business Account!</Link>
        </div>
        <div>
          <Link className="btn btn-info col-8" to={'/new-personal-account'}>Create a Personal Account!</Link>
        </div>
      </div>
    );
  }
}

export default LandingPage;
