import React from 'react';
import PropTypes from 'prop-types';

import './ReportsPage.scss';
import ReportRequests from '../../Helpers/Data/ReportRequests';

class ReportsPage extends React.Component {
  static propTypes = {
    userObj: PropTypes.object.isRequired,
    authorized: PropTypes.bool.isRequired,
  }

  state = {
    reports: [],
  }

  componentDidMount() {
    this.getAllReports();
  }

  getAllReports = () => {
    const { userObj } = this.props;
    ReportRequests.getAllReportsByBusinessId(userObj.businessId)
      .then((reports) => this.setState({ reports }))
      .catch((err) => console.error(err));
  }

  render() {
    const { reports } = this.state;
    const showReports = reports.map((report) => (
      <h1>{report.id}</h1>
    ));
    return (
      <div className="ReportsPage">
        <h1>Reports Page</h1>
        <div className="row justify-content-around">
          {reports.length > 0 ? showReports
            : <p className="no-reports">You have no reports to show! Try adding some first</p>}
        </div>
      </div>
    );
  }
}

export default ReportsPage;
