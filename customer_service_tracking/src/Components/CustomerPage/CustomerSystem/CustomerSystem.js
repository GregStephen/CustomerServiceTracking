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
        <p>{system.id}</p>
      </div>
    );
  }
}

export default CustomerSystem;
