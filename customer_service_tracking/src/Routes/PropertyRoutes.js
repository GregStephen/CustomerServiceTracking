import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import AddSystemToPropertyPage from '../Components/AddSystemToPropertyPage/AddSystemToPropertyPage';
import NewContactPage from '../Components/NewContactPage/NewContactPage';
import SystemPage from '../Components/SystemPage/SystemPage';
import PropertyPage from '../Components/PropertyPage/PropertyPage';

function PropertyRoutes({ path }) {
  return (
    <Switch>
      <Route exact path={path}>
        <PropertyPage />
      </Route>
      <Route exact path={`${path}/new-contact`}>
        <NewContactPage />
      </Route>
      <Route exact path={`${path}/add-system-to-property`}>
        <AddSystemToPropertyPage />
      </Route>
      <Route exact path={`${path}/system/:systemId`}>
        <SystemPage />
      </Route>
    </Switch>
  );
}

export default PropertyRoutes;
