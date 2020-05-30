import React from 'react';
import PropTypes from 'prop-types';

import './System.scss';

class System extends React.Component {
  static propTypes = {
    system: PropTypes.object.isRequired,
  }

  render() {
    const { system } = this.props;
    return (
      <div className="System">
        <h1>{system.type}</h1>
        <p>Gallons: {system.gallons}</p>
        <p>Inches: {system.inches}</p>
      </div>
    );
  }
}

export default System;
