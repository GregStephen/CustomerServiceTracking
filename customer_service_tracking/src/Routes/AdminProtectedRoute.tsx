import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../Contexts/UserContext';


function AdminProtectedRoute({ children, ...rest }: {children: any}) {
  const userContext = useContext(UserContext);

  return (
    <Route {...rest}>
      {userContext.admin
        ? children
        : <Redirect to="/" />
      }
    </Route>
  );
}
export default AdminProtectedRoute;
