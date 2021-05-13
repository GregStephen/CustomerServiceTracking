import React, { useContext } from 'react';
import { Badge, Button } from 'reactstrap';
import UserContext from '../../../Contexts/UserContext';
import { Header } from '../../Global';
import { useUpdateUserAdmin } from '../../../Helpers/Data/UserRequests';
import UpdatePasswordModal from '../../Modals/UpdatePasswordModal/UpdatePasswordModal';

function UserInfo({ userInfo }) {
  const currentUser = useContext(UserContext);
  const updateUserAdmin = useUpdateUserAdmin();
  return (
    <div className="widget mb-3 mt-3">
      {userInfo ? <>
        <Header title={`${userInfo?.firstName} ${userInfo?.lastName}'s Profile`} subTitle={userInfo.admin && <Badge color="success">Admin</Badge>}/>
        <div>
          {currentUser.admin && currentUser.id !== userInfo.id
            && <Button className="ml-3 btn btn-info"
              onClick={() => updateUserAdmin.mutate(userInfo)}>
              {userInfo.admin ? 'Remove Admin Privileges' : 'Enable Admin Privileges'}
            </Button>}
          {currentUser.id === userInfo.id
            && <>
              <Button className="btn btn-info">
                Change Email
            </Button>
            <UpdatePasswordModal />
            </>
          }
        </div>
      </> : <p>LOADING</p>
      }
    </div>
  );
}

export default UserInfo;
