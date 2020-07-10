import React from 'react';
import PropTypes from 'prop-types';


class CustomerSystem extends React.Component {
  static propTypes = {
    system: PropTypes.object.isRequired,
  }

  render() {
    const { system } = this.props;
    return (
      <div className='CustomerSystem'>
        <p>Install Date: {system.installDate}</p>
        <p>Serial Number: {system.serialNumber}</p>
        {system.sold
          ? <p>Sold</p>
          : <p>Lease</p>}
        <p>Nozzles: {system.nozzles}</p>
        <p>Spray Cycles: {system.sprayCycles}</p>
        <p>Spray Duration: {system.sprayDuration}</p>
        <button className="btn btn-info">Change settings</button>
      </div>
    );
  }
}

export default CustomerSystem;
