import React, { useMemo } from 'react';
import { Spinner } from 'reactstrap';
import UserContext from '../Contexts/UserContext';
import Routes from '../Routes/Routes';

import NavigationBar from '../Components/NavigationBar/NavigationBar';
import { Page } from '../Components/Global';
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
        {userObj.isSuccess ? <Routes authorized={authorized} />
          : (<Page>
            <div className="d-flex justify-content-center mt-4">
              <h2>Fetching your data</h2>
              <Spinner className="ml-3" color="info" style={{ width: '3rem', height: '3rem' }} />
            </div>
          </Page>)}
      </UserContext.Provider>
    </div>
  );
}

export default ServiceTracker;
