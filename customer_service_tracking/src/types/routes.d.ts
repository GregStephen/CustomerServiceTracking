declare namespace Routes {
  export interface Property {
    propertyId: string;
  }

  export interface System extends Property {
    systemId: string;
  }

  export interface Report extends System {
    reportId: string;
  }

  export interface User {
    userId: string;
  }
}
