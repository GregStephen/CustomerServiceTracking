import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ReportRow extends React.Component {
  static propTypes = {
    report: PropTypes.object,
  }

  render() {
    const { report } = this.props;
    const reportLink = `/report/${report.id}`;
    return (
      <tr className="ReportRow">
          <td>{report.serviceDate}</td>
          <td>{report.technician}</td>
          <td>{report.customer.firstName} {report.customer.lastName}</td>
          <td>{report.type}</td>
          <td><Link to={{ pathname: reportLink }} className="btn btn-info">View Report</Link></td>
      </tr>
    );
  }
}

export default ReportRow;
