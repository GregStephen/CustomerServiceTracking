import React, { useContext } from 'react';
import { Page, Header } from '../Global';

import UserContext from '../../Contexts/UserContext';
import ReportsWidget from './Components/ReportsWidget';
import NeedingServiceWidget from './Components/NeedingServiceWidget';

function Dashboard() {
  const user = useContext(UserContext);
  return (
    <Page>
      <>
        <Header
          icon="fa-home"
          title="Dashboard"
          description={`Welcome ${user?.firstName}`}
        />
        <div className="d-flex row">
          <div className="col-12 col-lg-6 justify-content-end">
            <ReportsWidget />
          </div>
          <div className="col-12 col-lg-6">
            <NeedingServiceWidget />
          </div>
        </div>
      </>
    </Page>
  );
}

export default Dashboard;
