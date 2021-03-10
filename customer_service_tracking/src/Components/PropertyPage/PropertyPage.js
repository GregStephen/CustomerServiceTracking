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


function PropertyPage() {
  const { id } = useParams();
  const reports = useGetReportsByPropertyId(id);
  const property = useGetPropertyFromPropertyId(id);


  return (
    <Page>
      {property?.data
        && <div className="PropertyPage">
          <Header title={property.data?.displayName}
            description={
              <Badge color={property.data.enabled ? 'success' : 'danger'}>
                {property.data.enabled ? 'Active' : 'Inactive'}
              </Badge>
            }
          />
        <div className="d-flex row justify-content-center align-items-start">
          <div className="col-6">
            <PropertyInfo property={property.data} />
            <PropertyContacts property={property.data} />
          </div>
            <div className="col-4 mt-4">
              <JobsMap
                getLocation={false}
                dragging={false}
                businessAddress={property.data}
                hideMainMarkerPopup={true}
                soloMarker={true}
              />
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
