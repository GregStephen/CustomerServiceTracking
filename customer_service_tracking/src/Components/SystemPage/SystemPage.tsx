import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Page, Header } from '../Global';
import { useGetPropertySystemFromPropertySystemId } from '../../Helpers/Data/PropertyRequests';
import { useGetReportsByPropertyId } from '../../Helpers/Data/ReportRequests';
import SystemInfo from '../SystemInfo/SystemInfo';
import SystemReports from './SystemReports';
import PropertySystemChangeLog from './PropertySystemChangeLog';

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
          <div className="d-flex row ml-0 mr-0">
            <div className="col-6 row justify-content-end">
              <SystemInfo system={system?.data} />
            </div>
            {systemReports &&
            <div className="col-6 justify-content-center">
              <SystemReports reports={systemReports} />
            </div>
            }
          </div>
          <div className="d-flex row ml-0 mr-0 mt-4">
            <div className="col-6 row justify-content-end">
              <PropertySystemChangeLog />
            </div>

          </div>
        </>}
      </>
    </Page>
  );
}

export default SystemPage;
