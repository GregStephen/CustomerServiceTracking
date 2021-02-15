/* eslint-disable global-require */
import React, { createRef } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

import CustomerPopUp from './CustomerPopUp';

const assignedIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  popupAnchor: [12.5, 7.5],
});

const unAssignedIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  popupAnchor: [12.5, 7.5],
});

function CustomerMarker({ marker }) {
  const markerRef = createRef();

  return (
    <Marker
      key={marker.key}
      id={marker.key}
      position={marker.latLng}
      ref={markerRef}
      icon={marker.color === 'green' ? assignedIcon : unAssignedIcon}
    >
      <CustomerPopUp
        marker={marker}
      />
    </Marker>
  );
}

export default CustomerMarker;
