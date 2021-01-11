import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

import { Header } from '../Global';
import AssignedJob from './AssignedJob';

import JobRequests from '../../Helpers/Data/JobRequests';

class AssignedJobs extends React.Component {
  static propTypes = {
    userId: PropTypes.string,
  }

  state = {
    jobsAssigned: [],
  }

  componentDidMount() {
    const { userId } = this.props;
    JobRequests.getJobsAssignedTo(userId)
      .then((jobs) => this.setState({ jobsAssigned: jobs }))
      .catch((err) => console.error(err));
  }

  render() {
    const { jobsAssigned } = this.state;
    const showAssignedJobs = jobsAssigned.map((job) => (
      <AssignedJob
        job={job}
        key={job.id}
      />
    ));
    return (
      <div className="AssignedJobs widget col-10 pt-0">
        <Header title="Jobs" />
        {jobsAssigned.length > 0
          ? <Table striped size="sm">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Address</th>
                <th>Job Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {showAssignedJobs}
            </tbody>
          </Table>
          : <p>No one needs service this week!</p>
        }
      </div>
    );
  }
}

export default AssignedJobs;
