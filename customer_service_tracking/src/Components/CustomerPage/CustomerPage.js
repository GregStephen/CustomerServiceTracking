import React from 'react';
import PropTypes from 'prop-types';

import CustomerRequests from '../../Helpers/Data/CustomerRequests';

import './CustomerPage.scss';

class CustomerPage extends React.Component {
  static propTypes = {
    userObj: PropTypes.object.isRequired,
    authorized: PropTypes.bool.isRequired,
  }

  state = {
    customer: '',
  }

  componentDidMount() {
    const customerId = this.props.match.params.id;
    CustomerRequests.getCustomerFromCustomerId(customerId)
      .then((customerResult) => this.setState({ customer: customerResult }))
      .catch((err) => console.error(err));
  }

  render() {
    const { customer } = this.state;
    return (
      <div className="CustomerPage">
        <h1>Customer { customer.firstName } { customer.lastName }</h1>
      </div>
    );
  }
}

export default CustomerPage;
