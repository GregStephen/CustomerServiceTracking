import React from 'react';
import { useParams } from 'react-router-dom';
import { Page, Header } from '../Global';
import { useUserById } from '../../Helpers/Data/UserRequests';

function SystemPage() {
  const { userId } = useParams();
  const user = useUserById(userId);

  return (
    <Page>
      <Header title={`${user?.data?.firstName} ${user?.data?.lastName}'s Profile`} />
      <div className="widget">
        <p>{user?.data?.id}</p>
        </div>
    </Page>
  );
}

export default SystemPage;
