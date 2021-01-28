import React from 'react';
import { useParams } from 'react-router-dom';

import { Page, Header } from '../Global';

import { useGetReportById } from '../../Helpers/Data/ReportRequests';

function ReportPage() {
  const { reportId } = useParams();
  const report = useGetReportById(reportId);

  return (
    <Page>
      <Header title="Report" />
      <h1>{ report?.id}</h1>
    </Page>
  );
}

export default ReportPage;
