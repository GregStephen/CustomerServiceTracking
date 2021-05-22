import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
} from 'react';
import L, {LatLngExpression} from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';

import PropertyMarker from './PropertyMarker';

import './JobsMap.scss';
import UserContext from '../../Contexts/UserContext';

interface Props{
  getLocation: any;
  markersData: any;
  businessAddress: any;
  hideMainMarkerPopup: boolean;
  dragging?: boolean;
  soloMarker?: boolean;
}
function JobsMap({
  getLocation,
  markersData,
  businessAddress,
  hideMainMarkerPopup,
  dragging = true,
  soloMarker = false,
}: Props) {
  const [centerMarker, setCenterMarker] = useState<LatLngExpression>([0, 0]);
  const user = useContext(UserContext);
  const userMarker = (
    <Marker position={centerMarker}>
      {!hideMainMarkerPopup && <Popup>{getLocation ? 'You are here' : user.businessName }</Popup>}
    </Marker>
  );

  function GetLocation() {
    const map = useMapEvents({
      click: () => {
        map.locate();
      },
      locationfound: (location) => {
        setCenterMarker(location.latlng);
      },
    });
    return null;
  }

  useEffect(() => {
    if (!getLocation && businessAddress) {
      setCenterMarker([businessAddress.latitude, businessAddress.longitude]);
    }
  }, [getLocation, businessAddress]);

  const allSiteBounds = useMemo(() => {
    const bounds = L.latLngBounds(L.latLng(0,0), L.latLng(0,0));
    bounds.extend(centerMarker);
    if (markersData?.length > 0) {
      markersData.forEach((site: any) => bounds.extend(site.latLng));
    }
    return bounds;
  }, [markersData, centerMarker]);

  const updateMarkers = () => {
    if (markersData?.length > 0) {
      const markersToShow = markersData.map((marker: any, i: number) => (<PropertyMarker
        key={i}
        marker={marker}
      />));
      return markersToShow;
    }
    return null;
  };

  function ChangeView({ center, zoom }: { center: any; zoom: any}) {
    const map = useMap();
    map.invalidateSize();
    map.setView(center, zoom);
    return null;
  }

  function ChangeBounds({ allBounds }: any) {
    const map = useMap();
    map.invalidateSize();
    map.locate();
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
        dragging={dragging}>
        {getLocation && <GetLocation />}
        {soloMarker && <ChangeView center={centerMarker} zoom={13} />}
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
