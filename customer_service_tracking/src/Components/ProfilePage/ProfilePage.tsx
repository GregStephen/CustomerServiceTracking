import React from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from 'reactstrap';
import { Page, Header } from '../Global';
import { useUserById } from '../../Helpers/Data/UserRequests';
import { useGetReportsByUserId } from '../../Helpers/Data/ReportRequests';
import { UserReports, EditUserDropdown } from './Components';

function ProfilePage() {
  const { userId } = useParams<Routes.User>();
  const user = useUserById(userId);
  const reports = useGetReportsByUserId(userId);

  return (
    <Page>
      <>
        <Header title={`${user.data?.firstName} ${user.data?.lastName}'s Profile`} description={user.data?.admin && <Badge color="success">Admin</Badge>}>
          <div className="d-flex justify-content-end">
            <EditUserDropdown userInfo={user.data}/>
          </div>
        </Header>
        <UserReports reports={reports.data} />
      </>
    </Page>
  );
}

export default ProfilePage;
