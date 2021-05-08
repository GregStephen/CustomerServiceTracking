import React from 'react';
import Formatting from '../../Helpers/Functions/Formatting';
import { Header } from '../Global';

function PropertyInfo({ property }) {
  return (
    <div className="property-info widget col-10 mb-4 mr-0 ml-0 mt-0 pt-0">
      <Header title="Info" icon="fas fa-map-marked-alt" />
      {Formatting.formatAddressObj(property)}
    </div>
  );
}

export default PropertyInfo;
