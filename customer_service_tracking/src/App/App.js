import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import './App.scss';

import NavigationBar from '../Components/NavigationBar/NavigationBar';
import LandingPage from '../Components/LandingPage/LandingPage';
import HomePage from '../Components/HomePage/HomePage';

import fbConnect from '../Helpers/Data/fbConnection';
import NewAccountPage from '../Components/NewAccountPage/NewAccountPage';

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
      .catch((err) => this.setState({ error: err.message }));
  };

  render() {
    const { authorized } = this.state;
    return (
      <div className="App">
        <Router>
          <NavigationBar authorized={authorized}/>
          <Switch>
            <PublicRoute path='/landing-page' component={LandingPage} authorized={authorized} logIn={this.logIn}/>
            <PublicRoute path='/new-account' component={NewAccountPage} authorized={authorized} logIn={this.logIn}/>
            <PrivateRoute path='/home' component={HomePage} authorized={authorized}/>
            <Redirect from='*' to='/landing-page' />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
