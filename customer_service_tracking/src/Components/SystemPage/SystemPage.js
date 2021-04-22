import React from 'react';
import { useParams } from 'react-router-dom';
import { Page, Header } from '../Global';
import { useGetPropertySystemFromPropertySystemId } from '../../Helpers/Data/PropertyRequests';
import SystemInfo from '../SystemInfo/SystemInfo';
import CreateNewJobModal from '../Modals/CreateNewJobModal/CreateNewJobModal';

function SystemPage() {
  const { systemId } = useParams();
  const system = useGetPropertySystemFromPropertySystemId(systemId);

  return (
    <Page>
      {system?.data && <>
        <Header title={system.data.displayName} />
        { false && <CreateNewJobModal
          // need to change this to actually system
          systemNeedingService={system}
        />
        }
        <div className="widget">
          <p>{system?.data?.id}</p>
        </div>
        <SystemInfo system={system?.data} />
      </>}
    </Page>
  );
}

export default SystemPage;
