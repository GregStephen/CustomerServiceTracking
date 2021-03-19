import React, { useContext } from 'react';
import { Page, Header } from '../Global';
import AssignedJobs from '../AssignedJobs/AssignedJobs';
import ServiceNeededReport from '../ServiceNeededReport/ServiceNeededReport';

import './HomePage.scss';
import UserContext from '../../Contexts/UserContext';

function HomePage() {
  const user = useContext(UserContext);
  return (
    <Page>
      <Header
        icon="fa-home"
        title="Dashboard"
        description={`Welcome ${user?.firstName}`}
      />
      <div className="HomePage">
        {user?.admin && (<ServiceNeededReport />)}
        <AssignedJobs userObj={user} />
      </div>
    </Page>
  );
}

export default HomePage;
