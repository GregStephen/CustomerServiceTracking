import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

import AssignedJob from './AssignedJob';

import JobRequests from '../../Helpers/Data/JobRequests';
import JobTypeRequests from '../../Helpers/Data/JobTypeRequests';


class AssignedJobs extends React.Component {
  static propTypes = {
    userId: PropTypes.string,
  }

  state = {
    jobsAssigned: [],
    jobTypeOptions: [],
  }

  componentDidMount() {
    const { userId } = this.props;
    JobRequests.getJobsAssignedTo(userId)
      .then((jobs) => this.setState({ jobsAssigned: jobs }))
      .catch((err) => console.error(err));
    JobTypeRequests.getJobTypes()
      .then((jobResults) => {
        this.setState({ jobTypeOptions: jobResults });
      })
      .catch();
  }

  render() {
    const { jobsAssigned, jobTypeOptions } = this.state;
    const showAssignedJobs = jobsAssigned.map((job) => (
      <AssignedJob
        job={job}
        jobTypeOptions={jobTypeOptions}
        key={job.id}
      />
    ));
    return (
      <div className="AssignedJobs">
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
