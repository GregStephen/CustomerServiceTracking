import React from 'react';
import PropTypes from 'prop-types';

class LogInForm extends React.Component {
  static propTypes = {
    loggingIn: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
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

  render() {
    const { email, password } = this.state;
    return (
      <div>
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
      </div>
    );
  }
}

export default LogInForm;
