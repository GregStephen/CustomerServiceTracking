import React from 'react';
import { Badge } from 'reactstrap';
import { useParams } from 'react-router-dom';

import { Page, Header } from '../Global';

import PropertyReports from './PropertyReports/PropertyReports';
import EditPropertyModal from '../Modals/EditPropertyModal/EditPropertyModal';
import PropertySystems from './PropertySystems';
import { useGetPropertyFromPropertyId, useUpdatePropertyStatus } from '../../Helpers/Data/PropertyRequests';
import { useGetReportsByPropertyId } from '../../Helpers/Data/ReportRequests';

import Formatting from '../../Helpers/Functions/Formatting';
import JobsMap from '../JobsMap/JobsMap';

function PropertyPage() {
  const { id } = useParams();
  const reports = useGetReportsByPropertyId(id);
  const property = useGetPropertyFromPropertyId(id);
  const updatePropertyStatus = useUpdatePropertyStatus();

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
          <div className="property-info widget col-5 mb-4 pt-0">
            <Header title="Info" icon="fas fa-address-card" />
            <div className="row">
              <div className="col-6">
                {Formatting.formatAddressObj(property.data)}
                <EditPropertyModal property={property.data} />
                <button className={`btn btn-${property.data.enabled ? 'danger' : 'success'}`}
                  onClick={() => updatePropertyStatus.mutate(property.data)}>
                  {property.data.enabled ? 'Deactivate' : 'Activate'}
                </button>
              </div>
              <div className="offset-1 col-4">
                <JobsMap
                  getLocation={false}
                  dragging={false}
                  businessAddress={property.data}
                  hideMainMarkerPopup={true}
                  soloMarker={true}
                />
              </div>
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
