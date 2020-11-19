import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
// import ReportRow from './ReportRow/ReportRow';
import ReportsTable from './ReportsTable/ReportsTable';
import './ReportsPage.scss';
import ReportRequests from '../../Helpers/Data/ReportRequests';

function ReportsPage({ userObj, authorized }) {
  const [reports, getReports] = useState();

  useEffect(() => {
    ReportRequests.getAllReportsByBusinessId(userObj.businessId)
      .then((allReports) => getReports(allReports))
      .catch((err) => console.error(err));
  });

  const tableData = useMemo(() => (reports || []), [reports]);

  const tableColumns = useMemo(() => [
    {
      Header: 'Service Date',
      accessor: (r) => r.serviceDate,
    },
    {
      Header: 'Technician',
      accessor: (r) => r.technician,
    },
    {
      Header: 'Customer',
      accessor: (r) => r.fullName,
    },
    {
      Header: 'Type',
      accessor: (r) => r.type,
    },
  ], []);
  return (
    <div className="ReportsPage">
      <h1>Reports Page</h1>
      <div className="row justify-content-around">
        <ReportsTable
          columns={tableColumns}
          data={tableData}
          />
      </div>
    </div>
  );
}

export default ReportsPage;
