import React, { useContext } from 'react';
import { Badge, Button } from 'reactstrap';
import UserContext from '../../../Contexts/UserContext';
import { Header } from '../../Global';
import { useUpdateUserAdmin } from '../../../Helpers/Data/UserRequests';

function UserInfo({ userInfo }) {
  const currentUser = useContext(UserContext);
  const updateUserAdmin = useUpdateUserAdmin();
  return (
    <div className="widget mb-3 mt-3">
      {userInfo ? <>
      <Header title={`${userInfo?.firstName} ${userInfo?.lastName}'s Profile`} />
        <div>
          {userInfo.admin && <Badge color="success">Admin</Badge>}
          {currentUser.admin
          && <Button className="ml-3 btn btn-info"
          onClick={() => updateUserAdmin.mutate(userInfo)}>
          {userInfo.admin ? 'Remove Admin Privileges' : 'Enable Admin Privileges'}
        </Button>}
        </div>
        </> : <p>LOADING</p>
      }
    </div>
  );
}

export default UserInfo;
