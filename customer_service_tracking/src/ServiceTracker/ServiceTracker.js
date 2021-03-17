import React, { useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';

import UserContext from '../Contexts/UserContext';
import AddSystemToPropertyPage from '../Components/AddSystemToPropertyPage/AddSystemToPropertyPage';
import PropertyPage from '../Components/PropertyPage/PropertyPage';
import PropertiesPage from '../Components/PropertiesPage/PropertiesPage';
import EditPropertySystemPage from '../Components/EditPropertySystemPage/EditPropertySystemPage';
import HomePage from '../Components/HomePage/HomePage';

import NavigationBar from '../Components/NavigationBar/NavigationBar';
import NewPropertyPage from '../Components/NewPropertyPage/NewPropertyPage';
import NewReportPage from '../Components/NewReportPage/NewReportPage';
import NewSystemPage from '../Components/NewSystemPage/NewSystemPage';
import ReportPage from '../Components/ReportPage/ReportPage';
import ReportsPage from '../Components/ReportsPage/ReportsPage';
import SystemPage from '../Components/SystemPage/SystemPage';
import SystemsPage from '../Components/SystemsPage/SystemsPage';
import TeamPage from '../Components/TeamPage/TeamPage';
import NewContactPage from '../Components/NewContactPage/NewContactPage';

import { useUserByFirebaseUid } from '../Helpers/Data/UserRequests';

function ServiceTracker({ userUid, authorized }) {
  const userObj = useUserByFirebaseUid(userUid, authorized);

  const userContextValues = useMemo(() => ({
    id: userObj.data?.id ?? '',
    admin: userObj.data?.admin ?? false,
    business: userObj.data?.business ?? {},
    businessId: userObj.data?.businessId ?? '',
    businessName: userObj.data?.businessName ?? '',
    firstName: userObj.data?.firstName ?? '',
    lastName: userObj.data?.lastName ?? '',
  }), [userObj.data]);

  return (
    <div className="ServiceTracker">
      <UserContext.Provider value={userContextValues}>
        <NavigationBar authorized={authorized} userObj={userContextValues} />
        {userObj.isSuccess
          && <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route path='/systems'>
              <SystemsPage />
            </Route>
            <Route path='/system/:systemId'>
              <SystemPage />
            </Route>
            <Route path='/new-system'>
              <NewSystemPage />
            </Route>
            <Route path='/properties'>
              <PropertiesPage />
            </Route>
            <Route path='/new-property'>
              <NewPropertyPage />
            </Route>
            <Route path='/new-contact/:propertyId'>
              <NewContactPage />
            </Route>
            <Route path='/property/:propertyId'>
              <PropertyPage />
            </Route>
            <Route path='/report/:reportId'>
              <ReportPage />
            </Route>
            <Route path='/reports'>
              <ReportsPage />
            </Route>
            <Route path='/new-report/:id'>
              <NewReportPage />
            </Route>
            <Route path='/add-system-to-property/:id'>
              <AddSystemToPropertyPage />
            </Route>
            <Route path='/edit-property-system/:id'>
              <EditPropertySystemPage />
            </Route>
            <Route path='/team'>
              <TeamPage />
            </Route>
          </Switch>
        }
      </UserContext.Provider>
    </div>
  );
}

export default ServiceTracker;
