import React from 'react';
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
import EditPropertyNameModal from '../Modals/EditPropertyNameModal/EditPropertyNameModal';


function PropertyPage() {
  const { propertyId } = useParams();
  const reports = useGetReportsByPropertyId(propertyId);
  const property = useGetPropertyFromPropertyId(propertyId);

  return (
    <Page>
      {property?.data
        && <div className="PropertyPage">
          <Header title={property.data?.displayName}
            description={<>
              <Badge color={property.data.enabled ? 'success' : 'danger'}>
                {property.data.enabled ? 'Active' : 'Inactive'}
              </Badge>
              <EditPropertyNameModal property={property.data}/>
              </>
            }
          />
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
          <PropertySystems property={property.data} />
          {reports?.data
            && <PropertyReports reports={reports.data} />}
        </div>
      }
    </Page>
  );
}

export default PropertyPage;
