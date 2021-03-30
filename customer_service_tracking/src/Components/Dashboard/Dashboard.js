import React, { useContext } from 'react';
import { Page, Header } from '../Global';

import UserContext from '../../Contexts/UserContext';
import ReportsWidget from './Components/ReportsWidget';

function Dashboard() {
  const user = useContext(UserContext);
  return (
    <Page>
      <Header
        icon="fa-home"
        title="Dashboard"
        description={`Welcome ${user?.firstName}`}
      />
      <ReportsWidget />
    </Page>
  );
}

export default Dashboard;
