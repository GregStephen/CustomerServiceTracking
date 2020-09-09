import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup, Input,
} from 'reactstrap';

class SystemNeedingServiceRow extends React.Component {
  static propTypes = {
    system: PropTypes.object.isRequired,
    employeeOptions: PropTypes.array.isRequired
  }

  state = {
    technicianAssignedId: '',
  }

  formFieldStringState = (e) => {
    let tempTechId = { ...this.state.technicianAssignedId };
    tempTechId = e.target.value;
    this.setState({ technicianAssignedId: tempTechId });
  };

  render() {
    const { system, employeeOptions } = this.props;
    const { technicianAssignedId } = this.state;
    return (
      <form onSubmit={this.createNewReport}>
      <tr>

        <td>{system.customer.firstName + " " + system.customer.lastName}</td>
        <td>{system.customer.address.addressLine1}</td>
        <td>{system.daysUntilEmpty}</td>
        <td>
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
          <td><button type="submit" className='btn btn-success'>Assign</button></td>

      </tr>
      </form>
    )
  }
}

export default SystemNeedingServiceRow;
