import React from 'react';
import PropTypes from 'prop-types';

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
    return (
      <tr className="AssignedJob">
        <td>{ job.customer.firstName } { job.customer.lastName }</td>
        <td>{job.customer.address.addressLine1}, {job.customer.address.city}</td>
        <td>{ job.jobType.type }</td>
        <td><button className="btn btn-danger">Make a Report</button></td>
      </tr>
    );
  }
}

export default AssignedJob;
