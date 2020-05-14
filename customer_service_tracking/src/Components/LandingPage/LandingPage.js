import React from 'react';

import './LandingPage.scss';

class LandingPage extends React.Component {
  state = {
    email: '',
    password: '',
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="LandingPage">
        <h1>WELCOME BITCHES</h1>
        <form className="col-12 col-md-8 col-lg-4 sign-in-form" onSubmit={this.logIntoDiscDig}>
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

export default LandingPage;
