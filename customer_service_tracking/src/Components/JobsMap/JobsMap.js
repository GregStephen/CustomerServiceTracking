import React, {
  useState,
  useMemo,
} from 'react';
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';

import CustomerMarker from './CustomerMarker';

import './JobsMap.scss';

function JobsMap({ markersData, selectedMarker, centerMarker }) {
  const [hasLocation, setHasLocation] = useState(false);

  const userMarker = (
    <Marker
      position={centerMarker}
    >
      <Popup>You are here</Popup>
    </Marker>
  );

  const handleLocationFound = (e) => {
    setHasLocation(true);
    // setUserLocation(e.latlng);
  };

  const allSiteBounds = useMemo(() => {
    const bounds = L.latLngBounds();
    bounds.extend(centerMarker);
    if (markersData.length > 0) {
      markersData.forEach((site) => bounds.extend(site.latLng));
    }
    return bounds;
  }, [markersData, centerMarker]);

  const updateMarkers = () => {
    if (markersData.length > 0) {
      const markersToShow = markersData.map((marker) => (<CustomerMarker
          key={marker.key}
          marker={marker}
        />));
      return markersToShow;
    }
    return null;
  };

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  function ChangeBounds({ allBounds }) {
    const map = useMap();
    if (allBounds // 👈 null and undefined check
      && Object.keys(allBounds).length !== 0 && allBounds.constructor === Object) {
      map.fitBounds(allBounds);
    }
    return null;
  }

  return (
    <div className="Map" id="map">
      <MapContainer
        center={centerMarker}
        zoom={13}
        scrollWheelZoom={true}
        onLocationfound={handleLocationFound}>
        {false && <ChangeView center={centerMarker} zoom={13} />}
        {markersData && <ChangeBounds allBounds={allSiteBounds} />}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userMarker}
        {updateMarkers()}
      </MapContainer>
    </div>
  );
}

export default JobsMap;
