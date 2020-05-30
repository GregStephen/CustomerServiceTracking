import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './LandingPage.scss';

class LandingPage extends React.Component {
  static propTypes = {
    authorized: PropTypes.bool.isRequired,
    logIn: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

logInFromLandingPage = (e) => {
  e.preventDefault();
  const { logIn } = this.props;
  const { email, password } = this.state;
  logIn(email, password);
}

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="LandingPage">
        <h1>WELCOME BITCHES</h1>
        <form className="col-12 col-md-8 col-lg-4 sign-in-form" onSubmit={this.logInFromLandingPage}>
              <h3 className="sign-in-header">Log In</h3>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={this.handleChange}
                  placeholder="Tom@ExampleEmail.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">Log In</button>
            </form>
            <Link className="btn btn-info col-8" to={'/new-business-account'}>Create a Business Account!</Link>
            <Link className="btn btn-info col-8" to={'/new-personal-account'}>Create a Personal Account!</Link>
      </div>
    );
  }
}

export default LandingPage;
