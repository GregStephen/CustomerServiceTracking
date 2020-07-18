import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup, Label, Input,
} from 'reactstrap';

import CustomerRequests from '../../Helpers/Data/CustomerRequests';
import SystemRequests from '../../Helpers/Data/SystemRequests';

const defaultCustomerSystem = {
  customerId: '',
  systemId: '',
  installDate: '',
  nozzles: 0,
  serialNumber: '',
  sold: false,
  sprayCycles: 0,
  sprayDuration: 0,
};

class EditCustomerSystemPage extends React.Component {
  static propTypes = {
    authorized: PropTypes.bool.isRequired,
    userObj: PropTypes.object.isRequired,
  }

  state = {
    systemOptions: [],
    updatedCustomerSystem: defaultCustomerSystem,
  }


  loadPage() {
    const { userObj } = this.props;
    const customerSystemId = this.props.match.params.id;
    CustomerRequests.getCustomerSystemFromCustomerSystemId(customerSystemId)
      .then((customerSystemResult) => this.setState({ updatedCustomerSystem: customerSystemResult }))
      .catch((err) => console.error(err));
    SystemRequests.getSystemsForBusiness(userObj.businessId)
      .then((systemOptions) => this.setState({ systemOptions }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.loadPage();
  }

  updateCustomerSystem = (e) => {
    e.preventDefault();
    const { updatedCustomerSystem } = this.state;
    updatedCustomerSystem.nozzles = parseInt(updatedCustomerSystem.nozzles, 10);
    updatedCustomerSystem.sprayCycles = parseInt(updatedCustomerSystem.sprayCycles, 10);
    updatedCustomerSystem.sprayDuration = parseInt(updatedCustomerSystem.sprayDuration, 10);
    CustomerRequests.updateCustomerSystem(updatedCustomerSystem)
      .then(() => {
        this.props.history.push(`/customer/${updatedCustomerSystem.customerId}`);
      })
      .catch((err) => console.error(err));
  }

  formFieldStringState = (e) => {
    const tempCustomerSystem = { ...this.state.updatedCustomerSystem };
    tempCustomerSystem[e.target.id] = e.target.value;
    this.setState({ updatedCustomerSystem: tempCustomerSystem });
  };

  handleRadio = (e) => {
    const tempCustomerSystem = { ...this.state.updatedCustomerSystem };
    const sold = e.currentTarget.value === 'true';
    tempCustomerSystem[e.target.id] = sold;
    this.setState({ updatedCustomerSystem: tempCustomerSystem });
  }

  render() {
    const { updatedCustomerSystem, systemOptions } = this.state;
    return (
      <div className='EditCustomerSystemPage'>
        <h1>Edit Customer System</h1>
        <form className="col-12 col-md-8 col-lg-4 log-in-form" onSubmit={this.updateCustomerSystem}>
          <FormGroup>
            <Label htmlFor="systemId">Which system did you install?</Label>
            <Input
              type="select"
              name="systemId"
              id="systemId"
              value={updatedCustomerSystem.systemId}
              onChange={this.formFieldStringState}
              required>
              <option value="">Select a system</option>
              {systemOptions.map((object) => (
                <option key={object.id} value={object.id}>{object.type}</option>
              ))}
            </Input>
          </FormGroup>
          <div className="form-group">
            <label htmlFor="installDate">Install Date</label>
            <input
              type="date"
              className="form-control"
              id="installDate"
              value={updatedCustomerSystem.installDate}
              onChange={this.formFieldStringState}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nozzles">Number of nozzles</label>
            <input
              type="number"
              className="form-control"
              id="nozzles"
              min="0"
              value={updatedCustomerSystem.nozzles}
              onChange={this.formFieldStringState}
              required
            />
            <div className="form-group">
              <label htmlFor="sprayCycles">Spray Cycles</label>
              <input
                type="number"
                className="form-control"
                id="sprayCycles"
                min="0"
                value={updatedCustomerSystem.sprayCycles}
                onChange={this.formFieldStringState}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="sprayDuration">Duration of spray in seconds</label>
              <input
                type="number"
                className="form-control"
                id="sprayDuration"
                min="0"
                value={updatedCustomerSystem.sprayDuration}
                onChange={this.formFieldStringState}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="serialNumber">Serial Number</label>
              <input
                type="input"
                className="form-control"
                id="serialNumber"
                value={updatedCustomerSystem.serialNumber}
                onChange={this.formFieldStringState}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="sold">Sold</label>
              <input
                type="radio"
                className="form-control"
                id="sold"
                value="true"
                checked={updatedCustomerSystem.sold === true}
                onChange={this.handleRadio}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lease">Lease</label>
              <input
                type="radio"
                className="form-control"
                id="sold"
                value="false"
                checked={updatedCustomerSystem.sold === false}
                onChange={this.handleRadio}
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

export default EditCustomerSystemPage;
