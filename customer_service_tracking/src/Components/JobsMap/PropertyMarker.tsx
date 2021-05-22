/* eslint-disable global-require */
import React, { createRef } from 'react';
import { Marker as LeafletMarker } from 'react-leaflet';
import L, {Marker} from 'leaflet';

import PropertyPopUp from './PropertyPopUp';

const assignedIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  popupAnchor: [12.5, 7.5],
});

const unAssignedIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  popupAnchor: [12.5, 7.5],
});

interface Props {
  marker: CustomMarker;
}
function PropertyMarker({ marker }: Props) {
  const markerRef = createRef<Marker<any>>();

  return (
    <LeafletMarker
      key={marker.key}
      position={marker.latLng}
      ref={markerRef}
      icon={marker.color === 'green' ? assignedIcon : unAssignedIcon}>
      <PropertyPopUp
        marker={marker}
      />
    </LeafletMarker>
  );
}

export default PropertyMarker;
