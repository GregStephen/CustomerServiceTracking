import React, { useContext } from 'react';
import { Badge } from 'reactstrap';
import { useParams } from 'react-router-dom';

import { Page, Header } from '../Global';

import PropertyReports from './PropertyReports/PropertyReports';
import PropertyInfo from './PropertyInfo';
import PropertySystems from './PropertySystems';
import PropertyContacts from './PropertyContacts';

import { useGetPropertyFromPropertyId } from '../../Helpers/Data/PropertyRequests';
import { useGetReportsByPropertyId } from '../../Helpers/Data/ReportRequests';
import JobsMap from '../JobsMap/JobsMap';

import EditPropertyDropdown from './Components/EditPropertyDropdown';
import UserContext from '../../Contexts/UserContext';
import PropertyChangeLog from './Components/PropertyChangeLog.tsx';

function PropertyPage() {
  const { propertyId } = useParams();
  const reports = useGetReportsByPropertyId(propertyId);
  const property = useGetPropertyFromPropertyId(propertyId);
  const user = useContext(UserContext);
  return (
    <Page>
      {property?.data
        && <div className="PropertyPage">
          <Header title={property.data?.displayName} description={!property.data?.enabled && <Badge color='danger' className="mt-2">Inactive</Badge>}>
            <div className="d-flex justify-content-end">
              {user.admin
              && <EditPropertyDropdown />
              }
            </div>
          </Header>
          <div className="d-flex row justify-content-center ml-0 mr-0">
            <div className="col-6 row justify-content-end">
              <PropertyInfo property={property.data} />
              <div className="col-10">
                <JobsMap
                  getLocation={false}
                  dragging={false}
                  businessAddress={property.data}
                  hideMainMarkerPopup={true}
                  soloMarker={true}
                />
              </div>
            </div>
            <div className="col-6 justify-content-center">
              <PropertyContacts property={property.data} />
            </div>
          </div>

          <div className="d-flex row justify-content-center ml-0 mr-0">
            <div className="col-6 row justify-content-end">
              <PropertySystems property={property.data} />
            </div>
            <div className="col-6 justify-content-center">
              <PropertyChangeLog />
            </div>
          </div>
          {reports?.data
          && <PropertyReports reports={reports.data} />}
        </div>
      }
    </Page>
  );
}

export default PropertyPage;
