import React from 'react';
import PropTypes from 'prop-types';

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
      <div className="HomePage">
        <h1>Welcome {userObj.firstName}</h1>
        {userObj.admin
          ? <div className="systems-needing-service">
            {<ServiceNeededReport
              businessId={userObj.businessId} />}
          </div>
          : <div className="jobs-assigned">
            <h1>Works</h1>
            {
             <AssignedJobs
              userId={userObj.id}/>
            }
           </div>
  }
      </div>
    );
  }
}

export default HomePage;
