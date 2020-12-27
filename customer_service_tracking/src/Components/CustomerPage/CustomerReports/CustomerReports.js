import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

import CustomerReportsRows from './CustomerReportsRows';

class CustomerReports extends React.Component {
  static propTypes = {
    reports: PropTypes.array.isRequired,
  }

  render() {
    const { reports } = this.props;
    const createRows = () => (
      reports.map((report) => (
        <CustomerReportsRows
        key={ report.id }
        customerReport={ report }/>
      ))
    );

    return (
      <div className="CustomerReports widget col-10">
        <h1>Customer Reports</h1>
        { reports.length === 0
          ? <p>Customer has no reports.</p>
          : <Table striped size="sm">
          <thead>
            <tr>
              <th>Date</th>
              <th>Job Type</th>
              <th>Technician</th>
            </tr>
          </thead>
          <tbody>
            {createRows()}
          </tbody>
        </Table>
  }
      </div>
    );
  }
}

export default CustomerReports;
