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
import NewSystemPage from '../Components/NewSystemPage/NewSystemPage';

import ReportsPage from '../Components/ReportsPage/ReportsPage';

import SystemsPage from '../Components/SystemsPage/SystemsPage';
import TeamPage from '../Components/TeamPage/TeamPage';

import PropertyRoutes from './PropertyRoutes';
import Dashboard from '../Components/Dashboard/Dashboard';
import AdminProtectedRoute from './AdminProtectedRoute';

function Routes() {
  const userContext = useContext(UserContext);
  const propertyRoute = useRouteMatch('/property/:propertyId');

  return (
    <Switch>
      <Route exact path='/'>
        {
          !userContext.admin ? <Redirect to='/jobs' />
            : <Dashboard />
        }
      </Route>
      <Route exact path='/jobs'>
        <JobsPage />
      </Route>
      <AdminProtectedRoute exact path='/systems'>
        <SystemsPage />
      </AdminProtectedRoute>
      <AdminProtectedRoute exact path='/new-system'>
        <NewSystemPage />
      </AdminProtectedRoute>
      <AdminProtectedRoute exact path='/properties'>
        <PropertiesPage />
      </AdminProtectedRoute>
      <AdminProtectedRoute exact path='/new-property'>
        <NewPropertyPage />
      </AdminProtectedRoute>
      {propertyRoute && <PropertyRoutes {...propertyRoute} />}
      <AdminProtectedRoute path='/reports'>
        <ReportsPage />
      </AdminProtectedRoute>
      <AdminProtectedRoute path='/edit-property-system/:systemId'>
        <EditPropertySystemPage />
      </AdminProtectedRoute>
      <AdminProtectedRoute path='/team'>
        <TeamPage />
      </AdminProtectedRoute>
      <Route path='/user/:userId'>
        <ProfilePage />
      </Route>
      <Route component={Dashboard} />
    </Switch>
  );
}

export default Routes;
