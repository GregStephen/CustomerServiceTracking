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
        {user?.admin
          && (
            <div className="systems-needing-service">
              <ServiceNeededReport />
            </div>
          )}
        <div className="jobs-assigned">
          <AssignedJobs userObj={user} />
        </div>
      </div>
    </Page>
  );
}

export default HomePage;
