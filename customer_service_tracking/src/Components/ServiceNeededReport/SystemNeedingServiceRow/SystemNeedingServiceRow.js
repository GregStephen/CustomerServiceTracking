import React from 'react';
import PropTypes from 'prop-types';

class SystemNeedingServiceRow extends React.Component {
  static propTypes = {
    system: PropTypes.object.isRequired,
  }

  render() {
    const { system } = this.props;

    return (
      <tr>
        <td>{system.customer.firstName + " " + system.customer.lastName}</td>
        <td>{system.customer.address.addressLine1}</td>
        <td>{system.daysUntilEmpty}</td>
        <td>Technician Bob</td>
      </tr>
    )
  }
}

export default SystemNeedingServiceRow;
