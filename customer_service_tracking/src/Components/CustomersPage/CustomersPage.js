import React from 'react';
import { Link } from 'react-router-dom';

import Customer from '../Customer/Customer';

import CustomerRequests from '../../Helpers/Data/CustomerRequests';

import './CustomersPage.scss';

class CustomersPage extends React.Component {
  state = {
    customers: [],
  }

  componentDidMount() {
    this.getAllCustomers();
  }

  getAllCustomers = () => {
    const { userObj } = this.props;
    CustomerRequests.getCustomersForBusiness(userObj.businessId)
      .then((customers) => {
        this.setState({ customers });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { customers } = this.state;
    const showCustomers = customers.map((customer) => (
      <Customer
        customer={customer}
        key={customer.id}
      />
    ));
    return (
      <div className="CustomersPage">
        <h1>Customer Page</h1>
        <Link className="btn btn-info col-8" to={'/new-customer'}>Add a new customer</Link>
        <div className="row justify-content-around">
          {customers.length > 0 ? showCustomers
            : <p className="no-customers">You have no customers to show! Try adding some first</p>}
        </div>
      </div>
    );
  }
}

export default CustomersPage;
