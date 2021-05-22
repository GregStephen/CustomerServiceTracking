import React, { useContext } from 'react';
import { Page } from '../Global';
import AssignedJobs from '../AssignedJobs/AssignedJobs';
import ServiceNeededReport from '../ServiceNeededReport/ServiceNeededReport';

import UserContext from '../../Contexts/UserContext';

function JobsPage() {
  const user = useContext(UserContext);
  return (
    <Page>
      <>
        {user?.admin && (<ServiceNeededReport />)}
        <AssignedJobs />
      </>
    </Page>
  );
}

export default JobsPage;
