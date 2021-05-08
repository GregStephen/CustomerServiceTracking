import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Page, Header } from '../Global';
import { useGetPropertySystemFromPropertySystemId } from '../../Helpers/Data/PropertyRequests';
import { useGetReportsByPropertyId } from '../../Helpers/Data/ReportRequests';
import SystemInfo from '../SystemInfo/SystemInfo';
import CreateNewJobModal from '../Modals/CreateNewJobModal/CreateNewJobModal';
import SystemReports from './SystemReports';

function SystemPage() {
  const { systemId } = useParams();
  const system = useGetPropertySystemFromPropertySystemId(systemId);
  const reports = useGetReportsByPropertyId(system.data?.propertyId);
  const systemReports = useMemo(() => reports.data?.filter((x) => x.systemId === systemId), [reports.data, systemId]);

  return (
    <Page>
      {system?.data && <>
        <Header title={system.data.displayName} />
        { false && <CreateNewJobModal
          // need to change this to actually system
          systemNeedingService={system}
        />
        }
        <div className="d-flex">
          <SystemInfo system={system?.data} />
          <SystemReports reports={systemReports} />
        </div>
      </>}
    </Page>
  );
}

export default SystemPage;
