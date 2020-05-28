import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import './App.scss';

import HomePage from '../Components/HomePage/HomePage';
import LandingPage from '../Components/LandingPage/LandingPage';
import NavigationBar from '../Components/NavigationBar/NavigationBar';
import NewAccountPage from '../Components/NewAccountPage/NewAccountPage';

import UserRequests from '../Helpers/Data/UserRequests';

import fbConnect from '../Helpers/Data/fbConnection';


fbConnect();

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
    userObj: {},
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authorized: true });
      } else {
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
        this.setState({ userObj });
      })
      .catch((err) => this.setState({ error: err.message }));
  };

  render() {
    const { authorized, userObj } = this.state;
    return (
      <div className="App">
        <Router>
          <NavigationBar authorized={authorized} userObj={userObj}/>
          <Switch>
            <PublicRoute path='/landing-page' component={LandingPage} authorized={authorized} logIn={this.logIn}/>
            <PublicRoute path='/new-account' component={NewAccountPage} authorized={authorized} logIn={this.logIn}/>
            <PrivateRoute path='/home' component={HomePage} authorized={authorized} userObj={userObj}/>
            <Redirect from='*' to='/landing-page' />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
