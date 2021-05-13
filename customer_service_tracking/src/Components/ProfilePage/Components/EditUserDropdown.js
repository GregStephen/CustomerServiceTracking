import React, { useState, useMemo, useContext } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import UserContext from '../../../Contexts/UserContext';
import { useUpdateUserAdmin } from '../../../Helpers/Data/UserRequests';
import UpdatePasswordModal from '../../Modals/UpdatePasswordModal/UpdatePasswordModal';
import UpdateEmailModal from '../../Modals/UpdateEmailModal/UpdateEmailModal';

const EditUserDropdown = ({ userInfo }) => {
  const currentUser = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const updateUserAdmin = useUpdateUserAdmin();
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [updatePassIsToggled, setUpdatePassIsToggled] = useState(false);
  const [updateEmailIsToggled, setUpdateEmailIsToggled] = useState(false);
  const canUpdateAdminStatus = useMemo(() => currentUser?.admin && currentUser?.id !== userInfo?.id, [currentUser, userInfo]);
  const canUpdatePersonal = useMemo(() => currentUser?.id === userInfo?.id, [currentUser, userInfo]);
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="mr-4">
      <DropdownToggle caret color="dark">
      <i className="fas fa-edit"></i> Edit
      </DropdownToggle>
      <DropdownMenu right>
        {canUpdatePersonal && <>
        <DropdownItem
          onClick={() => setUpdatePassIsToggled(true)}>
            Update Password
          </DropdownItem>
        <UpdatePasswordModal
          isToggled={updatePassIsToggled}
          setIsToggled={setUpdatePassIsToggled}/>
        <DropdownItem
          onClick={() => setUpdateEmailIsToggled(true)}>
            Update Email
        </DropdownItem>
        <UpdateEmailModal
          isToggled={updateEmailIsToggled}
          setIsToggled={setUpdateEmailIsToggled} />
        </>}
        {canUpdateAdminStatus
          && <DropdownItem
            onClick={() => updateUserAdmin.mutate(userInfo)}>
            {userInfo?.admin ? 'Remove Admin Privileges' : 'Enable Admin Privileges'}
          </DropdownItem>
        }
      </DropdownMenu>
    </Dropdown>
  );
};

export default EditUserDropdown;
