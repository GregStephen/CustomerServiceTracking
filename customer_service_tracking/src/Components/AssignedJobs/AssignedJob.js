import React from 'react';
import PropTypes from 'prop-types';

import JobTypeRequests from '../../Helpers/Data/JobTypeRequests';

class AssignedJob extends React.Component {
  static propTypes = {
    job: PropTypes.object,
    jobTypeOptions: PropTypes.array,
  }

  state = {
    jobType: '',
  }

  componentDidMount() {
    const { job, jobTypeOptions } = this.props;
    const jobTypeObj = jobTypeOptions.find((x) => x.id === job.jobTypeId);
    this.setState({ jobType: jobTypeObj });
    // get job type for display with job.jobTypeId;
    // get customer and customer address for job.customerSystemId
  }

  render() {
    const { jobType } = this.state;
    return (
      <tr className="AssignedJob">
        <td></td>
        <td></td>
        <td>{ jobType?.type }</td>
        <td><button className="btn btn-danger">Make a Report</button></td>
      </tr>
    );
  }
}

export default AssignedJob;
