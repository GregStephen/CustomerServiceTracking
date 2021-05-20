declare namespace Routes {
  export interface Property {
    propertyId: string;
  }

  export interface System extends Property {
    systemId: string;
  }
}
