import React from 'react';
import PropTypes from 'prop-types';

import SystemsRequests from '../../Helpers/Data/SystemRequests';

import './NewSystemPage.scss';

class NewSystemPage extends React.Component {
  static propTypes = {
    userObj: PropTypes.object.isRequired,
    authorized: PropTypes.bool.isRequired,
  }

  state = {
    newSystem: {},
  }

  render() {
    return (
      <div className="SystemsPage">
        <h1>Systems</h1>
        <form className="col-12 col-md-8 col-lg-4 log-in-form" onSubmit={this.createAccount}>
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
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="businessName">Business Name</label>
                <input
                  type="input"
                  className="form-control"
                  id="businessName"
                  value={businessName}
                  onChange={this.formFieldStringState}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="input"
                  className="form-control"
                  id="firstName"
                  value={firstName}
                  onChange={this.formFieldStringState}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="input"
                  className="form-control"
                  id="lastName"
                  value={lastName}
                  onChange={this.formFieldStringState}
                  required
                />
              </div>
              <h2 className="error col-12">{error}</h2>
              <button type="submit" className="btn btn-success">Add New System</button>
            </form>
      </div>
    );
  }
}

export default NewSystemPage;
