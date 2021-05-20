import React from 'react';
import Formatting from '../../../Helpers/Functions/Formatting';
import { Header } from '../../Global';

interface Props {
  property: Property.Property;
}
function PropertyInfo({ property }: Props) {
  return (
    <div className="property-info widget col-10 mb-4 mr-0 ml-0 mt-0 pt-0">
      <Header title="Address" icon="fas fa-map-marked-alt" />
      <a rel="noopener noreferrer" target="_blank" href={Formatting.directionLink(property)}>{Formatting.formatAddressObj(property)}</a>
    </div>
  );
}

export default PropertyInfo;
