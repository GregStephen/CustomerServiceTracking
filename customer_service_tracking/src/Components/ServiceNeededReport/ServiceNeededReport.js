import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

// import defaults from '../../Helpers/defaults';
import SystemNeedingServiceRow from './SystemNeedingServiceRow/SystemNeedingServiceRow';

import BusinessRequests from '../../Helpers/Data/BusinessRequests';
import JobRequests from '../../Helpers/Data/JobRequests';

import './ServiceNeededReport.scss';


class ServiceNeededReport extends React.Component {
  static propTypes = {
    businessId: PropTypes.string.isRequired,
  }

  state = {
    systemsNeedingService: [],
    employeeOptions: [],
  }

  componentDidMount() {
    const { businessId } = this.props;
    JobRequests.getJobsNeedingAssignment(businessId)
      .then((systems) => this.setState({ systemsNeedingService: systems }))
      .catch((err) => console.error(err));
    BusinessRequests.getRegisteredEmployees(businessId)
      .then((employees) => this.setState({ employeeOptions: employees }))
      .catch((err) => console.error(err));
  }

  render() {
    const { systemsNeedingService, employeeOptions } = this.state;
    const showSystemsNeedingService = systemsNeedingService.map((systemNeedingService) => (
      <SystemNeedingServiceRow
        systemNeedingService={systemNeedingService}
        employeeOptions={employeeOptions}
        key={systemNeedingService.system.id}
      />
    ));

    return (
      <div className="ServiceNeededReport">
        <h1>Show those needing service here</h1>
        <div>
          {systemsNeedingService.length > 0
            ? <Table striped size="sm">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Address</th>
                  <th>Days until Empty</th>
                  <th>Tech Assigned</th>
                  <th>Assign Job</th>
                </tr>
              </thead>
              <tbody>
                {showSystemsNeedingService}
              </tbody>
            </Table>
            : <p>No one needs service this week!</p>
          }
        </div>
      </div>
    );
  }
}

export default ServiceNeededReport;
