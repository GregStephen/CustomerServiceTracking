import React from 'react';
import PropTypes from 'prop-types';
import { Page, Header } from '../Global';
import AssignedJobs from '../AssignedJobs/AssignedJobs';
import ServiceNeededReport from '../ServiceNeededReport/ServiceNeededReport';

import './HomePage.scss';

class HomePage extends React.Component {
  static propTypes = {
    userObj: PropTypes.object.isRequired,
    authorized: PropTypes.bool.isRequired,
  }

  render() {
    const { userObj } = this.props;
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
                businessId={userObj.businessId} />}
            </div>
            : <div className="jobs-assigned">
              {
                <AssignedJobs
                  userId={userObj.id} />
              }
            </div>
          }
        </div>
      </Page>
    );
  }
}

export default HomePage;
