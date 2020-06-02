import React from 'react';
import PropTypes from 'prop-types';

import './Customer.scss';

class Customer extends React.Component {
  static propTypes = {
    customer: PropTypes.object.isRequired,
  }

  render() {
    const { customer } = this.props;
    return (
      <div className="Customer">
        <h1>Customer</h1>
        <p>{ customer.id }</p>
      </div>
    );
  }
}

export default Customer;
