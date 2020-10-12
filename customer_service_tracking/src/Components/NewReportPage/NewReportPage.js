import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup, Label, Input,
} from 'reactstrap';
import moment from 'moment';

import defaults from '../../Helpers/defaults';
import CustomerRequests from '../../Helpers/Data/CustomerRequests';
import JobRequests from '../../Helpers/Data/JobRequests';
import JobTypeRequests from '../../Helpers/Data/JobTypeRequests';
import ReportRequests from '../../Helpers/Data/ReportRequests';

import './NewReportPage.scss';

class NewReportPage extends React.Component {
  static propTypes = {
    userObj: PropTypes.object.isRequired,
    authorized: PropTypes.bool.isRequired,
  }

  state = {
    customerSystem: defaults.defaultSystem,
    newReport: defaults.defaultReport,
    jobTypeOptions: defaults.defaultJobTypes,
    customer: defaults.defaultCustomer,
    job: {
      id: '',
    },
  }

  componentDidMount() {
    const customerSystemId = this.props.match.params.id;
    CustomerRequests.getCustomerSystemFromCustomerSystemId(customerSystemId)
      .then((system) => this.setState({ customerSystem: system }, () => {
        CustomerRequests.getCustomerFromCustomerId(system.customerId)
          .then((customer) => this.setState({ customer }));
      }))
      .catch((err) => console.error(err));
    JobTypeRequests.getJobTypes()
      .then((types) => {
        const reportTypes = types.filter((x) => x.type !== 'Install');
        this.setState({ jobTypeOptions: reportTypes });
      })
      .catch((err) => console.error(err));
    JobRequests.getJobForSystemBySystemId(customerSystemId)
      .then((job) => this.setState({ job }))
      .catch((err) => console.error(err));
  }

  formFieldStringState = (e) => {
    const tempReport = { ...this.state.newReport };
    tempReport[e.target.id] = e.target.value;
    this.setState({ newReport: tempReport });
  };

  createNewReport = (e) => {
    e.preventDefault();
    const { newReport, customerSystem, job } = this.state;
    const { userObj } = this.props;
    if (job) {
      newReport.jobTypeId = job.jobTypeId;
    }
    newReport.technicianId = userObj.id;
    newReport.customerId = customerSystem.customerId;
    newReport.systemId = customerSystem.id;
    newReport.amountRemaining = parseInt(newReport.amountRemaining, 10);
    newReport.inchesAdded = parseInt(newReport.inchesAdded, 10);
    newReport.serviceDate = moment(newReport.serviceDate).format('YYYY-MM-DD');
    newReport.solutionAdded = parseInt(newReport.solutionAdded, 10);
    ReportRequests.addNewReport(newReport)
      .then(() => JobRequests.deleteJob(job.id)
        .then(() => this.props.history.push('/home')))
      .catch((err) => console.error(err));
  }

  render() {
    const {
      newReport,
      jobTypeOptions,
      customerSystem,
      customer,
      job,
    } = this.state;
    const maxInches = customerSystem.systemInfo.inches;
    const today = moment().format('YYYY-MM-DD');
    return (
      <div className="NewReportPage">
        <h1>New Report</h1>
        <form className="col-12 col-md-8 col-lg-4 log-in-form" onSubmit={this.createNewReport}>
          <h3>{customer.firstName} {customer.lastName}</h3>
          <h3>{customer.address.addressLine1}</h3>
          {customer.address.addressLine2 ? <h3>{customer.address.addressLine2} </h3> : ''}
          <h3>{customer.address.city}, {customer.address.state} {customer.address.zipCode}</h3>
          {customerSystem.notes
            ? <div>
              <h3>Notes on System</h3>
              <p>{customerSystem.notes}</p>
            </div>
            : ''}
          {job.id !== ''
            ? <p className="typeOfJob">Type of Job: {jobTypeOptions.find((x) => x.id === job.jobTypeId)?.type}</p>
            : <FormGroup>
              <Label htmlFor="jobTypeId">What type of job?</Label>
              <Input
                type="select"
                name="jobTypeId"
                id="jobTypeId"
                value={newReport.jobTypeId}
                onChange={this.formFieldStringState}
                required>
                <option value="">Select a job</option>
                {jobTypeOptions.map((object) => (
                  <option key={object.id} value={object.id}>{object.type}</option>
                ))}
              </Input>
            </FormGroup>
          }
          <div className="form-group">
            <label htmlFor="serviceDate">Service Date</label>
            <input
              type="date"
              className="form-control"
              id="serviceDate"
              max={today}
              value={newReport.serviceDate}
              onChange={this.formFieldStringState}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amountRemaining">Inches of Water Remaining</label>
            <input
              type="number"
              className="form-control"
              id="amountRemaining"
              min="0"
              max={maxInches}
              value={newReport.amountRemaining}
              onChange={this.formFieldStringState}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inchesAdded">Inches of Water Added</label>
            <input
              type="number"
              className="form-control"
              id="inchesAdded"
              min="0"
              max={maxInches - newReport.amountRemaining}
              value={newReport.inchesAdded}
              onChange={this.formFieldStringState}
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
              value={newReport.solutionAdded}
              onChange={this.formFieldStringState}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <input
              type="input"
              className="form-control"
              id="notes"
              value={newReport.notes}
              onChange={this.formFieldStringState}
            />
          </div>
          <button type="submit" className="btn btn-success">Add New Report</button>
        </form>
      </div>
    );
  }
}

export default NewReportPage;
