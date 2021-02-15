import React from 'react';
import { Page, Header } from '../Global';
import AssignedJobs from '../AssignedJobs/AssignedJobs';
import ServiceNeededReport from '../ServiceNeededReport/ServiceNeededReport';

import './HomePage.scss';

function HomePage({ userObj }) {
  return (
    <Page>
      <Header
        icon="fa-home"
        title="Dashboard"
        description={`Welcome ${userObj.firstName}`}
      />
      <div className="HomePage">

        {userObj.admin
          ? <div className="systems-needing-service">
            {<ServiceNeededReport
              userObj={userObj} />}
          </div>
          : <div className="jobs-assigned">
            {
              <AssignedJobs
                userObj={userObj} />
            }
          </div>
        }
      </div>
    </Page>
  );
}

export default HomePage;
