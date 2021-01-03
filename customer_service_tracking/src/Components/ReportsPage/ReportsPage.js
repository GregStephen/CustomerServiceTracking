import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';

import { Page, Header, GlobalTable } from '../Global';

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
      accessor: (r) => moment(r.serviceDate).format('L'),
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
    <Page>
      <div className="ReportsPage">
        <Header title="Reports" icon="fa-file-signature" />
        <div className="widget col-10">
          <GlobalTable
            columns={tableColumns}
            data={tableData}
          />
        </div>
      </div>
    </Page>
  );
}

export default ReportsPage;
