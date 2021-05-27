import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Page, Header } from '../Global';
import { useGetPropertySystemFromPropertySystemId } from '../../Helpers/Data/PropertyRequests';
import { useGetReportsByPropertyId } from '../../Helpers/Data/ReportRequests';
import SystemInfo from '../SystemInfo/SystemInfo';
import SystemReports from './SystemReports';

function SystemPage() {
  const params = useParams<Routes.System>();
  const system = useGetPropertySystemFromPropertySystemId(params.systemId);
  const reports = useGetReportsByPropertyId(params.propertyId);
  const systemReports = useMemo(() => reports.data?.filter((x) => x.systemId === params.systemId), [reports.data, params.systemId]);

  return (
    <Page>
      <>
        {system?.data && <>
          <Header title={system.data.displayName} />
          <div className="d-flex">
            <SystemInfo system={system?.data} />
            <SystemReports reports={systemReports} />
          </div>
        </>}
      </>
    </Page>
  );
}

export default SystemPage;
