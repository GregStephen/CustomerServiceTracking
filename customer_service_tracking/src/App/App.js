import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import LandingPage from '../Components/LandingPage/LandingPage';
import ServiceTracker from '../ServiceTracker/ServiceTracker';

import './App.scss';
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

function App() {
  const [authorized, setAuthorized] = useState(false);
  const [userUid, setUserUid] = useState();
  const [error, setError] = useState(undefined);

  const logIn = (email, password) => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => firebase.auth().signInWithEmailAndPassword(email, password))
      .then((cred) => cred.user.getIdToken())
      .then((token) => sessionStorage.setItem('token', token))
      .catch((err) => setError(err.message));
  };

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setAuthorized(true);
      setUserUid(user.uid);
      // ...
    } else {
      setAuthorized(false);
      setUserUid(undefined);
    }
  });

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          {authorized && userUid
            && (
              <ServiceTracker userUid={userUid} authorized={authorized} />
            )
          } {
            !authorized
            && <LandingPage logIn={logIn} error={error} />
          }
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
