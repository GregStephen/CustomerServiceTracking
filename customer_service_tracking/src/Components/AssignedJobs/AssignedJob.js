import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AssignedJob extends React.Component {
  static propTypes = {
    job: PropTypes.object,
  }

  state = {
  }

  componentDidMount() {
  }

  render() {
    const { job } = this.props;
    const customerLink = `/customer/${job.customer.id}`;
    return (
      <tr className="AssignedJob">
        <td><Link to={{ pathname: customerLink }}>{ job.customer.firstName } { job.customer.lastName }</Link></td>
        <td>{job.customer.address.addressLine1}, {job.customer.address.city}</td>
        <td>{ job.jobType.type }</td>
        <td><button className="btn btn-danger">Make a Report</button></td>
      </tr>
    );
  }
}

export default AssignedJob;
