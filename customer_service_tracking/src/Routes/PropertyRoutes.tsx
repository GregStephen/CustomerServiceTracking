import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import AddSystemToPropertyPage from '../Components/AddSystemToPropertyPage/AddSystemToPropertyPage';
import SystemPage from '../Components/SystemPage/SystemPage';
import PropertyPage from '../Components/PropertyPage/PropertyPage';
import ReportPage from '../Components/ReportPage/ReportPage';
import NewReportPage from '../Components/NewReportPage/NewReportPage';
import AdminProtectedRoute from './AdminProtectedRoute';

interface Props {
  path: string;
}

function PropertyRoutes({ path }: Props) {
  return (
    <Switch>
      <Route exact path={path}>
        <PropertyPage />
      </Route>
      <AdminProtectedRoute exact path={`${path}/add-system-to-property`}>
        <AddSystemToPropertyPage />
      </AdminProtectedRoute>
      <Route exact path={`${path}/system/:systemId`}>
        <SystemPage />
      </Route>
      <Route exact path={`${path}/system/:systemId/report/:reportId`}>
        <ReportPage />
      </Route>
      <Route exact path={`${path}/system/:systemId/new-report`}>
        <NewReportPage />
      </Route>
    </Switch>
  );
}

export default PropertyRoutes;
