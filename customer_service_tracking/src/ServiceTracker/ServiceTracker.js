import React, { useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';

import UserContext from '../Contexts/UserContext';
import AddSystemToPropertyPage from '../Components/AddSystemToPropertyPage/AddSystemToPropertyPage';
import PropertyPage from '../Components/PropertyPage/PropertyPage';
import PropertiesPage from '../Components/PropertiesPage/PropertiesPage';
import EditPropertySystemPage from '../Components/EditPropertySystemPage/EditPropertySystemPage';
import HomePage from '../Components/HomePage/HomePage';

import NavigationBar from '../Components/NavigationBar/NavigationBar';
import NewAccountPage from '../Components/NewAccountPage/NewBusinessAccount/NewAccountPage';
import NewPropertyPage from '../Components/NewCustomerPage/NewCustomerPage';
import NewPersonalAccountPage from '../Components/NewAccountPage/NewPersonalAccountPage/NewPersonalAccountPage';
import NewPersonalAccountCheckPage from '../Components/NewAccountPage/ChooseBusinessForPersonalPage/ChooseBusinessForPersonalPage';
import NewReportPage from '../Components/NewReportPage/NewReportPage';
import NewSystemPage from '../Components/NewSystemPage/NewSystemPage';
import ReportPage from '../Components/ReportPage/ReportPage';
import ReportsPage from '../Components/ReportsPage/ReportsPage';
import SystemsPage from '../Components/SystemsPage/SystemsPage';
import TeamPage from '../Components/TeamPage/TeamPage';

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
      <NavigationBar authorized={authorized} userObj={userObj} />
      {userObj.isSuccess
        && <Switch>
        <Route path='/home'>
          <HomePage />
        </Route>
        <Route path='/systems'>
          <SystemsPage userObj={userObj.data} />
        </Route>
        <Route path='/new-system'>
          <NewSystemPage userObj={userObj.data} />
        </Route>
          <Route path='/properties' component={PropertiesPage} authorized={authorized} userObj={userObj} />
          <Route path='/new-property' component={NewPropertyPage} authorized={authorized} userObj={userObj} />
          <Route path='/property/:id' component={PropertyPage} authorized={authorized} userObj={userObj} />
          <Route path='/report/:reportId' component={ReportPage} authorized={authorized} userObj={userObj} />
          <Route path='/reports' component={ReportsPage} authorized={authorized} userObj={userObj} />
          <Route path='/new-report/:id' component={NewReportPage} authorized={authorized} userObj={userObj} />
          <Route path='/add-system-to-property/:id' component={AddSystemToPropertyPage} authorized={authorized} userObj={userObj} />
          <Route path='/edit-property-system/:id' component={EditPropertySystemPage} authorized={authorized} userObj={userObj} />
          <Route path='/team' component={TeamPage} authorized={authorized} userObj={userObj} />
        </Switch>
        }
        </UserContext.Provider>
    </div>
  );
}

export default ServiceTracker;

//            <Route path='/new-business-account' component={NewAccountPage} authorized={authorized} logIn={logIn} />
// <Route path='/new-personal-account/:id' component={NewPersonalAccountPage} authorized={authorized} logIn={logIn} />
// <Route path='/select-business' component={NewPersonalAccountCheckPage} authorized={authorized} />
