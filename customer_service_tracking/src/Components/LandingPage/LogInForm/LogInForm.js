import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader } from 'reactstrap';
import Button from '../../Global/Button';
import PasswordResetModal from '../../Modals/PasswordResetModal/PasswordResetModal';

import './LogInForm.scss';

class LogInForm extends React.Component {
  static propTypes = {
    loggingIn: PropTypes.func.isRequired,
    error: PropTypes.string,
  }

  state = {
    email: '',
    password: '',
    errorMessage: '',
    passwordResetModal: false,
  }

  componentDidUpdate({ error }) {
    if (this.props.error !== error) {
      this.setState({ errorMessage: this.props.error });
    }
  }

  logInFromLandingPage = (e) => {
    e.preventDefault();
    const { loggingIn } = this.props;
    const { email, password } = this.state;
    loggingIn(email, password);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  toggleResetPasswordModal = () => {
    this.setState((prevState) => ({
      passwordResetModal: !prevState.passwordResetModal,
    }));
  }

  render() {
    const { email, password, errorMessage } = this.state;
    return (
      <div className="LogInForm col-12 col-md-6 col-lg-4">
        <form className="sign-in-form" onSubmit={this.logInFromLandingPage}>
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
            <small className="form-text text-muted">
              <button type="button" className="forgotPasswordBtn" onClick={this.toggleResetPasswordModal}>Forgot Password</button>
            </small>
          </div>
          <Button type="submit" color="info" title="Log In"/>
          <p className="error">{errorMessage}</p>
        </form>
        <Modal isOpen={this.state.passwordResetModal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleResetPasswordModal}>Reset Password</ModalHeader>
          <PasswordResetModal
            toggleResetPasswordModal={this.toggleResetPasswordModal}
          />
        </Modal>
      </div>
    );
  }
}

export default LogInForm;
