import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import PropTypes from 'prop-types';

import './NewAccountPage.scss';

import UserRequests from '../../../Helpers/Data/UserRequests';

const defaultUser = {
  businessName: '',
  firstName: '',
  lastName: '',
  admin: true,
};

const defaultBusinessAddress = {
  city: '',
  state: '',
  zipCode: '',
  addressLine1: '',
  addressLine2: '',
};

class NewAccountPage extends React.Component {
  static propTypes = {
    authorized: PropTypes.bool.isRequired,
    logIn: PropTypes.func.isRequired,
  }

  state = {
    newUser: defaultUser,
    businessAddress: defaultBusinessAddress,
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
  }

  formFieldStringState = (e) => {
    const tempUser = { ...this.state.newUser };
    tempUser[e.target.id] = e.target.value;
    this.setState({ newUser: tempUser });
  };

  businessAddressFormFieldStringState = (e) => {
    const tempBusinessAddress = { ...this.state.businessAddress };
    tempBusinessAddress[e.target.id] = e.target.value;
    this.setState({ businessAddress: tempBusinessAddress });
  };

  // sets state for firebase info
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  createAccount = (e) => {
    e.preventDefault();
    const {
      email, password, confirmPassword, businessAddress,
    } = this.state;
    const { logIn } = this.props;
    if (password !== confirmPassword) {
      this.setState({ error: 'Passwords must match' });
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        cred.user.getIdToken()
          .then((token) => sessionStorage.setItem('token', token));
        const saveMe = { ...this.state.newUser };
        saveMe.firebaseUid = firebase.auth().currentUser.uid;
        saveMe.businessAddress = businessAddress;
        UserRequests.addNewUser(saveMe)
          .then(() => logIn(email, password))
          .catch((err) => console.error(err));
      })
      .catch((err) => this.setState({ error: err.message }));
  }

  render() {
    const {
      email, password, confirmPassword, businessName, firstName, lastName, error, businessAddress,
    } = this.state;

    return (
      <div className="NewAccountPage">
        <h1>Create an account for your business</h1>
        <form className="col-12 col-md-8 col-lg-4 log-in-form" onSubmit={this.createAccount}>
              <h3 className="sign-in-header">Log In</h3>
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
              <h2>Business Address</h2>
              <div className="form-group">
                <label htmlFor="addressLine1">Address Line 1</label>
                <input
                  type="input"
                  className="form-control"
                  id="addressLine1"
                  value={businessAddress.addressLine1}
                  onChange={this.businessAddressFormFieldStringState}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="addressLine2">Address Line 2</label>
                <input
                  type="input"
                  className="form-control"
                  id="addressLine2"
                  value={businessAddress.addressLine2}
                  onChange={this.businessAddressFormFieldStringState}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="input"
                  className="form-control"
                  id="city"
                  value={businessAddress.city}
                  onChange={this.businessAddressFormFieldStringState}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="input"
                  className="form-control"
                  id="state"
                  value={businessAddress.state}
                  onChange={this.businessAddressFormFieldStringState}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">Zip Code</label>
                <input
                  type="input"
                  className="form-control"
                  id="zipCode"
                  value={businessAddress.zipCode}
                  onChange={this.businessAddressFormFieldStringState}
                  required
                />
              </div>
              <h2 className="error col-12">{error}</h2>
              <button type="submit" className="btn btn-success">Create Account</button>
            </form>
      </div>
    );
  }
}

export default NewAccountPage;
