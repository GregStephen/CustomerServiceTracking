import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Page, Header } from '../Global';

import ReportRequests from '../../Helpers/Data/ReportRequests';

function ReportPage() {
  const { reportId } = useParams();
  const [report, getReport] = useState();

  useEffect(() => {
    ReportRequests.getReportById(reportId)
      .then((reportReturned) => getReport(reportReturned))
      .catch((err) => console.error(err));
  }, [reportId]);

  return (
    <Page>
      <Header title="Report" />
      <h1>{ report?.id}</h1>
    </Page>
  );
}

export default ReportPage;
