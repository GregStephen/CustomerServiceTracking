import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Customer.scss';

class Customer extends React.Component {
  static propTypes = {
    customer: PropTypes.object.isRequired,
  }

  render() {
    const { customer } = this.props;
    const customerLink = `/customer/${customer.id}`;
    return (
      <div className="Customer">
        <h1>Customer</h1>
        <Link to={{ pathname: customerLink }}>{customer.firstName} {customer.lastName}</Link>
      </div>
    );
  }
}

export default Customer;
