import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AssignedJob extends React.Component {
  static propTypes = {
    job: PropTypes.object,
  }

  formatThisAddress = (addressObj) => {
    let addressStringToReturn = '';
    const addressString1 = addressObj.addressLine1?.replace(/\s/g, '+');
    const city = addressObj.city?.replace(/\s/g, '+');
    const state = addressObj.state?.replace(/\s/g, '+');
    const zip = addressObj.zipCode?.replace(/\s/g, '+');
    addressStringToReturn = `${addressString1}+${city}+${state}+${zip}`;
    return addressStringToReturn;
  }

  render() {
    const { job } = this.props;
    const customerLink = `/customer/${job.customer.id}`;
    const reportLink = `/new-report/${job?.customerSystem?.id}`;
    const formattedAddressString = this.formatThisAddress(job.customer.address);
    const directionLink = `https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${formattedAddressString}`;
    return (
      <tr className="AssignedJob">
        <td><Link to={{ pathname: customerLink }}>{ job.customer.firstName } { job.customer.lastName }</Link></td>
        <td><a rel="noopener noreferrer" target="_blank" href={directionLink}>{job.customer.address.addressLine1}, {job.customer.address.city}</a></td>
        <td>{ job.jobType.type }</td>
        <td><Link to={{ pathname: reportLink }}className="btn btn-info">Make a Report</Link></td>
      </tr>
    );
  }
}

export default AssignedJob;
