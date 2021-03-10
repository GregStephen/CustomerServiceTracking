import React from 'react';
import Formatting from '../../Helpers/Functions/Formatting';
import EditPropertyModal from '../Modals/EditPropertyModal/EditPropertyModal';
import { Header } from '../Global';
import { useUpdatePropertyStatus } from '../../Helpers/Data/PropertyRequests';

function PropertyInfo({ property }) {
  const updatePropertyStatus = useUpdatePropertyStatus();
  return (
    <div className="property-info widget col-10 mb-4 mr-0 ml-0 mt-0 pt-0">
    <Header title="Info" icon="fas fa-map-marked-alt" />
      {Formatting.formatAddressObj(property)}
      <div className="d-flex row justify-content-center">
      <EditPropertyModal property={property} />
    <button className={`ml-3 btn btn-${property.enabled ? 'danger' : 'success'}`}
      onClick={() => updatePropertyStatus.mutate(property)}>
      {property.enabled ? 'Deactivate' : 'Activate'}
        </button>
        </div>
  </div>
  );
}

export default PropertyInfo;
