import React from 'react';
import PropTypes from 'prop-types';

import SystemsRequests from '../../Helpers/Data/SystemRequests';

import './NewSystemPage.scss';

const defaultSystem = {
  type: '',
  gallons: 0,
  inches: 0,
};

class NewSystemPage extends React.Component {
  static propTypes = {
    userObj: PropTypes.object.isRequired,
    authorized: PropTypes.bool.isRequired,
  }

  state = {
    newSystem: defaultSystem,
  }

  formFieldStringState = (e) => {
    const tempSystem = { ...this.state.newSystem };
    tempSystem[e.target.id] = e.target.value;
    this.setState({ newSystem: tempSystem });
  };

  createNewSystem = (e) => {
    e.preventDefault();
    const { newSystem } = this.state;
    const { userObj } = this.props;
    newSystem.businessId = userObj.businessId;
    newSystem.gallons = parseInt(newSystem.gallons, 10);
    newSystem.inches = parseInt(newSystem.inches, 10);
    SystemsRequests.addNewSystem(newSystem)
      .then(() => this.props.history.push('/systems'))
      .catch((err) => console.error(err));
  }

  render() {
    const { newSystem } = this.state;
    return (
      <div className="NewSystemPage">
        <h1>Systems</h1>
        <form className="col-12 col-md-8 col-lg-4 log-in-form" onSubmit={this.createNewSystem}>
          <h3>New System</h3>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <input
              type="input"
              className="form-control"
              id="type"
              value={newSystem.type}
              onChange={this.formFieldStringState}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gallons">Gallons</label>
            <input
              type="number"
              className="form-control"
              id="gallons"
              min="0"
              value={newSystem.gallons}
              onChange={this.formFieldStringState}
              required
            />
            <div className="form-group">
              <label htmlFor="inches">Inches</label>
              <input
                type="number"
                className="form-control"
                id="inches"
                min="0"
                value={newSystem.inches}
                onChange={this.formFieldStringState}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success">Add New System</button>
        </form>
      </div>
    );
  }
}

export default NewSystemPage;
