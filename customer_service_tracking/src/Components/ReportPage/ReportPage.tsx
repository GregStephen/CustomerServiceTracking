import React from 'react';
import { useParams } from 'react-router-dom';

import { Page, Header } from '../Global';
import ReportInfo from './Components/ReportInfo';
import SystemInfo from '../SystemInfo/SystemInfo';
import { useGetReportById } from '../../Helpers/Data/ReportRequests';

function ReportPage() {
  const { reportId } = useParams<Routes.Report>();
  const report = useGetReportById(reportId);
  const propertySystem = report.data?.property?.systems?.find((system) => system.id === report.data?.systemId);
  return (
    <Page>
      <>
        <Header title={`${report.data?.property?.displayName} - ${propertySystem?.displayName}`} />
        {report.isSuccess
        && <div className="d-flex justify-content-around align-items-start">
          <ReportInfo report={report.data} />
          <SystemInfo system={propertySystem} />
        </div>
        }
      </>
    </Page>
  );
}

export default ReportPage;
