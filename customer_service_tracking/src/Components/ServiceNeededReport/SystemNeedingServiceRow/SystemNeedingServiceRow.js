import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup, Input,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

import JobRequests from '../../../Helpers/Data/JobRequests';
import JobTypeRequests from '../../../Helpers/Data/JobTypeRequests';

class systemNeedingServiceNeedingServiceRow extends React.Component {
  static propTypes = {
    systemNeedingService: PropTypes.object.isRequired,
    employeeOptions: PropTypes.array.isRequired,
  }

  state = {
    technicianAssignedId: '',
    assigned: false,
    job: {
      id: null,
    },
    jobTypes: [],
  }

  checkIfAssigned = () => {
    const { systemNeedingService } = this.props;
    JobRequests.getJobForSystemBySystemId(systemNeedingService.system.id)
      .then((results) => this.setState({ job: results }, () => {
        if (results.id == null) {
          this.setState({ assigned: false });
        } else {
          this.setState({ assigned: true });
        }
      }))
      .catch((err) => console.error(err));
    // Check to see if there is a job for that systemNeedingService system id
    // if there is then this.setState({ assigned: true }) and this.setState({ job: })
    // if there is not then this.setState({ assigned: false }) and this.setState({ job: {} })
  }

  componentDidMount() {
    this.checkIfAssigned();
    JobTypeRequests.getJobTypes()
      .then((jobTypes) => this.setState({ jobTypes }))
      .catch((err) => console.error(err));
  }

  formFieldStringState = (e) => {
    let tempTechId = { ...this.state.technicianAssignedId };
    tempTechId = e.target.value;
    this.setState({ technicianAssignedId: tempTechId });
  };

  formatThisAddress = (addressObj) => {
    let addressStringToReturn = '';
    const addressString1 = addressObj.addressLine1?.replace(/\s/g, '+');
    const city = addressObj.city?.replace(/\s/g, '+');
    const state = addressObj.state?.replace(/\s/g, '+');
    const zip = addressObj.zipCode?.replace(/\s/g, '+');
    addressStringToReturn = `${addressString1}+${city}+${state}+${zip}`;
    return addressStringToReturn;
  }

  render() {
    const { systemNeedingService, employeeOptions } = this.props;
    const { technicianAssignedId, assigned, job } = this.state;
    const customerLink = `/customer/${systemNeedingService.customer.id}`;
    const formattedAddressString = this.formatThisAddress(systemNeedingService.customer.address);
    const directionLink = `https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${formattedAddressString}`;
    let assignedTech;
    if (job.id !== null) {
      assignedTech = employeeOptions.find((x) => x.id === job.technicianId);
    }

    const assignJob = () => {
      const { jobTypes } = this.state;
      if (technicianAssignedId !== '') {
        const serviceType = jobTypes.filter((x) => x.type === 'Service');
        // create the job
        const newJob = {
          customerSystemId: systemNeedingService.system.id,
          dateAssigned: moment().format('YYYY-MM-DD'),
          technicianId: technicianAssignedId,
          jobTypeId: serviceType[0].id,
        };
        JobRequests.createNewJob(newJob)
          .then(() => this.checkIfAssigned())
          .catch((err) => console.error(err));
      }
    };

    const unassignJob = () => {
      JobRequests.deleteJob(job.id)
        .then(() => {
          this.setState({ assigned: false }, () => {
            this.checkIfAssigned();
          });
        })
        .catch((err) => console.error(err));
    };

    return (
      <tr>
        <td><Link to={{ pathname: customerLink }}>{`${systemNeedingService.customer.firstName} ${systemNeedingService.customer.lastName}`}</Link></td>
        <td><a rel="noopener noreferrer" target="_blank" href={directionLink}>{systemNeedingService.customer.address.addressLine1}</a></td>
        <td>{systemNeedingService.daysUntilEmpty}</td>
        {assigned
          ? <td>
           {assignedTech.fullName}
          </td>
          : <td>
            <FormGroup>
              <Input
                type="select"
                name="technicianAssignedId"
                id="technicianAssignedId"
                value={technicianAssignedId}
                onChange={this.formFieldStringState}
                required>
                <option value="">Select a technician</option>
                {employeeOptions.map((employee) => (
                  <option key={employee.id} value={employee.id}>{employee.fullName}</option>
                ))}
              </Input>
            </FormGroup>
          </td>
        }
        {assigned
          ? <td><button className='btn btn-info' onClick={unassignJob}>Unassign</button></td>
          : <td><button className='btn btn-success' onClick={assignJob}>Assign</button></td>
        }

      </tr>
    );
  }
}

export default systemNeedingServiceNeedingServiceRow;
