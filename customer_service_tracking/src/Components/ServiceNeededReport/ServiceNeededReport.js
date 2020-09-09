import React from 'react';

import defaults from '../../Helpers/defaults';

import SystemNeedingServiceRow from './SystemNeedingServiceRow/SystemNeedingServiceRow';

import './ServiceNeededReport.scss';

class ServiceNeededReport extends React.Component {
  state = {
    systemsNeedingService: [],
  }

  componentDidMount() {
    // get customer systems that need service within the next week
  }

  render() {
    const { systemsNeedingService } = this.state;
    const showSystemsNeedingService = systemsNeedingService.map((system) => (
      <SystemNeedingServiceRow
        system={system}
        key={system.id}
      />
    ));

    return (
      <div className="ServiceNeededReport">
        <h1>Show those needing service here</h1>

        {systemsNeedingService.length > 0 ? showSystemsNeedingService :
        <p>No one needs service this week!</p>
        }
      </div>
    );
  }
}

export default ServiceNeededReport;
