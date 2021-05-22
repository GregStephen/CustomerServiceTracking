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