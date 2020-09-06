import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup, Label, Input,
} from 'reactstrap';
import moment from 'moment';

import CustomerRequests from '../../Helpers/Data/CustomerRequests';
import JobTypeRequests from '../../Helpers/Data/JobTypeRequests';
import ReportRequests from '../../Helpers/Data/ReportRequests';
import SystemRequests from '../../Helpers/Data/SystemRequests';

const defaultCustomer = {
  id: '',
  firstName: '',
  lastName: '',
  officePhone: '',
  homePhone: '',
  address: {
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
  },
  systems: [
    {
      id: '',
      systemId: '',
      installDate: '',
      nozzles: 0,
      serialNumber: '',
      sold: false,
      sprayCycles: 0,
      sprayDuration: 0,
      systemInfo: {
        id: '',
        type: '',
        gallons: '',
        inches: '',
      },
    },
  ],
};

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

const defaultReport = {
  amountRemaining: 0,
  customerId: '',
  inchesAdded: 0,
  notes: '',
  serviceDate: '',
  solutionAdded: 0,
  systemId: '',
  technicianId: '',
  jobTypeId: '',
};

class AddSystemToCustomerPage extends React.Component {
  static propTypes = {
    authorized: PropTypes.bool.isRequired,
    userObj: PropTypes.object.isRequired,
  }

  state = {
    customer: defaultCustomer,
    systemOptions: [],
    jobTypeOptions: [],
    newCustomerSystem: defaultCustomerSystem,
    newInstallReport: defaultReport,
  }


  loadPage() {
    const { userObj } = this.props;
    const customerId = this.props.match.params.id;
    CustomerRequests.getCustomerFromCustomerId(customerId)
      .then((customerResult) => this.setState({ customer: customerResult }))
      .catch((err) => console.error(err));
    SystemRequests.getSystemsForBusiness(userObj.businessId)
      .then((systemOptions) => this.setState({ systemOptions }))
      .catch((err) => console.error(err));
    JobTypeRequests.getJobTypes()
      .then((types) => this.setState({ jobTypeOptions: types }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.loadPage();
  }

  createNewCustomerSystem = (e) => {
    e.preventDefault();
    const { newCustomerSystem, newInstallReport } = this.state;
    const { userObj } = this.props;
    const customerId = this.props.match.params.id;
    newCustomerSystem.customerId = customerId;
    newCustomerSystem.nozzles = parseInt(newCustomerSystem.nozzles, 10);
    newCustomerSystem.sprayCycles = parseInt(newCustomerSystem.sprayCycles, 10);
    newCustomerSystem.sprayDuration = parseInt(newCustomerSystem.sprayDuration, 10);
    newCustomerSystem.installDate = moment(newCustomerSystem.installDate).format('YYYY-MM-DD');
    CustomerRequests.addNewCustomerSystem(newCustomerSystem)
      .then((newCustomerSystemId) => {
        newInstallReport.customerId = customerId;
        newInstallReport.systemId = newCustomerSystemId;
        newInstallReport.amountRemaining = parseInt(newInstallReport.amountRemaining, 10);
        newInstallReport.inchesAdded = parseInt(newInstallReport.inchesAdded, 10);
        newInstallReport.serviceDate = newCustomerSystem.installDate;
        newInstallReport.solutionAdded = parseInt(newInstallReport.solutionAdded, 10);
        newInstallReport.technicianId = userObj.id;
        ReportRequests.addNewReport(newInstallReport)
          .then(() => {
            this.props.history.push(`/customer/${customerId}`);
          });
      })
      .catch((err) => console.error(err));
  }

  formFieldStringState = (e) => {
    const tempCustomerSystem = { ...this.state.newCustomerSystem };
    tempCustomerSystem[e.target.id] = e.target.value;
    this.setState({ newCustomerSystem: tempCustomerSystem });
  };

  reportFormFieldStringState = (e) => {
    const tempReport = { ...this.state.newInstallReport };
    tempReport[e.target.id] = e.target.value;
    this.setState({ newInstallReport: tempReport });
  };

  handleRadio = (e) => {
    const tempCustomerSystem = { ...this.state.newCustomerSystem };
    const sold = e.currentTarget.value === 'true';
    tempCustomerSystem[e.target.id] = sold;
    this.setState({ newCustomerSystem: tempCustomerSystem });
  }

  render() {
    const {
      newCustomerSystem, systemOptions, jobTypeOptions, newInstallReport,
    } = this.state;
    return (
      <div className='AddSystemToCustomerPage'>
        <h1>add system to customer page</h1>
        <form className="col-12 col-md-8 col-lg-4 log-in-form" onSubmit={this.createNewCustomerSystem}>
          <h3>New System</h3>
          <FormGroup>
            <Label htmlFor="systemId">Which system did you install?</Label>
            <Input
              type="select"
              name="systemId"
              id="systemId"
              value={newCustomerSystem.systemId}
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
              value={newCustomerSystem.installDate}
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
              value={newCustomerSystem.nozzles}
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
                value={newCustomerSystem.sprayCycles}
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
                value={newCustomerSystem.sprayDuration}
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
                value={newCustomerSystem.serialNumber}
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
                checked={newCustomerSystem.sold === true}
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
                checked={newCustomerSystem.sold === false}
                onChange={this.handleRadio}
                required
              />
            </div>
            <h1>Initial install report</h1>
            <FormGroup>
              <Label htmlFor="jobTypeId">What type of job?</Label>
              <Input
                type="select"
                name="jobTypeId"
                id="jobTypeId"
                value={newInstallReport.jobTypeId}
                onChange={this.reportFormFieldStringState}
                required>
                <option value="">Select a job</option>
                {jobTypeOptions.map((object) => (
                  <option key={object.id} value={object.id}>{object.type}</option>
                ))}
              </Input>
            </FormGroup>
            <div className="form-group">
              <label htmlFor="amountRemaining">Amount Remaining</label>
              <input
                type="number"
                className="form-control"
                id="amountRemaining"
                min="0"
                value={newInstallReport.amountRemaining}
                onChange={this.reportFormFieldStringState}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inchesAdded">Inches Added</label>
              <input
                type="number"
                className="form-control"
                id="inchesAdded"
                min="0"
                value={newInstallReport.inchesAdded}
                onChange={this.reportFormFieldStringState}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="solutionAdded">Solution Added</label>
              <input
                type="number"
                className="form-control"
                id="solutionAdded"
                min="0"
                value={newInstallReport.solutionAdded}
                onChange={this.reportFormFieldStringState}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <input
                type="input"
                className="form-control"
                id="notes"
                value={newInstallReport.notes}
                onChange={this.reportFormFieldStringState}
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

export default AddSystemToCustomerPage;
