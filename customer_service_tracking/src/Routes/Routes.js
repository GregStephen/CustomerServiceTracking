import React, { useContext } from 'react';
import {
  Route,
  Switch,
  useRouteMatch,
  Redirect,
} from 'react-router-dom';

import UserContext from '../Contexts/UserContext';

import ProfilePage from '../Components/ProfilePage/ProfilePage';

import PropertiesPage from '../Components/PropertiesPage/PropertiesPage';
import EditPropertySystemPage from '../Components/EditPropertySystemPage/EditPropertySystemPage';
import JobsPage from '../Components/JobsPage/JobsPage';
import NewPropertyPage from '../Components/NewPropertyPage/NewPropertyPage';
import NewReportPage from '../Components/NewReportPage/NewReportPage';
import NewSystemPage from '../Components/NewSystemPage/NewSystemPage';
import ReportPage from '../Components/ReportPage/ReportPage';
import ReportsPage from '../Components/ReportsPage/ReportsPage';

import SystemsPage from '../Components/SystemsPage/SystemsPage';
import TeamPage from '../Components/TeamPage/TeamPage';

import PropertyRoutes from './PropertyRoutes';
import Dashboard from '../Components/Dashboard/Dashboard';

function Routes() {
  const userContext = useContext(UserContext);
  const propertyRoute = useRouteMatch('/property/:propertyId');

  return (
    <Switch>
      <Route exact path='/'>
        {
          userContext.admin ? <Dashboard />
            : <Redirect to='/jobs' />
        }
      </Route>
      <Route exact path='/jobs'>
        <JobsPage />
      </Route>
      <Route exact path='/systems'>
        <SystemsPage />
      </Route>
      <Route exact path='/new-system'>
        <NewSystemPage />
      </Route>
      <Route exact path='/properties'>
        <PropertiesPage />
      </Route>
      <Route exact path='/new-property'>
        <NewPropertyPage />
      </Route>
      {propertyRoute && <PropertyRoutes {...propertyRoute} />}
      <Route path='/report/:reportId'>
        <ReportPage />
      </Route>
      <Route path='/reports'>
        <ReportsPage />
      </Route>
      <Route path='/new-report/:id'>
        <NewReportPage />
      </Route>
      <Route path='/edit-property-system/:id'>
        <EditPropertySystemPage />
      </Route>
      <Route path='/team'>
        <TeamPage />
      </Route>
      <Route path='/user/:userId'>
        <ProfilePage />
      </Route>
    </Switch>
  );
}

export default Routes;
