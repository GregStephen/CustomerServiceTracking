import React from 'react';
import PropTypes from 'prop-types';

//import defaults from '../../Helpers/defaults';
import SystemNeedingServiceRow from './SystemNeedingServiceRow/SystemNeedingServiceRow';

import JobRequests from '../../Helpers/Data/JobRequests';

import './ServiceNeededReport.scss';

class ServiceNeededReport extends React.Component {
  static propTypes = {
    businessId: PropTypes.string.isRequired,
  }

  state = {
    systemsNeedingService: [],
  }

  componentDidMount() {
    const { businessId } = this.props;
    JobRequests.getJobsNeedingAssignment(businessId)
      .then((systems) => this.setState({ systemsNeedingService: systems }))
      .catch((err) => console.error(err));
    // get customer systems that need service within the next week
  }

  render() {
    const { systemsNeedingService } = this.state;
    const showSystemsNeedingService = systemsNeedingService.map((system) => (
      <SystemNeedingServiceRow
        system={system}
      />
    ));

    return (
      <div className="ServiceNeededReport">
        <h1>Show those needing service here</h1>
        <div>
          {systemsNeedingService.length > 0 ? showSystemsNeedingService :
            <p>No one needs service this week!</p>
          }
        </div>
      </div>
    );
  }
}

export default ServiceNeededReport;
