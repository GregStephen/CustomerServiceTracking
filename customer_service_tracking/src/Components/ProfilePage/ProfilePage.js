import React from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '../Global';
import { useUserById } from '../../Helpers/Data/UserRequests';
import { useGetReportsByUserId } from '../../Helpers/Data/ReportRequests';
import { UserReports, UserInfo } from './Components';

function ProfilePage() {
  const { userId } = useParams();
  const user = useUserById(userId);
  const reports = useGetReportsByUserId(userId);

  return (
    <Page>
      <UserInfo userInfo={user?.data} />
      <UserReports reports={reports?.data} />
    </Page>
  );
}

export default ProfilePage;
