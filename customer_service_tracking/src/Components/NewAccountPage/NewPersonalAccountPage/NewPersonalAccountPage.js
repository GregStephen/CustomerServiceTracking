import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import PropTypes from 'prop-types';

import './NewPersonalAccountPage.scss';

import UserRequests from '../../../Helpers/Data/UserRequests';

const defaultUser = {
  firstName: '',
  lastName: '',
  admin: false,
};

class NewPersonalAccountPage extends React.Component {
  static propTypes = {
    authorized: PropTypes.bool.isRequired,
    logIn: PropTypes.func.isRequired,
  }

  state = {
    newUser: defaultUser,
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


  // sets state for firebase info
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  createAccount = (e) => {
    e.preventDefault();
    const {
      email, password, confirmPassword,
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
        // need to create this function
        UserRequests.addNewPersonalUser(saveMe)
          .then(() => logIn(email, password))
          .catch((err) => console.error(err));
      })
      .catch((err) => this.setState({ error: err.message }));
  }

  render() {
    const {
      email, password, confirmPassword, firstName, lastName, error,
    } = this.state;

    return (
      <div className="NewPersonalAccountPage">
        <h1>Create your account</h1>
        <form className="col-12 col-md-8 col-lg-4 log-in-form" onSubmit={this.createAccount}>
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
              <h2 className="error col-12">{error}</h2>
              <button type="submit" className="btn btn-success">Create Account</button>
            </form>
      </div>
    );
  }
}

export default NewPersonalAccountPage;
