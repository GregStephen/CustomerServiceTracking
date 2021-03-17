import React from 'react';
import { useParams } from 'react-router-dom';
import { Page, Header } from '../Global';
import { useGetPropertySystemFromPropertySystemId } from '../../Helpers/Data/PropertyRequests';

function SystemPage() {
  const { systemId } = useParams();
  const system = useGetPropertySystemFromPropertySystemId(systemId);

  return (
    <Page>
      <Header title='System' />
      <div className="widget">
        <p>{system?.data?.id}</p>
        </div>
    </Page>
  );
}

export default SystemPage;
