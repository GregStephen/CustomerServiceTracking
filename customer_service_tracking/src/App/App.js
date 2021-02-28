import React from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.scss';

import AddSystemToPropertyPage from '../Components/AddSystemToPropertyPage/AddSystemToPropertyPage';
import PropertyPage from '../Components/PropertyPage/PropertyPage';
import PropertiesPage from '../Components/PropertiesPage/PropertiesPage';
import EditPropertySystemPage from '../Components/EditPropertySystemPage/EditPropertySystemPage';
import HomePage from '../Components/HomePage/HomePage';
import LandingPage from '../Components/LandingPage/LandingPage';
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

import UserRequests from '../Helpers/Data/UserRequests';

import fbConnect from '../Helpers/Data/fbConnection';

fbConnect();

const reactQueryConfig = {
  queries: {
    refetchOnWindowFocus: false,
  },
};

const queryClient = new QueryClient({
  defaultOptions: reactQueryConfig,
});

const PublicRoute = ({ component: Component, authorized, ...rest }) => {
  // props contains Location, Match, and History
  const routeChecker = (props) => (authorized === false ? <Component authorized={authorized}{...props} {...rest} /> : <Redirect to={{ pathname: '/home', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authorized, ...rest }) => {
  // props contains Location, Match, and History
  const routeChecker = (props) => (authorized === true ? <Component authorized={authorized} {...props} {...rest} /> : <Redirect to={{ pathname: '/landing-page', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authorized: false,
    userObj: {
      id: 'loggedOut',
    },
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({ authorized: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  logIn = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((cred) => cred.user.getIdToken())
      .then((token) => sessionStorage.setItem('token', token))
      .then(() => UserRequests.getUserByFirebaseUid(firebase.auth().currentUser.uid))
      .then((userObj) => {
        this.setState({ userObj }, () => this.setState({ authorized: true }));
      })
      .catch((err) => this.setState({ error: err.message }));
  };

  render() {
    const { authorized, userObj, error } = this.state;
    return (
      <div className="App">
        <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <NavigationBar authorized={authorized} userObj={userObj} />
          <Switch>
            <PublicRoute path='/landing-page' component={LandingPage} authorized={authorized} logIn={this.logIn} error={error} />
            <PublicRoute path='/new-business-account' component={NewAccountPage} authorized={authorized} logIn={this.logIn} />
            <PublicRoute path='/new-personal-account/:id' component={NewPersonalAccountPage} authorized={authorized} logIn={this.logIn} />
            <PublicRoute path='/select-business' component={NewPersonalAccountCheckPage} authorized={authorized} />
            <PrivateRoute path='/home' component={HomePage} authorized={authorized} userObj={userObj} />
            <PrivateRoute path='/systems' component={SystemsPage} authorized={authorized} userObj={userObj} />
            <PrivateRoute path='/new-system' component={NewSystemPage} authorized={authorized} userObj={userObj} />
            <PrivateRoute path='/properties' component={PropertiesPage} authorized={authorized} userObj={userObj} />
            <PrivateRoute path='/new-property' component={NewPropertyPage} authorized={authorized} userObj={userObj} />
            <PrivateRoute path='/property/:id' component={PropertyPage} authorized={authorized} userObj={userObj} />
            <PrivateRoute path='/report/:reportId' component={ReportPage} authorized={authorized} userObj={userObj} />
            <PrivateRoute path='/reports' component={ReportsPage} authorized={authorized} userObj={userObj} />
            <PrivateRoute path='/new-report/:id' component={NewReportPage} authorized={authorized} userObj={userObj} />
            <PrivateRoute path='/add-system-to-property/:id' component={AddSystemToPropertyPage} authorized={authorized} userObj={userObj} />
            <PrivateRoute path='/edit-property-system/:id' component={EditPropertySystemPage} authorized={authorized} userObj={userObj} />
            <PrivateRoute path='/team' component={TeamPage} authorized={authorized} userObj={userObj} />
            <Redirect from='*' to='/landing-page' />
          </Switch>
          </BrowserRouter>
          </QueryClientProvider>
      </div>
    );
  }
}

export default App;
