import React from 'react';
import PropTypes from 'prop-types';

import CustomerRequests from '../../Helpers/Data/CustomerRequests';
import SystemRequests from '../../Helpers/Data/SystemRequests';

const defaultCustomer = {
  id: '',
  firstName: '',
  lastName: '',
  officePhone: '',
  homePhone: '',
  address: {
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
  },
  systems: [
    {
      id: '',
      systemId: '',
      installDate: '',
      nozzles: 0,
      serialNumber: '',
      sold: false,
      sprayCycles: 0,
      sprayDuration: 0,
      systemInfo: {
        type: '',
        gallons: '',
        inches: '',
      },
    },
  ],
};

class AddSystemToCustomerPage extends React.Component {
  static propTypes = {
    authorized: PropTypes.bool.isRequired,
    userObj: PropTypes.object.isRequired,
  }

  state = {
    customer: defaultCustomer,
    systemOptions: [],
  }


  loadPage() {
    const { userObj } = this.props;
    const customerId = this.props.match.params.id;
    CustomerRequests.getCustomerFromCustomerId(customerId)
      .then((customerResult) => this.setState({ customer: customerResult }))
      .catch((err) => console.error(err));
    SystemRequests.getSystemsForBusiness(userObj.businessId)
      .then((systemOptions) => this.setState({ systemOptions }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.loadPage();
  }

  render() {
    return (
      <div className='AddSystemToCustomerPage'>

      </div>
    );
  }
}

export default AddSystemToCustomerPage;
