import React, { useEffect, useMemo, useState } from 'react';
import ReportsTable from './ReportsTable/ReportsTable';
import './ReportsPage.scss';
import ReportRequests from '../../Helpers/Data/ReportRequests';

function ReportsPage({ userObj }) {
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
      accessor: (r) => r.customer.firstName,
    },
    {
      Header: 'Type',
      accessor: (r) => r.type,
    },
  ], []);
  return (
    <div className="ReportsPage">
      <h1>Reports Page</h1>
      <div className="col-10">
        <ReportsTable
          columns={tableColumns}
          data={tableData}
        />
        </div>
    </div>
  );
}

export default ReportsPage;
