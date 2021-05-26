declare module '*.png';
declare module 'reactstrap';

declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

declare interface ChangeLog {
  timestamp: string;
  username: string;
  delta: any;
}

declare interface GeocodingAddress {
  formatted_address: string;
  accuracy: number;
  accuracy_type: string;
  source: string;
  address_components: {
    number: string;
    predirectional: string;
    street: string;
    suffix: string;
    formatted_street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    county: string;
  };
  location: {
    lat: number;
    lng: number;
  };
}

declare interface CustomMarker {
  title: string;
  propertyLink: string;
  latLng: LatLngExpression;
  color: string;
  address?: Property.Property;
  key?: number;
  system?: Property.PropertySystem;
  tech?: string;
}